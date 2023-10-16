import React from 'react'
import './LogIn.css'
import SignIn from './SignIn'
import SignUp from './SignUp'

function LogIn() {
  return (
    <div className="screen">
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
        <footer>
            <section className='legend'>
                Legend
            </section>
        </footer>
    </div>
  )
}

export default LogIn