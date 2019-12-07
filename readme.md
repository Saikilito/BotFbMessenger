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

Esto debería verse de la siguiente forma
