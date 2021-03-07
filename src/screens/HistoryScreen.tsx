import {useIsFocused, useNavigation} from '@react-navigation/native';
import {
  Body,
  Container,
  Content,
  Header,
  Icon,
  List,
  ListItem,
  Right,
  Spinner,
  Text,
  Title,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import useConstants from '../utils/hooks/useConstants';
import useFirebase from '../utils/hooks/useFirebase';
import {TFirestoreResult} from '../utils/types';

const HistoryScreen = () => {
  const navigation = useNavigation();
  const constants = useConstants();
  const firebase = useFirebase();
  const [resultList, setResultList] = useState<TFirestoreResult[]>([]);
  const isFocused = useIsFocused();
  const [isLoading, setLoading] = useState<boolean>(false);

  const navigateResult = () =>
    navigation.navigate(constants.route.historyStack.result);

  useEffect(() => {
    (async () => {
      if (isFocused) {
        setLoading(true);
        const resultList2 = await firebase.getResultList();
        setResultList(resultList2);
        setLoading(false);
      }
    })();

    return () => {
      setResultList([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  return (
    <Container>
      <Header noLeft>
        <Body>
          <Title>{constants.header.history}</Title>
        </Body>
      </Header>
      <Content padder>
        {isLoading && <Spinner />}
        {!!resultList && resultList.length > 0 && (
          <List>
            {resultList.map((result, i) => (
              <ListItem
                key={`result${result.id ?? i}`}
                button
                onPress={navigateResult}>
                <Body>
                  <Text style={styles.fullText}>{result.fullText}</Text>
                  <Text note>{result.createDate.toUTCString()}</Text>
                </Body>
                <Right>
                  <Icon name="chevron-forward-outline" />
                </Right>
              </ListItem>
            ))}
          </List>
        )}
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  fullText: {
    fontWeight: '700',
  },
});

export default HistoryScreen;
