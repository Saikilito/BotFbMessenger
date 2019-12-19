# Enviar y recibir mensajes

Lo primero que debemos hacer es dentro de la plataforma de desarrollo de facebook ubicarnos dentro de nuestra aplicación.

En el apartado de configuración de messeger (se encuentra en el sidebar izquierdo) encontraremos la documentación necesaria para conectarnos.

## Conectar nuestro webhook

En el apartado de configuración de messeger encontraremos un apartado para webhook, al entrar se abrira un modal que nos pedirá la url de llamada, ahí colocaremos la url `https` que nos ha habilitado el ngrok `{PATH}/webhook/`.

También nos va a solicitar el coódigo que nosotros le configuramos en nuestro servidor (`botTest_token` en este caso).

Si la configuración es correcta hasta el momento nos va a confirmar. Luego debemor ir unas opciónes más arriba y usar la opción de generar token, luego volvemos a la sección de webhook y suscribimos, para los campos de suscripción mínimos para enviar, recibir mensajes y crear un menu escogemos las opciones `messages`, `messagging_postbacks` y `messaging_options`.

## Recibir mensajes

Un vez configurado y conectados al webhook esta disponible para recibir mensajes mediante `POST` en el cuerpo del request para el atributo `entry[0].messagin`.

## Enviar mensajes

Nuestro bot podra responder mensajes enviando un `POST` a la uri de `https://graph.facebook.com/me/messages/` esta uri debe ir acompañada de access token que nos genero facebook para acceder a ella, el cuerpo de la respuesta debe tener como mínimo la siguiente estructura

```json
{
  "recipient": {
    "id": "senderId"
  },
  "message": {
    "text": "messageText"
  }
}
```
# Integración de boton de Empezar

Esto se hace haciendo una peticion con `curl`, para los usuarios de windows es recomendable usar el git bach o una terminal que este configurada para batch, la linea de comando por si puede generar problemas al enviar la petición.

```batch
X POST -H "Content-Type: application/json" -d '{
  "get_started": {"payload": "<postback_payload>"}
}' "https://graph.facebook.com/v2.6/me/messenger_profile?access_token=<PAGE_ACCESS_TOKEN>"

```

Luego debemos configurar la información que vamos a mostrar en la pantalla

```batch
curl -X POST -H "Content-Type: application/json" -d '{
  "greeting": [
    {
      "locale":"default",
      "text":"Hello!" 
    }, {
      "locale":"en_US",
      "text":"Hi {{user_fist_name}}"
    }
  ]
}' "https://graph.facebook.com/v2.6/me/messenger_profile?access_token=<PAGE_ACCESS_TOKEN>"

```

# Configurar el menú

Para enviar la configuración que nos permite habilitar un menu persistente en nuestro bot enviamos un JSON por curl con la siguiente forma

```JSON
{
    "persistent_menu": [
        {
            "locale": "default",
            "composer_input_disabled": false,
            "call_to_actions": [
                {
                    "type": "postback",
                    "title": "Talk to an agent",
                    "payload": "CARE_HELP"
                },
                {
                    "type": "postback",
                    "title": "Outfit suggestions",
                    "payload": "CURATION"
                },
                {
                    "type": "web_url",
                    "title": "Shop now",
                    "url": "https://www.originalcoastclothing.com/",
                    "webview_height_ratio": "full"
                }
            ]
        }
    ]
}
```

El ```"composer_input_disabled":true ``` es una opción la cual le permitira al usuario poder escribir o no en el chat, esto es perfecto para cuando queremos que el usuario solo interactue con nuestro bot directamente desde el menu persistente.

El ```payload``` Se suele escribir en mayusculas, es recomendable tener un formato determinado para poder identificarlos rápidamente por lo que otra recomendación es colocarle una terminación del tipo ```"payload":"NAME_PAYLOAD"```

El ```"type":"web_url"``` se usa para mostrar páginas web

## Manejo de eventos

En este caso crearemos una nueva función `handleEvent` en nuestro código para hacer esto.

Como primer evento determinaremos si el lo que estamos recibiendo es un mensaje y si es así invocaremos la funcion `handleMessage` la cual se encargara de manejar este tipo de evento en particular.

Dentro de los mensajes pueden venir diferente tipo de información, lo más comun es un formato de texto lo cual nos llegara dentro de nuestro objeto evento como `evento.text`, pero también podríamos recibir información de tipo audio, imagenes, archivos o videos los cuales recibiremos dentro de nuestro objeto evento como `evento.attachments` el cual contendrá un array con todos la información adjunta recibida, para poder manejar correctamente esta información crearemos una funcion `handleAttachments` para poder discriminar cada tipo de información adjunta recibida que no sea texto y además poder tratarla de la forma que deseemos.

### Respuestas rápidas
En nuestro manejador de mensajes podemos definir una función `defaultMessage` en ella podemos asignar un mensaje por defecto el cual respondera el bot al recibir un texto pero también podemos darle opciónes para escoger esto lo logramos, por ejemplo, enviando el siguiente `messageData`
```js
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
```


### Animación de tipeo
Una opción intersante y comun es mostrar antes de responder cada mensaje una animación de tipeo, esto lo podemos lograr muy facil, en nuestro caso crearemos una función `senderActions` la cual debemos invocar antes de responder cada mensaje y que tendra un `messageData` de la siguiente forma

```js
    const messageData = {
        "recipient":{
            "id": senderId
        },
        "sender_action":"typing_on"
    }
```

Dentro de `sender_action` tambien podemos usar las opciones de 
* `mark_seen` el cual nos permite dejar los mensajes en visto
* `typing_off` el cual nos permite ignorar los mensajes recibidos








