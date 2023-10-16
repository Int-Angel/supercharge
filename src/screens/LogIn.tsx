import React, { useState } from 'react'
import './LogIn.css'
import SignIn from './SignIn'
import SignUp from './SignUp'

function LogIn() {
    const [pageState, setPageState] = useState(true);
    return (
        <section className="screen">
            <section className='container'>
                <header className='logo'>
                    <img src={require('../assets/supercharge_logo.png')} alt='supercharge_logo' width={'15%'}></img>
                </header>
                <body className='box'>
                    {pageState ? <SignIn/> : <SignUp/>}
                    <div className='noAccount' onClick={() => setPageState(!pageState)}>
                        <div>
                            {pageState ? "Don't have an account? - Sign Up" : "Already have an account? - Sign In"}
                        </div>
                    </div>
                </body>
                
            </section>
            <footer className='legend'>
                Organize your day & supercharge your productivity ⚡ 
            </footer>
        </section>
    )
}

export default LogIn