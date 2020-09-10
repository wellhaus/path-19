import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import Layout from '../constants/Layout';
import Tooltip from '../components/Tooltip';

interface NativeCoords {
  latitude: Number,
  longitude: Number,
  altitude: Number,
  accuracy: Number,
  heading: Number,
  speed: Number,
}
interface LocationSchema {
  name: string,
  lat: number,
  long: number,
  timestamp: number,
}

export default function TabOneScreen() {
  const [location, setLocation] = useState({
    coords: {
      latitude: 0,
      longitude: 0,
      altitude: 0,
      accuracy: 0,
      heading: 0,
      speed: 0,
    },
    timestamp: 0,
  });
  const [address, setAddress] = useState<string>('Waiting...');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [allLocations, setAllLocations] = useState<LocationSchema[]>([]);

  const markerList: any = [];
  // const getAllMarkers = () => {
  //   /* SOME ASYNC FETCH REQUEST */
  //   // Extract all data from given location objects
  //   locations.forEach(({ name, lat, long }, index) => {
  //     // Pass location data into Marker components in a markers array
  //     markerList.push(
  //       <Marker
  //         coordinate={{ latitude: lat, longitude: long }}
  //         title={name}
  //         key={"markerKey" + index}
  //       >
  //         <Callout tooltip>
  //           <Tooltip location={location} styles={styles} />
  //         </Callout>
  //       </Marker>
  //     );

  //     setMarkers(markerList);
  //     console.log("MARKERS: ", markers);
  //   });
  // }

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
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();

    // Populate markerList with Marker components to render in MapView
    // getAllMarkers();
    setAllLocations([{ name: 'In the ocean', lat: 37.3246316, long: -122.02508477, timestamp: 1599670918 },
    { name: 'Los Angeles', lat: 34.0522, long: 118.2437, timestamp: 1599670918 },
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

  return (
    <View style={styles.container}>
      <MapView style={styles.mapStyle}>
        {/* <Marker
          coordinate={{ latitude: 37.7749, longitude: -122.4194 }}
          title={'San Francisco'}
          key={"markerKey0"}
        >
          <Callout tooltip>
            <Tooltip location={location} styles={styles} />
          </Callout>
        </Marker> */}
        {allLocations.map(({ name, lat, long }, index) => {
          return (
            <Marker
              coordinate={{ latitude: lat, longitude: long }}
              title={name}
              key={"markerKey" + index}
            >
              <Callout tooltip>
                <Tooltip location={location} styles={styles} />
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
