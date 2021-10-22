//Import libraries
global._ = require("underscore");
global.Canvas = require("canvas");
global.Discord = require("discord.js");
global.fs = require("fs");
global.Graph = require("ngraph.graph");
global.Path = require("ngraph.path");
global.Settings = require("settings");

//Import Core framework
const FileManager = require("./core/file_manager");

//Import Core functions and settings
FileManager.import("./settings");

//Initialise Discord client
global.client = new Discord.Client({
  intents: [
    1, 4, 8, 16, 32, 64, 128, 512, 1024, 2048, 4096, 8192, 16384
  ]
});
client.login(settings.bot_token);

//Global error handling
