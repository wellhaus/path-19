import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from './Themed';
import * as Location from 'expo-location';

export interface TooltipProps {
  location: Location.LocationData,
};

export default function Tooltip({ location }: TooltipProps) {
  const { timestamp } = location;

  return (
    <View>
      <View style={styles.calloutText}>
        <Text>{"Confirmed Patient"}</Text>
        <Text>{"Last visited: " + new Date(timestamp)}</Text>
        <Text>{"TODO: Add more specific building name"}</Text>
      </View>
      <View style={styles.arrow} />
      <View style={styles.arrowBorder} />
    </View >
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calloutText: {
    flexDirection: 'column',
    borderRadius: 6,
  },
  // Arrow below the bubble
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 16,
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