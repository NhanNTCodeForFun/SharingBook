/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constants';
import {UserApiContext} from '../../contexts/AuthContext';
import {getTransferenceById} from '../../services/request-services';
import {
  markProcessFailed,
  markProcessSuccessfully,
} from '../../services/transferent-process-services';

const TransferStatus = props => {
  const {currentUser} = useContext(UserApiContext);
  const [transference, setTransference] = useState();
  const [myBook, setMyBook] = useState('');
  const [otherBook, setOtherBook] = useState('');
  const [otherUser, setOtherUser] = useState('');
  const {transferenceId} = props;

  const setInformation = useCallback(() => {
    if (transference) {
      const currentUserId = currentUser.memberId;
      const fromBookMemberId = transference.fromBook.member.memberId;
      const fromBookMemberName = transference.fromBook.member.name;
      const toBookMemberId = transference.toBook.member.memberId;
      const toBookMemberName = transference.toBook.member.name;
      const fromBookName = transference.fromBook.name;
      const toBookName = transference.toBook.name;
      if (currentUserId === fromBookMemberId) {
        setMyBook(fromBookName);
        setOtherBook(toBookName);
        setOtherUser(toBookMemberName);
      } else if (currentUserId === toBookMemberId) {
        setMyBook(toBookName);
        setOtherBook(fromBookName);
        setOtherUser(fromBookMemberName);
      }
    }
  }, [currentUser.memberId, transference]);

  useEffect(() => {
    if (transference) {
      setInformation();
    }
  }, [setInformation, transference]);

  useEffect(() => {
    const fetchTransference = async () => {
      const response = await getTransferenceById(transferenceId);
      if (response) {
        setTransference(response);
      }
    };
    fetchTransference();
  }, [transferenceId]);

  async function handleSuccess() {
    const result = await markProcessSuccessfully(transferenceId);
    if (result) {
      props.setRatingFunction();
      props.unsetProcessFunction();
    }
  }

  async function handleFail() {
    const result = await markProcessFailed(transferenceId);
    if (result) {
      props.unsetProcess();
    }
  }

  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        marginHorizontal: SIZES.padding,
        borderRadius: SIZES.radius,
        flexDirection: 'column',
        justifyContent: 'center',
        marginBottom: SIZES.padding,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: SIZES.radius,
          paddingBottom: SIZES.base,
          marginHorizontal: SIZES.padding,
          borderBottomWidth: 1,
          borderBottomColor: COLORS.lightGray3,
        }}>
        <Text
          style={{
            ...FONTS.h4,
            color: COLORS.lightGray,
          }}>
          Trạng thái trao đổi
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          marginHorizontal: SIZES.padding,
          paddingVertical: SIZES.base,
          borderBottomWidth: 1,
          borderBottomColor: COLORS.lightGray3,
        }}>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}>
          <Text
            style={{
              ...FONTS.h4,
              color: COLORS.lightGray,
            }}>
            Bạn đã trao đổi cuốn sách '{myBook}' với cuốn '{otherBook}' với{' '}
            {otherUser}
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          marginHorizontal: SIZES.radius,
          marginTop: SIZES.base,
          marginBottom: SIZES.radius,
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.lightBrown,
            borderRadius: 10,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: SIZES.base,
          }}
          onPress={handleSuccess}>
          <Text
            style={{
              ...FONTS.h4,
              color: COLORS.white,
              margin: SIZES.radius,
            }}>
            Thành Công
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.lightBrown,
            borderRadius: 10,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: SIZES.base,
          }}
          onPress={handleFail}>
          <Text
            style={{
              ...FONTS.h4,
              color: COLORS.white,
              margin: SIZES.radius,
            }}>
            Thất bại
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TransferStatus;
