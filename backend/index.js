const express = require('express')
const app = express()
const port = 5000
const cors = require('cors')
const vent = require('./route/index.js')
const bodyParser = require('body-parser')

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors(
    {origin: '*'},
));

app.use('/', vent)

app.listen(port, () => console.log(`whisper app listening http://localhost:${port}`))