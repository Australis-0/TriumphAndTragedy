config.casus_belli = {
  territorial_violation: {
    name: "Territorial Violation",
    description: "Target has moved armed forces through your country without permission.",
    icon: "active_personnel",
    infamy: 0,

    limit: function (usr, ot_user) {
      var all_armies = Object.keys(ot_user.armies);
      var all_provinces = getProvinces(usr.id, { include_hostile_occupations: true, return_keys: true });
      var all_users = Object.keys(main.users);
      var has_armies_in_country = false;
      var is_allowed = (hasAlliance(ot_user.id, usr.id) || hasMilitaryAccess(ot_user.id, usr.id));
      var vassal_obj = getVassal(usr.id);

      //Iterate over all armies
      for (var i = 0; i < all_armies.length; i++)
        if (all_provinces.includes(ot_user.armies[all_armies[i]].province))
          has_armies_in_country = true;

      //Check for vassalages
      if (vassal_obj)
        if (vassal_obj.overlord == ot_user.id)
          is_allowed = true;

      //Return statement
      if (!is_allowed && has_armies_in_country)
        return true;
    },

    peace_demands: {
      war_reparations: 1
    }
  },

  theft: {
    name: "Theft",
    description: "The target has blockaded you or sank neutral shipping.",
    icon: "taxes",
    infamy: 0,

    limit: function (usr, ot_user) {
      var is_blockading = false;

      if (isBlockaded(usr.id))
        for (var i = 0; i < usr.blockaded.fleets.length; x++) {
          var local_fleet = local_user.blockaded.fleets[x];

          if (local_fleet.owner == ot_user.id)
            is_blockading = true;
        }

      //Return statement
      if (is_blockading)
        if (!areAtWar(usr.id, ot_user.id))
          return true;
    },

    peace_demands: {
      war_reparations: 1
    }
  },

  containment: {
    name: "Containment",
    description: "Target has over 8 infamy.",
    icon: "infamy",
    infamy: 0,

    limit: function (usr, ot_user) {
      //Return statement
      if (ot_user.modifiers.infamy > 8)
        return true;
    },

    peace_demands: {
      cut_down_to_size: 1,
      install_government: 1,
      war_reparations: 1
    }
  },

  raid: {
    name: "Raid",
    description: "Attacker and target have less than 120 technologies researched.",
    icon: "gold",
    infamy: 1,

    limit: function (usr, ot_user) {
      //Return statement
      if (
        usr.researched_technologies.length < 120 &&
        ot_user.researched_technologies.length < 120
      )
        return true;
    },

    peace_demands: {
      raid: 1
    }
  },

  colonial_integration: {
    name: "Colonial Integration",
    description: "Attacker's total deployed AP are over 4x that of their target's deployed military. Target is at least 20 techs behind.",
    icon: "globe",
    infamy: 2,

    limit: function (usr, ot_user) {
      var ot_user_strength = getMilitaryStrength(ot_user.id);
      var usr_strength = getMilitaryStrength(usr.id);

      //Return statement
      if (usr_strength.attack*4 > ot_user_strength.attack && usr.researched_technologies.length >= ot_user.researched_technologies.length + 20)
        return true;
    },

    peace_demands: {
      complete_annexation: 1,
      puppet: 1,
      war_reparations: 1
    }
  },

  free_oppressed_people: {
    name: "Free Oppressed People",
    description: "Attacker is a democracy/HM Government, target is not. Target has over 3 infamy.",
    icon: "diplomacy",
    infamy: 2,

    limit: function (usr, ot_user) {
      //Return statement
      if (
        ["constitutional_monarchy", "democracy"].includes(usr.government) && !["constitutional_monarchy", "democracy"].includes(ot_user.government) &&
        ot_user.modifiers.infamy > 3
      )
        return true;
    },

    peace_demands: {
      install_government: 1,
      war_reparations: 1
    }
  },

  independence: {
    name: "Independence",
    description: "The attacker has been a puppet for more than 5 turns to the target.",
    icon: "revolt",
    infamy: 2,

    limit: function (usr, ot_user) {
      var vassal_obj = getVassal(usr.id);

      //Return statement
      if (vassal_obj)
        if (usr.vassal_years > 5 && vassal_obj.overlord == ot_user.id)
          return true;
    },

    attacker_peace_demands: {
      liberation: 1,
      war_reparations: 1
    },
    defender_peace_demands: {
      complete_annexation: 1,
      puppet: 1,
      war_reparations: 1
    }
  },

  revanchism: {
    name: "Revanchism",
    description: "Target occupies land once controlled by the attacker.",
    icon: "old_map",
    infamy: 2,

    limit: function (usr, ot_user) {
      var all_controlled_provinces = getProvinces(ot_user.id, { include_hostile_occupations: true });

      for (var i = 0; i < all_controlled_provinces.length; i++)
        if (all_controlled_provinces[i].owner == ot_user.id) {
          var local_culture = main.global.cultures[all_controlled_provinces[i].culture];

          //Return statement
          if (local_culture)
            if (local_culture.primary_culture.includes(usr.id))
              return true;
        }
    },

    peace_demands: {
      retake_cores: 1,
      war_reparations: 1
    }
  },

  mercantile_domination: {
    name: "Mercantile Domination",
    description: "Both attacker and target have less than 180 technologies researched. Attacker is either a constitutional monarchy or democracy.",
    icon: "trade",
    infamy: 2.5,

    limit: function (usr, ot_user) {
      //Return statement
      if (
        ["constitutional_monarchy", "democracy"].includes(usr.government) &&
        usr.researched_technologies.length < 180 &&
        ot_user.researched_technologies.length < 180
      )
        return true;
    },

    peace_demands: {
      establish_trading_posts: 1,
      steer_trade: 1,
      syphon_actions: 1
    }
  },

  feudal_conquest: {
    name: "Feudal Conquest",
    description: "Both attacker and target have less than 140 technologies researched.",
    infamy: 3,

    limit: function (usr, ot_user) {
      //Return statement
      if (
        usr.researched_technologies.length < 140 &&
        ot_user.researched_technologies.length < 140
      )
        return true;
    },

    peace_demands: {
      feudal_conquest: 1
    }
  },

  acquire_buffer_state: {
    name: "Acquire Buffer State",
    description: "Attacker has an autocratic government in power.",
    icon: "artillery_piece",
    infamy: 4,

    limit: function (usr, ot_user) {
      //Return statement
      if (["fascism", "communism", "absolute_monarchy".includes(usr.government)])
        return true;
    },

    peace_demands: {
      secure_buffer_state: 1,
      puppet: 1
    }
  },

  //Is triggered only by event/diplomatic dialogue
  anschluss: {
    name: "Anschluss",
    description: "Target is your puppet, and refused to be annexed by you.",
    icon: "old_scroll",
    infamy: 3,

    peace_demands: {
      complete_annexation: 1
    }
  },

  //Is triggered only by event/diplomatic dialogue
  diplomatic_insult: {
    name: "Diplomatic Insult",
    description: "Target has formally insulted the attacker.",
    icon: "cb",
    infamy: 5,

    peace_demands: {
      war_reparations: 1
    }
  },

  acquire_state: {
    name: "Acquire State",
    description: "Attacker's provinces are adjacent to target provinces.",
    icon: "provinces",
    infamy: 5,

    limit: function (usr, ot_user) {
      //Declare local instance variables
      var user_provinces = getProvinces(usr.id);

      //Return statement
      for (var i = 0; i < user_provinces.length; i++)
        for (var x = 0; x < user_provinces[i].adjacencies.length; x++) {
          var local_province = main.users[user_provinces[i].adjacencies[x]];

          if (local_province.controller == ot_user.id)
            return true;
        }
    },

    peace_demands: {
      limited_annexation: 1,
      puppet: 1
    }
  },

  lebensraum: {
    name: "Lebensraum",
		description: "Attacker is fascist.",
    icon: "land_vehicles",
    infamy: 7,

    limit: function (usr, ot_user) {
      //Return statement
      if (["fascism"].includes(usr.government))
        return true;
    },

    peace_demands: {
      complete_annexation: 1,
      puppet: 1
    }
  },

  //Dynamic CBs - cannot be justified by default
  great_war: {
    name: "Great War",
    description: "A total war involving at least 20% of the world's provinces and 4 countries with at least a million active soldiers on both sides. Mass Politics must be researched by at least one country.",
    icon: "globe",

    infamy_modifier: 0.20,

    clear_wargoals: true,
    dynamic_limit: function (war_obj) {
      //Declare local instance variables
      var all_users = Object.keys(main.users);
      var attacking_province_count = 0;
      var attacking_soldier_count = 0;
      var defending_province_count = 0;
      var defending_soldier_count = 0;
      var mass_politics_researched = false;

      if (war_obj.attackers.length + war_obj.defenders.length >= 4) {
        //Check if mass politics is researched
        for (var i = 0; i < all_users.length; i++) {
          var local_user = main.users[all_users[i]];

          if (local_user.researched_technologies.includes("mass_politics"))
            mass_politics_researched = true;
        }

        //Update tracker variables
        if (mass_politics_researched) {
          for (var i = 0; i < war_obj.attackers.length; i++) {
            var local_user = main.users[war_obj.attackers[i]];

            attacking_province_count += local_user.provinces;
            attacking_soldier_count += getTotalActiveDuty(war_obj.attackers[i]);
          }
          for (var i = 0; i < war_obj.defenders.length; i++) {
            var local_user = main.users[war_obj.defenders[i]];

            defending_province_count += local_user.provinces;
            defending_soldier_count += getTotalActiveDuty(war_obj.defenders[i]);
          }

          //Return statement
          if (
            attacking_soldier_count >= 1000000 &&
            defending_soldier_count >= 1000000 &&
            attacking_province_count + defending_province_count >= Math.ceil(config.defines.map.province_amount*0.2)
          )
            return true;
        }
      }
    },

    peace_demands: {
      complete_annexation: 5,
      cut_down_to_size: 7,
      demilitarise_region: 3,
      free_oppressed_people: 10,
      free_people: 8,
      install_government: 12,
      lebensraum: 5,
      liberation: 20,
      limited_annexation: 20,
      puppet: 12,
      secure_buffer_state: 5,
      seize_stockpiles: 20,
      steer_trade: 8,
      syphon_actions: 6,
      release_client_state: 12,
      retake_cores: 10,
      revoke_war_reparations: 14,
      take_treaty_port: 4,
      war_indemnities: 10,
      war_reparations: 20
    }
  }
};
