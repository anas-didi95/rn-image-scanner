import {useIsFocused, useNavigation} from '@react-navigation/native';
import {
  Body,
  Button,
  Col,
  Container,
  Content,
  Grid,
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
  const constants = useConstants();
  const firebase = useFirebase();
  const [resultList, setResultList] = useState<TFirestoreResult[]>([]);
  const isFocused = useIsFocused();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [lastVisible, setLastVisible] = useState();
  const navigation = useNavigation();

  const onLoadMore = async () => {
    setLoading(true);
    const [resultList2, lastVisible2] = await firebase.getResultList(
      lastVisible,
    );
    setResultList((prev) => [...prev, ...resultList2]);
    setLastVisible(lastVisible2);
    setLoading(false);
  };

  const onPressResult = async (id: string) => {
    navigation.navigate(constants.route.historyStack.result, {id: id});
  };

  useEffect(() => {
    (async () => {
      if (isFocused) {
        await onLoadMore();
      }
    })();

    return () => {
      setResultList([]);
      setLastVisible(undefined);
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
        {!!resultList && resultList.length > 0 && (
          <List>
            {resultList.map((result, i) => (
              <ListItem
                key={`result${result.id ?? i}`}
                button
                onPress={() => onPressResult(result.id ?? '')}>
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
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            {!!lastVisible && (
              <Grid>
                <Col />
                <Button
                  rounded
                  small
                  style={styles.loadMoreButton}
                  onPress={onLoadMore}>
                  <Text>Load More</Text>
                </Button>
                <Col />
              </Grid>
            )}
          </>
        )}
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  fullText: {
    fontWeight: '700',
  },
  loadMoreButton: {
    marginTop: 10,
  },
});

export default HistoryScreen;
