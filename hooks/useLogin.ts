import { useEffect, useState } from 'react';

export default function useFetch(url: string, options: object, setLogin : Function) {
	const [response, setResponse] = useState(null);
	const [error, setError] = useState(null);

  useEffect(() => {
		(async () => {
			try {
				// const res = await fetch(url, options); // mutate graphQL endpoint with query
				// const json = await res.json();
				const json = { success: true }
				console.log(options)
				setResponse(json.success);
				setLogin(true)
			} catch(error) {
				setError(error);
				setLogin(false)
				console.log("error in login: ", error);
			}
		})()
	},[]);

	return { response, error };
};

    // name: String
    // longitude: Int!
    // latitude: Int!
    // onset: String
		// dateVisited: String