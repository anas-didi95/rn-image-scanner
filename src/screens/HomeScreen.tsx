import {useNavigation} from '@react-navigation/native';
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
  Text,
  Title,
} from 'native-base';
import React, {useState} from 'react';
import {Image, StyleSheet} from 'react-native';
import {useCameraContext} from '../utils/contexts/CameraContext';
import useConstants from '../utils/hooks/useConstants';

const HomeScreen = () => {
  const [isFabActive, setFabActive] = useState<boolean>(false);
  const cameraContext = useCameraContext();
  const navigation = useNavigation();
  const constants = useConstants();

  const toggleFabActive = () => setFabActive((prev) => !prev);

  const onOpenCamera = () => {
    toggleFabActive();
    navigation.navigate(constants.route.camera);
  };

  const onClearPicture = () => cameraContext.clearUri();

  return (
    <Container>
      <Header noLeft>
        <Body>
          <Title>{constants.header.home}</Title>
        </Body>
      </Header>
      <Content style={styles.content}>
        <Card>
          <CardItem header>
            <Text style={styles.cardHeader}>
              {!cameraContext.getUri() ? 'Instruction' : 'Picture'}
            </Text>
          </CardItem>
          {!cameraContext.getUri() ? (
            <CardItem>
              <Text>Please snap a picture to start scanner.</Text>
            </CardItem>
          ) : (
            <>
              <CardItem cardBody>
                <Image
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
      </Fab>
    </Container>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 10,
  },
  image: {
    height: 200,
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
});

export default HomeScreen;
