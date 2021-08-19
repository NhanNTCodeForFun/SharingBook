/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, StyleSheet, View, useWindowDimensions} from 'react-native';

const OnBoardingItem = ({item}) => {
  const {width} = useWindowDimensions();
  return (
    <View style={[styles.container, {width}]}>
      <Image
        source={{uri: item}}
        style={[styles.image, {width, resizeMode: 'contain'}]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default OnBoardingItem;
