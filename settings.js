global.settings = {
  //General settings
  bot_token: "NDAwNDQ4MDIzNDQ2MTU5MzYx.WlVgSA._CQbdQlFb8nYtYPIx2zpCCG-1NM",
  prefix: "+",
  no_space: true,
  visual_prompt_delay: 5000, //How many milliseconds should the bot wait before moving onto the next visual prompt?

  bot_colour: "#a98ac7", //What is the main default colour that should appear on bot embeds?
  bot_header_colour: "#e22626", //What is the default colour that should appear on the top header?
  cache_channels: [
    "901464985916538880",
    "901465004526686250",
    "901465025661788170",
    "901465032544645161",
    "901465038919987271",
    "901465051062480927",
    "901465060403187734",
    "901465075804696577",
    "901465085053141072",
    "901465092795818044",
    "901465116531384370",
    "901465126073405481",
    "901465135120519198",
    "901465144859688960",
    "901465154624041021",
    "901465163536937041",
    "901465172210749531",
    "901465179739541564",
    "901465198018306099",
    "901465207006691378"
  ], //What are the ID's of all the cache channels to which the bot may randomly upload? (This helps increase 'bandwidth' and reduces rate limiting)
  tt_category_id: "856049598178656257", //What is the ID of the category where new games should be created?

  backup_limit: 15, //How many concurrent backups should be saved before old ones are purged?
  backup_timer: 600, //Save every 10 minutes
  inactivity_timer: 600, //How much time should pass in seconds before a game is considered inactive?
  turn_timer: 10800 //How much time should pass in seconds before a new turn passes?
};
