import React, { useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Text, View } from './Themed';
import { LocationSchema } from '../constants/Types';
import EditScreenInfo from './EditScreenInfo';
import * as Location from 'expo-location';
import { convertDistance } from 'geolib';

export interface ListItemViewProps {
  placeItem: LocationSchema;
};

export default function ListItemView({ placeItem }: ListItemViewProps) {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text style={styles.itemCol}>{placeItem.name}</Text>
        <Text style={styles.itemCol}>{convertDistance(placeItem.proximity, 'mi').toFixed(2) + " mi"}</Text>
        <Text style={styles.itemCol}>{placeItem.date_visited}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '50%',
    width: '100%',
    padding: 5,
  },
  item: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  itemCol: {
    width: '30%',
    textAlign: 'center',
  }
});