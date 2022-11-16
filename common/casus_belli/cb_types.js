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
        if (areAtWar(usr.id, ot_user.id))
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
      annexation: 1,
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

    peace_demands: {
      liberation: 1,
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
      annexation: 1
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
		description: "An aggressive war of expansion available only to fascist countries.",
    icon: "land_vehicles",
    infamy: 5,

    limit: function (usr, ot_user) {
      //Return statement
      if (["fascism"].includes(usr.government))
        return true;
    },

    peace_demands: {
      annexation: 1,
      puppet: 1
    }
  },

  //Dynamic CBs - cannot be justified by default
  great_war: {
    name: "Great War",
    description: "A total war involving at least 20% of the world's provinces and 4 countries with at least a million active soldiers on both sides.",
    icon: "globe",

    dynamic_limit: function (war_obj) {
      
    }
  }
};
