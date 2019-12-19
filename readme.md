## Manejo de eventos de menú

Para el caso de los eventos del menu asignamos varias opciones y cada uno tiene un nombre de payload al cual podemos apuntar para referirnos a ellos, para esto una crearemos una función `handlePostback` donde manejaremos, en este caso, con un `switch` cada una de estas acciones.

Para los eventos de menu, cada acción o postback se distingue por un payload, estos los recibimos en nuestro objeto evento como `evento.postback` y ahora tenemos el poder de responder a esto de difernetes maneras.

## Generic Template
En este ejemplo, lo usaremos para mostrar los productos que estamos ofreciendo, nos mostrara una lista vertical con imagenes, información breve y un boton con el cual podríamos seleccionar dicho producto.

El template generic podemos llamarlo respondiendo con un `messageData` como el siguiente

```js
const messageData = {
  "recipient":{
    "id":"<PSID>"
  },
  "message":{
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"generic",
         "elements":[
                      {
                        "title":"<TITLE_TEXT>",
                        "image_url":"<IMAGE_URL_TO_DISPLAY>",
                        "subtitle":"<SUBTITLE_TEXT>",
                        "default_action": {
                          "type": "web_url",
                          "url": "<DEFAULT_URL_TO_OPEN>",
                          "messenger_extensions": "<TRUE | FALSE>",
                          "webview_height_ratio": "<COMPACT | TALL | FULL>"
                        },
                        "buttons":["<BUTTON_OBJECT>, ..."]      
                      }
          ]
      }
    }
  }
}
```

Donde elements es un array que contiene objetos que representan a cada uno de los elementos que queremos mostrar.


## Responder con imagenes

Se puede responder con imagenes o gifs usando el `messageData`
```js
const messageData = {
        "recipient":{
            "id":"<senderId>"
          },
          "message":{
            "attachment": {
              "type": "image",
              "payload": {
                       "url": "<URL_IMAGE>Z"
                    }
            }    
          }
    }
```

## Responder con un boton para llamar
Podemos enviar, por ejemplo, un boton de contacto para llamadas, esto permitira que si el usuario se encuentra hablando con nuestro bot desde el celular automaticamente nuestro bot activara la llamada telefónica cuando el usuario presione el boton

```js
const messageData = {
  "recipient":{
    "id":"<PSID>"
  },
  "message":{
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text":"What do you want to do next?",
        "buttons":[
          {
            "type":"web_url",
            "url":"https://www.messenger.com",
            "title":"Visit Messenger"
          },
          {
            ...
          },
          {...}
        ]
      }
    }
  }
}
```
## Crear un recibo de pago

Con el `messageData`

```js
const messageData = {
   "recipient":{
    "id":"<PSID>"
  },
  "message":{
    "attachment":{
      "type":"template",
      "payload":{
         "template_type":"receipt",
  "recipient_name":"<CUSTOMER_NAME>",
  "order_number":"<ORDER_NUMBER>",
  "currency":"<CURRENCY_CODE>",
  "payment_method":"<PAYMENT_METHOD_USED>",        
  "order_url":"<LINK_TO_ORDER_SUMMARY>",
  "timestamp":"<ORDER_TIME_AS_POSIX_TIMESTAMP>",         
  "address":{
    "street_1":"<SHIPPING_STREET_ADDRESS>",
    "city":"<SHIPPING_CITY>",
    "postal_code":"<SHIPPING_POSTAL_CODE>",
    "state":"<SHIPPING_STATE>",
    "country":"<SHIPPING_COUNTRY>"
  },
  "summary":{
    "subtotal": <SUBTOTAL_AMOUNT>,
    "shipping_cost": <SHIPPING_AMOUNT>,
    "total_tax": <TAX_AMOUNT>,
    "total_cost": <TOTAL_AMOUNT>
  },
  "adjustments":[
    {
      "name": "<ADJUSTMENT_NAME>",
      "amount": <ADJUSTMENT_AMOUNT>
    },
    ...
  ],
  "elements":[
    {
      "title": "<ITEM_NAME>",
      "subtitle":"<ITEM_DESCRIPTION_OR_DETAILS>",
      "quantity": <QUANTITY>,
      "price": <ITEM_PRICE>,
      "currency": "<CURRENCY_ABBREVIATION",
      "image_url":"<URL_IMAGE_TO_DISPLAY_FOR_ITEM>"
    },
    ...
  ]     
      }
    }
  }
}
```






