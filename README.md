# Tracker Lite

This application is a tool for tracking player statistics for Bedwars on the Hypixel server.
![Image](http://zip.itsduel.com/u/EwFMzK.png)

## How to Build

To build this application, you will need to have [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) installed on your system.


1. Clone this repository to your local machine.
2. Open a terminal or command prompt and navigate to the project directory.
3. Run the following command to install the required dependencies:

      ```npm install```

4. Once the installation is complete, run the following command to build the application:

      ```npm run build```


This will generate a `dist` directory containing the compiled JavaScript files.

## How to Use

To use this application, follow these steps:

1. Download the latest release of the application from the [GitHub releases page](https://github.com/Dueel/Tracker-Lite/releases).
2. Open the application and it will prompt you for your API key if you are a first time user. Enter your API key and click "Enter".
3. After entering your API key, you can start tracking player statistics by entering the player(s) Minecraft username in the prompt it gives.
4. The application will retrieve the player's Bedwars statistics and display them when their stats has been updated.
5. You can track multiple players by entering their usernames in the search bar separated by spaces (e.g. "player1 player2 player3").
6. The application tracks the following statistics (For all Normal Modes):

- Games played
- Wins
- Losses
- Final kills
- Final deaths
- Bed Destructions
- Beds lost

The statistics are updated in real-time as the player's information is retrieved from the Hypixel API. 

Note: In order to use this application, you must have an API key from the Hypixel server. You can obtain a key by joining the server and running `/api new`.

## Todo
- Add Antisniper API Support
- Add Custom Delays
- Add API Abuse (Mutiple API Keys)
- Discord Bot Intergration
- Fix +NaN when adding a new Players Fresh Data
- Add more checks to make sure UUIDs/API Key(s) are vaild
