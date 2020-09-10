import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useForm, Controller } from "react-hook-form";
// import useFetch from '../hooks/useLogin'

import { Text, View } from '../components/Themed';

interface props {
	setLogin: Function
}


export default function TabTwoLoginScreen({ setLogin } : props) {
  const { control, handleSubmit, errors } = useForm();
	// const [loggedIn, setLogin] = useState(true);
	// const { response } = useFetch("http://localhost:3000", {})
	
	const login = (something) => {
		console.log(something)
	}
  return (
    <>
      <View style={styles.container}>
      <Text style={styles.text}>{"\n\n"}Log in or Sign up{"\n\n"}</Text>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <>
          <Text style={styles.text}>User Name</Text>
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
          </>
        )}
        name="username"
        rules={{ required: true }}
        defaultValue=""
      />
      {errors.username && <Text>This is required.</Text>}

      <Controller
        control={control}
        style={styles.input}
        render={({ onChange, onBlur, value }) => (
          <>
            <Text style={styles.text}>Password</Text>
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              secureTextEntry={true}
            />
          </>
        )}
        name="password"
        defaultValue=""
      />
       <TouchableOpacity
         style={styles.button}
         onPress={handleSubmit(login)}>
        <Text>Log In</Text>
       </TouchableOpacity>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  input: {
    color: 'black',
    borderColor: 'black',
    borderWidth: 1,
    width: '80%',
    fontSize: 25,
  },
  button: {
    backgroundColor: '#2196F3',
    color: "black",
    margin: 20,
    width: "80%",
    alignItems: 'center',
    padding: 15
  },
  text: {
    fontSize: 30,
    color: 'black'
  },
});
