import {useNavigation} from '@react-navigation/native';
import {Button, Container, Content, Footer, FooterTab, Text} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';

const HomeScreen = () => {
  const {navigate} = useNavigation();

  const onNavigateAbout = () => navigate('About');

  return (
    <Container>
      <Content style={styles.body}>
        <Text>This is Content Section</Text>
        <Button onPress={onNavigateAbout}>
          <Text>Navigate to About</Text>
        </Button>
      </Content>
      <Footer>
        <FooterTab>
          <Button full>
            <Text>Footer</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};

const styles = StyleSheet.create({
  body: {
    padding: 10,
  },
});

export default HomeScreen;
