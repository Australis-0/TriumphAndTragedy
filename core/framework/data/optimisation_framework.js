module.exports = {
  initOptimisation: function () {
    global.lookup = {
      all_buildings: getBuildings({ return_object: true }),
      all_good_names: getGoods({ return_names: true }),
      all_goods: getGoods({ return_object: true })
    };
  }
};
