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

    peace_demands: ["status_quo", "war_reparations"]
  },

  theft: {
    name: "Theft",
    description: "The target has blockaded you or sank neutral shipping.",
    icon: "taxes",
    infamy: 0,

    limit: function (usr, ot_user) {
      var is_blockading = false;

      if (isBlockaded(usr))
        for (var i = 0; i < usr.blockaded.fleets.length; x++) {
          var local_fleet = local_user.blockaded.fleets[x];

          if (local_fleet.owner == ot_user.id)
            is_blockading = true;
        }

      //Return statement
      if (is_blockading && areAtWar(usr.id, ot_user.id))
        return true;
    },

    peace_demands: ["status_quo", "war_reparations"]
  },

  containment: {
    name: "Containment",
    description: "Target has over 8 infamy.",
    icon: "infamy",
    infamy: 0,

    limit: {
      infamy: 8
    },

    peace_demands: ["status_quo", "war_reparations" , "install_government", "cut_down_to_size"]
  },

  colonial_integration: {
    name: "Colonial Integration",
    description: "Attacker's total deployed AP are over 4x that of their target's deployed military. Target is behind on tech.",
    icon: "globe",
    infamy: 2,

    limit: {
      AND: {
        ap_ratio: 0.25,
        techs_researched_is_less_than: "TO"
      }
    },

    peace_demands: ["status_quo", "war_reparations", "puppet", "annexation"]
  },

  free_oppressed_people: {
    name: "Free Oppressed People",
    description: "Attacker is a democracy/HM Government, target is not. Target has over 3 infamy.",
    icon: "diplomacy",
    infamy: 2,

    limit: {
      AND: {
        TO: {
          OR: {
            has_government: ["constitutional_monarchy", "democracy"]
          }
        },

        NOT: {
          has_government: ["constitutional_monarchy", "democracy"]
        },
        infamy: 3
      }
    },

    peace_demands: ["status_quo", "war_reparations", "install_government"]
  },

  independence: {
    name: "Independence",
    description: "The attacker has been a puppet for more than 5 turns to the target.",
    icon: "revolt",
    infamy: 2,

    limit: {
      TO: {
        is_puppet: {
          overlord: "FROM",
          duration: 5
        }
      }
    },

    peace_demands: ["status_quo", "war_reparations", "liberation"]
  },

  revanchism: {
    name: "Revanchism",
    description: "Target occupies land once controlled by the attacker.",
    icon: "old_map",
    infamy: 2,

    limit: {
      has_core_of: "TO"
    },

    peace_demands: ["status_quo", "war_reparations", "retake_cores"]
  },

  //Is triggered only by event/diplomatic dialogue
  anschluss: {
    name: "Anschluss",
    description: "Target is your puppet, and refused to be annexed by you.",
    icon: "old_scroll",
    infamy: 3,

    peace_demands: ["status_quo", "annexation"]
  },

  //Is triggered only by event/diplomatic dialogue
  diplomatic_insult: {
    name: "Diplomatic Insult",
    description: "Target has formally insulted the attacker.",
    icon: "cb",
    infamy: 5,

    peace_demands: ["status_quo", "war_reparations"]
  },

  lebensraum: {
    name: "Lebensraum",
		description: "Attacker is communist, fascist, or absolute monarchy.",
    icon: "land_vehicles",
    infamy: 5,

    limit: {
      has_government: ["communism", "fascism", "absolute_monarchy"]
    },

    peace_demands: ["puppet", "annexation"]
  },

  acquire_state: {
    name: "Acquire State",
    description: "Attacker's capital is less than 15 provinces away from target's capital. Attacker's total AP are over twice that of target's.",
    icon: "provinces",
    infamy: 5,

    limit: {
      AND: {
        distance_is_less_than: {
          target: "FROM.capital_id",
          value: 15,

          start: "TO.capital_id"
        },
        ap_ratio: 0.5
      }
    },

    peace_demands: ["puppet", "annexation"]
  }
};
