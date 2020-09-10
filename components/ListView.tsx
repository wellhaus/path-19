import React, { useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Text, View } from './Themed';
import { LocationSchema } from '../constants/Types';
import EditScreenInfo from './EditScreenInfo';
import * as Location from 'expo-location';
import ListItemView from './ListItemView';
import { getDistance, orderByDistance } from 'geolib';
import { GeolibInputCoordinates } from 'geolib/es/types';

import { PLACE_NAME_HEADER, PROXIMITY_HEADER, LAST_VISITED_HEADER } from '../constants/Strings';

export interface ListViewProps {
  placesToList: LocationSchema[];
  currentLocation: Location.LocationData;
};

export default function ListView({ placesToList, currentLocation }: ListViewProps) {

  const currPlace: GeolibInputCoordinates = { latitude: currentLocation.coords.latitude, longitude: currentLocation.coords.longitude };

  let listData = placesToList.map((place) => {
    const pinnedPlace: GeolibInputCoordinates = { latitude: place.latitude, longitude: place.longitude };
    return {
      key: `placeKey${place._id}`,
      ...place,
      proximity: getDistance(pinnedPlace, currPlace),
    }
  });

  // listData = orderByDistance(currPlace, listData);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerCol}>{PLACE_NAME_HEADER}</Text>
        <Text style={styles.headerCol}>{PROXIMITY_HEADER}</Text>
        <Text style={styles.headerCol}>{LAST_VISITED_HEADER}</Text>
      </View>
      <FlatList
        data={listData}
        renderItem={({ item }) => <ListItemView placeItem={item} />}
      />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {/* <EditScreenInfo path="/screens/TabOneScreen.tsx" /> */}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '50%',
    width: '100%',
    padding: 10,
  },
  headerRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  headerCol: {
    width: '30%',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});