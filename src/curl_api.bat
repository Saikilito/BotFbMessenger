%Para activar el boton de bienvenida%

X POST -H "Content-Type: application/json" -d '{
  "get_started": {"payload": "<postback_payload>"}
}' "https://graph.facebook.com/v2.6/me/messenger_profile?access_token=<PAGE_ACCESS_TOKEN>"

%Para configurar el boton de bienvenida%
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
