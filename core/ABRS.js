//ABRS - Automated Backup and Restoration System (ABRS)
module.exports = {
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
      global[map_name] = (fs.readFileSync("./map/" + map_file, "utf8").toString().length > 0 && !backup_loaded) ? fs.readFileSync("./map/" + map_file, "utf8") : fs.readFileSync("./map/" + config.defines.map.map_definition, "utf8");
    } else {
      global[map_name] = fs.readFileSync("./map/" + config.defines.map.map_definition, "utf8");
      fs.closeSync(fs.openSync("./map/" + map_file, "w"));
    }

    //Try parsing map file
    try {
      global[`${map_name}_file`] = map_file;
      global[`${map_name}_parsed`] = HTML.parse(global[map_name].toString());
    } catch (e) {
      log.error(`Could not parse map file ${map_file}: ${e}.`);
    }
  },

  loadMostRecentSave: function () {
  	//Declare local instance variables
    var rawdata = fs.readFileSync('database.js');

  	if (rawdata.toString().length != 0) {
  		global.main = JSON.parse(rawdata);
      interfaces = main.interfaces;

      setTimeout(reinitialiseGameEmbeds, 1000);
  	} else {
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
  					}

            //Load backup if a backup is detected as valid JSON
  					if (is_valid_json) {
              var file_string = backup_array[i];
              global.backup_loaded = true;

              //Overwrite database.js with new backup file
  						log.info("Going through backup file '" + backup_array[i] + "' ...");
  						fs.copyFile("./backups/" + backup_array[i], "database.js", (err) => {
                if (err) throw err;
              });

  						setTimeout(function(){
  							rawdata = fs.readFileSync('database.js');
  							global.main = JSON.parse(rawdata);

                //Restore interfaces
                interfaces = main.interfaces;

                setTimeout(reinitialiseGameEmbeds, 1000);
  						}, 1000);
  					}
  				}
  			}
  		}
  	}

    //Load maps
  	loadMap("colonial_map.svg", "colonial");
    loadMap("political_map.svg", "political");
    loadMap("supply_limit_map.svg", "supply");
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

  writeSave: function (arg0_options) { //WIP
    //Convert from parameters
    var options = arg0_options;
    var file_limit = (options.file_limit) ? options.file_limit : 0;

    //Declare local instance variables
		var file_path = `./backups/${returnABRSDateString()}.txt`;

    //Write to file if JSON is not undefined
		if (JSON.stringify(main).length != 0) {
			var create_backup = fs.createWriteStream(`./backups/${returnABRSDateString()}.txt`);
			create_backup.end();

			fs.writeFile(file_path, JSON.stringify(main), function (err, data) {
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
        log.info(`Deleted ${total_backups[total_backups.length-1]} as it exceeded the set limit of ${file_limit} simultaneous backups.`);
        fs.unlinkSync(`./backups/${total_backups[total_backups.length-1]}`);
      } catch {}

      //Reload backup array
      loadBackupArray();
    }
	}
};
