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
    if(req.query['hub.verify_token'] === 'botTest_token'){
        res.send(req.query['hub.challenge']);
    }
    else{
        res.send('You do not have pemissions');
    }
});

app.post('/webhook', (req,res)=>{
    console.log(req.body)
    const webhook_event = req.body.entry[0];
    //Validemos si existe un mensaje dentro del paquete de datos
    if(webhook_event.messaging){
        webhook_event.messaging.forEach(ev =>{
            //console.log("Evento",ev);
            handleEvent(ev.sender.id, ev);
        });
    }
    res.sendStatus(200);
});

function handleEvent(senderId, event){
    if(event.message){
        handleMessage(senderId, event.message)
    }else if(event.postback){
        handlePostback(senderId, event.postback.payload);
    }
}

function handleMessage(senderId, event){
    if(event.text){
        console.log(event.text)
        defaultMessage(senderId)
    }else if(event.attachments){
        handleAttachments(senderId, event)
    }
}

function defaultMessage(senderId){
    const messageData = {
        "recipient":{
            id:senderId
        },
        "message":{
            text:"Hola soy un Test Bot, y te invito a usar nuestro menu",
            "quick_replies":[
                {
                    "content_type":"text",
                    "title":"¿Deseas ordenar?",
                    "payload":"ORDERS_PAYLOAD"
                },
                {
                    "content_type":"text",
                    "title":"Acerca de",
                    "payload":"ABOUT_PAYLOAD"
                }
            ]
        }
    }
    senderActions(senderId);
    callSendApi(messageData)
}

function handleAttachments(senderId, ev){
    let attachments_type = ev.attachments[0].type;
    console.log(ev.attachments[0])
    switch(attachments_type){
        case "image":
            console.log(attachments_type);
        break;
        case "video":
            console.log(attachments_type);
        break;
        case "audio":
            console.log(attachments_type);
        break;
        case "file":
            console.log(attachments_type);
        break;
    }
}

function handlePostback(senderId, payload){
    switch(payload){
        case "GET_STARTED_TESTBOT":
            console.log(payload)
        break;
    }
}

function senderActions(senderId){
    const messageData = {
        "recipient":{
            "id": senderId
        },
        "sender_action":"typing_on"
    }
    callSendApi(messageData);
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

function showPizzas(senderId){
    const messageData = {
        "recipient":{
            "id":senderId
        }
    }
}

app.listen(3000,()=>{
    console.log("Bot run on port 3000");
});