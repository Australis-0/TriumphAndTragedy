console.time(`Loading Node.js libraries.`);
global.Cluster = require("cluster");

global._ = require("underscore");
global.bn_graph = require("ngraph.graph");
global.bn_path = require("ngraph.path");
global.Canvas = require("canvas");
global.diacriticless = require("diacriticless");
global.Discord = require("discord.js");
global.fs = require("fs");
global.HTML = require("node-html-parser");
global.JSONPack = require("jsonpack");
global.opus = require("opusscript");
global.OS = require("os");
global.path = require("path");
global.SVG = require("convert-svg-to-png");
global.voice = require("@discordjs/voice");
global.WorkerThreads = require("worker_threads");

//Import Core Framework
global.FileManager = require("./core/file_manager");

FileManager.import("./startup");

//Import Core Functions - See startup.js for full directory
loadBotFiles();

//Start up main thread (command handling/UI)
if (Cluster.isMaster) {
  console.log(`Bot instance started on Thread #1 on Core #1.`);
  global.thread_type = 1;

  //Main thread logic
  {
    //Start bot
    startBot();

    //Global error handling
    process.on("unhandledRejection", (error) => {
      //Log enabled only with debug mode
      if (settings.debug_mode) {
        log.error(`Unhandled promise rejection. ${error.toString()}`);
        console.log(error);
      }
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

      if (!message.author.bot && !ignore_channels.includes(message.channel.id)) {
        //Debug commands (these ones have a prefix)
        if (message.member.roles.cache.find(role => settings.administrator_roles.includes(role.id))) {
          if (equalsIgnoreCase(arg[0], settings.prefix)) {
            if (equalsIgnoreCase(arg[1], "help"))
              printHelpMenu(message);

            //Used to eval
            if (equalsIgnoreCase(arg[1], "console")) {
              var full_code = [];
              for (var i = 2; i < arg.length; i++) full_code.push(arg[i]);

              eval(full_code.join(" "));

              //Send back prompt
              message.channel.send("Console command executed. Warning! This command can be highly unstable if not used correctly.").then((msg) => {
    						//Delete console command output after 10 seconds
    						setTimeout(function() { msg.delete(); }, 10000);
    					});
            }

            //console.log
            if (equalsIgnoreCase(arg[1], "console.log") || equalsIgnoreCase(arg[1], "log")) {
              var full_code = [];
              for (var i = 2; i < arg.length; i++) full_code.push(arg[i]);

              var actual_code = eval(full_code.join(" "));
              var actual_string = actual_code.toString();

              if (typeof actual_code == "object")
                actual_string = JSON.stringify(actual_code);

              var log_array = splitString(actual_string, 200);

              var log_embed_array = splitEmbed(log_array, {
                title: truncateString(full_code.join(" "), 60),
                title_pages: true,
                fixed_width: true
              });

              //Remove functionality for previous debug logs
              var all_interfaces = Object.keys(interfaces);

              for (var i = 0; i < all_interfaces.length; i++) {
                var local_ui = interfaces[all_interfaces[i]];

                if (local_ui.debug) {
                  delete main.interfaces[all_interfaces[i]];
                  delete interfaces[all_interfaces[i]];
                }
              }

              message.channel.send(config.localisation.blank).then((msg) => {
                createPageMenu(msg, {
                  embed_pages: log_embed_array,

                  debug: true,
                  user: message.author.id
                });
              });
            }

            //Debug handler
            var new_args = JSON.parse(JSON.stringify(arg));
            new_args.shift();

            var debug_handler = pageHandlerDebug(new_args, message);

            if (debug_handler)
              message.channel.send(debug_handler[1]);
          }
        }

        //Lobby commands (these also have a prefix, with the exception of visual prompts)
        {
          if (equalsIgnoreCase(arg[0], settings.prefix))
            if (equalsIgnoreCase(arg[1], "play"))
              createNewGame(user_id, message);
        }

        //Game input commands
        {
          if (getGame(user_id)) {
            var game_obj = interfaces[getGame(user_id)];

            if (main.game_channels.includes(message.channel.id)) {
              setTimeout(function(){
                message.delete();
              }, 1000);
              commandHandler(getGame(user_id), arg.join(" "));

              //Cache usernames/nicknames
              try {
                getUsernames(user_id);
              } catch {}

              //Check if game is still active
              if (returnGameFromChannelID(message.channel.id))
                interfaces[returnGameFromChannelID(message.channel.id)].last_active = new Date().getTime();
            }
          }
        }
      }
    });

    //Initialise variables before anything else!
    initGlobalLoop();

    //Logic loops, 1-second logic loop
    setInterval(function(){
      //Bot clock
      bot_clock++;

      //Cache interfaces
      main.interfaces = interfaces;

      //Delete inactive channels
      clearInactiveGames();

      //ABRS - Save backups!
    	var current_date = new Date().getTime();
      var current_turn_time = 0;
      var battle_difference = current_date - returnSafeNumber(main.global.battle_tick);
      var queue_time_difference = current_date - main.last_queue_check;
    	var time_difference = current_date - main.last_backup;
      var turn_time_difference = current_date - main.last_turn;

      //Backup processing
    	if (time_difference > settings.backup_timer*1000) {
    		main.last_backup = current_date;
        log.info(`Saving automatic backup.`);
    		writeSave({ file_limit: settings.backup_limit });
    	}

      //Combat processing
      if (!main.freeze_turns)
        if (battle_difference > (settings.turn_timer*1000)/10)
          if (hasAvailableWorker(3)) {
            thread_three_workers[0].send({
              command: "nextBattleTick"
            });
          } else {
            nextBattleTick(true);
          }

      //Date processing
      if (main.season_started && !main.freeze_time) {
        current_turn_time = getTimeModifier();

        //This is how much time has elapsed in years. The numerator 1000 represents milliseconds
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

      //Queue processing
      if (!main.season_started) {
        //Check if enough players have joined for the season to start
        if (Object.keys(main.users).length >= config.defines.common.starting_players) {
          main.season_started = true;
          reinitialiseGameEmbeds();
        }

        //Otherwise, go on with the activity checks ..
        if (queue_time_difference > returnSafeNumber(config.defines.common.activity_check)*1000*60*60*24) {
          main.last_queue_check = current_date;

          //Clear inactive users
          var all_current_users = Object.keys(main.users);
          for (var i = 0; i < all_current_users.length; i++) {
            var local_user = main.users[all_current_users[i]];

            if (current_date - local_user.last_queue_check >= returnSafeNumber(config.defines.common.activity_check)*1000*60*60*24) {
              try {
                returnChannel(settings.alert_channel).send(`<@${main.global.user_map[all_current_users[i]]}> was dropped from the queue due to inactivity.`);
                deleteCountry(all_current_users[i]);
                reinitialiseGameEmbeds();
              } catch {}
            }
          }

          //Send check to all remaining users
          var all_users = Object.keys(main.users);
          for (var i = 0; i < all_users.length; i++)
            checkActivityInQueue(all_users[i]);
        }
      }

      //Turn processing for all users
      if (turn_time_difference > settings.turn_timer*1000) {
        main.last_backup = current_date;
        main.last_turn = current_date;

        //Process nextGlobalTurn() for global processes and calculations
        if (main.season_started && !main.freeze_turns) {
          clearBadInterfaces();

          if (hasAvailableWorker(3)) {
            thread_three_workers[0].send({
              command: "nextBattleTick",
              new_turn: true
            });
          } else {
            nextBattleTick(true);
          }

          nextGlobalTurn();
        }
      }
    }, 1000);

    //Logic loops, 30-second logic loop
    setInterval(function(){
      //Write to database.js
      if (hasAvailableWorker(2)) {
        thread_two_workers[0].send("writeDB");
      } else {
        try {
        	fs.writeFile("database.js", JSON.stringify(main), function (err, data) {
        		if (err) return log.info(err);
        	});
        } catch (e) {
          log.error(`Ran into an error whilst attempting to save to database.js! ${e}.`);
          console.log(e);
        }
      }
    }, 30000);
  }

  //Fetch number of cores
  var core_amount = OS.cpus().length;
  global.thread_two_workers = [];
  global.thread_three_workers = [];

  //Create thread; log to console and distribute 3 threads over available cores
  log.info(`Creating Master Core. (Command Handling/UI)`);
  log.info(`${core_amount} core(s) are available. Will utilise them as necessary.\n-`);

  //Reserve this core for main command processing; distribute the others for data processing; map/file
  for (var i = 0; i < core_amount - 1; i++) {
    var local_worker = Cluster.fork();

    //Receive data from worker
    local_worker.on("message", (data) => {
      if (data.lookup)
        global.lookup = data.lookup;
      if (data.main)
        global.main = data.main;
      if (data.reserved)
        global.reserved = data.reserved;
    });
    local_worker.on("exit", (code) => {
      log.info(`Worker #${local_worker.id} stopped with exit code ${code}.`);
    });

    //Add the worker to thread_two or thread_three depending on parity
    local_worker.send({
      backup_loaded: backup_loaded,
      config: config,
      lookup: lookup,
      main: main,
      mapmodes: mapmodes,
      reserved: reserved,
      settings: settings,
    });

    if (i % 2 == 0) {
      //Pass global down to local_worker
      local_worker.send({
        type: 2
      });

      thread_two_workers.push(local_worker);
    } else {
      //Pass global down to local_worker
      local_worker.send({
        type: 3
      });

      thread_three_workers.push(local_worker);
    }
  }

  log.info(`-\nAssigned ${thread_two_workers.length} core(s) to Thread #2.`);
  log.info(`Assigned ${thread_three_workers.length} core(s) to Thread #3.`);
} else {
  //Other thread handling (Threads 2 and 3)
  process.on("message", function (data) {
    //Update global variables (lookup, main) to main thread
    if (data.backup_loaded)
      global.backup_loaded = data.backup_loaded;
    if (data.config)
      global.config = data.config;
    if (data.lookup)
      global.lookup = data.lookup;
    if (data.main)
      global.main = data.main;
    if (data.mapmodes)
      global.mapmodes = data.mapmodes;
    if (data.reserved)
      global.reserved = data.reserved;
    if (data.settings)
      global.settings = data.settings;

    log.debug(`Worker #${Cluster.worker.id} received message from master!`);

    //Set up worker type
    if (data.type) {
      //Load maps on thread
      loadMaps();

      if (data.type == 2) {
        global.thread_type = 2;
      } else if (data.type == 3) {
        global.thread_type = 3;
      }

      //Fetch CPU core
      var cpu_index = process.env.cpuIndex || 0;
      var cpu_info = OS.cpus()[cpu_index];

      log.info(`Started Thread #${global.thread_type} type worker on Core #${cpu_index} (${cpu_info.model})`);
    }

    //Command handler
    if (global.thread_type == 2) {
      threadTwoHandler(data);
    } else if (global.thread_type == 3) {
      threadThreeHandler(data);
    }
  });
}
