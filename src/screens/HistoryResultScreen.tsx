import {useNavigation} from '@react-navigation/native';
import {
  Body,
  Button,
  Container,
  Content,
  Footer,
  FooterTab,
  Header,
  Icon,
  Left,
  Right,
  Text,
  Title,
} from 'native-base';
import React from 'react';
import useConstants from '../utils/hooks/useConstants';

const HistoryResultScreen = () => {
  const navigation = useNavigation();
  const constants = useConstants();

  const goBack = () => navigation.goBack();

  return (
    <Container>
      <Header>
        <Left>
          <Button transparent onPress={goBack}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>{constants.header.historyResult}</Title>
        </Body>
        <Right />
      </Header>
      <Content padder>
        <Text>This is Content Section</Text>
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

export default HistoryResultScreen;
