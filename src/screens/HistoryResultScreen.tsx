import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {
  Body,
  Button,
  Card,
  CardItem,
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
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet} from 'react-native';
import useConstants from '../utils/hooks/useConstants';
import useFirebase from '../utils/hooks/useFirebase';
import {TFirestoreResult} from '../utils/types';

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
  const [result, setResult] = useState<TFirestoreResult>({
    imageUri: '',
    createDate: new Date(),
    fullText: '',
    texts: [],
    id: '',
  });

  const goBack = () => navigation.goBack();

  useEffect(() => {
    if (isFocused) {
      (async () => {
        const {id} = route.params;
        const doc = await firebase.getResultById(id);
        setResult(doc);
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
        {!!result.imageUri && (
          <Card>
            <CardItem cardBody>
              <Image
                resizeMode="stretch"
                source={{
                  uri: result.imageUri,
                }}
                style={styles.image}
              />
            </CardItem>
          </Card>
        )}
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
  resultValue: {
    fontWeight: '700',
  },
});

export default HistoryResultScreen;
