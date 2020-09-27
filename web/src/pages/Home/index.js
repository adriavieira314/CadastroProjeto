import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import './style.css';
import { Link } from 'react-router-dom';

function HomePage() {
    const [ loggedUser, setLoggedUser ] = useState();

    //Pego o data de response que possui o name do usuário e o salvo num state
    useEffect(() => {
        api.get('/loggedUser').then((response) => {
            setLoggedUser(response.data);
        })
    }, []);
     
    //o nome do usuario vai ser renderizado no navBar
    return (
        <main>
            <nav>
                <ul>
                    <li id='usuario'>{loggedUser}</li>
                    <Link to='/'>
                        <li id='sair'>Sair</li>
                    </Link>
                </ul>
            </nav>
        </main>
    );
}

export default HomePage;