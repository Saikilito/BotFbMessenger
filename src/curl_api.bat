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

%Para configurar un menu%
curl -X POST -H "Content-Type: application/json" -d '{
    "persistent_menu": [
        {
            "locale": "default",
            "composer_input_disabled": false,
            "call_to_actions": [
                {
                    "title": "TestBot",
                    "type": "nested",
                    "call_to_actions": [
                        {
                            "title": "Acerca",
                            "type": "postback",
                            "payload": "ABOUT_PAYLOAD"
                        }
                    ]
                },
                {
                    "title": "Menu de Productos",
                    "type": "nested",
                    "call_to_actions": [
                        {
                            "title": "Products",
                            "type": "postback",
                            "payload": "PRODUCT_PAYLOAD"
                        }
                    ]
                },
                {
                    "title": "Pagina Web",
                    "type": "web_url",
                    "url": "https://azordev.com/",
                    "webview_height_ratio": "full"
                }
            ]
        }
    ]
}' "https://graph.facebook.com/v2.6/me/messenger_profile?access_token=<PAGE_ACCESS_TOKEN>"