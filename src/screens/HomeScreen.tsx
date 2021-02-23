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
import {useCameraContext} from '../utils/contexts/CameraContext';
import useConstants from '../utils/hooks/useConstants';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import useGoogleCloudVision from '../utils/hooks/useGoogleCloudVision';

const HomeScreen = () => {
  const [isFabActive, setFabActive] = useState<boolean>(false);
  const cameraContext = useCameraContext();
  const constants = useConstants();
  const googleCloudVision = useGoogleCloudVision();
  const [imgBase64, setImgBase64] = useState<string>();
  const [result, setResult] = useState<string>();

  const toggleFabActive = () => setFabActive((prev) => !prev);

  const onOpenCamera = () => {
    toggleFabActive();
    launchCamera(
      {mediaType: 'photo', quality: 0.5, includeBase64: true},
      (image) => {
        cameraContext.setUri(image.uri ?? '');
        setImgBase64(image.base64 ?? '');
      },
    );
  };

  const onClearPicture = () => {
    cameraContext.clearUri();
    setResult('');
    setImgBase64('');
  };

  const onUpload = () => {
    toggleFabActive();
    launchImageLibrary(
      {mediaType: 'photo', quality: 0.5, includeBase64: true},
      (image) => {
        cameraContext.setUri(image.uri ?? '');
        setImgBase64(image.base64 ?? '');
      },
    );
  };

  useEffect(() => {
    if (imgBase64) {
      (async () => {
        const responseBody = await googleCloudVision.getTextDetection(
          imgBase64,
        );

        setResult(responseBody.responses[0].fullTextAnnotation.text);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgBase64]);

  return (
    <Container>
      <Header noLeft>
        <Body>
          <Title>{constants.header.home}</Title>
        </Body>
      </Header>
      <Content padder>
        <Card>
          {!cameraContext.getUri() ? (
            <>
              <CardItem header>
                <Text style={styles.cardHeader}>
                  {!cameraContext.getUri() ? 'Instruction' : 'Picture'}
                </Text>
              </CardItem>
              <CardItem>
                <Text>Please snap a picture to start scanner.</Text>
              </CardItem>
            </>
          ) : (
            <>
              <CardItem cardBody>
                <Image
                  resizeMode="stretch"
                  source={{
                    uri: cameraContext.getUri(),
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
        {!!imgBase64 && (
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

const styles = StyleSheet.create({
  image: {
    height: 350,
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
