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
import {Image, StyleSheet} from 'react-native';
import useConstants from '../utils/hooks/useConstants';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import useGoogleCloudVision from '../utils/hooks/useGoogleCloudVision';

const HomeScreen = () => {
  const [isFabActive, setFabActive] = useState<boolean>(false);
  const constants = useConstants();
  const googleCloudVision = useGoogleCloudVision();
  const [image, setImage] = useState<{uri: string; base64: string}>({
    uri: '',
    base64: '',
  });
  const [result, setResult] = useState<string>('');

  const toggleFabActive = () => setFabActive((prev) => !prev);

  const onOpenCamera = () => {
    toggleFabActive();
    launchCamera(
      {mediaType: 'photo', quality: 0.5, includeBase64: true},
      ({uri, base64}) => setImage({uri: uri ?? '', base64: base64 ?? ''}),
    );
  };

  const onClearPicture = () => {
    setImage({uri: '', base64: ''});
    setResult('');
  };

  const onUpload = () => {
    toggleFabActive();
    launchImageLibrary(
      {mediaType: 'photo', quality: 0.5, includeBase64: true},
      ({uri, base64}) => setImage({uri: uri ?? '', base64: base64 ?? ''}),
    );
  };

  useEffect(() => {
    if (image.base64) {
      (async () => {
        const responseBody = await googleCloudVision.getTextDetection(
          image.base64,
        );

        setResult(responseBody.responses[0].fullTextAnnotation.text);
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
        <ResultCard result={result} uri={image.uri} />
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

const ResultCard: React.FC<{uri: string; result: string}> = ({uri, result}) => (
  <>
    {!!uri && (
      <Card>
        {!result ? (
          <CardItem style={styles.spinner}>
            <Spinner />
          </CardItem>
        ) : (
          <>
            <CardItem header>
              <Text style={styles.cardHeader}>Result</Text>
            </CardItem>
            <CardItem>
              <Body>{result ? <Text>{result}</Text> : <Spinner />}</Body>
            </CardItem>
          </>
        )}
      </Card>
    )}
  </>
);

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
});

export default HomeScreen;
