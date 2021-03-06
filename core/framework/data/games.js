//Games framework functions
module.exports = {
  clearInterfaces: function () {
    //Declare local instance variables
    var all_interfaces = Object.keys(interfaces);

    //Delete all interfaces
    for (var i = 0; i < all_interfaces.length; i++) {
      var local_ui = interfaces[all_interfaces[i]];

      //Error trapping just in case
      try {
        if (local_ui.channel) returnChannel(local_ui.channel).delete();
      } catch {}

      main.interfaces = {};
      interfaces = {};
    }
  }
};
