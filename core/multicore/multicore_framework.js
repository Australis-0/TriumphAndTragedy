module.exports = {
  /*
    getAvailableWorker() - Fetches an available worker object.
    options: {
      return_index: true/false - Whether to return the index in the array rather than an object. False by default
    }
  */
  getAvailableWorker: function (arg0_type, arg1_options) {
    //Convert from parameters
    var type = arg0_type;
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variable
    var return_object = {};

    //Check to make sure this is the master thread assigning workers
    if (Cluster.isMaster) {
      if (type == 2) {
        if (hasAvailableWorker(2)) {
          for (var i = 0; i < thread_two_workers.length; i++)
            if (!thread_two_workers[i].busy)
              return_object = (!options.return_index) ? thread_two_workers[i] : i;
        } else {
          return undefined;
        }
      } else if (type == 3) {
        if (hasAvailableWorker(3)) {
          for (var i = 0; i < thread_three_workers.length; i++)
            if (!thread_three_workers[i].busy)
              return_object = (!options.return_index) ? thread_three_workers[i] : i;
        } else {
          return undefined;
        }
      }

      //Return statement
      return return_object;
    }
  },

  hasAllWorkersFree: function (arg0_type) {
    //Convert from parameters
    var type = arg0_type;

    //Declare local instance variables
    var has_busy_worker = false;

    //Guard clause for master thread
    if (type == 1)
      return true;
    if (type == 2)
      if (global.thread_two_workers)
        for (var i = 0; i < thread_two_workers.length; i++)
          if (thread_two_workers[i].busy)
            has_busy_worker = true;
    if (type == 3)
      if (global.thread_three_workers)
        for (var i = 0; i < thread_three_workers.length; i++)
          if (thread_three_workers[i].busy)
            has_busy_worker = true;

    //Return statement
    return (!has_busy_worker);
  },

  hasAvailableWorker: function (arg0_type) {
    //Convert from parameters
    var type = arg0_type;

    //Guard clause for master thread
    if (type == 1)
      return true;
    if (type == 2)
      if (global.thread_two_workers)
        if (global.thread_two_workers.length > 0)
          return true;
    if (type == 3)
      if (global.thread_three_workers)
        if (global.thread_three_workers.length > 0)
          return true;
  },

  //[WIP] - This function can be problematic when seeking to change the same variable with the same value (e.g. adding 20 relations to 20 relations)
  mergeMain: function (arg0_main_objects) {
    //Convert from parameters
    var main_objects = arg0_main_objects;

    //Iterate over all main_objects
    for (var i = 0; i < main_objects.length; i++)
      global.main = mergeObjects(global.main, main_objects[i], false, true);

    //Return statement
    return global.main;
  },

  syncMasterToWorker: function (arg0_data) {
    //Convert from parameters
    var data = arg0_data;

    //Check users object
    if (data.load_maps)
      loadMaps();
  },
  
  syncWorkersToMaster: function () {
    //Declare local instance variables
    var all_workers = [];

    all_workers = mergeArrays(all_workers, thread_two_workers);
    all_workers = mergeArrays(all_workers, thread_three_workers);

    //All threads reload maps
    for (var i = 0; i < all_workers.length; i++)
      all_workers[i].send({
        backup_loaded: backup_loaded,
        config: config,
        lookup: lookup,
        main: main,
        mapmodes: mapmodes,
        reserved: reserved,
        settings: settings,

        load_maps: true
      });

    log.debug(`Synced all ${all_workers.length} Worker(s) to Master!`);
  }
};
