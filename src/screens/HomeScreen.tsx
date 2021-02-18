import {
  Body,
  Button,
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
import {StyleSheet} from 'react-native';

const HomeScreen = () => {
  const [isFabActive, setFabActive] = useState<boolean>(false);

  const toggleFabActive = () => setFabActive((prev) => !prev);

  return (
    <Container>
      <Header>
        <Left>
          <Button transparent>
            <Icon name="menu" />
          </Button>
        </Left>
        <Body>
          <Title>About</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <Text>Hello world</Text>
      </Content>
      <Fab
        direction="up"
        position="bottomRight"
        active={isFabActive}
        onPress={toggleFabActive}>
        <Icon name={`${!isFabActive ? 'menu-sharp' : 'close-sharp'}`} />
        <Button style={styles.cameraButton}>
          <Icon name="camera-outline" />
        </Button>
      </Fab>
    </Container>
  );
};

const styles = StyleSheet.create({
  cameraButton: {
    backgroundColor: 'green',
  },
});

export default HomeScreen;
