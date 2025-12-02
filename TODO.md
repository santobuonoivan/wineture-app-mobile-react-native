faltan:

- ✅ completar un diseño de order/history
  - ✅ usar el find que tra la lista pero otrdenado por fecha desendente donde esté la mas nueva arriba

- ✅ idem con el history de visitas

- PROBAR los metodos de pago y flujos recomendados.
- tokenizaciónd e tarjetas

- ver el menu lateral que va a tener como opciones

- ✅ ver login con datos reales, guardar datos del perfil y el token(validez cada 15min) y el refresh token
  - ✅ Login con Keycloak (OAuth2/OIDC con PKCE)
  - ✅ Guardar datos del perfil (id, email, name, lang)
  - ✅ Guardar tokens (accessToken, refreshToken, idToken) en SecureStore
  - ✅ Validez de 15min - se calcula y guarda tokenExpires
  - ✅ Refresh automático - nuevo sistema con getValidAccessToken() que refresca si expira
  - ✅ Integrado en getOrdersByUser() y getVisitsByUser()
