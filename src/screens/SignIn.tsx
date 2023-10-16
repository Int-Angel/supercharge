import React from 'react'
import './SignIn.css'

function SignIn() {
	return (
		<div className='SignInBox'>
			Welcome Back
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
					<input type='password' placeholder='e.g. password 'className='inputBox'/>
				</div>
			</div>
			<button className='signInButton'> Sign In </button>
		</div>
	)
}

export default SignIn