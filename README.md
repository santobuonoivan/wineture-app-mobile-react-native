# Wineture App

Aplicación Expo + React Native configurada con Expo Router, NativeWind y la Nueva Arquitectura.

## Requisitos previos

- [Node.js](https://nodejs.org/) 18 LTS o superior (incluye `npm`).
- Git para clonar el repositorio.
- Herramientas de plataforma si vas a ejecutar builds nativos:
  - Android: Android Studio + SDK 35, emulador Pixel recomendado.
  - iOS (opcional): Xcode 15 o superior en macOS.
- Expo CLI (opcional). Puedes trabajar perfectamente con `npx expo`.

## Instalación inicial

```bash
# 1. Clonar el repo
git clone git@github.com:santobuonoivan/wineture-app-mobile-react-native.git
cd wineture-app-mobile-react-native

# 2. Instalar dependencias JS
npm install

# 3. Validar el proyecto (opcional pero recomendado)
npx expo-doctor@latest
```

## Desarrollo diario

### Iniciar Metro Bundler

```bash
npx expo start --clear
```

- Presiona `a` para abrir Android, `w` para web, `s` para Expo Go en dispositivo.
- El flag `--clear` limpia la caché cada vez que cambias la configuración (NativeWind, Babel, etc.).

### Ejecutar Builds con Nueva Arquitectura

La app tiene `"newArchEnabled": true` en `app.json`. Para probar exactamente el mismo entorno que irá a producción, usa un dev build:

```bash
# Android (instala un APK con soporte para la nueva arquitectura)
npx expo run:android --variant devDebug

# iOS (solo macOS)
npx expo run:ios --configuration Debug
```

Una vez instalado el dev build, vuelve a ejecutar `npx expo start` y escanea el QR en modo `development build`.

## Guía de instalación de herramientas

1. **Node + npm**: descarga el instalador desde nodejs.org y reinicia la terminal.
2. **Android Studio**:
   - Instala los SDK Platforms y Platform Tools recomendados por Expo (API 35).
   - Crea un emulador (Pixel 6/8). Asegúrate de habilitar Intel HAXM/Hyper-V según tu SO.
3. **Expo CLI (opcional)**:
   ```bash
   npm install --global expo-cli
   ```
4. **Watchman (solo macOS)**: mejora el hot reload (`brew install watchman`).
5. **VS Code + extensiones**: recomendadas _ESLint_, _Prettier_ y _Tailwind CSS IntelliSense_.

## Comandos útiles

| Comando                                   | Descripción                                            |
| ----------------------------------------- | ------------------------------------------------------ |
| `npx expo start --clear`                  | Arranca Metro y Expo Dev Tools limpiando caché.        |
| `npx expo run:android --variant devDebug` | Genera/instala un build nativo con nueva arquitectura. |
| `npx expo-doctor@latest`                  | Revisa dependencias y configuración.                   |
| `npm test`                                | (Reservado) Ejecuta pruebas si se añaden.              |

## Problemas comunes

- **Warn sobre SafeAreaView**: ya se utiliza `react-native-safe-area-context`, asegúrate de reiniciar Metro si ves ese warning.
- **Reload infinito en Android**: ocurre si abres el proyecto con Expo Go sin build nuevo. Usa un dev build o desactiva temporalmente la nueva arquitectura en `app.json` si solo necesitas probar rápidamente.
- **NativeWind no aplica estilos**: verifica que `app/_layout.tsx` importe `../global.css` y reinicia Metro con `--clear`.

## Próximos pasos

- Conectar el formulario de login (`components/LoginForm`) con tu backend real.
- Añadir lógica de almacenamiento seguro (SecureStore / MMKV) para token y persistencia de sesión.
- Configurar CI/CD (EAS Build) si planeas publicar en stores.
