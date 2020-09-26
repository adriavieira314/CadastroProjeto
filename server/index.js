const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

require('./config/auth')(passport);


//Inicializando o express
const app = express();
const port = 3001;

//Habilitando o cors
app.use(cors());

//Iniciando o passport
app.use(passport.initialize());
app.use(passport.session());

//Fazendo a conexão com o banco de dados
mongoose.connect('mongodb://localhost/users', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(() => {
    console.info('MongoDB conectado com sucesso!');
}).catch((err) => {
    console.info(`Erro ao se conectar ao bando de dados: ${err}`);
});

//Configurando o Body Parser
//Ele permite ter o body no req.
//Dessa forma consigo ler o JSON do body da requisição
const jsonParser = bodyParser.json();
app.use(jsonParser);

//Minhas rotas vao partir daqui
app.use('/', routes);

app.listen(port, () => {
    console.info(`Aplicativo rodando na url http://localhost:${port}`);
});