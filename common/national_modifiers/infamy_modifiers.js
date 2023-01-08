config.national_modifiers.infamy_modifiers = {
  //Pre-Industrial Modifiers (1500-1815)
  black_legend: {
    name: "Black Legend",
    image: "https://media.discordapp.net/attachments/829862963485474827/1051206688549638186/black_legend.png",
    icon: "death",
    description: "Our high infamy is beginning to affect the way neighbouring countries view us. Gruesome tales of torture, massacres, baby cannibalism, and even whispers of satanism are beginning to stew in the pamphlets of the burgeoning cities of our neighbours. Any more conquests are liable to lead to our rivals are likely to do all they can to 'promote' this image of us.",

    trigger: function (usr) {
      if (main.date.year < 1815 && usr.modifiers.infamy >= 20)
        return true;
    },

    modifiers: {
      national_manpower: -0.05,
      political_capital_gain: -5,
      prestige_gain: -5
    }
  },
  the_horrors: {
    name: "The Horrors",
    image: "https://media.discordapp.net/attachments/829862963485474827/1051206689459802162/country_adj_horrors.png",
    icon: "infamy",
    description: "Lurid. Sordid. Abhorrent. True or not, these are now the adjectives prefacing reports about our country's actions in neighbouring newspapers, particularly regarding our colonies. We should consider granting them autonomy as vassal states in order to improve our international image.",

    trigger: function (usr) {
      if (main.date.year < 1815 && usr.modifiers.infamy >= 30)
        return true;
    },

    modifiers: {
      national_manpower: -0.05,
      political_capital_gain: -7,
      prestige_gain: -5
    }
  },

  //Industrial Revolution Modifiers (1815-)
  diplomatic_protests: {
    name: "Diplomatic Protests",
    image: "https://media.discordapp.net/attachments/829862963485474827/1051206689715667006/diplomatic_protests.png",
    icon: "stability",
    description: "Yesterday, we were meeting with a now disgraced foreign dignitary. As we discussed trade negotiations, their team simply walked out of the room, a grevious silent insult that shocked our representatives. Diplomatic protests like these in response to our infamous actions are starting to become more common, and may result in sanctions if left unchecked.",

    trigger: function (usr) {
      if (main.date.year >= 1815 && usr.modifiers.infamy >= 12.5)
        return true;
    },

    modifiers: {
      political_capital_gain: -5,
      prestige_gain: -2
    }
  },
  pariah_state: {
    name: "Pariah State",
    image: "https://media.discordapp.net/attachments/829862963485474827/1051206690617442365/pariah_state.png",
    icon: "cb",
    description: "No one of good repute feels they can conduct negotiations with us now. Our international credibility has fallen greatly, along with our image. Motions for containing our nation are beginning to gain traction among the great powers. We might be wise to delay any aggressive actions for the time being.",

    trigger: function (usr) {
      if (main.date.year >= 1815 && usr.modifiers.infamy >= 20)
        return true;
    },

    modifiers: {
      political_capital_gain: -10,
      prestige_gain: -5
    }
  },
  calls_for_containment: {
    name: "Calls for Containment",
    image: "https://media.discordapp.net/attachments/829862963485474827/1051206688826474516/calls_for_containment.png",
    icon: "attacker",
    description: "Foreign armies are threatening to mobilise to put down what one paper described as the 'Infamous Hydra' in a political cartoon - a warped caricature of our national personification. War fever is high in some of these countries, and we may wish to lay off our expansionist plans for now.",

    trigger: function (usr) {
      if (main.date.year >= 1815 && usr.modifiers.infamy >= 25)
        return true;
    },

    modifiers: {
      national_manpower: -0.05,
      political_capital_gain: -10,
      prestige_gain: -5
    }
  },
  international_sanctions: {
    name: "International Sanctions",
    image: "https://media.discordapp.net/attachments/829862963485474827/1051206690353189025/international_sanctions.png",
    icon: "globe",
    description: "Foreign companies are refusing to do business with us! Sanctions against us have been implemented in the financial system, in industry, in services, and across all sectors of our economy. What should we do?",

    trigger: function (usr) {
      if (main.date.year >= 1815 && usr.modifiers.infamy >= 30)
        return true;
    },

    modifiers: {
      national_manpower: -0.05,
      political_capital_gain: -10,
      prestige_gain: -5,
      production_efficiency: -0.20,
      rgo_throughput: -0.25
    }
  },

  //Post-Industrial Revolution Modifiers (1914-)
  domestic_dissent: {
    name: "Domestic Dissent",
    image: "https://media.discordapp.net/attachments/829862963485474827/1051206690042806426/domestic_dissent.png",
    icon: "consciousness",
    description: "Protests here, protests there. Couple thousand here, couple thousand there. They're not big enough to pose a challenge to our rule - by legions of internal security forces and plainclothes police, that is - but they continue a serious challenge to our international legitimacy and risk a prolonged anti-war movement, which could hurt our troops morale.",

    trigger: function (usr) {
      if (main.date.year >= 1914 && usr.modifiers.infamy >= 15)
        return true;
    },

    modifiers: {
      national_manpower: -0.10,
      political_capital_gain: -5,
      prestige_gain: -2,
      reform_desire_gain: 0.02
    }
  },
  complete_embargo: {
    name: "Complete Embargo",
    image: "https://media.discordapp.net/attachments/829862963485474827/1051206689124253826/complete_embargo.png",
    icon: "blockade",
    description: "Virtually all our greatest proxy economic partners have implemented secondary sanctions laws, leading to a complete economic collapse. Calls for general strikes are emerging from the public, and our war machine is in serious danger of grinding to a complete halt if these affairs are left unchecked.",

    trigger: function (usr) {
      if (main.date.year >= 1914 && usr.modifiers.infamy >= 35)
        return true;
    },

    modifiers: {
      national_manpower: -0.20,
      production_efficiency: -0.20,
      rgo_throughput: -0.20,
      prestige_gain: -5,
      reform_desire_gain: 0.05
    }
  }
};
