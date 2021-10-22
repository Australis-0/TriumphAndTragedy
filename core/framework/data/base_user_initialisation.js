//Framework for initialising base user objects. For country objects, please see elsewhere
module.exports = {
  initUser: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;
    var usr = (main.users[arg0_user]) ? main.users[arg0_user] : undefined;

    //Define user if not already defined
    if (!usr) {
      main.users[arg0_user] = {};
      usr = main.users[arg0_user];
    }

    //Customisation
    if (!usr.name) usr.name = "";
    if (!usr.flag) usr.flag = "https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png";
    if (!usr.colour) usr.colour = generateRandomColour();

    if (!usr.money) usr.money = 10000;
    if (!usr.prestige) usr.prestige = 0;
    if (!usr.tax_rate) usr.tax_rate = 0;

    //Define subobjects
    if (!usr.modifiers) usr.modifiers = {};
      if (!usr.modifiers.stability) usr.stability = 0.75;

    if (!usr.options) usr.options = {};
      if (!usr.options.allow_ceding) usr.options.allow_ceding = [];
      if (!usr.options.avoid_attrition) usr.options.avoid_attrition = "if possible";
      if (!usr.options.avoid_territorial_violation) usr.options.avoid_territorial_violation = "if possible";

    if (!usr.pops) usr.pops = {};

    //Empty subobjects
    if (!usr.blockaded) usr.blockaded = {};
    if (!usr.events) usr.events = {};
    if (!usr.expeditions) usr.expeditions = {};
    if (!usr.mobilisation) usr.mobilisation = {};
    if (!usr.temporary_modifiers) usr.temporary_modifiers = {};
    if (!usr.under_construction) usr.under_construction = {};

    //Trackers - tracking variables for statistical/display/cooldown purposes
      //Cooldowns
      if (!usr.total_ceded_this_turn) usr.total_ceded_this_turn = 0;
      if (!usr.total_cities_ceded_this_turn) usr.total_cities_ceded_this_turn = 0;

      //Other trackers
      if (!usr.country_age) usr.country_age = 0;
      if (!usr.highest_tier) usr.highest_tier = 0;
      if (!usr.id) usr.id = user_id;
      if (!usr.last_active_turn) usr.last_active_turn = 0;
      if (!usr.max_tax) usr.max_tax = 0;
      if (!usr.news) = {};
      if (!usr.recent_military_casualties) usr.recent_military_casualties = [];
      if (!usr.recent_civilian_casualties) usr.recent_civilian_casualties = [];
      if (!usr.total_cities) usr.total_cities = [];
  }
};
