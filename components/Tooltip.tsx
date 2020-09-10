import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from './Themed';
import * as Location from 'expo-location';

export interface TooltipProps {
  location: Location.LocationData,
  placeName: string,
};

export default function Tooltip({ location, placeName }: TooltipProps) {
  const [errorMsg, setErrorMsg] = useState(null);
  const [address, setAddress] = useState<Location.Address | null>(null);

  const getReadableLocation = async ({ coords }: Location.LocationData): Location.Address => {
    const { latitude, longitude } = coords;
    try {
      const readableLocation = await Location.reverseGeocodeAsync({ latitude, longitude });
      return readableLocation[0];
    } catch (err) {
      throw err;
    }
  }

  useEffect(() => {
    (async () => {
      // Get readable postal address from current geocoded location
      try {
        setAddress(await getReadableLocation(location));
        // console.log(`${name} ${city} ${region} ${postalCode} ${country}`);
      } catch (err) {
        setErrorMsg(err);
      }
    })();
  }, []);

  return !address ?
    (
      <View style={styles.bubble}>
        <Text>{"..."}</Text>
      </View>
    ) :
    errorMsg ?
      (
        <View>
          <View style={styles.bubble}>
            <Text>{errorMsg}</Text>
          </View>
        </View>
      ) :
      (
        <View >
          <View style={styles.bubble}>
            <Text>{"Confirmed Patient"}</Text>
            <Text>{"Last visited: " + new Date(location.timestamp)}</Text>
            <Text>{placeName}</Text>
          </View>
          <View style={styles.arrowBorder} />
          <View style={styles.arrow} />
        </View >
      );

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Callout bubble
  bubble: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 0.5,
    padding: 15,
    width: 200,
  },
  // Arrow below the bubble
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 5,
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5,
    // marginBottom: -15
  },
});