//Inactivity clearance framework
module.exports = {
  clearInactiveGames: function () {
    initGlobal();

    //Regular error trapping
    try {
      //Declare interfaces if not defined for some reason
      global.interfaces = (!global.interfaces) ? main.interfaces : global.interfaces;

      //Declare local instance variables
      var all_interfaces = Object.keys(interfaces);
      var current_date = new Date().getTime();

      for (var i = 0; i < all_interfaces.length; i++) {
        var local_ui = interfaces[all_interfaces[i]];

        //Check if type is compatible with inactivity_timer
        if (local_ui.type == "main_menu")
          if (current_date - local_ui.last_active > settings.inactivity_timer*1000)
            deleteMainMenu(all_interfaces[i]);
      }
    } catch (e) {
      log.error(`clearInactiveGames() ran into an error: ${e}`);
    }
  }
};
