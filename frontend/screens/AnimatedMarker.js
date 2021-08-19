/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import MapView, {
  Marker,
  AnimatedRegion,
  Polyline,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import haversine from 'haversine';
import Geolocation from '@react-native-community/geolocation';
navigator.geolocation = require('@react-native-community/geolocation');
import MapViewDirections from 'react-native-maps-directions';

// const LATITUDE = 29.95539;
// const LONGITUDE = 78.07513;
const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;
const LATITUDE = 11.96511894;
const LONGITUDE = 107.2234639;

const origin = {latitude: 11.9832, longitude: 107.257};
const destination = {latitude: 11.96511894, longitude: 107.2234639};
const GOOGLE_MAPS_APIKEY = 'AIzaSyB5GtsjuPhTbD2UXzYDR5GoQLL0K4VYXmI';

class AnimatedMarkers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      routeCoordinates: [],
      distanceTravelled: 0,
      prevLatLng: {},
      coordinate: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: 0,
        longitudeDelta: 0,
      }),
    };
  }

  async componentDidMount() {
    //     // async function requestLocationPermission()
    //     // {
    //     //   try {
    //     //     const granted = await PermissionsAndroid.request(
    //     //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    //     //       {
    //     //         'title': 'Example App',
    //     //         'message': 'Example App access to your location '
    //     //       }
    //     //     )
    //     //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //     //       console.log("You can use the location")
    //     //       alert("You can use the location");
    //     //     } else {
    //     //       console.log("location permission denied")
    //     //       alert("Location permission denied");
    //     //     }
    //     //   } catch (err) {
    //     //     console.warn(err)
    //     //   }
    //     // };
    //     // await requestLocationPermission();
    const {coordinate} = this.state;

    //this.watchID = navigator.geolocation.watchPosition(
    this.watchID = navigator.geolocation.watchPosition(
      position => {
        console.log(position);
        const {routeCoordinates, distanceTravelled} = this.state;
        const {latitude, longitude} = position.coords;

        const newCoordinate = {
          latitude,
          longitude,
        };

        if (Platform.OS === 'android') {
          if (this.marker) {
            this.marker._component.animateMarkerToCoordinate(
              newCoordinate,
              500,
            );
          }
        } else {
          coordinate.timing(newCoordinate).start();
        }

        this.setState({
          latitude,
          longitude,
          routeCoordinates: routeCoordinates.concat([newCoordinate]),
          distanceTravelled:
            distanceTravelled + this.calcDistance(newCoordinate),
          prevLatLng: newCoordinate,
        });
      },
      error => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 10,
      },
    );
  }

  //    componentWillUnmount() {
  //      navigator.geolocation.clearWatch(this.watchID);
  //    }

  getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  calcDistance = newLatLng => {
    const {prevLatLng} = this.state;
    return haversine(prevLatLng, newLatLng) || 0;
  };

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          showUserLocation={true}
          followUserLocation
          loadingEnabled
          region={this.getMapRegion()}>
          {/* <Polyline coordinates={this.state.routeCoordinates} strokeWidth={5} /> */}
          <Marker.Animated
            ref={marker => {
              this.marker = marker;
            }}
            coordinate={this.state.coordinate}
          />
          <Marker.Animated
            ref={marker => {
              this.marker = marker;
            }}
            coordinate={origin}
            //image={require('../assets/icons/map_marker_icon.png')}
          />
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_MAPS_APIKEY}
          />
        </MapView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.bubble, styles.button]}>
            <Text style={styles.bottomBarContent}>
              {parseFloat(this.state.distanceTravelled).toFixed(2)} km
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});

export default AnimatedMarkers;
