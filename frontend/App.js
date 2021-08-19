import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import AuthContext from './contexts/AuthContext';
import BookDataContext from './contexts/BookDataContext';
import Tabs from './navigation/tabs';
import {
  AnimatedMarkers,
  Appointment,
  BookDetail,
  BookOwnerFeedback,
  ChangePassword,
  ChatRoom,
  CreateAppointment,
  CreateBook,
  ExchangeDetail,
  FullScreenImage,
  Information,
  Login,
  Messages,
  Mybook,
  MyBookDetail,
  MyBookTab,
  MyRequest,
  Notification,
  PostedBook,
  ProcessingTransference,
  ProcessStatusConfirm,
  Profile,
  Register,
  Request,
  UpdateInformation,
} from './screens';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    border: 'transparent',
  },
};

const Stack = createStackNavigator();

const App = () => {
  return (
    <AuthContext>
      <BookDataContext>
        <NavigationContainer theme={theme}>
          <Stack.Navigator
            screenOptions={{headerShown: false}}
            initialRouteName={'Login'}>
            {/* Tabs */}
            <Stack.Screen name="Home" component={Tabs} />
            {/* Screens */}
            <Stack.Screen
              name="BookDetail"
              component={BookDetail}
              options={{headerShown: false}}
            />
            {/* Login */}
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
            {/* Profile */}
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{headerShown: false}}
            />
            {/* Request */}
            <Stack.Screen
              name="Request"
              component={Request}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ExchangeDetail"
              component={ExchangeDetail}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="MyBook"
              component={Mybook}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="MyBookDetail"
              component={MyBookDetail}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="PostedBook"
              component={PostedBook}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="CreateBook"
              component={CreateBook}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="Notification"
              component={Notification}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="Information"
              component={Information}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="FullScreenImage"
              component={FullScreenImage}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="MyBookTab"
              component={MyBookTab}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="MyRequest"
              component={MyRequest}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Appointment"
              component={Appointment}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="AnimatedMarker"
              component={AnimatedMarkers}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="CreateAppointment"
              component={CreateAppointment}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Messages"
              component={Messages}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ChatRoom"
              component={ChatRoom}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ProcessingTransference"
              component={ProcessingTransference}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="BookOwnerFeedback"
              component={BookOwnerFeedback}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ChangePassword"
              component={ChangePassword}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="UpdateInformation"
              component={UpdateInformation}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ProcessStatusConfirm"
              component={ProcessStatusConfirm}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </BookDataContext>
    </AuthContext>
  );
};

export default App;
