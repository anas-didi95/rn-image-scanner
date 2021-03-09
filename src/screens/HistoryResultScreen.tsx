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
  Header,
  Icon,
  Left,
  Right,
  Spinner,
  Title,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import ImageCard from '../components/ImageCard';
import ResultListCard from '../components/ResultListCard';
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
  const firebase = useFirebase();
  const route = useRoute<HistoryResultScreenRouteProp>();
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
        {result.imageUri ? (
          <>
            <ImageCard uri={result.imageUri} />
            <ResultListCard resultList={result.texts} />
          </>
        ) : (
          <Spinner />
        )}
      </Content>
    </Container>
  );
};

export default HistoryResultScreen;
