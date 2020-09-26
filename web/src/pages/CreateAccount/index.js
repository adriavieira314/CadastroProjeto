import React, { useState } from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import api from '../../services/api';


import { IoIosMail, IoIosPerson, IoIosLock } from 'react-icons/io';

function CreateAccount() {
    //Declarando um state para armazenar meus dados
    const [ data, setData ] = useState({
        name: '',
        email: '',
        password: ''
    });

    //A cada mudança no input vai ser salvo
    const handleChange = (event) => {
        //auxData está recebendo os campos de data
        const auxData = { ...data };
        //onde auxData for igual ao nome do target, vai ser atribuido um valor
        auxData[event.target.name] = event.target.value;
        //setando o state data com os dados do input
        setData(auxData);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        //Dando post com minha api e passando os dados de data
        api.post('/users', data)
            .then((response) => {
                //response.data pois estou pegando enviada do backend
                alert(`${response.data} Você pode fazer login agora.`);
            }).catch((error) => {
                alert(error);
            })

            //Apagando os campos
            document.getElementById('create-account').reset();    
        }

    return (
        <div id='container' className='animate__animated animate__slideInRight'>
            <div id='sign-in'>
                <h1>Welcome Back!</h1>
                <p>To keep connected with us login with your personal info</p>
                <Link to='/login'>
                    <button className='btn'>Sign In</button>
                </Link>
            </div>

            <div id='sign-up'>
                <h1>Create Account</h1>

                <form id='create-account' onSubmit={handleSubmit}>
                    <label>
                        <IoIosPerson className='react-icons' size='1.5em' />
                    </label>
                    <input 
                        className='inputStyle'
                        type='text'
                        name='name'
                        placeholder='Name' 
                        required
                        onChange={handleChange}
                    /><br/>

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
                        <button className='btn' type='submit'>Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateAccount;
