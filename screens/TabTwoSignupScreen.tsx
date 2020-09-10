import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import { gql, useMutation } from '@apollo/client';
import { Text, View } from '../components/Themed';

interface props {
	setLogin: Function
}
// email,password,firstname,lastname,status
const ADD_USER = gql`
  mutation Register($email: String!, $password: String!, $firstname: String!, $lastname: String!, $status: Boolean!) {
    register(email: $email, password: $password, firstname: $firstname, lastname: $lastname, status: $status) {
      token
    }
  }
`;

export default function TabTwoLoginScreen({ setLogin } : props) {
  const { control, handleSubmit, errors } = useForm();
	const [register, { data }] = useMutation(ADD_USER)

	
	const onSubmit = async (formData : any) => {
		try {
			const { email, password, firstname, lastname } = await formData;
			await register({ variables: { email, password, firstname, lastname, status: true } })
			console.log("token", data)
			console.log(formData)
			setLogin(true)
		} catch (error) {
			console.log(error)
		}	
	}
  return (
    <>
      <View style={styles.container}>
      <Text style={styles.text}>{"\n\n"}Sign up{"\n\n"}</Text>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <>
          <Text style={styles.text}>Email</Text>
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
          </>
        )}
        name="email"
        rules={{ required: true }}
        defaultValue=""
      />
      {errors.email && <Text>This is required.</Text>}

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
        rules={{ required: true }}
        defaultValue=""
      />
			{errors.password && <Text>This is required.</Text>}
			<Controller
        control={control}
        style={styles.input}
        render={({ onChange, onBlur, value }) => (
          <>
            <Text style={styles.text}>First Name</Text>
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
            />
          </>
        )}
				name="firstname"
        rules={{ required: true }}
        defaultValue=""
      />
			{errors.firstname && <Text>This is required.</Text>}
			<Controller
        control={control}
        style={styles.input}
        render={({ onChange, onBlur, value }) => (
          <>
            <Text style={styles.text}>Last Name</Text>
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
            />
          </>
        )}
				name="lastname"
        rules={{ required: true }}
        defaultValue=""
      />
			{errors.lastname && <Text>This is required.</Text>}
       <TouchableOpacity
         style={styles.button}
         onPress={handleSubmit(onSubmit)}>
        <Text>Sign Up</Text>
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
	checkbox: {
		alignSelf: "center",
		width: 50,
		height: 50
  },
});
