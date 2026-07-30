//Make sure to rename this file to settings.js in the root directory.
global.settings = {
  //General settings
  administrator_roles: [], //string[]: Role ID's for administrators
  bot_token: "<INSERT_YOUR_BOT_TOKEN_HERE>",
  debug_mode: true,
  prefix: "$",
  no_space: true,
  threads: 5, //How many threads should be used and allocated across multiple cores? This includes the main thread. Recommended minimum of 3.
  visual_prompt_delay: 5000, //How many milliseconds should the bot wait before moving onto the next visual prompt?

  alert_channel: "<channel_id>", //This is the default channel for queue alerts
  bot_colour: "#a98ac7", //What is the main default colour that should appear on bot embeds?
  bot_header_colour: "#e22626", //What is the default colour that should appear on the top header?
  cache_channels: [], //What are the ID's of all the cache channels to which the bot may randomly upload? (This helps increase 'bandwidth' and reduces rate limiting)
  citizen_role: "<role_id>", //string: Role ID to respond to
  ignore_channels: [], //Which channels should the bot not respond to commands in?
  tt_category_id: [], //What are the IDs of the category where new games should be created?

  backup_limit: 15, //How many concurrent backups should be saved before old ones are purged? Set to 0 for unlimited backups.
  backup_timer: 600, //Save every 10 minutes
  inactivity_timer: 600, //How much time should pass in seconds before a game is considered inactive?
  turn_timer: 10800 //How much time should pass in seconds before a new turn passes?
};
