
# Feedme – Mensa-App der Gruppe 06 🍽️🌿
_erstellt über GitHub Classroom_
https://miro.com/app/board/uXjVI3wra9A=/
---

## 👨‍👩‍👧 Gruppenmitglieder

| Name             | Matrikelnummer |
|------------------|----------------|
| Marwa Omran      | 589105         |
| Faranak Yekdaneh | 592074         |

---

## 📱 Über die App

**Feedme** ist eine moderne, naturinspirierte App für Studierende der HTW Berlin.  
Sie bietet schnelle und klare Informationen zu allen Berliner Mensen – ideal für den Uni-Alltag essen mitHilfe von KI.

Die App wurde mit einem eleganten, naturfreundlichen Design entwickelt, das gleichzeitig funktional und benutzerfreundlich ist.

---

## 🧩 Features

- Übersicht aller Berliner Mensen mit Details
- Anzeige der Öffnungs- und Schließzeiten
- Speiseplan pro Mensa mit Preisen
- Lieblingsmensa & Lieblingsspeisen speichern
- KI-basiertes „Surprise Me“-Feature
- Offline-Nutzung durch lokale Speicherung
- Nutzerfreundliches UI/UX mit klarer Struktur
- Fehlerbehandlung bei API/Internetproblemen

---

## ⚙️ Technische Implementierung

### ✅ Pflichtanforderungen

- Daten werden lokal beim ersten Start gespeichert
- Nutzung der offiziellen Mensa-API:  
  [https://mensa.gregorflachs.de](https://mensa.gregorflachs.de)  
  Dokumentation: [Swagger-Doku](https://mensa.gregorflachs.de/swaggerdoku)
- Datenbank mit ID, Name, Adresse je Mensa
- Favoritenfunktion für Mensa/Speisen
- Anzeige pro Wochentag und Tagesmenü inkl. Preisgruppen
- Fehleranzeigen bei Serverfehlern oder Internetmangel

### 💡 Technische Hinweise

- Entwickelt mit: **React Native (Expo)**
- Programmiersprache: **TypeScript**
- Zustandsspeicherung über lokale Daten & AsyncStorage
- API-Zugriff über fetch mit Key-Authentifizierung
- Design orientiert an nature colors + responsive UI
- Alle Dateien sind strukturiert nach Komponenten, Hooks, Assets

---

## 🧠 The KI Feature

## The KI Feature uses Google's Gemini API to analyze the daily meal list and intelligently suggest the most suitable option along with a short explanation, mimicking human decision-making.

---

## 🚀 Setup & Installation

### 1. Install dependencies
# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
## The KI Feature uses Google's Gemini API to analyze the daily meal list and intelligently suggest the most suitable option along with a short explanation, mimicking human decision-making.
