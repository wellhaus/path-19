import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Icon } from 'react-native-elements'
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { BottomTabParamList, TabOneParamList, TabTwoParamList } from '../types';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { MY_IP } from '../ip.js';

const client = new ApolloClient({
  uri: MY_IP,
  cache: new InMemoryCache()
});


const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <ApolloProvider client={client}>
      <BottomTab.Navigator
        initialRouteName="Cases"
        tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
        <BottomTab.Screen
          name="Cases"
          component={TabOneNavigator}
          options={{
            tabBarIcon: ({ }) => <Icon
            name='explore'
            type='material'
            color='#517fa4'
          />,
          }}
        />
        <BottomTab.Screen
          name="Self-Report"
          component={TabTwoNavigator}
          options={{
            tabBarIcon: () => <Icon
            name='portrait'
            type='material'
            color='#517fa4'
          />,
          }}
        />
      </BottomTab.Navigator>
    </ApolloProvider>

  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={TabOneScreen}
        options={{ headerTitle: 'Map' }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerTitle: 'Log In' }}
      />
    </TabTwoStack.Navigator>
  );
}
