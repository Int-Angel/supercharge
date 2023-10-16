import React from 'react'
import './LogIn.css'
import SignIn from './SignIn'
import SignUp from './SignUp'

function LogIn() {
  return (
    <>
    <header>
        <section className='logo'>
            Logo
        </section>
    </header>
    <body>
        <section className='Box'>
            <SignIn/>
            <SignUp/>
        </section>
    </body>
    <footer>legend</footer>
</>
  )
}

export default LogIn