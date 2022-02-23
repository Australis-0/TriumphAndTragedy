//Node.js imports
global._ = require("underscore");
global.bn_graph = require("ngraph.graph");
global.bn_path = require("ngraph.path");
global.Canvas = require("canvas");
global.diacriticless = require("diacriticless"); //TODO: install
global.Discord = require("discord.js");
global.fs = require("fs");
global.HTML = require("node-html-parser");
global.opus = require("opusscript");
global.path = require("path");
global.voice = require("@discordjs/voice");

//Import Core Framework
const FileManager = require("./core/file_manager");

//Import Core Functions
FileManager.import("./ABRS");

FileManager.import("./framework/arrays");
FileManager.import("./framework/colours");
FileManager.import("./framework/log");
FileManager.import("./framework/numbers");
FileManager.import("./framework/strings");
FileManager.import("./framework/users");

FileManager.import("./framework/data/alert_framework");
FileManager.import("./framework/data/army_framework");
FileManager.import("./framework/data/base_user_initialisation");
FileManager.import("./framework/data/blockade_framework");
FileManager.import("./framework/data/buildings_framework");
FileManager.import("./framework/data/casus_belli_framework");
FileManager.import("./framework/data/combat_framework");
FileManager.import("./framework/data/culture_framework");
FileManager.import("./framework/data/diplomacy_framework");
FileManager.import("./framework/data/games");
FileManager.import("./framework/data/global_initialisation");
FileManager.import("./framework/data/goods_framework");
FileManager.import("./framework/data/government_framework");
FileManager.import("./framework/data/laws_framework");
FileManager.import("./framework/data/localisation_framework");
FileManager.import("./framework/data/modifier_framework");
FileManager.import("./framework/data/optimisation_framework");
FileManager.import("./framework/data/peace_treaty_framework");
FileManager.import("./framework/data/politics_framework");
FileManager.import("./framework/data/pop_framework");
FileManager.import("./framework/data/tech_framework");
FileManager.import("./framework/data/trade_framework");
FileManager.import("./framework/data/turn_framework");
FileManager.import("./framework/data/unit_framework");
FileManager.import("./framework/data/user_framework");
FileManager.import("./framework/data/war_framework");

FileManager.import("./framework/discord/channels");
FileManager.import("./framework/discord/button_handler");
FileManager.import("./framework/discord/command_handler");
FileManager.import("./framework/discord/inactivity_clearer");
FileManager.import("./framework/discord/permissions_handler");
FileManager.import("./framework/discord/reaction_framework");
FileManager.import("./framework/discord/select_handler");
FileManager.import("./framework/discord/users");

FileManager.import("./framework/map/map_renderer");
FileManager.import("./framework/map/province_renderer");

FileManager.import("./framework/ui/alert_interface");
FileManager.import("./framework/ui/army_interface");
FileManager.import("./framework/ui/buildings_interface");
FileManager.import("./framework/ui/budget_interface");
FileManager.import("./framework/ui/casus_belli_interface");
FileManager.import("./framework/ui/cities_interface");
FileManager.import("./framework/ui/colonisation_interface");
FileManager.import("./framework/ui/country_interface");
FileManager.import("./framework/ui/culture_interface");
FileManager.import("./framework/ui/customisation_interface");
FileManager.import("./framework/ui/diplomacy_interface");
FileManager.import("./framework/ui/economy_interface");
FileManager.import("./framework/ui/games");
FileManager.import("./framework/ui/global_market_interface");
FileManager.import("./framework/ui/government_interface");
FileManager.import("./framework/ui/laws_interface");
FileManager.import("./framework/ui/map_viewer");
FileManager.import("./framework/ui/military_interface");
FileManager.import("./framework/ui/page_handler");
FileManager.import("./framework/ui/peace_treaty_interface");
FileManager.import("./framework/ui/politics_interface");
FileManager.import("./framework/ui/pops_interface");
FileManager.import("./framework/ui/provinces_interface");
FileManager.import("./framework/ui/tech_interface");
FileManager.import("./framework/ui/topbar_interface");
FileManager.import("./framework/ui/trade_interface");
FileManager.import("./framework/ui/ui_framework");
FileManager.import("./framework/ui/unit_interface");
FileManager.import("./framework/ui/war_interface");

//Game command files
FileManager.import("./game/actions/chop");
FileManager.import("./game/actions/mine");
FileManager.import("./game/actions/quarry");

FileManager.import("./game/buildings/build");
FileManager.import("./game/buildings/demolish");

FileManager.import("./game/colonisation/cancel_charter");
FileManager.import("./game/colonisation/settle");

FileManager.import("./game/country/create_country");
FileManager.import("./game/country/rename_country");
FileManager.import("./game/country/rename_primary_culture");
FileManager.import("./game/country/set_colour");
FileManager.import("./game/country/set_flag");
FileManager.import("./game/country/set_motto");

