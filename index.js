const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const port = process.env.PORT || 3030;
const path = require('path');
const api = require('./controllers');

require('./config/passport');


app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));


const rootPath = path.join(__dirname, '/public/images');
app.use('/files', express.static(rootPath));

app.get('/', (req, res) => {
    res.status(200).json('halo');
});

app.use('/api', api);

app.listen(port, () => console.log('API Running...', port));

