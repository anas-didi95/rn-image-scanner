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
  Right,
  Spinner,
  Text,
  Title,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet} from 'react-native';
import useConstants from '../utils/hooks/useConstants';
import useGoogleCloudVision from '../utils/hooks/useGoogleCloudVision';
import ImagePicker from 'react-native-image-crop-picker';
import useValidate from '../utils/hooks/useValidate';

const HomeScreen = () => {
  const [isFabActive, setFabActive] = useState<boolean>(false);
  const constants = useConstants();
  const googleCloudVision = useGoogleCloudVision();
  const [image, setImage] = useState<{uri: string; base64: string}>({
    uri: '',
    base64: '',
  });
  const [resultList, setResultList] = useState<string[]>([]);

  const toggleFabActive = () => setFabActive((prev) => !prev);

  const onOpenCamera = async () => {
    try {
      toggleFabActive();
      const cropImage = await ImagePicker.openCamera({
        mediaType: 'photo',
        cropping: true,
        compressImageQuality: 0.5,
        includeBase64: true,
      });
      setImage({uri: cropImage.path, base64: cropImage.data ?? ''});
    } catch (e) {
      console.error('[HomeScreen] onOpenCamera failed!', e);
    }
  };

  const onUpload = async () => {
    try {
      toggleFabActive();
      const cropImage = await ImagePicker.openPicker({
        cropping: true,
        compressImageQuality: 0.5,
        includeBase64: true,
        mediaType: 'photo',
      });
      setImage({uri: cropImage.path, base64: cropImage.data ?? ''});
    } catch (e) {
      console.error('[HomeScreen] onUpload failed!', e);
    }
  };

  const onClearPicture = () => {
    setImage({uri: '', base64: ''});
    setResultList([]);
  };

  useEffect(() => {
    if (image.base64) {
      (async () => {
        const responseBody = await googleCloudVision.getTextDetection(
          image.base64,
        );
        const textList = responseBody.responses[0].textAnnotations
          .filter((text) => !text.locale)
          .map((text) => text.description);

        setResultList(textList);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image.base64]);

  return (
    <Container>
      <Header noLeft>
        <Body>
          <Title>{constants.header.home}</Title>
        </Body>
      </Header>
      <Content padder>
        <ImagePlaceholderCard onClearPicture={onClearPicture} uri={image.uri} />
        <ResultCard resultList={resultList} uri={image.uri} />
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
}> = ({uri, onClearPicture}) => (
  <Card>
    {!uri ? (
      <CardItem header>
        <Body>
          <Text style={styles.cardHeader}>
            {!uri ? 'Instruction' : 'Picture'}
          </Text>
          <Text>Please snap or choose a picture to start scanner.</Text>
        </Body>
      </CardItem>
    ) : (
      <>
        <CardItem cardBody>
          <Image
            resizeMode="stretch"
            source={{
              uri: uri,
            }}
            style={styles.image}
          />
        </CardItem>
        <Button full style={styles.clearButton} onPress={onClearPicture}>
          <Text>Clear picture</Text>
        </Button>
      </>
    )}
  </Card>
);

const ResultCard: React.FC<{uri: string; resultList: string[]}> = ({
  uri,
  resultList,
}) => {
  const validate = useValidate();

  return (
    <>
      {!!uri && (
        <Card>
          {!resultList || resultList.length === 0 ? (
            <CardItem style={styles.spinner}>
              <Spinner />
            </CardItem>
          ) : (
            <>
              {resultList.map((result) => (
                <CardItem>
                  <Body>
                    <Text style={styles.resultValue}>{result.trimEnd()}</Text>
                    <Text note>{validate.getType(result)}</Text>
                  </Body>
                  <Right>
                    <Icon name="chevron-forward-outline" />
                  </Right>
                </CardItem>
              ))}
            </>
          )}
        </Card>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 300,
    flex: 1,
  },
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
  spinner: {
    justifyContent: 'center',
  },
  resultValue: {
    fontWeight: '700',
  },
});

export default HomeScreen;
