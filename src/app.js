'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const access_token = "EAAH5rV3Nwf4BAEMRlvppgrZAHBHOPGUQnwzTmtoiTR47Qqx9UVJq676ZBSZC6BNFZC4wZBZCZACZBTpZBKpZCoZB519ansaJ8ldmCh7IJjXRV6LhRyvlzFLtbR2xZAEG20J75KOfbl0dTWv2MiPTcZAwh0oUWVoT1yuxQJoJZC87uZA1PpOfwZDZD";

const app = express();

app.use(bodyParser.json());

app.get('/', (req,res)=>{
    res.send('Hi my nigga');
});

app.get('/webhook',(req,res)=>{
    console.log(req.body)
    if(req.query['hub.verify_token'] === 'botTest_token'){
        res.send(req.query['hub.challenge']);
    }
    else{
        res.send('You do not have pemissions');
    }
});

app.post('/webhook', (req,res)=>{
    const webhook_event = req.body.entry[0];
    //Validemos si existe un mensaje dentro del paquete de datos
    if(webhook_event.messaging){
        webhook_event.messaging.forEach(ev =>{
            console.log(ev);
            handleMessage(ev);
        });
    }
    res.sendStatus(200);
});

function handleMessage(e){
    const senderId = e.sender.id;
    const messageText = e.message.text;
    const messageData = {
        recipient:{
            id: senderId
        },
        message:{
            text: messageText
        }
    }
    callSendApi(messageData)
}

function callSendApi(response){
    request({
        "uri":"https://graph.facebook.com/me/messages/",
        "qs":{
            "access_token":access_token
        },
        "method":"POST",
        "json":response
    },
    (err)=>{
        if(err){
            console.log("Error tipe: ",err)
        }
        else{
            console.log("Send Message")
        }
    })
}

app.listen(3000,()=>{
    console.log("Bot run on port 3000");
});