FileManager.import("./game/culture/add_accepted_culture");
FileManager.import("./game/culture/assimilate_all");
FileManager.import("./game/culture/assimilate");
FileManager.import("./game/culture/remove_accepted_culture");
FileManager.import("./game/culture/rename_culture_adjective");
FileManager.import("./game/culture/rename_culture");

FileManager.import("./game/diplomacy/allow_cede");
FileManager.import("./game/diplomacy/ally");
FileManager.import("./game/diplomacy/annex");
FileManager.import("./game/diplomacy/break_alliance");
FileManager.import("./game/diplomacy/call_ally");
FileManager.import("./game/diplomacy/cancel_justification");
FileManager.import("./game/diplomacy/cancel_military_access");
FileManager.import("./game/diplomacy/cancel_wargoal");
FileManager.import("./game/diplomacy/cede_province");
FileManager.import("./game/diplomacy/declare_war");
FileManager.import("./game/diplomacy/decrease_relations");
FileManager.import("./game/diplomacy/deny_cede");
FileManager.import("./game/diplomacy/end_rivalry");
FileManager.import("./game/diplomacy/improve_relations");
FileManager.import("./game/diplomacy/justify_war");
FileManager.import("./game/diplomacy/liberate");
FileManager.import("./game/diplomacy/lock_vassal_customisation");
FileManager.import("./game/diplomacy/military_access");
FileManager.import("./game/diplomacy/non_aggression_pact");
FileManager.import("./game/diplomacy/proclaim_guarantee");
FileManager.import("./game/diplomacy/rename_vassal_city");
FileManager.import("./game/diplomacy/rename_vassal_culture");
FileManager.import("./game/diplomacy/rename_vassal");
FileManager.import("./game/diplomacy/revoke_guarantee");
FileManager.import("./game/diplomacy/revoke_military_access");
FileManager.import("./game/diplomacy/rival");
FileManager.import("./game/diplomacy/send_peace_treaty");
FileManager.import("./game/diplomacy/set_vassal_colour");
FileManager.import("./game/diplomacy/set_vassal_flag");
FileManager.import("./game/diplomacy/set_vassal_motto");
FileManager.import("./game/diplomacy/sign_peace_treaty");
FileManager.import("./game/diplomacy/vassalise");

FileManager.import("./game/laws/enact_reform");

FileManager.import("./game/market/buy");
FileManager.import("./game/market/sell");

FileManager.import("./game/military/air_raid");
FileManager.import("./game/military/blockade");
FileManager.import("./game/military/carpet_siege");
FileManager.import("./game/military/challenge_blockade");
FileManager.import("./game/military/convoy_raid");
FileManager.import("./game/military/create_armies");
FileManager.import("./game/military/create_army");
FileManager.import("./game/military/delete_all_armies");
FileManager.import("./game/military/delete_armies");
FileManager.import("./game/military/delete_army");
FileManager.import("./game/military/demobilise");
FileManager.import("./game/military/deploy_units");
FileManager.import("./game/military/garrison_cities");
FileManager.import("./game/military/garrison_provinces");
FileManager.import("./game/military/harbour_raid");
FileManager.import("./game/military/lift_blockade");
FileManager.import("./game/military/mass_deploy");
FileManager.import("./game/military/mass_relieve");
FileManager.import("./game/military/merge_armies");
FileManager.import("./game/military/merge_army");
FileManager.import("./game/military/mobilise");
FileManager.import("./game/military/move_all_armies");
FileManager.import("./game/military/move_armies");
FileManager.import("./game/military/move_army");
FileManager.import("./game/military/options");
FileManager.import("./game/military/relieve_units");
FileManager.import("./game/military/rename_army");
FileManager.import("./game/military/split_armies");
FileManager.import("./game/military/split_army");
FileManager.import("./game/military/torpedo_fleet");
FileManager.import("./game/military/transfer_units");

FileManager.import("./game/politics/coup_government");
FileManager.import("./game/politics/raise_stability");
FileManager.import("./game/politics/set_government");
FileManager.import("./game/politics/set_tax");
FileManager.import("./game/politics/support_party");

FileManager.import("./game/province/cities");
FileManager.import("./game/province/settle_province");

FileManager.import("./game/technology/research");
FileManager.import("./game/technology/research_queue");

FileManager.import("./game/trade/cancel_auto_trade");
FileManager.import("./game/trade/create_auto_trade");
FileManager.import("./game/trade/give");

FileManager.import("./game/units/craft");
FileManager.import("./game/units/disband_units");

FileManager.import("./game/war/rename_war");

//Declare config loading order
global.config = {};
global.load_order = {
  load_directories: [
    "common",
    "events",
    "interface",
    "localisation"
  ],
  load_files: [
    ".config_backend.js",
    "icons.js"
  ]
};
FileManager.loadConfig();
FileManager.loadFile("settings.js");

//Initialise Discord.js client and related instance variables
global.client = new Discord.Client({ intents: [1, 4, 8, 16, 32, 64, 128, 512, 1024, 2048, 4096, 8192, 16384] });
global.backup_loaded = false;
global.interfaces = {};
global.visual_prompts = {};

