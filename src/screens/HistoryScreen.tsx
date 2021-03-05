import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  Body,
  Button,
  Container,
  Content,
  Footer,
  FooterTab,
  Header,
  Icon,
  List,
  ListItem,
  Right,
  Text,
  Title,
} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import useConstants from '../utils/hooks/useConstants';
import useFirebase from '../utils/hooks/useFirebase';

const HistoryScreen = () => {
  const fullText =
    '*Unsaved Document 11 Hello world2 anas.didi95@gmail.com3 018-76013434 +01966377245 https://www.google.com61';
  const navigation = useNavigation();
  const constants = useConstants();
  const firebase = useFirebase();

  const navigateResult = () =>
    navigation.navigate(constants.route.historyStack.result);

  useFocusEffect(() => {
    (async () => {
      console.log('isFocused start');
      await firebase.getResultList();
    })();
  });

  return (
    <Container>
      <Header noLeft>
        <Body>
          <Title>{constants.header.history}</Title>
        </Body>
      </Header>
      <Content padder>
        <List>
          <ListItem button onPress={navigateResult}>
            <Body>
              <Text style={styles.fullText}>{fullText}</Text>
              <Text note>{new Date().toUTCString()}</Text>
            </Body>
            <Right>
              <Icon name="chevron-forward-outline" />
            </Right>
          </ListItem>
          <ListItem button onPress={navigateResult}>
            <Body>
              <Text style={styles.fullText}>{fullText}</Text>
              <Text note>{new Date().toUTCString()}</Text>
            </Body>
            <Right>
              <Icon name="chevron-forward-outline" />
            </Right>
          </ListItem>
        </List>
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
  fullText: {
    fontWeight: '700',
  },
});

export default HistoryScreen;
