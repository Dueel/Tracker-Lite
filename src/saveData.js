const { getUUID } = require('./getUUID');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const axios = require('axios');

const appDataPath = process.env.APPDATA || (process.platform === 'darwin' ? process.env.HOME + '/Library/Preferences' : `${process.env.HOME}/.local/share`);
const folderName = 'TrackerLite';
const folderPath = path.join(appDataPath, folderName);
if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath);
}

const playerDataPath = path.join(folderPath, 'playerData');
if (!fs.existsSync(playerDataPath)) {
  fs.mkdirSync(playerDataPath);
}

let apiKey = '';
const configPath = path.join(folderPath, 'config.json');


const TRACKED_STATS = [
    'games_played_bedwars_1',
    'losses_bedwars',
    'wins_bedwars',
    'final_kills_bedwars',
    'final_deaths_bedwars',
    'beds_broken_bedwars',
    'eight_one_wins_bedwars',
    'eight_one_losses_bedwars',
    'eight_two_wins_bedwars',
    'eight_two_losses_bedwars',
    'four_three_wins_bedwars',
    'four_three_losses_bedwars',
    'four_four_wins_bedwars',
    'four_four_losses_bedwars',
];

const players = [];

async function updateData(playerData) {
    try {
        let uuid = playerData.uuid;
        if (!uuid) {
            uuid = await getUUID(playerData.name);
            playerData.uuid = uuid;
            saveDataToFile(playerData);
        }
        const configData = JSON.parse(fs.readFileSync(configPath));
        apiKey = configData.apiKey;
        const response = await axios.get(`https://api.hypixel.net/player?key=${apiKey}&uuid=${uuid}`);
        const result = response.data;
        if (result.success) {
            const player = result.player;
            let updatedStats = [];

            for (const stat of TRACKED_STATS) {
                const value = player.stats.Bedwars[stat];
                if (!isNaN(value) && playerData[stat] !== value) {
                    const formattedStat = stat.replace(/_/g, ' ').replace(/\b(\w)/g, c => c.toUpperCase());
                    const statChange = value - playerData[stat];
                    updatedStats.push(`${formattedStat}: +${statChange}`);
                    playerData[stat] = value;
                }
            }            

            if (updatedStats.length > 0) {
                const formattedName = playerData.name.replace(/\b(\w)/g, c => c.toUpperCase());
                console.log(chalk.green(`\n[${new Date().toLocaleTimeString()}] Updated stats for ${formattedName}:`));
                console.log(updatedStats.join('\n'));
                saveDataToFile(playerData);
            }

        } else {
            console.error(chalk.red(`Error updating data for ${playerData.name}: ${result.cause}`));
        }
    } catch (error) {
        console.error(chalk.red(`Error updating data for ${playerData.name}: ${error.message}`));
    }
}

function saveDataToFile(playerData) {
    fs.writeFileSync(path.join(playerDataPath, `${playerData.name}.json`), JSON.stringify(playerData));
}

function loadData(name) {
    const filename = path.join(playerDataPath, `${name}.json`);
    if (fs.existsSync(filename)) {
        const data = JSON.parse(fs.readFileSync(filename));
        players.push(data);
        console.log(chalk.green(`Loaded data for ${name}.`));
    } else {
        console.log(chalk.red(`Loading data for ${name}...`));
        const playerData = { name };
        players.push(playerData);
        saveDataToFile(playerData);
        console.log(chalk.green(`Added data for ${name}.`));
    }
}

function startAutoUpdate() {
    setInterval(() => {
        players.forEach(playerData => {
            updateData(playerData);
        });
    }, 10000);
}

module.exports = { loadData, startAutoUpdate };
