const axios = require('axios');

async function getUUID(name) {
  try {
    const response = await axios.get(`https://api.mojang.com/users/profiles/minecraft/${name}`);
    const data = response.data;
    if (data && data.id) {
      return data.id;
    }
    console.log(`No UUID found for ${name}`);
  } catch (error) {
    console.error(`Error getting UUID for ${name}: ${error.message}`);
  }
}

module.exports = {
  getUUID
};