client.login(settings.bot_token);

//Load DB from JSON
initOptimisation();
loadBackupArray();
loadMostRecentSave();

//Global error handling
process.on("unhandledRejection", (error) => {
  log.error(`Unhandled promise rejection. ${error.toString()}`);
  console.log(error);
});

//Reaction/interaction framework
client.on("interactionCreate", (interaction) => {
  buttonHandler(interaction);
  selectHandler(interaction);
});
client.on("messageReactionAdd", async (reaction, user) => {
  reactionHandler(reaction, user);
});

//Command handling
client.on("messageCreate", async (message) => {
  //Fetch local parameters
  username = message.author.username;
  user_id = message.author.id;
  input = message.content;

  //Parse arguments
  if (settings.no_space) input = input.replace(settings.prefix, `${settings.prefix} `);
  var arg = splitCommandLine(input);

  //Check output
  log.info(`
    Author: ${username}
    Arguments: ${arg.join(", ")}

    Original Content: ${input}
  `);

  if (!message.author.bot) {
    //Debug commands (these ones have a prefix)
    {
      if (equalsIgnoreCase(arg[0], settings.prefix)) {
        if (equalsIgnoreCase(arg[1], "console")) {
          if (message.member.roles.cache.find(role => ["549011413843050529", "828725714697846874"].includes(role.id))) {
            var full_code = [];
            for (var i = 2; i < arg.length; i++) full_code.push(arg[i]);

            eval(full_code.join(" "));

            //Send back prompt
            message.channel.send("Console command executed. Warning! This command can be highly unstable if not used correctly.").then((msg) => {
  						//Delete console command output after 10 seconds
  						setTimeout(function() { msg.delete(); }, 10000);
  					});
          }
        }
      }
    }

    //Lobby commands (these also have a prefix, with the exception of visual prompts)
    {
      if (equalsIgnoreCase(arg[0], settings.prefix)) {
        if (equalsIgnoreCase(arg[1], "play")) {
          createNewGame(user_id, message);
        }
      }
    }

    //Game input commands
    {
      if (getGame(user_id)) {
        var game_obj = interfaces[getGame(user_id)];

        if (game_obj.channel == message.channel.id) {
          message.delete();
          commandHandler(getGame(user_id), arg.join(" "));

          //Check if game is still active
          if (returnGameFromChannelID(message.channel.id))
            interfaces[returnGameFromChannelID(message.channel.id)].last_active = new Date().getTime();
        }
      }
    }
  }
});


//Logic loops, 1-second logic loop
setInterval(function(){
  //Cache interfaces
  main.interfaces = interfaces;

  //Initialise variables before anything else!
	initGlobal();

  //Delete inactive channels
  clearInactiveGames();

  //ABRS - Save backups!
	var current_date = new Date().getTime();
  var current_turn_time = 0;
  var battle_difference = current_date - returnSafeNumber(main.global.battle_tick);
	var time_difference = current_date - main.last_backup;
  var turn_time_difference = current_date - main.last_turn;

  //Backup processing
	if (time_difference > settings.backup_timer*1000) {
		main.last_backup = current_date;
		writeSave({ file_limit: settings.backup_limit });
	}

  //Combat processing
  if (battle_difference > (settings.turn_timer*1000)/10)
    nextBattleTick();

  //Date processing
  {
    if (main.date.year < 1750)
      current_turn_time = 2;
    else
      if (main.date.year >= 1914)
        current_turn_time = 0.25;
      else
        current_turn_time = 1;

    //This is how much time has elapsed in years
    var time_elapsed = current_turn_time*(1000/(settings.turn_timer*1000));
    var processed_time = parseYears(time_elapsed);

    //Add to date
    main.date.year += processed_time.year;
    main.date.month += processed_time.month;
    main.date.day += processed_time.day;
    main.date.hour += processed_time.hour;

    if (main.date.month > 12) {
      main.date.month = 1;
      main.date.year++;
    }
    if (main.date.day > processed_time.days_in_months[main.date.month - 1]) {
      main.date.day = 1;
      main.date.month++;
    }
    if (main.date.hour > 23) {
      main.date.hour = 0;
      main.date.day++;
    }
  }

  //Turn processing for all users
  if (turn_time_difference > settings.turn_timer*1000) {
    main.last_backup = current_date;
    main.last_turn = current_date;
    writeSave({ file_limit: settings.backup_limit });

    //Process nextGlobalTurn() for global processes and calculations
    nextBattleTick(true);
    nextGlobalTurn();

    //Force render maps after turn processing
    forceRender("political");
    main.round_count++;
  }

  //Write to database.js
  try {
  	fs.writeFile('database.js', JSON.stringify(main), function (err,data) {
  		if (err) return log.info(err);
  	});
  } catch (e) {
    log.error(`Ran into an error whilst attempting to save to database.js! ${e}.`);
  }
}, 1000);
