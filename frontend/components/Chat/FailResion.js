/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {COLORS, FONTS, SIZES} from '../../constants';
import {UserApiContext} from '../../contexts/AuthContext';
import {addNewFailReason} from '../../services/fail-reason-services';
import {markReminderIsDone} from '../../services/reminder-services';

const FailReason = props => {
  const {currentUser} = useContext(UserApiContext);
  const [reminder, setReminder] = useState(null);
  const [other, setOther] = useState(false);
  const [otherReason, setOtherReason] = useState('');
  const [reason1, setReason1] = useState(false);
  const [reason2, setReason2] = useState(false);

  useEffect(() => {
    if (props.reminder) {
      setReminder(props.reminder);
    }
  }, [props]);

  const getReason = () => {
    if (reason1) {
      return 'Đối phương trễ hẹn';
    }
    if (reason2) {
      return 'Không trao đổi nữa';
    }
    return otherReason;
  };

  const handleSubmitReason = async () => {
    const newFailReasonDTO = {
      fromMemberId: currentUser.memberId,
      reason: getReason(),
      reminderId: reminder.reminder.reminderId,
      toMemberId:
        currentUser.memberId === reminder.reminder.firstMember.memberId
          ? reminder.reminder.secondMember.memberId
          : reminder.reminder.firstMember.memberId,
    };
    const result = await addNewFailReason(newFailReasonDTO);
    if (result) {
      const reminderId = reminder.reminder.reminderId;
      const markAsDone = await markReminderIsDone(reminderId);
      if (markAsDone) {
        props.goBack();
      }
    } else {
      ToastAndroid.show(
        'Gửi lý do thất bại không thành công!',
        ToastAndroid.LONG,
      );
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
            ...FONTS.h3,
            color: COLORS.lightGray,
          }}>
          Lý do giao dịch thất bại là gì?
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          marginHorizontal: SIZES.padding,
          paddingVertical: SIZES.base,
          borderBottomWidth: 1,
          borderBottomColor: COLORS.lightGray3,
        }}>
        <CheckBox
          title="Đối phương trễ hẹn"
          checked={reason1}
          onPress={() => setReason1(!reason1)}
        />
        <CheckBox
          title="Không trao đổi nữa"
          checked={reason2}
          onPress={() => setReason2(!reason2)}
        />
        <CheckBox
          title="Khác"
          checked={other}
          onPress={() => setOther(!other)}
        />
        {other ? (
          <View
            style={{
              height: 80,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'flex-start',
              marginHorizontal: 10,
              backgroundColor: COLORS.lightGray2,
              borderRadius: 5,
            }}>
            <TextInput
              style={{
                ...FONTS.body3,
                color: COLORS.black,
                flex: 1,
                alignItems: 'center',
              }}
              placeholder="Nhập lý do khác"
              multiline={true}
              value={otherReason}
              onChangeText={setOtherReason}
            />
          </View>
        ) : null}
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          marginHorizontal: SIZES.radius + 10,
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
          onPress={handleSubmitReason}>
          <Text
            style={{
              ...FONTS.h4,
              color: COLORS.white,
              margin: SIZES.radius,
            }}>
            Gửi
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FailReason;
