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
  Left,
  Right,
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

  return (
    <Container>
      <Header>
        <Left>
          <Button transparent>
            <Icon name="menu" />
          </Button>
        </Left>
        <Body>
          <Title>{constants.header.home}</Title>
        </Body>
        <Right />
      </Header>
      <Content style={styles.content}>
        <Card>
          <CardItem>
            <Body>
              <Text>//Your text here</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Image
              source={{
                uri: cameraContext.getUri(),
              }}
              style={styles.image}
            />
          </CardItem>
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
});

export default HomeScreen;
