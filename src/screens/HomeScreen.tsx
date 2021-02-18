import {useIsFocused} from '@react-navigation/native';
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
import React, {useEffect, useState} from 'react';
import {Alert, BackHandler, Image, StyleSheet} from 'react-native';
import Camera from '../components/Camera';

const HomeScreen = () => {
  const [isFabActive, setFabActive] = useState<boolean>(false);
  const isFocused = useIsFocused();
  const [isOpenCamera, setOpenCamera] = useState<boolean>(false);

  const toggleFabActive = () => setFabActive((prev) => !prev);

  const onOpenCamera = () => setOpenCamera(true);

  useEffect(() => {
    const backAction = () => {
      if (isOpenCamera) {
        setOpenCamera(false);
        return true;
      }

      Alert.alert('Hold on!', 'Are you sure you want to go exit?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [isOpenCamera]);

  return (
    <>
      {isFocused && isOpenCamera ? (
        <Camera />
      ) : (
        <Container>
          <Header>
            <Left>
              <Button transparent>
                <Icon name="menu" />
              </Button>
            </Left>
            <Body>
              <Title>Home</Title>
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
                    uri:
                      'https://www.notebookcheck.net/fileadmin/_processed_/9/1/csm_thinkpad25_f682fa1286.jpg',
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
      )}
    </>
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
