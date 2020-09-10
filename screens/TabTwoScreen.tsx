import React, { useState } from 'react';
import { Text, View } from '../components/Themed';
import TabTwoLoginScreen from './TabTwoLoginScreen';

export default function TabTwoScreen() {
  const [loggedIn, setLogin] = useState(false);
  return (
    <>
    { loggedIn ? <Text>yey</Text> : <TabTwoLoginScreen setLogin={setLogin}/>}
    </>
  );
}