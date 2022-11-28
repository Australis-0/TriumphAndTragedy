config.national_modifiers.supply_modifiers = {
  //Supply modifiers for a player's overall military
  perfect_supply_situation: {
    name: "Perfect Supply Situation",
    image: "https://media.discordapp.net/attachments/829862963485474827/1045580187087147038/perfect_supply_situation.png",
    icon: "refined_petroil",
    description: "Supply affects our military's ability to fight in battle through something called **combat efficacy**, which affects both Attack and Defence. Units lacking supply will have lower combat efficacy than those that don't.\n\nOur army's overall supply situation is estimated at **{printPercentage(usr.trackers.overall_supply)}** and combat efficacy is near-perfect. A more detailed breakdown by military branch can be found below:\n\n{LOCAL.supply_localisation.join('\n')}\n\n{LOCAL.deficit_localisation}",

    trigger: function (usr) {
      if (
        usr.trackers.total_active_duty > 0 &&
        usr.trackers.overall_supply >= 0.90
      )
        return true;
    },
    custom_localisation: function (usr) {
      //Return statement
      return getSupplyLocalisation(user_id);
    }
  },

  surplus_supply_situation: {
    name: "Surplus Supply Situation",
    image: "https://media.discordapp.net/attachments/829862963485474827/1045580188395765840/surplus_supply_situation.png",
    icon: "refined_petroil",
    description: "Supply affects our military's ability to fight in battle through something called **combat efficacy**, which affects both Attack and Defence. Units lacking supply will have lower combat efficacy than those that don't.\n\nOur army's overall supply situation is estimated at **{printPercentage(usr.trackers.overall_supply)}** and combat efficacy is quite good. A more detailed breakdown by military branch can be found below:\n\n{LOCAL.supply_localisation.join('\n')}\n\n{LOCAL.deficit_localisation}",

    trigger: function (usr) {
      if (
        usr.trackers.total_active_duty > 0 &&
        usr.trackers.overall_supply >= 0.80 && usr.trackers.overall_supply < 0.90
      )
        return true;
    },
    custom_localisation: function (usr) {
      //Return statement
      return getSupplyLocalisation(user_id);
    }
  },

  good_supply_situation: {
    name: "Good Supply Situation",
    image: "https://media.discordapp.net/attachments/829862963485474827/1045580186327973948/good_supply_situation.png",
    icon: "refined_petroil",
    description: "Supply affects our military's ability to fight in battle through something called **combat efficacy**, which affects both Attack and Defence. Units lacking supply will have lower combat efficacy than those that don't.\n\nOur army's overall supply situation is estimated at **{printPercentage(usr.trackers.overall_supply)}** and combat efficacy is good. A more detailed breakdown by military branch can be found below:\n\n{LOCAL.supply_localisation.join('\n')}\n\n{LOCAL.deficit_localisation}",

    trigger: function (usr) {
      if (
        usr.trackers.total_active_duty > 0 &&
        usr.trackers.overall_supply >= 0.70 && usr.trackers.overall_supply < 0.80
      )
        return true;
    },
    custom_localisation: function (usr) {
      //Return statement
      return getSupplyLocalisation(user_id);
    }
  },

  decent_supply_situation: {
    name: "Decent Supply Situation",
    image: "https://media.discordapp.net/attachments/829862963485474827/1045580186042765362/decent_supply_situation.png",
    icon: "refined_petroil",
    description: "Supply affects our military's ability to fight in battle through something called **combat efficacy**, which affects both Attack and Defence. Units lacking supply will have lower combat efficacy than those that don't.\n\nOur army's overall supply situation is estimated at **{printPercentage(usr.trackers.overall_supply)}** and combat efficacy is okay. A more detailed breakdown by military branch can be found below:\n\n{LOCAL.supply_localisation.join('\n')}\n\n{LOCAL.deficit_localisation}",

    trigger: function (usr) {
      if (
        usr.trackers.total_active_duty > 0 &&
        usr.trackers.overall_supply >= 0.60 && usr.trackers.overall_supply < 0.70
      )
        return true;
    },
    custom_localisation: function (usr) {
      //Return statement
      return getSupplyLocalisation(user_id);
    }
  },

  strained_supply_situation: {
    name: "Strained Supply Situation",
    image: "https://media.discordapp.net/attachments/829862963485474827/1045580188064419870/strained_supply_situation.png",
    icon: "refined_petroil",
    description: "Supply affects our military's ability to fight in battle through something called **combat efficacy**, which affects both Attack and Defence. Units lacking supply will have lower combat efficacy than those that don't.\n\nOur army's overall supply situation is estimated at **{printPercentage(usr.trackers.overall_supply)}** and combat efficacy is somewhat impacted. A more detailed breakdown by military branch can be found below:\n\n{LOCAL.supply_localisation.join('\n')}\n\n{LOCAL.deficit_localisation}",

    trigger: function (usr) {
      if (
        usr.trackers.total_active_duty > 0 &&
        usr.trackers.overall_supply >= 0.50 && usr.trackers.overall_supply < 0.60
      )
        return true;
    },
    custom_localisation: function (usr) {
      //Return statement
      return getSupplyLocalisation(user_id);
    }
  },

  poor_supply_situation: {
    name: "Poor Supply Situation",
    image: "https://media.discordapp.net/attachments/829862963485474827/1045580187447853056/poor_supply_situation.png",
    icon: "refined_petroil",
    description: "Supply affects our military's ability to fight in battle through something called **combat efficacy**, which affects both Attack and Defence. Units lacking supply will have lower combat efficacy than those that don't.\n\nOur army's overall supply situation is estimated at **{printPercentage(usr.trackers.overall_supply)}** and combat efficacy is poor. A more detailed breakdown by military branch can be found below:\n\n{LOCAL.supply_localisation.join('\n')}\n\n{LOCAL.deficit_localisation}",

    trigger: function (usr) {
      if (
        usr.trackers.total_active_duty > 0 &&
        usr.trackers.overall_supply >= 0.40 && usr.trackers.overall_supply < 0.50
      )
        return true;
    },
    custom_localisation: function (usr) {
      //Return statement
      return getSupplyLocalisation(user_id);
    }
  },

  problematic_supply_situation: {
    name: "Problematic Supply Situation",
    image: "https://media.discordapp.net/attachments/829862963485474827/1045580187762438244/problematic_supply_situation.png",
    icon: "refined_petroil",
    description: "Supply affects our military's ability to fight in battle through something called **combat efficacy**, which affects both Attack and Defence. Units lacking supply will have lower combat efficacy than those that don't.\n\nOur army's overall supply situation is estimated at **{printPercentage(usr.trackers.overall_supply)}** and combat efficacy is severely impacted. A more detailed breakdown by military branch can be found below:\n\n{LOCAL.supply_localisation.join('\n')}\n\n{LOCAL.deficit_localisation}",

    trigger: function (usr) {
      if (
        usr.trackers.total_active_duty > 0 &&
        usr.trackers.overall_supply >= 0.30 && usr.trackers.overall_supply < 0.40
      )
        return true;
    },
    custom_localisation: function (usr) {
      //Return statement
      return getSupplyLocalisation(user_id);
    }
  },

  abysmal_supply_situation: {
    name: "Abysmal Supply Situation",
    image: "https://media.discordapp.net/attachments/829862963485474827/1045580185233260604/abysmal_supply_situation.png",
    icon: "refined_petroil",
    description: "Supply affects our military's ability to fight in battle through something called **combat efficacy**, which affects both Attack and Defence. Units lacking supply will have lower combat efficacy than those that don't.\n\nOur army's overall supply situation is estimated at **{printPercentage(usr.trackers.overall_supply)}** and combat efficacy is close to breaking point. A more detailed breakdown by military branch can be found below:\n\n{LOCAL.supply_localisation.join('\n')}\n\n{LOCAL.deficit_localisation}",

    trigger: function (usr) {
      if (
        usr.trackers.total_active_duty > 0 &&
        usr.trackers.overall_supply >= 0.20 && usr.trackers.overall_supply < 0.30
      )
        return true;
    },
    custom_localisation: function (usr) {
      //Return statement
      return getSupplyLocalisation(user_id);
    }
  },

  breakdown_supply_situation: {
    name: "Breakdown Supply Situation",
    image: "https://media.discordapp.net/attachments/829862963485474827/1045580185724006440/breakdown_supply_situation.png",
    icon: "refined_petroil",
    description: "Supply affects our military's ability to fight in battle through something called **combat efficacy**, which affects both Attack and Defence. Units lacking supply will have lower combat efficacy than those that don't.\n\nOur army's overall supply situation is estimated at **{printPercentage(usr.trackers.overall_supply)}** and combat efficacy is near-nonexistent. A more detailed breakdown by military branch can be found below:\n\n{LOCAL.supply_localisation.join('\n')}\n\n{LOCAL.deficit_localisation}",

    trigger: function (usr) {
      if (
        usr.trackers.total_active_duty > 0 &&
        usr.trackers.overall_supply >= 0.10 && usr.trackers.overall_supply < 0.20
      )
        return true;
    },
    custom_localisation: function (usr) {
      //Return statement
      return getSupplyLocalisation(user_id);
    }
  },

  nonexistent_supply_situation: {
    name: "Nonexistent Supply Situation",
    image: "https://media.discordapp.net/attachments/829862963485474827/1045580186688696331/nonexistent_supply_situation.png",
    icon: "refined_petroil",
    description: "Supply affects our military's ability to fight in battle through something called **combat efficacy**, which affects both Attack and Defence. Units lacking supply will have lower combat efficacy than those that don't.\n\nOur army's overall supply situation is estimated at **{printPercentage(usr.trackers.overall_supply)}** and our units will likely melt on contact with the enemy. A more detailed breakdown by military branch can be found below:\n\n{LOCAL.supply_localisation.join('\n')}\n\n{LOCAL.deficit_localisation}",

    trigger: function (usr) {
      if (
        usr.trackers.total_active_duty > 0 &&
        usr.trackers.overall_supply >= 0 && usr.trackers.overall_supply < 0.10
      )
        return true;
    },
    custom_localisation: function (usr) {
      //Return statement
      return getSupplyLocalisation(user_id);
    }
  }
};
