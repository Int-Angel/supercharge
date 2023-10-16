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
                </body>
            </section>
            <footer className='legend'>
                Organize your day & supercharge your productivity ⚡ 
            </footer>
        </section>
    )
}

export default LogIn