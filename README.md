# Parrot App

Parrot App ist eine Anwendung, die es älteren und einsamen Menschen ermöglicht, 
mit einer AI per Nachrichten und Anrufen zu kommunizieren, um Einsamkeit zu reduzieren. 
Die App verwendet moderne KI-Technologien, um menschenähnliche Unterhaltungen zu führen
und Benutzern Gesellschaft zu leisten.

## Inhaltsverzeichnis

- [Features](#features)
- [Installation](#installation)
- [Verwendung](#verwendung)
- [Konfiguration](#konfiguration)
- [Mitwirkende](#mitwirkende)
- [Lizenz](#lizenz)

## Features

- Textbasierte Kommunikation mit einer AI
- Sprachbasierte Anrufe mit einer AI
- Benutzerregistrierung und Authentifizierung
- Verwaltung von Unterhaltungen
- Unterstützung für mehrere Benutzer

## Installation

### Voraussetzungen

- Node.js (Version 14 oder höher)
- MongoDB
- Docker (optional, für die Verwendung von Rasa)

### Schritte zur Installation

1. **Repository klonen:**
   git clone https://github.com/OlympeDeGouges/Parrot.git
   cd Parrot



2. **Abhängigkeiten installieren:**
   yarn install

3. **Datenbank einrichten:**
  Stellen Sie sicher, dass MongoDB läuft und konfigurieren Sie die Verbindung in der .env-Datei.

4. **Rasa einrichten (optional, falls Docker verwendet wird):**
  Erstellen Sie eine docker-compose.yml Datei und fügen Sie die folgenden Inhalte hinzu:

yaml

version: '3.0'

services:
  rasa:
    image: rasa/rasa:latest-full
    ports:
      - "5005:5005"
    volumes:
      - ./rasa:/app
    command:
      - run
      - -m
      - /app/models
      - --enable-api
      - --cors
      - "*"
    environment:
      - RASA_X_PASSWORD=<your_password>

5. **Initialisieren Sie das Rasa-Projekt:**
    mkdir rasa
    cd rasa
    docker run -v $(pwd):/app rasa/rasa:latest-full init --no-prompt
    cd ..
    docker-compose up

6. **Verwendung**

## Backend starten:
cd packages/backend
node server.js

## Frontend starten:
    cd packages/frontend
    yarn start

    App im Browser öffnen:

    Besuchen Sie http://localhost:3000, um die Anwendung zu nutzen.

7. **Konfiguration**

Konfigurieren Sie die Umgebungsvariablen in der .env-Datei:

env

MONGODB_URI=mongodb://localhost:27017/parrotAppDB
JWT_SECRET=your_jwt_secret
PORT=3001
WIT_TOKEN=your_wit_ai_token

8. **Mitwirkende**
 ### Tatjana brankovic

Lizenz

Dieses Projekt steht unter der MIT-Lizenz. Siehe die LICENSE Datei für weitere Details.
