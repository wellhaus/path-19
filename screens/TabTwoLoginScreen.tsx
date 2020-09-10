import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import { gql, useMutation } from '@apollo/client';
import { Text, View } from '../components/Themed';

interface props {
	setLogin: Function,
	setRegister: Function
}

const ADD_LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      email
			password
    }
  }
`;

export default function TabTwoLoginScreen({ setLogin, setRegister } : props) {
  const { control, handleSubmit, errors } = useForm();
	const [login, { data }] = useMutation(ADD_LOGIN)

	
	const onSubmit = async (data: any) => {
		try {
			const { email, password } = await data;
			await login({ variables: { email, password } })
			setLogin(true)
			console.log(data)
		} catch(error) {
			console.log('error: ', error)
		}
		
	}

	const redirectSignup = () => {
		setRegister(true)
	}

  return (
    <>
      <View style={styles.container}>
      <Text style={styles.text}>{"\n\n"}Log in or </Text>
			<TouchableOpacity
         onPress={redirectSignup}>
        <Text style={styles.text}>Sign up</Text>
      </TouchableOpacity>
			<Text>{"\n\n"}</Text>

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
         onPress={handleSubmit(onSubmit)}>
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
	link: {
    fontSize: 30,
    color: 'blue'
  },
});
