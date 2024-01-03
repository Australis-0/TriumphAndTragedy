module.exports = {
  threadThreeHandler: function (arg0_data) {
    //Convert from parameters
    var data = arg0_data;

    //nextBattleTick()
    if (data.command == "nextBattleTick") {
      log.debug(`Thread #3 nextBattleTick() instruction on Worker #${Cluster.worker.id}`);

      nextBattleTick(data.new_turn);
    }

    //nextTurn()
    if (data.command == "nextTurn") {
      log.debug(`Thread #3 nextTurn() instruction on Worker #${Cluster.worker.id}`);

      nextTurn(data.user_id, data.options);
    }
  }
};
