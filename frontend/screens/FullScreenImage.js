/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, SafeAreaView, TouchableOpacity, View} from 'react-native';
import OnBoarding from '../components/OnBoarding';
import {COLORS, icons, SIZES} from '../constants';

const FullScreenImage = ({route, navigation}) => {
  const [currentBook, setBook] = React.useState(null);

  React.useEffect(() => {
    let {book} = route.params;
    setBook(book);
  }, [route.params]);

  function renderImageList() {
    return (
      <View
        style={{
          backgroundColor: COLORS.lightGray2,
          flex: 1,
        }}>
        {currentBook ? (
          <OnBoarding book={currentBook} screen="FullScreenImage" />
        ) : null}
        {/* Close Button */}
        <View
          style={{
            margin: 5,
            position: 'absolute',
            top: 5,
            right: SIZES.padding,
            width: 25,
            height: 25,
            color: 'tomato',
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={icons.close_icon}
              resizeMode="contain"
              style={{width: 40, height: 40, tintColor: COLORS.lightGray4}}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      {renderImageList()}
    </SafeAreaView>
  );
};

export default FullScreenImage;
