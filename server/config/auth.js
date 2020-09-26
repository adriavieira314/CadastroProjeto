const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');

//Model do usuario
require('../models/Users/user');
const User = mongoose.model('user');

module.exports = (passport) => {
    passport.use(new localStrategy({ usernameField: 'email', passwordField: 'password' }, (email, password, done) => {
        //verificando se existe um email no meu banco igual a do usernameField
        User.findOne({ email: email }).then((user) => {
            //se o email não for encontrado
            if(!user) {
                return done(null, false, { message: 'Esta conta não existe.' });
            }
            //se existir, estou comparando a senha do form com a senha do usuario do banco de dados
            bcrypt.compare(password, user.password, (erro, equal) => {
                if(equal) {
                    //se as senhas forem iguais, retorna o usuario
                    return done(null, user);
                }else {
                    //senão, messagem de erro
                    return done(null, false, { message: 'Senha incorreta.' })
                }
            });

        })
    }));

    //vai entrar numa sessao
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
};