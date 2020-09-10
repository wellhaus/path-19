import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Text, View } from './Themed';

export default function LoadingView() {
  return (
    <View style={styles.container}>
      <Text>{"Gathering most up-to-date reports..."}</Text>
      <Image style={styles.loadingGif} source={require('../assets/images/darkGreenGerm.gif')} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingGif: {
    width: '80%',
    height: '50%',
  }
});