/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect, useState} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {COLORS, FONTS, icons, SIZES} from '../../constants';
import {UserApiContext} from '../../contexts/AuthContext';
import {addNewFeedback} from '../../services/feedback-services';
import {markReminderIsDone} from '../../services/reminder-services';

const TransferStatus = props => {
  const {currentUser} = useContext(UserApiContext);
  const [star, setStar] = useState();
  const [comment, setComment] = useState('');
  const [reminder, setReminder] = useState(null);
  const number = [1, 2, 3, 4, 5];

  useEffect(() => {
    if (props.reminder) {
      setReminder(props.reminder);
    }
  }, [props]);

  // NewFeedbackDTO(Long fromUserId, Long toUserId, Integer star, String comment)
  const handleSubmitFeedback = async () => {
    const newFeedbackDTO = {
      fromUserId: currentUser.memberId,
      toUserId:
        currentUser.memberId === reminder.reminder.firstMember.memberId
          ? reminder.reminder.secondMember.memberId
          : reminder.reminder.firstMember.memberId,
      star,
      comment,
    };
    const result = await addNewFeedback(newFeedbackDTO);
    if (result) {
      const reminderId = reminder.reminder.reminderId;
      const markAsDone = await markReminderIsDone(reminderId);
      if (markAsDone) {
        props.goBack();
      }
    } else {
      console.log('Feedback Fail');
    }
  };

  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
        flexDirection: 'column',
        justifyContent: 'center',
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
          Feedback
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
        {number.map(num => (
          <TouchableOpacity
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
            key={num}
            onPress={() => setStar(num)}>
            <Image
              source={
                num <= star ? icons.star_filled_icon : icons.star_outline_icon
              }
              style={{height: 20, width: 20}}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
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
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-start',
            backgroundColor: COLORS.lightGray2,
            borderRadius: 5,
          }}>
          <TextInput
            style={{
              ...FONTS.body3,
              color: COLORS.black,
              flex: 1,
            }}
            value={comment}
            onChangeText={setComment}
            placeholder="Nhập đánh giá của bạn!"
            placeholderTextColor={COLORS.lightGray4}
            multiline={true}
          />
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
          onPress={handleSubmitFeedback}>
          <Text
            style={{
              ...FONTS.h4,
              color: COLORS.white,
              margin: SIZES.radius,
            }}>
            Gửi Feedback
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TransferStatus;
