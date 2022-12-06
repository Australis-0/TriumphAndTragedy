module.exports = {
  /*
    Client state data structure:
    {
      id: client_state_id,

      name: "Netherlands",
      flag: "<image URL>",
      colour: [235, 159, 76],

      capital_id: "1",
      provinces: ["345", "572", "580"]
    }
  */

  createClientState: function (arg0_user, arg1_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var country_name = arg1_name.trim();

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var client_state_id = module.exports.generateClientStateID(user_id);
    var usr = main.users[actual_id];

    //Create a new client state object
    var client_state_obj = initCountry(client_state_id, country_name);

    //Check to make sure name is valid
    if (client_state_obj) {
      var client_state = {
        id: client_state_id,

        name: client_state_obj.name,
        flag: client_state_obj.flag,
        colour: client_state_obj.colour,

        provinces: []
      };

      usr.client_states[client_state_id] = client_state;

      //Return statement
      return [client_state_obj, client_state];
    }
  },

  excludeClientStates: function (arg0_array) {
    //Convert from parameters
    var array = getList(arg0_array);

    //Iterate over array and check
    for (var i = array.length - 1; i >= 0; i--)
      if (module.exports.isClientState(array[i]))
        array.splice(i, 1);

    //Return statement
    return array;
  },

  generateClientStateID: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var usr = main.users[actual_id];

    var all_client_states = Object.keys(usr.client_states);

    //While loop to find ID, just in-case of conflicting random ID's:
    while (true) {
      var local_id = generateUserID();

      if (!all_client_states.includes(local_id) && !main.users[local_id]) {
        return local_id;
        break;
      }
    }
  },

  /*
    getClientState() - Returns the client state proposal object/key from a user.
    options: {
      return_key: true/false - Whether or not to return the key of the client state proposal instead.
    }
  */
  getClientState: function (arg0_user, arg1_client_state, arg2_options) {
    //Convert from parameters
    var user_id = arg0_user;
    var client_state = arg1_client_state.toLowerCase().trim();
    var options = (arg2_options) ? arg2_options : {};

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var usr = main.users[actual_id];

    var all_client_states = Object.keys(usr.client_states);
    var client_state_exists = [false, ""];

    //Client state ID check
    if (usr.client_states[client_state])
      return (!options.return_key) ? usr.client_states[client_state] : client_state;

    //Client state, soft match
    for (var i = 0; i < all_client_states.length; i++) {
      var local_client_state = usr.client_states[all_client_states[i]];

      if (local_client_state.name.trim().toLowerCase().indexOf(client_state) != -1)
        client_state_exists = [true, (!options.return_key) ? local_client_state : all_client_states[i]];
    }

    //Client state, hard match
    for (var i = 0; i < all_client_states.length; i++) {
      var local_client_state = usr.client_states[all_client_states[i]];

      if (local_client_state.name.trim().toLowerCase() == client_state)
        client_state_exists = [true, (!options.return_key) ? local_client_state : all_client_states[i]];
    }

    //Return statement
    return (client_state_exists[0]) ? client_state_exists[1] : undefined;
  },

  getClientStateInfamyReduction: function (arg0_user, arg1_client_state_id) {
    //Convert from parameters
    var user_id = arg0_user;
    var client_state_id = arg1_client_state_id;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var usr = main.users[actual_id];

    var all_client_states = Object.keys(usr.client_states);
    var client_state_obj = usr.client_states[client_state_id];
    var infamy_reduction = 0;

    //Return statement
    if (client_state_obj)
      return client_state_obj.provinces.length*module.exports.getInfamyLossPerProvince(user_id);
  },

  getInfamyLossPerProvince: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var usr = main.users[actual_id];

    //Return statement
    return (1/usr.provinces)*config.defines.diplomacy.infamy_vassal_province_transfer;
  },

  isClientState: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_users = Object.keys(main.users);
    var is_client_state = false;

    //Iterate over all_users and check client_states object for actual_id key
    for (var i = 0; i < all_users.length; i++) {
      var local_user = main.users[all_users[i]];

      if (local_user.client_states[actual_id])
        is_client_state = true;
    }

    //Return statement
    return is_client_state;
  }
};
