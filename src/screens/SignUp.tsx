import React from 'react'
import './SignUp.css'

function SignUp() {

    function sendForm(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault(); // Evita que el formulario se envíe automáticamente.
	
        const usernameInput = document.getElementById('username') as HTMLInputElement;
		const emailInput = document.getElementById('email') as HTMLInputElement;
		const passwordInput = document.getElementById('password') as HTMLInputElement;
        const confirmPasswordInput = document.getElementById('confirm-password') as HTMLInputElement;
	
        const username = usernameInput.value;
		const email = emailInput.value;
		const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        if(password === confirmPassword) {
		    signIn(username, email, password);
        } else {
            console.log("Please check your password, your password doesn't match")
        }
	}
	
	function signIn(username: string, email: string, password: string) {
        console.log("Username: " + username);
		console.log("Email: " + email);
		console.log("Password: " + password);
	}

    return (
		<div className='signInBox'>
			<div className='titleSignIn'>
                  Sign Up
            </div>
            <form onSubmit={(e) => sendForm(e)}>
                <div className="inputContainerBox">
                    <div className='medText'>
                        Create an account! 🚀
                    </div>
                    <div className='inputLabel'>
                        Username
                    </div>
                    <div>
                        <input type='text' placeholder='e.g. username ' id='username' className='inputBox'/>
                    </div>
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
                        <input type='password' placeholder='e.g. password ' id='password' className='inputBox'/>
                    </div>
                    <div  className='inputLabel'>
                        Confirm Password
                    </div>
                    <div>
                        <input type='password' placeholder='e.g. password ' id='confirm-password' className='inputBox'/>
                    </div>
                </div>
			    <button type="submit" className='signInButton'> Create Account </button>
            </form>
		</div>
	)
}

export default SignUp