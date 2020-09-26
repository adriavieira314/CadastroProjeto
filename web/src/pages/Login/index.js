import React, { useState } from 'react';
import './style.css';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import { IoIosMail, IoIosLock } from 'react-icons/io';
import { FaFacebookF, FaGooglePlusG, FaLinkedinIn } from 'react-icons/fa';
import 'animate.css';

function Login() {
    let history = useHistory();
    const [ info, setInfo ] = useState({
        email: '',
        password: ''
    });


    const handleChange = (event) => {
        //auxInfo está recebendo os campos de info
        const auxInfo = { ...info };
        //onde auxInfo for igual ao nome do target, vai ser atribuido um valor
        auxInfo[event.target.name] = event.target.value;
        //setando o state info com os dados do input
        setInfo(auxInfo);
    }

    const handleSubmit = event => {
        event.preventDefault();

        api.post('/login', info).then((response) => {
            if(response.data === 'Logado com sucesso!') {
                history.push('/home'); 
            } else {
                console.log(response);
                alert('Usuário não encontrado.');
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <div id='container' className='animate__animated animate__slideInLeft'>
            
            <div id='signIn'>
                <h1>Sign in to have fun!</h1>

                <form id='create-account' onSubmit={handleSubmit}>
                    <label>
                        <IoIosMail className='react-icons' size='1.5em'  />
                    </label>
                    <input
                        className='inputStyle'
                        type='email'
                        name='email'
                        placeholder='Email'
                        required
                        onChange={handleChange}
                    /><br/>

                    <label>
                        <IoIosLock className='react-icons' size='1.5em'  />
                    </label>
                    <input
                        className='inputStyle'
                        type='password'
                        name='password'
                        placeholder='Password'
                        required
                        onChange={handleChange}
                    /><br/>

                    <div id='btn-submit'>
                        <button className='btn' type='submit'>Sign In</button>
                    </div>
                </form>
            </div>

            <div id='signUp'>
                <h1>Hello, There!</h1>
                <p>Enter your personal details and start your journey with us</p>
                <Link to='/'>
                    <button className='btn'>Sign Up</button>
                </Link>
            </div>
        </div>
    );
}

export default Login;