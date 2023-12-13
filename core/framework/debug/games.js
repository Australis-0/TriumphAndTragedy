module.exports = {
  debugCleanGames: function () {
    clearBadInterfaces();

    //Return statement
    return [true, `Attempted to clear bad games and interfaces!`];
  },

  debugResetGames: function () {
    clearGames();

    //Return statement
    return [true, `Reset all games.`];
  },

  debugResetInterfaces: function () {
    clearGames();

    main.interfaces = {};
    global.interfaces = {};

    //Return statement
    return [true, `Reset all games and interfaces.`];
  }
};
