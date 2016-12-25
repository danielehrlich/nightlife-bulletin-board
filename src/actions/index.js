import axios from 'axios';
import { browserHistory } from 'react-router';
const ROOT_URL = 'http://localhost:3090';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from './types';

export function signInUser({ email, password }) {
	//  we are returning a function here because that's how thunk works! it allows us to only dispatch an action
	//    if certain conditions are met
	return function(dispatch) {
		console.log("signIn User begins");
	
		// so I guess axios post takes a url and the post data and that's it!
		axios.post(`${ROOT_URL}/signin`, { email, password })
			.then(response => {
				dispatch({ type: AUTH_USER }); // wow the actual dispatch method!
				localStorage.setItem('token', response.data.token);
				browserHistory.push('/feature'); // this pushes the browser to a different page
			})
		  .catch(() => {
			  dispatch(authError('Bad Login Info'));
		  	
		  });
		
		console.log("signIn User ends");
		
		
	}
}

export function authError(error) {
	return {
		type: AUTH_ERROR,
		payload: error
	}
}

export function signoutUser() {
	localStorage.removeItem('token');
	return {
		type: UNAUTH_USER
	}
}