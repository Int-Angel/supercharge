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
                <div className='box'>
                    {pageState ? <SignIn/> : <SignUp/>}
                    <div className='noAccount' onClick={() => setPageState(!pageState)}>
                        <div>
                            {pageState ? "Don't have an account?" : "Already have an account?"}
                        </div>
                    </div>
                    <div className='googleOr'>
                        <img src={require('../assets/or.png')} alt='orGoogle' width={'80%'}/>
                    </div>
                   <img style={{cursor: "pointer", paddingTop: '10px'}} src={ pageState ? require('../assets/signup_google.png') : require('../assets/signin_google.png')} alt='googlelogo' width={'80%'} onClick={() => null}/>
                </div>
            </section>
            <footer className='legend'>
                Organize your day & supercharge your productivity ⚡ 
            </footer>
        </section>
    )
}

export default LogIn