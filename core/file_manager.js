module.exports = {
  getAllFiles: function (arg0_folder) {
    //Convert from parameters
    var folder = arg0_folder;

    //Declare local instance variables
    var file_array = [];
    var files = fs.readdirSync(folder);

    for (var i = 0; i < files.length; i++) {
      //Self-reference to fetch files in sub-directories
      local_dir_array = (fs.statSync(folder + "/" + files[i]).isDirectory()) ? module.exports.getAllFiles(folder + "/" + files[i]) : file_array.push(path.join(folder, "/", files[i]));

      //Add files from local_dir_array to file_array
      for (var x = 0; x < local_dir_array.length; x++) file_array.push(local_dir_array[x]);
    }

    //Return statement
    return file_array;
  },

  import: function (arg0_require_obj) {
    //Convert from parameters
    const local_library = require(arg0_require_obj);

    //Add to global namespace
    var all_properties_in_library = Object.keys(local_library);
    for (var i = 0; i < all_properties_in_library.length; i++) {
      global[all_properties_in_library[i]] = local_library[all_properties_in_library[i]];
    }
  },

  loadConfig: function () {
    //Declare local instance variables
    var loaded_files = [];

    //Load config backend files individually first
    var local_load_order = load_order.load_files;

    for (var i = 0; i < local_load_order.length; i++) {
      for (var x = 0; x < load_order.load_directories.length; x++) {
        var local_dir = load_order.load_directories[x];
        var all_directory_files = module.exports.getAllFiles(local_dir);

        for (var y = 0; y < all_directory_files.length; y++) if (all_directory_files[y].includes(local_load_order[i])) {
          module.exports.loadFile(all_directory_files[y]);
          loaded_files.push(local_load_order[i]);
          log.info(`Loaded imperative file ${all_directory_files[y]}.`);
        }
      }
    }

    //Load each load directory separately
    for (var i = 0; i < load_order.load_directories.length; i++) {
      var local_dir = load_order.load_directories[i];
      var all_directory_files = module.exports.getAllFiles(local_dir);

      for (var x = 0; x < all_directory_files.length; x++) if (!loaded_files.includes(all_directory_files[x])) {
        module.exports.loadFile(all_directory_files[x]);
        loaded_files.push(all_directory_files[x]);
      }
    }

    log.info(`Loaded ${loaded_files.length} files from ${load_order.load_directories.length} directories.`);
  },

  loadFile: function (arg0_file) {
    //Declare local instance variables
    var file_path = path.join(__dirname, "..", arg0_file);

    //Evaluate file contents
    try {
      var rawdata = fs.readFileSync(file_path);
      eval(rawdata.toString());
    } catch (e) {
      log.error(`Failed to load ${file_path}.`);
      console.log(e);
    }
  }
};
