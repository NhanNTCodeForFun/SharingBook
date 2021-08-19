/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import {Picker} from '@react-native-picker/picker';
import React, {useContext, useState} from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import * as Progress from 'react-native-progress';
import {COLORS, FONTS, SIZES} from '../constants';
import {ApiContext} from '../contexts/BookDataContext';
import {UserApiContext} from '../contexts/AuthContext';
import * as bookService from '../services/book-services';
import * as categoryServices from '../services/category-services';
import storage, {firebase} from '@react-native-firebase/storage';

const CreateBook = navigation => {
  const {getBooks} = useContext(ApiContext);
  const {currentUser} = useContext(UserApiContext);
  const [categoryList, setCategoryList] = useState([]);
  const [bookname, setBookname] = useState('');
  const [description, setDescription] = useState('');
  const [page, setPage] = useState('');
  const [category, setCategory] = useState('');
  const [author, setAuthor] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [image1, setImage1] = useState();
  const [image2, setImage2] = useState();
  const [image3, setImage3] = useState();
  const [imageNo, setImageNo] = useState();
  const [filePath, setFilePath] = useState();
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [validBookName, setValidBookName] = useState(-1);
  const [validAuthor, setValidAuthor] = useState(-1);
  const [validCategory, setValidCategory] = useState(-1);
  const [validQuanlity, setValidQuanlity] = useState(-1);

  React.useEffect(() => {
    const fetchCategories = async () => {
      const categoryResponse = await categoryServices.getAllCategoriesAPI();
      setCategoryList(categoryResponse);
    };
    fetchCategories();
  }, []);

  React.useEffect(() => {
    if (filePath) {
      switch (imageNo) {
        case 1:
          setImage1(filePath);
          setFilePath('');
          break;
        case 2:
          setImage2(filePath);
          setFilePath('');
          break;
        case 3:
          setImage3(filePath);
          setFilePath('');
          break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filePath]);

  const cleanData = () => {
    setBookname('');
    setDescription('');
    setAuthor('');
    setCategory(0);
    setPage('');
    setPrice('');
    setQuantity('');
    setImage1(null);
    setImage2(null);
    setImage3();
  };

  const submitBook = async () => {
    const totalImageURL = await uploadImage(image1);
    const frontImageURL = await uploadImage(image2);
    const backImageURL = await uploadImage(image3);
    setUploading(false);
    const bookData = {
      author: author,
      backSideImage: backImageURL,
      bookName: bookname,
      bookPrice: parseInt(price, 10),
      bookQuality: quantity,
      categoryId: category,
      description: description,
      frontSideImage: frontImageURL,
      memberId: currentUser.memberId,
      publisher: 'Nhã Lam',
      totalImage: totalImageURL,
    };
    const result = bookService.postNewBook(bookData);
    if (result) {
      ToastAndroid.show('Tạo thành công!', ToastAndroid.LONG);
      cleanData();
      getBooks;
    } else {
      ToastAndroid.show('Tạo không thành công!', ToastAndroid.LONG);
    }
  };

  const uploadImage = async image => {
    const {uri} = image;
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = uri;
    let resultUrl = '';

    setUploading(true);
    setTransferred(0);

    const task = storage().ref(filename).putFile(uploadUri);

    // set progress state
    task.on('state_changed', snapshot => {
      setTransferred(
        Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000,
      );
    });

    await task.then(async () => {
      console.log('Image uploaded to the bucket!');
      const mDownloadUrl = await storage().ref(filename).getDownloadURL();
      resultUrl = mDownloadUrl;
      console.log('Image Upload URL: ', mDownloadUrl);
    });

    try {
      await task;
      return resultUrl;
    } catch (e) {
      console.error(e);
    }

    setUploading(false);
  };

  const chooseFile = () => {
    const options = {
      maxWidth: 2000,
      maxHeight: 2000,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        return;
      } else if (response.errorCode === 'camera_unavailable') {
        return;
      } else if (response.errorCode === 'permission') {
        alert('Không có quyền truy cập!');
        return;
      } else if (response.errorCode === 'others') {
        alert(response.errorMessage);
        return;
      }
      const source = {uri: response.assets[0].uri};
      setFilePath(source);
    });
  };

  function renderHeader() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          paddingHorizontal: SIZES.padding,
          marginTop: 0,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              alignItems: 'center',
              flex: 1,
            }}>
            <Text style={{...FONTS.h2, color: COLORS.white}}>
              Thêm Sách Vào Kho
            </Text>
          </View>
        </View>
      </View>
    );
  }
  function onChangeBookName() {
    if (bookname.trim().length === 0) {
      setValidBookName(0);
    } else {
      setValidBookName(1);
    }
  }

  function onChangeAuthor() {
    if (author.trim().length === 0) {
      setValidAuthor(0);
    } else {
      setValidAuthor(1);
    }
  }

  function onChangeCategory() {
    if (category === 0) {
      setValidCategory(0);
    } else {
      setValidCategory(1);
    }
  }
  function onChangeQuanlity() {
    if (quantity.trim().length === 0 || quantity.trim().length > 2) {
      setValidQuanlity(0);
    } else {
      setValidQuanlity(1);
    }
  }

  function onSubmit() {
    if (
      validBookName === 1 &&
      validAuthor === 1 &&
      validCategory === 1 &&
      validQuanlity === 1 &&
      image1 &&
      image2 &&
      image3
    ) {
      return true;
    } else {
      return false;
    }
  }

  function renderCreateForm() {
    return (
      <ScrollView>
        <Text style={{margin: 10, fontSize: 15}}>
          (<Text style={{color: COLORS.lightRed}}>*</Text>) Yêu cầu bắt buộc
        </Text>
        <View style={{flex: 1, flexDirection: 'column', padding: SIZES.radius}}>
          {/* Book Name Input Text */}
          {validBookName === 0 ? (
            <Text style={{color: COLORS.lightRed}}>
              Tên sách không được để trống!
            </Text>
          ) : null}
          <View
            style={{
              flexDirection: 'row',
              height: 60,
              backgroundColor: COLORS.lightGray2,
              borderRadius: SIZES.radius,
              paddingHorizontal: SIZES.padding,
            }}>
            <TextInput
              style={{
                ...FONTS.body3,
                color: COLORS.lightGray4,
                flex: 1,
              }}
              value={bookname}
              onChangeText={setBookname}
              onEndEditing={onChangeBookName}
              placeholder="Tên Sách"
              placeholderTextColor={COLORS.lightGray4}
            />
            <Text
              style={{
                color: COLORS.lightRed,
                alignSelf: 'center',
                fontSize: 15,
              }}>
              *
            </Text>
          </View>
          {/* Description Input Text */}
          <View
            style={{
              flexDirection: 'row',
              height: 60,
              backgroundColor: COLORS.lightGray2,
              borderRadius: SIZES.radius,
              paddingHorizontal: SIZES.padding,
              marginTop: 10,
            }}>
            <TextInput
              style={{
                ...FONTS.body3,
                color: COLORS.lightGray4,
                flex: 1,
              }}
              value={description}
              onChangeText={setDescription}
              placeholder="Mô tả"
              placeholderTextColor={COLORS.lightGray4}
            />
          </View>
          {validAuthor === 0 ? (
            <Text style={{color: COLORS.lightRed}}>
              Tên tác giả không được để trống!
            </Text>
          ) : null}
          <View
            style={{
              flexDirection: 'row',
              height: 60,
              backgroundColor: COLORS.lightGray2,
              borderRadius: SIZES.radius,
              paddingHorizontal: SIZES.padding,
              marginTop: 10,
            }}>
            <TextInput
              style={{
                ...FONTS.body3,
                color: COLORS.lightGray4,
                flex: 1,
              }}
              value={author}
              onChangeText={setAuthor}
              onEndEditing={onChangeAuthor}
              placeholder="Tác giả"
              placeholderTextColor={COLORS.lightGray4}
            />
            <Text
              style={{
                color: COLORS.lightRed,
                alignSelf: 'center',
                fontSize: 15,
              }}>
              *
            </Text>
          </View>
          {validCategory === 0 ? (
            <Text style={{color: COLORS.lightRed}}>
              Thể loại không được để trống!
            </Text>
          ) : null}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              height: 60,
              backgroundColor: COLORS.lightGray2,
              borderRadius: SIZES.radius,
              paddingHorizontal: SIZES.padding,
              marginTop: 10,
            }}>
            <Text
              style={{
                ...FONTS.body3,
                color: COLORS.lightGray,
                flex: 1,
                textAlign: 'left',
              }}>
              Thể Loại
            </Text>
            <Picker
              selectedValue={category}
              style={{height: 60, flex: 2}}
              onValueChange={(itemValue, itemIndex) => {
                if (itemValue !== 0) {
                  setCategory(itemValue);
                }
                onChangeCategory();
              }}>
              <Picker.Item
                label="--Chọn thể loại--"
                value={0}
                color={COLORS.lightGray}
              />
              {categoryList.map((c, index) => (
                <Picker.Item
                  key={index + 1}
                  label={c.categoryName}
                  value={c.categoryId}
                />
              ))}
            </Picker>
            <Text
              style={{
                color: COLORS.lightRed,
                alignSelf: 'center',
                fontSize: 15,
              }}>
              *
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              height: 60,
              backgroundColor: COLORS.lightGray2,
              borderRadius: SIZES.radius,
              paddingHorizontal: SIZES.padding,
              marginTop: 10,
            }}>
            <TextInput
              style={{
                ...FONTS.body3,
                color: COLORS.lightGray4,
                flex: 1,
              }}
              value={page}
              onChangeText={setPage}
              keyboardType="numeric"
              placeholder="Số Trang"
              placeholderTextColor={COLORS.lightGray4}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              height: 60,
              backgroundColor: COLORS.lightGray2,
              borderRadius: SIZES.radius,

              paddingHorizontal: SIZES.padding,
              marginTop: 10,
            }}>
            <TextInput
              style={{
                ...FONTS.body3,
                color: COLORS.lightGray4,
                flex: 1,
              }}
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
              placeholder="Giá bìa"
              placeholderTextColor={COLORS.lightGray4}
            />
          </View>
          {validQuanlity === 0 ? (
            <Text style={{color: COLORS.lightRed}}>
              Độ mới phải nằm trong khoảng 0-100
            </Text>
          ) : null}
          <View
            style={{
              flexDirection: 'row',
              height: 60,
              backgroundColor: COLORS.lightGray2,
              borderRadius: SIZES.radius,

              paddingHorizontal: SIZES.padding,
              marginTop: 10,
            }}>
            <TextInput
              style={{
                ...FONTS.body3,
                color: COLORS.lightGray4,
                flex: 1,
              }}
              value={quantity}
              onChangeText={setQuantity}
              onEndEditing={onChangeQuanlity}
              keyboardType="numeric"
              placeholder="Độ mới 01-99%"
              placeholderTextColor={COLORS.lightGray4}
            />
            <Text
              style={{
                color: COLORS.lightRed,
                alignSelf: 'center',
                fontSize: 15,
              }}>
              *
            </Text>
          </View>

          {/* image */}
          <View style={styles.container}>
            <Text>
              Ảnh tổng quát{' '}
              <Text style={{color: COLORS.lightRed, fontSize: 15}}> *</Text>
            </Text>
            {image1 ? (
              <Image source={{uri: image1.uri}} style={styles.imageStyle} />
            ) : null}
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.buttonStyle}
              onPress={() => {
                chooseFile();
                setImageNo(1);
              }}>
              <Text style={styles.textStyle}>Chọn ảnh</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            <Text>
              Ảnh mặt trước{' '}
              <Text style={{color: COLORS.lightRed, fontSize: 15}}> *</Text>
            </Text>
            {image2 ? (
              <Image source={{uri: image2.uri}} style={styles.imageStyle} />
            ) : null}

            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.buttonStyle}
              onPress={() => {
                chooseFile();
                setImageNo(2);
              }}>
              <Text style={styles.textStyle}>Chọn ảnh</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            <Text>
              Ảnh mặt sau{' '}
              <Text style={{color: COLORS.lightRed, fontSize: 15}}> *</Text>
            </Text>
            {image3 ? (
              <Image source={{uri: image3.uri}} style={styles.imageStyle} />
            ) : null}
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.buttonStyle}
              onPress={() => {
                chooseFile();
                setImageNo(3);
              }}>
              <Text style={styles.textStyle}>Chọn ảnh</Text>
            </TouchableOpacity>
          </View>

          {uploading ? (
            <View style={styles.progressBarContainer}>
              <Progress.Bar progress={transferred} width={null} />
            </View>
          ) : null}

          {/* Create Button */}
          <View
            style={{
              flexDirection: 'row',
              height: 60,
              backgroundColor: COLORS.brown,
              borderRadius: SIZES.radius,
              paddingHorizontal: SIZES.padding,
              marginTop: SIZES.radius,
            }}>
            <TouchableOpacity
              style={{flex: 1}}
              onPress={() => {
                let result = onSubmit();
                if (result) {
                  submitBook();
                } else {
                  Alert.alert(
                    'Thông báo',
                    'Xin vui lòng nhập đủ thông tin và hình ảnh theo yêu cầu!',
                    [
                      {
                        text: 'OK',
                        style: 'cancel',
                      },
                    ],
                    {
                      cancelable: true,
                    },
                  );
                }
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: COLORS.white, ...FONTS.body2}}>
                  Thêm Sách
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f8f9fb'}}>
      {/* Header */}
      <View style={{height: 50, backgroundColor: COLORS.lightBrown}}>
        {renderHeader()}
      </View>
      {/* Login Form */}
      <View style={{flex: 3}}>{renderCreateForm()}</View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 10,
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    textAlign: 'center',
    color: 'black',
  },
  buttonStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 40,
    backgroundColor: COLORS.lightBrown,
    padding: 10,
  },
  imageStyle: {
    resizeMode: 'cover',
    width: 300,
    height: 300,
    margin: 5,
  },
  progressBarContainer: {
    flex: 1,
    paddingTop: SIZES.radius,
  },
});

export default CreateBook;
