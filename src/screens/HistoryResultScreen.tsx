import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
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
import React, {useEffect} from 'react';
import useConstants from '../utils/hooks/useConstants';
import useFirebase from '../utils/hooks/useFirebase';

type ParamList = {
  HistoryResultScreen: {id: string};
};
type HistoryResultScreenRouteProp = RouteProp<ParamList, 'HistoryResultScreen'>;

const HistoryResultScreen = () => {
  const navigation = useNavigation();
  const constants = useConstants();
  const isFocused = useIsFocused();
  const route = useRoute<HistoryResultScreenRouteProp>();
  const firebase = useFirebase();

  const goBack = () => navigation.goBack();

  useEffect(() => {
    if (isFocused) {
      (async () => {
        const {id} = route.params;
        const doc = await firebase.getResultById(id);
        console.log('[HistoryResultScreen] doc', doc);
      })();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

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
