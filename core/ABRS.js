//ABRS - Automated Backup and Restoration System (ABRS)
module.exports = {
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
    	return fs.statSync("./backups/" + a).mtime.getTime() - fs.statSync("./backups/" + b).mtime.getTime();
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
      global[map_name] = (fs.readFileSync("./map/" + map_file, "utf8").toString().length > 0 && !backup_loaded) ?
        fs.readFileSync("./map/" + map_file, "utf8") :
        fs.readFileSync("./map/" + config.defines.map.map_definition, "utf8");

      //Try parsing map file
      try {
        global[`${map_name}_file`] = map_file;
        global[`${map_name}_parsed`] = HTML.parse(global[map_name].toString());
        mapmodes.push(map_name);
      } catch (e) {
        log.error(`Could not parse map file ${map_file}: ${e}.`);
      }
    } else {
      fs.copyFileSync(`./map/${config.defines.map.map_definition}`, `./map/${map_file}`);
      loadMap(map_file, map_name);
    }
  },

  loadMostRecentSave: function () {
  	//Declare local instance variables
    var invalid_save = false;
    var rawdata = fs.readFileSync("database.js");

    //Check if current DB is valid
  	if (rawdata.toString().length != 0) {
      try {
        try {
          var processed_data = compressJSON.decompress(JSON.parse(rawdata.toString()));
          global.main = JSON.parse(JSON.stringify(processed_data));
        } catch {
          log.warn(`Raw data had to be loaded instead of compressed!`);
          global.main = JSON.parse(rawdata);
        }

        interfaces = main.interfaces;

        log.info(`Loaded default savedata.`);

        setTimeout(reinitialiseGameEmbeds, 1000);
      } catch (e) {
        log.warn(`Ran into an error whilst loading current database: ${e}`);
        console.log(e);

        invalid_save = true;
      }
  	} else {
      log.warn(`Current database had nothing in it!`);
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

                try {
                  var processed_data = compressJSON.decompress(JSON.parse(rawdata.toString()));
                  global.main = JSON.parse(JSON.stringify(processed_data));
                } catch {
                  global.main = JSON.parse(rawdata);
                }

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
    loadMap("atlas_map.svg", "atlas");
  	loadMap("colonisation_map.svg", "colonisation");
    loadMap("political_map.svg", "political");
    loadMap("population_map.svg", "population");
    loadMap("supply_map.svg", "supply");

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

  writeSave: function (arg0_options) {
    //Convert from parameters
    var options = arg0_options;
    var file_limit = (options.file_limit) ? options.file_limit : 0;

    //Declare local instance variables
		var file_path = `./backups/${returnABRSDateString()}.txt`;
    var main_string = JSON.stringify(main);

    log.info("Writing to backup!");

    //Write to file if JSON is not undefined
		if (main_string.length != 0) {
      compressJSON.trimUndefined(global.main);
      compressJSON.trimUndefinedRecursively(global.main);

      var compressed_data = compressJSON.compress(global.main);
			var create_backup = fs.createWriteStream(`./backups/${returnABRSDateString()}.txt`);
			create_backup.end();

			fs.writeFile(file_path, compressed_data.toString(), function (err, data) {
				if (err) return log.error(err);
			});

      log.info(`A backup was successfully created.`);
		} else {
			loadMostRecentSave();
		}

    //Make sure amount of files in ./backups/ complies with current file limit
    if (file_limit != 0) {
      loadBackupArray();
      var total_backups = backup_array;

      //Delete oldest file from backup_array if limit is exceeded
      if (total_backups.length > file_limit) try {
        log.info(`Deleted ${total_backups[total_backups.length - 1]} as it exceeded the set limit of ${file_limit} simultaneous backups.`);
        fs.unlinkSync(`./backups/${total_backups[total_backups.length - 1]}`);
      } catch (e) {
        log.error(`Could not delete excess backup file!`);
        console.log(e);
      }
    }

    //Reload backup array
    loadBackupArray();
	}
};
