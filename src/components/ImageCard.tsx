import {Card, CardItem} from 'native-base';
import React from 'react';
import {Image, StyleSheet} from 'react-native';

const ImageCard: React.FC<{uri: string}> = ({uri}) => (
  <Card>
    <CardItem cardBody>
      <Image
        resizeMode="stretch"
        source={{
          uri: uri,
        }}
        style={styles.image}
      />
    </CardItem>
  </Card>
);
export default ImageCard;

const styles = StyleSheet.create({
  image: {
    height: 300,
    flex: 1,
  },
});
