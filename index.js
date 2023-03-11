const saveData = require('./src/saveData');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const appDataPath = process.env.APPDATA || (process.platform === 'darwin' ? process.env.HOME + '/Library/Preferences' : `${process.env.HOME}/.local/share`);
const folderPath = path.join(appDataPath, 'TrackerLite');
const configPath = path.join(folderPath, 'config.json');
let apiKey = '';
if (fs.existsSync(configPath)) {
  const configData = JSON.parse(fs.readFileSync(configPath));
  apiKey = configData.apiKey;
}

function name() {
  console.clear();
  console.log(chalk.hex('#62178a')(`%c
████████╗██████╗  █████╗  ██████╗██╗  ██╗███████╗██████╗     ██╗     ██╗████████╗███████╗
╚══██╔══╝██╔══██╗██╔══██╗██╔════╝██║ ██╔╝██╔════╝██╔══██╗    ██║     ██║╚══██╔══╝██╔════╝
   ██║   ██████╔╝███████║██║     █████╔╝ █████╗  ██████╔╝    ██║     ██║   ██║   █████╗  
   ██║   ██╔══██╗██╔══██║██║     ██╔═██╗ ██╔══╝  ██╔══██╗    ██║     ██║   ██║   ██╔══╝  
   ██║   ██║  ██║██║  ██║╚██████╗██║  ██╗███████╗██║  ██║    ███████╗██║   ██║   ███████╗
   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝    ╚══════╝╚═╝   ╚═╝   ╚══════╝
  By Duel`), `font-family: monospace`);
}

if (!apiKey) {
  name();
  console.log(chalk.hex('#62178a')('\nAPI key is missing! Please enter it below:'));
  readline.question('', input => {
    apiKey = input.trim();
    fs.writeFileSync(configPath, JSON.stringify({ apiKey }));
    startTracking();
    readline.close();
  });
} else {
  startTracking();
}

function startTracking() {
  console.clear();
  name();
  const promptMessage = chalk.hex('#62178a')('\nEnter player names to track (separated by space) or type "quit" to exit: ');

  readline.question(`${promptMessage}`, input => {
    if (input.toLowerCase() === 'quit') {
      console.log('Exiting...');
      readline.close();
    } else {
      const names = input.split(' ').map(name => name.trim());
      for (const name of names) {
        saveData.loadData(name);
      }
      saveData.startAutoUpdate();
      readline.close();
    }
  });
}
