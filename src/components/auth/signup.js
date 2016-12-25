import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {
	
	// This won't be called if the form is not valid
	handleFormSubmit(ownProps) {
		
	}
	
	render() {
		const { handleSubmit, fields: { email, password, passwordConfirm }} = this.props;
		return (
		  <form onSubmit={ handleSubmit(this.handleFormSubmit.bind(this)) }>
			  <fieldset className="form-group">
			    <label>Email:</label>
			    <input className="form-control" {...email} />
				  {email.touched && email.error && <div className="error">{email.error}</div>}
			  </fieldset>
			  <fieldset className="form-group">
				  <label>Password:</label>
				  <input className="form-control" type="password" {...password} />
				  {password.touched && password.error && <div className="error">{password.error}</div>}
			  </fieldset>
			  <fieldset className="form-group">
				  <label>Confirm Password:</label>
				  <input className="form-control" type="password" {...passwordConfirm} />
				  {passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div>}
			  </fieldset>
			  <button action="submit" className="btn btn-primary">Sign up!</button>
		  </form>
		);
	}
}

// http://redux-form.com/6.0.5/examples/syncValidation/
function validate(formProps){
	const errors = {};
	
	//  he says you could refactor this better with forEach or reduce
	//  he mentions you might also want to refactor into something else all of those kind of duplicative error messages
	if (!formProps.email) {
		errors.email = 'Please enter an email';
	}
	
	if (!formProps.passwordConfirm) {
		errors.passwordConfirm = 'Please enter a password confirmation';
	}
	if (formProps.password !== formProps.passwordConfirm){
		errors.password = "Passwords much match";
	}
	
	console.log(formProps);
	return errors;
}

// because this is ES6 you could consolidate down to just "validate"
export default reduxForm({
	form: 'signup',
	fields: ['email', 'password', 'passwordConfirm'],
	validate: validate
})(Signup);