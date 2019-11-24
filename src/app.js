'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(bodyParser.json());

app.get('/', (req,res)=>{
    res.send('Hi my nigga');
});

app.get('/webhook',(req,res)=>{
    if(req.query['hub.verify_token'] === 'botTest_token'){
        res.send(res.query['hub.challenge']);
    }
    else{
        res.send('You do not have pemissions');
    }
});

app.listen(3000,()=>{
    console.log("Bot run on port 3000");
});