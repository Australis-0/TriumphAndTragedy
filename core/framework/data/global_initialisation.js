//Initialise global variables at start
module.exports = {
  initGlobal: function () {
    //Declare objects
    main.games = (!main.games) ? {} : main.games;
    main.guilds = (!main.guilds) ? {} : main.guilds;
    main.interfaces = (!main.interfaces) ? {} : main.interfaces;
    main.lobbies = (!main.lobbies) ? {} : main.lobbies;
    main.users = (!main.users) ? {} : main.users;

    //Declare tracker variables
    main.last_backup = (!main.last_backup) ? new Date().getTime() : main.last_backup;
  }
};
