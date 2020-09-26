const mongoose = require('mongoose');

const User = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

//Mongoose automaticamente procura pelo versao em plural do nome do modelo
//Ele vai criar o modelo pro minha collection usuarios, não usuario
mongoose.model('user', User);