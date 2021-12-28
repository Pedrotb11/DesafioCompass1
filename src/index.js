const express = require('express');
const bodyParser = require('body-parser');
const config = require('config')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('Alright');
});

require('./app/controllers/index')(app);


app.listen(config.get('app.port'), () => console.log('A API do projeto está funcionando!'));