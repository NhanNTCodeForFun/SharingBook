import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import OnBoardingItem from './OnBoardItem';

const OnBoarding = props => {
  const bookImageList = [
    {
      source: props.book.frontSideImage,
      id: 1,
    },
    {
      source: props.book.backSideImage,
      id: 2,
    },
    {
      source: props.book.totalImage,
      id: 3,
    },
  ];

  const onViewRef = React.useRef(viewableItems => {
    if (props.screen === 'BookDetail') {
      props.changeImage(viewableItems.changed[0].index);
    }
  });

  const viewConfigRef = React.useRef({viewAreaCoveragePercentThreshold: 50});

  return (
    <View style={styles.container}>
      <FlatList
        data={bookImageList}
        renderItem={({item}) => <OnBoardingItem item={item.source} />}
        horizontal
        showsVerticalScrollIndicator
        pagingEnabled
        bounces={false}
        keyExtractor={item => item.id}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
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
});

export default OnBoarding;
