const express = require('express');
const routes = express.Router();
const mongoose = require('mongoose'); //banco de dados
const bcrypt = require('bcryptjs');
const passport = require('passport');

require('./models/Users/user'); //solicitando o model usuario
const User = mongoose.model('user'); //Usuario possui o model

routes.get('/', (req, res) => {
    res.send('Logado com sucesso!')
})

routes.get('/error', (req, res) => {
    res.send('Error 404');
})

//Listando todos
routes.get('/users', (req, res) => {
    User.find().then((users) => {
        res.send(users);
    }).catch((err) => {
        res.send(`Erro ao listar os usuarios: ${err}`);
    });
});

//Listando um
routes.get('/users/:id', (req, res) => {
    const id = req.params.id;
    User.findOne({ _id: id }).then((user) => {
        res.send(user);
    }).catch((err) => {
        res.send(`Erro ao listar usuario: ${err}`);
    })
});

//Criando
routes.post('/users', (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    //fazendo hash na senha
    bcrypt.genSalt(10, (erro, salt) => {
        bcrypt.hash(newUser.password, salt, (erro, hash) => {
            if(erro) {
                res.send('Houve um erro durante o cadastro da senha do usuário.');
            }
            //Senha esta recebendo o hash
            newUser.password = hash;
            //Finalmente cadastrando
            newUser.save().then(() => {
                res.send('Usuário cadastrado com sucesso.');
            }).catch((err) => {
                res.send('Houve um erro durante o cadastro do usuário.' + err);
            });

        });
    });
});

//Atualizando
routes.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const update = req.body;

    User.updateOne({ _id: id }, { $set: update }).then(() => {
        res.send('Usuário atualizado com sucesso!');
    }).catch((err) => {
        res.send(`Erro ao atualizar o usuario: ${err}`);
    });
});

//Deletando
routes.delete('/users/:id', (req, res) => {
    const id = req.params.id;

    User.deleteOne({ _id: id }).then(() => {
        res.send('Usuario deletado com suceso!');
    }).catch((err) => {
        res.send(`Erro ao deletar usuario: ${err}`)
    });
})

let user = '';
//Autenticação do usuário
routes.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/error',
        failureFlash: false
    })(req, res, next);

    user = req.body.email; //variavel user recebe o email do usuario logado
});

//Verifico se existe um email igual ao valor da variavel e retorno seu name 
routes.get('/loggedUser', (req, res) => {
    User.findOne({ email: user }).then((user) => {
        res.send(user.name);
    }).catch((err) => {
        res.send(err);
    })
});

module.exports = routes;