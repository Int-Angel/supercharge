import React from 'react'
import './SignIn.css'

function SignIn() {

	function sendForm(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault(); // Evita que el formulario se envíe automáticamente.
	
		const emailInput = document.getElementById('email') as HTMLInputElement;
		const passwordInput = document.getElementById('password') as HTMLInputElement;
	
		const email = emailInput.value;
		const password = passwordInput.value;
	
		signIn(email, password);
	}
	
	function signIn(email: string, password: string) {
		console.log("Email: " + email);
		console.log("Password: " + password);
	}

	return (
		<div className='signInBox'>
			<div className='titleSignIn'>
				Welcome back! 🙌
			</div>
			<form onSubmit={(e) => sendForm(e)}>
				<div className="inputContainerBox">
					<div className='inputLabel'>
						Email
					</div>
					<div>
						<input type='text' placeholder='e.g. email@email.com' id='email' className='inputBox'/>
					</div>
					<div  className='inputLabel'>
						Password
					</div>
					<div>
						<input type='password' placeholder='e.g. password' id='password' className='inputBox'/>
					</div>
				</div>
				<button type="submit" className='signInButton'> Sign In </button>
			</form>
		</div>
	)
}

export default SignIn