import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
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

  const getReadableLocation = async ({ coords }: Location.LocationData) => {
    const { latitude, longitude } = coords;
    try {
      const readableLocation = await Location.reverseGeocodeAsync({ latitude, longitude });
      return readableLocation[0];
    } catch (err) {
      throw err;
    }
  }

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
    setAllLocations([{ name: 'Dallas', lat: 32.7767, long: 96.7970, timestamp: 1599670918 },
    { name: 'Salt & Straw Venice', lat: 33.9908, long: 118.4660, timestamp: 1599670918 },
    { name: 'Miami', lat: 25.7617, long: 80.1918, timestamp: 1599670918 },
    { name: 'San Francisco', lat: 37.7749, long: -122.4194, timestamp: 1599670918 }
    ]);

    // Get readable postal address from current geocoded location
    (async () => {
      if (errorMsg) {
        setAddress(JSON.stringify(errorMsg));
      } else if (location) {
        try {
          const { city, region, postalCode, country, name } = await getReadableLocation(location);
          setAddress(`${name} ${city} ${region} ${postalCode} ${country}`);
        } catch (err) {
          // console.log("ERROR: ", err);
          setAddress("Unable to retrieve readable location data given current coordinates");
        }
      }
    })();

  }, []);

  return !location ?
    <LoadingView /> :
    (
      <View style={styles.container}>
        <MapView style={styles.mapStyle}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02
          }}
        >
          {allLocations.map(({ name, lat, long }, index) => {
            return (
              <Marker
                coordinate={{ latitude: lat, longitude: long }}
                title={name}
                key={"markerKey" + index}
              >
                <Callout tooltip>
                  <Tooltip location={location} />
                </Callout>
              </Marker>
            );
          })}
        </MapView>
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
});
