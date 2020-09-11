import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import { gql, useMutation } from '@apollo/client';
import { Text, View } from '../components/Themed';

interface props {
	setLogin: Function
}

// mutation AddLocation {
//    addLocation(name: "Uasfsadrrth Cafe", longitude: -234234, 
//    latitude: 23523, onset: "2020-06-06", 
//    date_visited: "2020-06-01", user_id: 2) {
//      success
//      message
//    }
// }

const ADD_LOCATION = gql`
  mutation AddLocation($name: String!, $longitude: Float!, $latitude: Float!, $onset: String!, $date_visited: String!, $user_id: Int!) {
    addLocation(name: $name, longitude: $longitude, latitude: $latitude, onset: $onset, date_visited: $date_visited, user_id: $user_id) {
      success
     	message
    }
  }
`;

export default function TabTwoReportScreen({ setLogin } : props) {
  const { control, handleSubmit, errors } = useForm();
	const [addLocation, { data }] = useMutation(ADD_LOCATION)
	
	const onSubmit = async (formData : any) => {
		try {
			console.log(formData)
			const { address, longitude, latitude, onset, date_visited } = formData;
			const obj = { variables: { name: address, longitude: Number(longitude), latitude: Number(latitude), onset, date_visited, user_id: 2} }
			console.log("obj", obj)
			await addLocation(obj)
		} catch (error) {
			console.log(error)
		}	finally {
			setLogin(data.addLocation.success)
		}
	}

  return (
    <>
      <View style={styles.container}>
      <Text style={styles.text}>{"\n"}Self Report{"\n"}</Text>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <>
          <Text style={styles.text}>Address</Text>
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
          </>
        )}
        name="address"
        rules={{ required: true }}
        defaultValue=""
      />
      {errors.username && <Text style={styles.text}>This is required.</Text>}

      <Controller
        control={control}
        style={styles.input}
        render={({ onChange, onBlur, value }) => (
          <>
            <Text style={styles.text}>Longitude</Text>
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
            />
          </>
        )}
        name="longitude"
        defaultValue=""
      />
			<Controller
        control={control}
        style={styles.input}
        render={({ onChange, onBlur, value }) => (
          <>
            <Text style={styles.text}>Latitude</Text>
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
            />
          </>
        )}
        name="latitude"
        defaultValue=""
      />
			<Controller
        control={control}
        style={styles.input}
        render={({ onChange, onBlur, value }) => (
          <>
            <Text style={styles.text}>Onset</Text>
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
            />
          </>
        )}
        name="onset"
        defaultValue=""
      />
			<Controller
        control={control}
        style={styles.input}
        render={({ onChange, onBlur, value }) => (
          <>
            <Text style={styles.text}>Date Visited</Text>
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
            />
          </>
        )}
        name="date_visited"
        defaultValue=""
      />
       <TouchableOpacity
         style={styles.button}
         onPress={handleSubmit(onSubmit)}>
        <Text>Submit</Text>
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
