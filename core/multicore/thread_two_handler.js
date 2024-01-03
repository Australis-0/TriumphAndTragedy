module.exports = {
  threadTwoHandler: function (arg0_data) {
    //Convert from parameters
    var data = arg0_data;

    //forceRender()
    if (data.command == "forceRender") {
      log.debug(`Thread #2 forceRender() instruction on Worker #${Cluster.worker.id}`);

      if (data.map_name)
        forceRender(data.map_name);
    }

    //writeDB()
    if (data.command == "writeDB")
      try {
        fs.writeFile("database.js", JSON.stringify(main), function (err, data) {
          if (err) return log.info(err);
        });
      } catch (e) {
        log.error(`Ran into an error whilst attempting to save to database.js! ${e}.`);
        console.log(e);
      }

    //writeSave()
    if (data.command == "writeSave") {
      log.debug(`Thread #2 writeSave() instruction on Worker #${Cluster.worker.id}`);
      internalWriteSave(data.options);
    }
  }
};
