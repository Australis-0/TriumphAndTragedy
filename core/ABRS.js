//ABRS - Automated Backup and Restoration System (ABRS)
module.exports = {
  cleanMain: function () {
    //Declare local instance variables
    var reserved_keys = {
      date: "date",
      game_channels: "game_channels",
      global: "global",
      interfaces: "interfaces",
      last_backup: "last_backup",
      last_queue_check: "last_queue_check",
      last_turn: "last_turn",
      market: "market",
      provinces: "provinces",
      round_count: "round_count",
      season_started: "season_started",
      tick_count: "tick_count",
      users: "users"
    };

    var all_main_keys = Object.keys(main);
    var all_reserved_keys = Object.keys(reserved_keys);
    var max_key_length = 0;

    //Set max_key_length
    for (var i = 0; i < all_reserved_keys.length; i++)
      if (all_reserved_keys[i].length > max_key_length)
        max_key_length = all_reserved_keys[i].length;

    //Iterate over all_main_keys to restore broken keys
    for (var i = 0; i < all_main_keys.length; i++) {
      var includes_reserved_key = false;

      for (var x = 0; x < all_reserved_keys.length; x++)
        if (all_main_keys[i].includes(all_reserved_keys[x]) && all_main_keys[i] != all_reserved_keys[x]) {
          main[all_reserved_keys[x]] = main[all_main_keys[i]];
          delete main[all_main_keys[i]];
        }
    }

    //Delete any broken keys
    for (var i = 0; i < all_main_keys.length; i++)
      if (all_main_keys[i].length > max_key_length)
        delete main[all_main_keys[i]];
  },

  cleanUsers: function () {
    //Declare local instance variables
    var all_users = Object.keys(main.users);

    //Iterate over all_users and their keys
    for (var i = 0; i < all_users.length; i++) {
      var local_user = main.users[all_users[i]];
      var local_user_keys = Object.keys(local_user);

      for (var x = 0; x < local_user_keys.length; x++) {
        var local_value = local_user[local_user_keys[x]];
        var split_key = local_user_keys[x].split('"');

        if (split_key.length > 1) {
          local_user[split_key[1]] = local_value;
          delete local_user[local_user_keys[x]];
        } else {
          //Check if this contains only \
          var pure_split_key = local_user_keys[x].split("\\");

          if (pure_split_key.join("").length == 0)
            delete local_user[local_user_keys[x]];
        }
      }
    }
  },

  clearEscapesInString: function (arg0_string) {
    //Convert from parameters
    var string = arg0_string;

    //Declare local instance variables
    var pattern = /\\+"?/g;

    return string.replace(pattern, "");
  },

  //internalWriteSave() is split as internal function for multicoring/multithreading
  internalWriteSave: function (arg0_options) {
    //Convert from parameters
    var options = (arg0_options) ? arg0_options : {};
    var file_limit = (options.file_limit) ? options.file_limit : 0;

    //Declare local instance variables
    var file_path = `./backups/${returnABRSDateString()}.txt`;

    //Write to file if JSON is not undefined
    if (JSON.stringify(main).length != 0) {
      var compressed_json = JSONPack.pack(JSON.parse(JSON.stringify(main)));
      var create_backup = fs.createWriteStream(`./backups/${returnABRSDateString()}.txt`);
      create_backup.end();
      var string_json = JSON.stringify(compressed_json);

      string_json = module.exports.clearEscapesInString(string_json);

      fs.writeFile(file_path, string_json, function (err, data) {
        if (err) return log.error(err);
      });
    } else {
      loadMostRecentSave();
    }

    //Make sure amount of files in ./backups/ complies with current file limit
    if (file_limit != 0) {
      loadBackupArray();
      var total_backups = backup_array;

      //Delete oldest file from backup_array if limit is exceeded
      if (total_backups.length > file_limit) try {
        var backups_deleted = 0;
        var backups_to_delete = total_backups.length - file_limit;

        //Loop over total_backups in reverse
        for (var i = total_backups.length - 1; i >= 0; i--)
          if (backups_deleted < backups_to_delete) {
            log.info(`Deleted ${total_backups[i]} as it exceeded the set limit of ${file_limit} simultaneous backups.`);
            fs.unlinkSync(`./backups/${total_backups[i]}`);

            backups_deleted++;
          } else {
            //Check file size
            var local_file_stats = fs.statSync(`./backups/${total_backups[i]}`);

            if (local_file_stats.size == 0) {
              log.info(`Deleted ${total_backups[i]} as it had nothing in it.`);
              fs.unlinkSync(`./backups/${total_backups[i]}`);
            }
          }
      } catch (e) {
        log.error(`Could not delete excess backup file!`);
        console.log(e);
      }
    }

    //Reload backup array
    loadBackupArray();
  },

  initialiseGraph: function () {
    //Initialise global graph
    global.graph = global.bn_graph();

    //Declare local instance variables
    var all_provinces = Object.keys(main.provinces);

    for (var i = 0; i < all_provinces.length; i++)
      if (all_provinces[i].match(/^[0-9]+$/) && all_provinces[i].length > 0)
        //Add graph links with uniform weighting
        for (var x = 0; x < main.provinces[all_provinces[i]].adjacencies.length; x++)
          graph.addLink(all_provinces[i], main.provinces[all_provinces[i]].adjacencies[x], {
            weight: main.provinces[all_provinces[i]].adjacency_distances[x]
          });
  },

  loadBackupArray: function () {
    //Declare backup array
    global.backup_array = fs.readdirSync("./backups/");
    global.backup_loaded = false;

    //Sort backup array in chronological order
    backup_array.sort(function(a, b) {
      try {
        return fs.statSync("./backups/" + a).mtime.getTime() - fs.statSync("./backups/" + b).mtime.getTime();
      } catch {}
    });

    //Reverse backup array to sort by most recent first
    backup_array = backup_array.reverse();

    //Print to console
    log.info(`Backup Array: ${backup_array.join(", ")}`);
  },

  loadMap: function (arg0_map_file, arg1_map_variable) {
    //Convert from parameters
    var map_file = arg0_map_file;
    var map_name = arg1_map_variable;

    //Load map or initialise file if it doesn't exist
    if (fs.existsSync("./map/" + map_file)) {
      global[map_name] = (fs.readFileSync("./map/" + map_file, "utf8").toString().length > 0 && !global.backup_loaded) ?
        fs.readFileSync("./map/" + map_file, "utf8") :
        fs.readFileSync("./map/" + config.defines.map.map_definition, "utf8");

      //Try parsing map file
      try {
        if (!global.mapmodes) global.mapmodes = [];

        global[`${map_name}_file`] = map_file;
        global[`${map_name}_parsed`] = HTML.parse(global[map_name].toString());

        if (!mapmodes.includes(map_name))
          mapmodes.push(map_name);
      } catch (e) {
        log.error(`Could not parse map file ${map_file}: ${e}.`);
      }
    } else {
      fs.copyFileSync(`./map/${config.defines.map.map_definition}`, `./map/${map_file}`);
      loadMap(map_file, map_name);
    }
  },

  loadMaps: function () {
    try {
      loadMap("atlas_map.svg", "atlas");
    	loadMap("colonisation_map.svg", "colonisation");
      loadMap("political_map.svg", "political");
      loadMap("population_map.svg", "population");
      loadMap("supply_map.svg", "supply");
    } catch (e) {
      log.error(`loadMaps() failed:`);
      console.log(e);
    }
  },

  loadMostRecentSave: function (arg0_load_backup) {
    //Convert from parameters
    var load_backup = arg0_load_backup;

  	//Declare local instance variables
    var invalid_save = (!load_backup) ? false : true;
    var rawdata = fs.readFileSync("database.js");

    //Check if current DB is valid
  	if (rawdata.toString().length != 0) {
      try {
        if (rawdata.toString()[0] == "{") {
          global.main = JSON.parse(rawdata);
          interfaces = main.interfaces;

          log.info(`Loaded default uncompressed savedata.`);

          setTimeout(reinitialiseGameEmbeds, 1000);
        } else {
          log.info(`Loading compressed savedata.`);

          var decompressed_json = JSONPack.unpack(rawdata.toString());
      		global.main = decompressed_json;
          interfaces = main.interfaces;

          setTimeout(reinitialiseGameEmbeds, 1000);
        }
      } catch (e) {
        console.log(e);
        invalid_save = true;
      }
  	} else {
      invalid_save = true;
    }

    //Restore automatic backup if DB isn't valid
    if (invalid_save) {
      log.warn(`Current database detected as invalid! Attempting to restore backup.`);

  		for (var i = 0; i < backup_array.length; i++) {
  			if (!backup_loaded) {
  				var current_backup = fs.readFileSync("./backups/" + backup_array[i]);

  				if (current_backup.toString().length != 0) {
  					var is_valid_json;

  					try {
  						JSON.parse(current_backup);
  						is_valid_json = true;
  					} catch (error) {
  						is_valid_json = false;
              log.error(`Error when parsing backup file '${backup_array[i]}' ...`);
  					}

            //Load backup if a backup is detected as valid JSON
  					if (is_valid_json) {
              var file_string = backup_array[i];
              global.backup_loaded = true;

              //Overwrite database.js with new backup file
  						log.info("Loading backup file '" + backup_array[i] + "' ...");
  						fs.copyFile("./backups/" + backup_array[i], "database.js", (err) => {
                if (err) throw err;
              });

  						setTimeout(function(){
  							rawdata = fs.readFileSync("database.js");
                var decompressed_json = JSONPack.unpack(rawdata.toString());
  							global.main = decompressed_json;

                //Restore interfaces
                interfaces = main.interfaces;

                setTimeout(reinitialiseGameEmbeds, 1000);
  						}, 1000);
  					}
  				}
  			}
  		}
  	}

    //Load province adjacencies
    setTimeout(function(){
      if (!main.provinces)
        initGlobal();
    }, 1100);

    //Load maps
    loadMaps();

    console.time(`Initialising graph ..`);
    setTimeout(module.exports.initialiseGraph, 500);
    console.timeEnd(`Initialising graph ..`);
  },

  returnABRSDateString: function () {
    //Declare local instance Variables
    var d = new Date();
    var hour_prefix = (d.getHours() < 10) ? "0" : "",
      minute_prefix = (d.getMinutes() < 10) ? "0" : "",
      second_prefix = (d.getSeconds() < 10) ? "0" : "";

    //Return statement - template string
    return `${d.getDate()}.${d.getMonth()+1}.${d.getFullYear()} ${hour_prefix}${d.getHours()}.${minute_prefix}${d.getMinutes()}.${second_prefix}${d.getSeconds()}`;
  },

  writeDB: function () {
    //Only accept writeDB() commands from master
    if (Cluster.isMaster) {
      cleanMain();

      if (thread_two_workers.length > 0) {
        thread_two_workers[0].send(getMasterObject());
        thread_two_workers[0].send({ command: "writeDB" });
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
    }
  },

  /*
    writeSave() - Writes a save to backups/
    options: {
      file_limit: 15 - Optional. Gives the maximum numbers of backups to be kept in the backups folder
    }
  */
  writeSave: function (arg0_options) {
    //Convert from parameters
    var options = (arg0_options) ? arg0_options : {};

    //Clean main first
    cleanMain();

    //Write save on Thread #2
    if (global.thread_type == 1)
      if (thread_two_workers.length > 0) {
        var random_index = randomNumber(0, thread_two_workers.length - 1);
        var random_worker = thread_two_workers[random_index];

        random_worker.send(getMasterObject());
        random_worker.send({ command: "writeSave", options: options });
      } else {
        //No available Thread #2 workers found
        module.exports.internalWriteSave(options);
      }
  }
};
