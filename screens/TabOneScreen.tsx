import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Dimensions, TextInput, Platform } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { Text, View } from '../components/Themed';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Layout from '../constants/Layout';
import Tooltip, { TooltipProps } from '../components/Tooltip';
import LoadingView from '../components/LoadingView';
import ListView from '../components/ListView';
import { LocationSchema } from '../constants/Types';
import Geocoder from 'react-native-geocoder';
import { useQuery, gql } from '@apollo/client';

// Fallback strategy: Some Geocoding services might not be included in a device
// Geocoder.fallbackToGoogle(API_KEY);

export default function TabOneScreen() {
  const [location, setLocation] = useState<Location.LocationData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [allLocations, setAllLocations] = useState<LocationSchema[]>([]);

  const GET_LOCATIONS = gql`
  query GetLocations {
  locations {
    _id
    name
    latitude
    longitude
    onset
    date_visited
  }
}`
  const { loading, error, data } = useQuery(GET_LOCATIONS);
  const _map = useRef(null);

  /* GEOCODING OBJECT
  {
    position: {lat, lng},
    formattedAddress: String, // the full address
    feature: String | null, // ex Yosemite Park, Eiffel Tower
    streetNumber: String | null,
    streetName: String | null,
    postalCode: String | null,
    locality: String | null, // city name
    country: String,
    countryCode: String
    adminArea: String | null
    subAdminArea: String | null,
    subLocality: String | null
    }
  */
  // NOTE: Geocoding is resource intensive -> request wisely
  const handleSearch = async (place: string) => {
    if (_map && place && place.length > 0) {
      try {
        // const targetCoords = await Location.geocodeAsync(place);
        // const { latitude, longitude } = targetCoords[0];

        const { position } = await Geocoder.geocodeAddress(place);
        const { latitude: targetLat, longitude: targetLng } = position;

        _map.current.animateToRegion(
          {
            targetLat,
            targetLng,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05
          }, 350
        );
      } catch (err) {
        console.log("HANDLESEARCH ERROR: ", err);
        throw err;
      }
    }
  };

  useEffect(() => {
    // Populate locations array with all data from server
    (async () => {
      setAllLocations(await data.locations);
    })();

    // TODO: lazy load locations
    // Create local cache
    // Create key using parameters of each new fetch for locations
    // Store in state along with queried region
    // Check if last call was done with the same key and with a region wrapping current one
    // If so, we alreday have all the points to display so ignore request
  }, [data]);

  useEffect(() => {
    // Get permission to access and display user's current location
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }
      setLocation(await Location.getCurrentPositionAsync({}));
    })();
  }, []);

  return !location ?
    <LoadingView /> :
    errorMsg ?
      <LoadingView message={errorMsg} /> :
      (
        <View style={styles.container}>
          <MapView style={styles.mapStyle}
            ref={_map}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05
            }}
          >
            {allLocations.map(({ _id, name, latitude, longitude }) => (
              <Marker
                coordinate={{ latitude, longitude }}
                key={"markerKey" + _id}
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
              onSubmitEditing={({ nativeEvent }) => handleSearch(nativeEvent.text)}
              // onChangeText={(newInput) => console.log(newInput)}
              style={{ flex: 1, padding: 0 }}
            />
            <Ionicons name="ios-search" size={20} />
          </View>
          <ListView placesToList={allLocations} currentLocation={location} />
        </View>
      );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
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
    marginTop: Platform.OS === 'ios' ? 20 : 10,
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
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 250,
  }
});
