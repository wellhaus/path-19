import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, TextInput, Platform } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Layout from '../constants/Layout';
import Tooltip, { TooltipProps } from '../components/Tooltip';
import LoadingView from '../components/LoadingView';

interface LocationSchema {
  name: string,
  lat: number,
  long: number,
  timestamp: number,
}

export default function TabOneScreen() {
  const [location, setLocation] = useState<Location.LocationData | null>(null);
  const [address, setAddress] = useState<string>('Waiting...');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [allLocations, setAllLocations] = useState<LocationSchema[]>([]);

  useEffect(() => {
    // Get permission to access and display user's current location
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }
      setLocation(await Location.getCurrentPositionAsync({}));
    })();

    // Populate locations array with all data form server
    // TODO: lazy load locations
    setAllLocations([{ name: 'Dallas', lat: 32.7767, long: -96.7970, timestamp: 1599670918 },
    { name: 'Salt & Straw Venice', lat: 33.9908, long: -118.4660, timestamp: 1599670918 },
    { name: 'Miami', lat: 25.7617, long: -80.1918, timestamp: 1599670918 },
    { name: 'San Francisco', lat: 37.7749, long: -122.4194, timestamp: 1599670918 }
    ]);
  }, []);

  return !location ?
    <LoadingView /> :
    errorMsg ?
      <LoadingView message={errorMsg} /> :
      (
        <View style={styles.container}>
          <MapView style={styles.mapStyle}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05
            }}
          >
            {allLocations.map(({ name, lat, long }, index) => (
              <Marker
                coordinate={{ latitude: lat, longitude: long }}
                key={"markerKey" + index}
                image={require('../assets/images/redAuraMarker.png')}
              >
                <Callout tooltip>
                  <Tooltip location={location} placeName={name} />
                </Callout>
              </Marker>
            ))}
          </MapView>
          <View style={styles.searchBox}>
            <TextInput
              placeholder="Search places"
              placeholderTextColor="#000"
              autoCapitalize="none"
              onSubmitEditing={() => console.log('hihihihi submitted')}
              // onChangeText={(newInput) => console.log(newInput)}
              style={{ flex: 1, padding: 0 }}
            />
            <Ionicons name="ios-search" size={20} />
          </View>
          <Text style={styles.title}>{address}</Text>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          <EditScreenInfo path="/screens/TabOneScreen.tsx" />
        </View>
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchBox: {
    position: 'absolute',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    top: 0,
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 250,
  }
});
