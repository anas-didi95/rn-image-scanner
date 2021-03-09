import {
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Content,
  Fab,
  Header,
  Icon,
  Spinner,
  Text,
  Title,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import useConstants from '../utils/hooks/useConstants';
import useGoogleCloudVision from '../utils/hooks/useGoogleCloudVision';
import ImagePicker from 'react-native-image-crop-picker';
import useValidate from '../utils/hooks/useValidate';
import {TResult} from '../utils/types';
import useFirebase from '../utils/hooks/useFirebase';
import ImageCard from '../components/ImageCard';
import ResultListCard from '../components/ResultListCard';

const HomeScreen = () => {
  const constants = useConstants();
  const googleCloudVision = useGoogleCloudVision();
  const validate = useValidate();
  const firebase = useFirebase();
  const [image, setImage] = useState<{uri: string}>({uri: ''});
  const [resultList, setResultList] = useState<TResult[]>([]);
  const [isFabActive, setFabActive] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);

  const toggleFabActive = () => setFabActive((prev) => !prev);

  const onOpenCamera = async () => {
    try {
      toggleFabActive();
      const cropImage = await ImagePicker.openCamera({
        mediaType: 'photo',
        cropping: true,
        compressImageQuality: 0.5,
        includeBase64: false,
      });
      setImage({uri: cropImage.path});
    } catch (e) {
      console.log('[HomeScreen] onOpenCamera failed!', e);
    }
  };

  const onUpload = async () => {
    try {
      toggleFabActive();
      const cropImage = await ImagePicker.openPicker({
        cropping: true,
        compressImageQuality: 0.5,
        includeBase64: false,
        mediaType: 'photo',
      });
      setImage({uri: cropImage.path});
    } catch (e) {
      console.log('[HomeScreen] onUpload failed!', e);
    }
  };

  const onClearPicture = () => {
    setImage({uri: ''});
    setResultList([]);
  };

  useEffect(() => {
    if (image.uri) {
      (async () => {
        setLoading(true);
        setResultList([]);

        const imageRef = await firebase.saveImage(image.uri);
        const downloadURL = await firebase.getDownloadURL(imageRef);
        const responseBody = await googleCloudVision.getTextDetection(
          downloadURL,
        );
        const textList: TResult[] = responseBody.responses[0].textAnnotations
          .filter((text) => !text.locale)
          .map((text) => ({
            type: validate.getType(text.description),
            value: text.description,
          }));

        setResultList(textList);
        setLoading(false);

        await firebase.saveResult({
          imageUri: downloadURL,
          fullText: responseBody.responses[0].fullTextAnnotation.text,
          texts: textList,
          createDate: new Date(),
        });
      })();
    }

    return () => {
      onClearPicture();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image.uri]);

  return (
    <Container>
      <Header noLeft>
        <Body>
          <Title>{constants.header.home}</Title>
        </Body>
      </Header>
      <Content padder>
        <ImagePlaceholderCard
          uri={image.uri}
          onClearPicture={onClearPicture}
          isLoading={isLoading}
        />
        <ResultCard
          resultList={resultList}
          isImageAvailable={!!image.uri}
          isLoading={isLoading}
        />
      </Content>
      <Fab
        direction="up"
        position="bottomRight"
        active={isFabActive}
        onPress={toggleFabActive}>
        <Icon name={`${!isFabActive ? 'menu-sharp' : 'close-sharp'}`} />
        <Button style={styles.cameraButton}>
          <Icon name="camera-outline" onPress={onOpenCamera} />
        </Button>
        <Button style={styles.uploadButton}>
          <Icon name="download-outline" onPress={onUpload} />
        </Button>
      </Fab>
    </Container>
  );
};

const ImagePlaceholderCard: React.FC<{
  uri: string;
  onClearPicture: () => void;
  isLoading: boolean;
}> = ({uri, onClearPicture, isLoading}) => (
  <>
    {uri ? (
      <>
        <ImageCard uri={uri} />
        {!isLoading && (
          <Button full style={styles.clearButton} onPress={onClearPicture}>
            <Text>Clear picture</Text>
          </Button>
        )}
      </>
    ) : (
      <Card>
        <CardItem header>
          <Body>
            <Text style={styles.cardHeader}>Instruction</Text>
            <Text>Please snap or choose a picture to start scanner.</Text>
          </Body>
        </CardItem>
      </Card>
    )}
  </>
);

const ResultCard: React.FC<{
  isImageAvailable: boolean;
  resultList: TResult[];
  isLoading: boolean;
}> = ({isImageAvailable, resultList, isLoading}) => (
  <>
    {isLoading ? (
      <Spinner />
    ) : (
      <>{isImageAvailable && <ResultListCard resultList={resultList} />}</>
    )}
  </>
);

const styles = StyleSheet.create({
  cameraButton: {
    backgroundColor: 'green',
  },
  cardHeader: {
    fontWeight: 'bold',
  },
  clearButton: {
    backgroundColor: 'gray',
  },
  uploadButton: {
    backgroundColor: '#ff8c00',
  },
});

export default HomeScreen;
