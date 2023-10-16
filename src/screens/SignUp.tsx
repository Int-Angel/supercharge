import React from 'react'
import './SignUp.css'

function SignUp() {
    return (
		<div className='SignInBox'>
			Join Now!
			<div className="inputContainerBox">
                Create an account! 🚀
                <div className='inputLabel'>
					Username
				</div>
				<div>
					<input type='text' placeholder='e.g. username ' id='email' className='inputBox'/>
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
					<input type='password' placeholder='e.g. password 'className='inputBox'/>
				</div>
                <div  className='inputLabel'>
					Confirm Password
				</div>
				<div>
					<input type='password' placeholder='e.g. password 'className='inputBox'/>
				</div>
			</div>
			<button className='signInButton'> Create Account </button>
		</div>
	)
}

export default SignUp