import React, { useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Text, View } from './Themed';

export interface LoadingViewProps {
  message?: string,
}
export default function LoadingView({ message }: LoadingViewProps) {
  const [displayMsg, setDisplayMsg] = useState("Gathering most up-to-date reports...")

  if (message && message.length > 0) {
    setDisplayMsg(message);
  }

  return (
    <View style={styles.container}>
      <Text>{displayMsg}</Text>
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