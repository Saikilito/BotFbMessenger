'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

require('dotenv').config();
const access_token = process.env.ACCESS_TOKEN;

const app = express();

app.use(bodyParser.json());

app.get('/', (req,res)=>{
    res.send('Hi, welcome to TestBot');
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
        /*--responder un texto--*/
        //defaultMessage(senderId);
        /*--responder una imagen--*/
        messageImage(senderId);
        /*--responder un numero de contacto para llamar--*/
        //contactSupport(senderId);
        /*--responder un menu de localizaciones--*/
        //showLocation(senderId);
        /*--responder una factura--*/
        //receipt(senderId);

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
            "text":"Hola soy un Test Bot, y te invito a usar nuestro menu",
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
        case "location":
            console.log(attachments_type);
        break;
        default:
            console.log(attachsments_type);
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

function handlePostback(senderId, payload){
    console.log("Payload Main",payload);
    switch(payload){
        case "GET_STARTED_TESTBOT":
        break;
        case "PRODUCT_PAYLOAD":
            showPizzas(senderId);
        break;
        case "PEPERONI_PAYLOAD":
            console.log("Flow?");
            sizePizza(senderId);
        break;
        case "BBQ_PAYLOAD":
            sizePizza(senderId);
        break;
    }
}

function showPizzas(senderId){
    const messageData = {
        "recipient":{
            "id":senderId
        },
        "message":{
            "attachment":{
                "type":"template",
                "payload":{
                    "template_type":"generic",
                    "elements":[
                        {
                            "title":"Peperoni",
                            "subtitle":"Con todo el sabor del peperoni",
                            "image_url":"https://placeralplato.com/files/2016/01/Pizza-con-pepperoni.jpg",
                            "buttons":[
                                {
                                  "type":"postback",
                                  "title":"Elegir Personal",
                                  "payload":"PEPPERONI_PERSONAL_PAYLOAD",
                                },
                                {
                                  "type":"postback",
                                  "title":"Elegir Mediana",
                                  "payload":"PEPPERONI_MEDIANA_PAYLOAD",
                                },
                                {
                                  "type":"postback",
                                  "title":"Elegir Familiar",
                                  "payload":"PEPPERONI_FAMILIAR_PAYLOAD",
                                }
                              ]
                        },
                        {
                            "title":"Pollo BBQ",
                            "subtitle":"Con todo el sabor del BBQ",
                            "image_url":"https://www.recetin.com/wp-content/uploads/2010/05/bbq_chicken_pizza-514x300.jpg",
                            "buttons":[
                                {
                                  "type":"postback",
                                  "title":"Elegir Personal",
                                  "payload":"BBQ_PERSONAL_PAYLOAD",
                                },
                                {
                                  "type":"postback",
                                  "title":"Elegir Mediana",
                                  "payload":"BBQ_MEDIANA_PAYLOAD",
                                },
                                {
                                  "type":"postback",
                                  "title":"Elegir Familiar",
                                  "payload":"BBQ_FAMILIAR_PAYLOAD",
                                }
                              ]
                        }
                    ]
                }
            }
        }
    }
    callSendApi(messageData);
}

function messageImage(senderId){
    const messageData = {
        "recipient":{
            "id":senderId
          },
          "message":{
            "attachment": {
              "type": "image",
              "payload": {
                       "url": "https://media.giphy.com/media/H3dsXYs4sNW3eyea58/giphy.gif"
                    }
            }    
          }
    }
    callSendApi(messageData);
}

function contactSupport(senderId){
    const messageData = {
        "recipient":{
            "id": senderId
        },
        "message":{
            "attachment":{
                "type": "template",
                "payload":{
                    "template_type":"button",
                    "text":"Hola! Quieres llamarnos ?",
                    "buttons":[
                        {
                            "type":"phone_number",
                            "title":"Llamar a un asesor",
                            "payload":"+584265555555"
                        }
                    ]
                }
            }
        }
    }
    callSendApi(messageData);
}

function showLocation(senderId){
    const messageData = {
        "recipient":{
            "id": senderId
        },
        "message":{
            "attachment":{
                "type":"template",
                "payload":{
                    "template_type":"generic",
                    "elements":[
                        {
                        "title":"Sucursal Venezuela",
                        "image_url":"https://www.criptonoticias.com/wp-content/uploads/2019/09/venezuela-puerta-am%C3%A9rica-latina-750x375.jpg",
                        "subtitle":"Caracas, Plaza Candelaria",
                        "buttons":[
                            {
                                "title":"Ver en el mapa",
                                "type":"web_url",
                                "url":"https://www.google.com/maps/dir//Caracas,+Distrito+Capital,+Venezuela/@10.4806762,-66.9386259,13z/data=!4m8!4m7!1m0!1m5!1m1!1s0x8c2a58adcd824807:0x93dd2eae0a998483!2m2!1d-66.9036063!2d10.4805937?hl=es-CL",
                                "webview_height_ratio":"full"
                            }
                        ]      
                      },
                      {
                        "title":"Sucursal Venezuela",
                        "image_url":"https://www.roastbrief.com.mx/wp-content/uploads/2017/03/monumento_cristo_rey_cali_colombia-640x427.jpg",
                        "subtitle":"Colombia, Cali",
                        "buttons":[
                            {
                                "title":"Ver en el mapa",
                                "type":"web_url",
                                "url":"https://www.google.com/maps/dir//Cali,+Valle+del+Cauca,+Colombia/@3.4517317,-76.567005,13z/data=!4m8!4m7!1m0!1m5!1m1!1s0x8e30a6f0cc4bb3f1:0x1f0fb5e952ae6168!2m2!1d-76.5319854!2d3.4516467?hl=es-CL",
                                "webview_height_ratio":"tall"
                            }
                        ]      
                      }     
                    ]
                }
            }
        }
    }
    callSendApi(messageData);
}

function receipt(senderId){
    const messageData = {
        "recipient":{
            "id": senderId
        },
        "message":{
            "attachment":{
                "type":"template",
                "payload": {
                    "template_type":"receipt",
                    "recipient_name":"Kembert Nieves",
                    "order_number":"123456",
                    "currency":"USD",
                    "payment_method":"Tranferencia",        
                    "order_url":"https://www.azordev-dev.web.app/receipt",
                    "timestamp": "12365465",         
                    "address":{
                      "street_1":"Calle Marogueña",
                      "city":"Caracas",
                      "postal_code":"2121",
                      "state":"Distrito Capital",
                      "country":"Venezuela"
                    },
                    "summary":{
                      "subtotal": 500.00,
                      "shipping_cost": 20.00,
                      "total_tax": 5.00,
                      "total_cost": 525.00
                    },
                    "adjustments":[
                      {
                        "name": "Descuento porque si",
                        "amount": 25.00
                      }
                    ],
                    "elements":[
                      {
                        "title": "Pizza Peperoni",
                        "subtitle":"Pizza sabrosa",
                        "quantity": 1,
                        "price": 500,
                        "currency": "USD",
                        "image_url":"https://placeralplato.com/files/2016/01/Pizza-con-pepperoni.jpg"
                      },
                      {
                        "title": "Bebida",
                        "subtitle":"Cafesito",
                        "quantity": 1,
                        "price": 50,
                        "currency": "USD",
                        "image_url":"https://placeralplato.com/files/2016/01/Pizza-con-pepperoni.jpg"
                      },
                    ]
                  }
            }
        }
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


app.listen(process.env.PORT || 3000,()=>{
    console.log("Bot run on port 3000");
});