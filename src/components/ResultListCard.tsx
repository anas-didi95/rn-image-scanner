import {Body, Card, CardItem, Icon, Right, Text} from 'native-base';
import React from 'react';
import {Alert, Linking, StyleSheet} from 'react-native';
import {TResult} from '../utils/types';

const ResultListCard: React.FC<{resultList: TResult[]}> = ({resultList}) => {
  const onPress = async (result: TResult) => {
    try {
      let url = '';
      let supported = false;
      let message = '';

      if (result.type === 'Phone') {
        url = `tel:${result.value}`;
        message = 'Continue to open phone app?';
      } else if (result.type === 'Email') {
        url = `mailto:${result.value}`;
        message = 'Continue to open email app?';
      } else if (result.type === 'Web Link') {
        url = result.value;
        message = 'Continue to open web browser?';
      }

      supported = await Linking.canOpenURL(url);
      if (supported) {
        Alert.alert('Confirm Action', message, [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => Linking.openURL(url),
            style: 'default',
          },
        ]);
      } else {
        console.error('[ResultList] onPress failed! URL not supported! ', url);
      }
    } catch (e) {
      console.log('[ResultList] onPress failed!', e);
    }
  };

  return (
    <Card>
      {resultList.map((result, idx) => (
        <CardItem key={`idx${idx}`} button onPress={() => onPress(result)}>
          <Body>
            <Text style={styles.resultValue}>{result.value}</Text>
            <Text note>{result.type}</Text>
          </Body>
          <Right>
            <Icon name="chevron-forward-outline" />
          </Right>
        </CardItem>
      ))}
    </Card>
  );
};

const styles = StyleSheet.create({
  resultValue: {
    fontWeight: 'bold',
  },
});

export default ResultListCard;
