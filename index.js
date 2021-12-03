//setup
const Aoijs = require('aoi.js');
const fs = require('fs');
const config = require('./config.js');
const bot = new Aoijs.Bot(config.Bot);
const dotenv = require('dotenv');
dotenv.config();

//distube
const filters = require('./filters.json')
const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");
const spotifyoptions = {
  parallel: true,
  emitEventsAfterFetching: true,
  api: {
    clientId: process.env.spotify_client_id, // Spotify clientID
    clientSecret: process.env.spotify_client_secret, // Spotify clientSecret
  },
}



bot.distube = new DisTube(bot, {
emitNewSongOnly: false,
    leaveOnEmpty: false,
    leaveOnFinish: false,
    leaveOnStop: false,
    savePreviousSongs: true,
    emitAddSongWhenCreatingQueue: false,
    nsfw: false,
    emptyCooldown: 25,
    customFilters: filters,
  plugins: [new SpotifyPlugin(spotifyoptions)]
}) 

//configs
require('./handler/status')(bot)
require('./handler/variables')(bot)
require('./handler/callbacks')(bot)
require('./handler/functions')(bot)
require('./handler/DistubeEvents')(bot)

//loader
const loader = new Aoijs.LoadCommands(bot);
(async () => {
await loader.load(bot.cmd, "./commands/")
})()

loader.setColors( loader.themes.default );

//events
const files = fs.readdirSync('./events').filter(file => file.endsWith('.js'))
files.forEach( x => {
require(`./events/${x}`)(bot)
});

