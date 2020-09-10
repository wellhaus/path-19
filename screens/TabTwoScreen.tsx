import React, { useState } from 'react';
import { Text, View } from '../components/Themed';
import TabTwoLoginScreen from './TabTwoLoginScreen';
import TabTwoReportScreen from './TabTwoReportScreen'
import TabTwoSignupScreen from './TabTwoSignupScreen'


export default function TabTwoScreen() {
  const [loggedIn, setLogin] = useState(false);
  const [register, setRegister] = useState(false)

  const renderScreen = () => {
    if(!loggedIn && register) {
      return <TabTwoSignupScreen setLogin={setLogin} />
    } else if(!loggedIn && !register) {
      return <TabTwoLoginScreen setLogin={setLogin} setRegister={setRegister} />
    } else if(loggedIn) {
      return <TabTwoReportScreen setLogin={setLogin} />
    }
  }

  return (
    <>
    {renderScreen()}
    </>
  );
}