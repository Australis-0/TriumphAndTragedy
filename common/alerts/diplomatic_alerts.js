config.alerts.diplomacy = {
  access_cancelled: {
    name: "Military Access Cancelled.",
    description: "{FROM.name} has cancelled our right to passage through their territorial claims for our military assets. Oh, well, we didn't need those traitorious scum anyway.",

    btn_access_cancelled: {
      title: "We really should have beaten them to it",
      description: [
        "Your military access has been cancelled by **{FROM.name}**!"
      ]
    }
  },

  access_denied: {
    name: "Request for Military Access Denied.",
    description: "{FROM.name} has denied our requests for military access repeatedly. If we can't get our way, we may just have to circumvent them ... one way or the other.",

    btn_unfortunate: {
      title: "Unfortunate."
    }
  },

  a_guarantee_for_our_nation: {
    name: "Our Sovereignty Guaranteed!",
    description: "{FROM.name}, seeking to form closer relations with our state, has decided to extend a guarantee of sovereignty to us to protect us from both internal and external threats. Our envoys and diplomats are looking forward to working with {FROM.name} in the future, and our people are relieved to finally have an ally in their time of need.",

    btn_guarantee_positive_relations: {
      title: "They must be proud to offer this arrangement to such a noble nation.",
      ai_chance: 100,
      description: [
        "**+10%** Stability Modifier for **5** turns.",
        "**+25** Relations with **{FROM.name}**."
      ],
      effect: function (options) {
        console.log(options);

        addTemporaryModifier(options.TO, {
          type: "stability_modifier",
          value: 0.10,
          duration: 5
        });
        modifyRelations(options.TO, {
          target: options.FROM,
          value: 25
        });
      }
    },
    btn_guarantee_negative_relations: {
      title: "How patronising!"
    }
  },

  a_guaranteed_peace: {
    name: "A Guaranteed Peace.",
    description: "{FROM.name} is offering us a non-aggression pact for the next 10 turns. It is up to you, however, as to how to respond to this present opportunity for making peace with the nation of {FROM.name}. Should we accept this opportunity for peace, or should we plan for war?",

    btn_accept_non_aggression: {
      title: "We shall accept the offer.",
      description: [
        `**+20** Relations with **{FROM.name}**.`,
        `Signs non-aggression pact with **{FROM.name}** for the next **10** turns.`,
        `**+1** Used Diplomatic Slot.`
      ],
      effect: function (options) {
        var FROM_USER = main.users[options.FROM];

        FROM_USER.diplomacy.used_diplomatic_slots++;
        modifyRelations(options.TO, {
          target: options.FROM,
          value: 20
        });
        createNonAggressionPact({
          target: options.FROM,
          duration: 10
        })
      }
    },
    btn_decline_non_aggression: {
      title: "We respectfully decline the offer.",
      ai_chance: 100,
      description: [
        `**{FROM.name}** will be notified of our rejection of their proposal for a non-aggression pact.`
      ],
      effect: function (options) {
        sendAlert(options.FROM, "an_uneasy_peace", {
          TO: options.FROM,
          FROM: options.TO
        });
      }
    }
  },

  alliance_accepted: {
    name: "Our New Friend!",
    description: "{TO.name} is cheering her new friend, {FROM.name} tonight. It comes as our diplomatic standing in the world is beginning to increase, and we hope that these well-made connections with other foreign powers can help protect our own people.",

    btn_alliance_accepted: {
      title: "We shall accomplish much together.",
      ai_chance: 100,
      description: [
        `**+5%** Stability Modifier for **3** turns.`
      ],
      effect: function (options) {
        addTemporaryModifier(options.FROM, {
          type: "stability_modifier",
          value: 0.05,
          duration: 3
        });
      }
    }
  },

  alliance_broken: {
    name: "Alliance Broken.",
    description: "We were informed by a diplomatic envoy from {FROM.name} that our alliance has expired today. Our government worries, however, that it could be the start of colder diplomatic relations between our two nations.",

    btn_alliance_broken: {
      title: "What could we have done?"
    }
  },

  alliance_declined: {
    name: "Alliance Declined.",
    description: "{FROM.name} has declined our repeated requests for an alliance. We should get ready for whatever they have planned ...",

    btn_alliance_declined: {
      name: "An unfortunate rejection."
    }
  },

  alliance_proposal: {
    name: "An Offer For Alliance.",
    description: "We have received an official diplomatic delegation from {FROM.name}. They are requesting our mutual aid and support in military and economic affairs, and a formal agreement regarding an alliance. How should our government respond?",

    btn_accept_alliance: {
      title: "It is in our best interest to conclude an alliance.",
      description: [
        `We will sign an alliance with **{FROM.name}**.`,
        `**{FROM.name}** will be notified of our acceptance of their alliance proposal.`,
        `**+1** Used Diplomatic Slot.`
      ],
      effect: function (options) {
        var TO_USER = main.users[options.TO];

        sendAlert(options.FROM, "alliance_accepted", {
          TO: options.FROM,
          FROM: options.TO
        });
        createAlliance(options.FROM, options.TO);
        options.TO_USER.diplomacy.used_diplomatic_slots++;
      }
    },
    btn_decline_alliance: {
      title: "Respectfully decline the offer for now.",
      effect: function (options) {
        var FROM_USER = main.users[options.FROM];

        sendAlert(options.FROM, "alliance_declined", {
          TO: options.FROM,
          FROM: options.TO
        });
        modifyRelations(options.FROM, {
          target: options.TO,
          value: -20
        });
        dissolveAlliance(options.FROM, options.TO);
        FROM_USER.diplomacy.used_diplomatic_slots--;
      }
    }
  },

  an_offer_to_lay_down_arms: {
    name: "An Offer to Lay Down Arms.",
    description: "{FROM.name} is offering us peace in exchange for the terms listed below for the **{LOCAL.war_name}**. We have the option to either accept or deny this.\n\n---\n\n{LOCAL.peace_treaty_string}",

    btn_accept_conditional_peace: {
      title: "We accept this offer.",
      description: [
        `The war will end immediately, and we will accept **{FROM.name}**'s peace offer.`
      ],
      effect: function (options) {
        parsePeaceTreaty(options.LOCAL.war_name, options.LOCAL.peace_treaty);
      }
    },
    btn_decline_conditional_peace: {
      title: "And they call it ''peace''?",
      description: [
        "The war rages on .."
      ]
    }
  },

  an_uneasy_peace: {
    name: "An Uneasy Peace.",
    description: "An uneasy peace is now forming between us and {FROM.name} as the former has refused our requests for a non-aggression pact, which would surely be mutually beneficial to us both! Perhaps they have something to hide, and if they do, we'd better be ready ...",

    btn_an_uneasy_peace: {
      title: "Stand vigilant."
    }
  },

  call_to_arms: {
    name: "Call to Arms!",
    description: "{FROM.name} is attempting to call us into their war! Although this war may have been started by another country, we hold an alliance with {FROM.name}, and so if we seek to honour our alliance, we'll also need to muster our armed forces together. For us all.",

    btn_accept_call_to_arms: {
      name: "Our nation is one of honour!",
      ai_chance: 80,
      description: [
        [`We will join the **{LOCAL.war_name}** on the side of the **{LOCAL.friendly_side}**!`]
      ],
      effect: function (options) {
        joinWar(options.TO, options.LOCAL.friendly_side, options.LOCAL.war_name);
      }
    },
    btn_decline_call_to_arms: {
      title: "We can't afford this war.",
      ai_chance: 20,
      description: [
        [
          `Our alliance with **{FROM.name}** will be immediately terminated.`,
          `**-1** Used Diplomatic Slot.`
        ]
      ],
      effect: function (options) {
        var FROM_USER = main.users[options.FROM];
        var TO_USER = main.users[options.TO];

        dissolveAlliance(options.TO, options.FROM);

        //Subtract from used_diplomatic_slots
        FROM_USER.diplomacy.used_diplomatic_slots--;
        TO_USER.diplomacy.used_diplomatic_slots--;
      }
    }
  },

  guarantee_broken: {
    name: "Guarantee Broken",
    description: "{FROM.name} has rescinded their guarantee for our nation. It seems that they no longer wish to be friends with our great and mighty nation. Whatever the case, our military and our diplomats shall always be standing by at your service.",

    btn_guarantee_broken: {
      title: "Shame."
    }
  },

  non_aggression_pact_expired: {
    name: "The Expiry Of A Pact.",
    description: "Our non-aggression pact with {0} has expired, and our secretaries are urging for you to renew the pact with **{0}** in order to preserve peace and stability in the region and for our peoples. On the other hand, we could use it as an opportunity to attack, if we so desire ...",

    btn_non_aggression_pact_expired: {
      title: "Alright. Next brief, please!"
    }
  },

  other_armies_our_soil: {
    name: "Other Armies, Our Soil.",
    description: "{FROM.name} is proposing to be able to move troops through our territory! Our advisors believe that it will likely have a negative impact on the stability of certain regions of our country, however, some advisors also say that the best option may simply be to yield into {FROM.name}'s demands. How should we respond?",

    btn_accept_military_access: {
      title: "Let them march through.",
      description: [
        `**+10** Relations with {FROM.name}`,
        `**-5%** Stability Modifier for **10** turns.`
      ],
      effect: function (options) {
        modifyRelations(options.TO, {
          target: options.FROM,
          value: 10
        });
        addTemporaryModifier(options.FROM, {
          type: "stability_modifier",
          value: -0.05,
          duration: 10
        });
      }
    },

    btn_decline_military_access: {
      title: "They'll march through when we're dead!",
      ai_chance: 100
    }
  },

  our_hour_of_need: {
    name: "Our Hour of Need",
    description: "Our nation is now locked in a state of war that threatens to consume our country. Our old friends, {LOCAL.name}, have promised to help us in this struggle. Our diplomats and envoys are standing by. What should we do?",

    btn_request_support: {
      title: "We need every friend we can get.",
      ai_chance: 100,
      description: [
        "**{LOCAL.name}** may join the war."
      ],
      effect: function (options) {
        var TO_USER = main.users[options.TO];

        var all_allies = Object.keys(TO_USER.diplomacy.allies);

        for (var i = 0; i < all_allies.length; i++)
          sendAlert(all_allies[i], "the_promise_we_made", {
            TO: all_allies[i],
            FROM: options.TO,

            LOCAL: {
              war_name: options.LOCAL.war_name,
              friendly_side: "defenders"
            }
          });
      }
    },
    btn_decline_support: {
      title: "We shall fight alone."
    }
  },

  pouring_over_the_maps: {
    title: "Pouring Over The Maps.",
    description: "Somewhere in High Command sits a map that countless generals have spent years working on, that countless agents of our intelligence have been working for, a map littered with arrows stabbing into the heart of the {FROM.name} nation. They've refused to be rightfully incorporated into our burgeoning nation, so now we must give them war.",

    btn_accept_anschluss_cb: {
      name: "It was our land anyway.",
      ai_chance: 90,
      description: [
        `We will gain an **Anschluss** CB on {FROM.name} for the next **10** turns.`
      ],

      effect: function (options) {
        var TO_USER = main.users[options.TO];

        TO_USER.diplomacy.casus_belli.push({
          target: options.FROM,
          type: "anschluss",
          duration: 10
        });
      }
    },
    btn_decline_anschluss_cb: {
      title: "Call it off.",
      ai_chance: 10
    }
  },

  rival_declared: {
    name: "A New Rival!",
    description: "Relations between us and {FROM.name} have never been colder. Diplomatic relations have been suspended, and our forces are marching to the border immediately. Our citizens are growing more and more eager to view them, if not as rivals, then at least as enemies.",

    btn_rival_declared: {
      title: "It's either us or them.",
      description: [
        `**-50** Relations with {FROM.name}.`
      ],
      effect: function (options) {
        modifyRelations(options.TO, {
          target: options.FROM,
          value: -50
        });
      }
    }
  },

  the_coming_integration: {
    name: "The Coming Integration.",
    description: "Although we were the protectorate of {FROM.name}, the last thing we expected them to do was to betray that trust and request our annexation! However, we have just received word that their armies on our doorstep, and refusing their request to annex us could result in open conflict. What shall we do?",

    btn_decline_annexation: {
      title: "Those bloody backstabbers!",
      description: [
        `**-30** Relations with **{FROM.name}**.`,
        `**{FROM.name}**'s relations with us will decrease by **30**.`,
        `We will no longer be the vassal of **{FROM.name}**.`,
        "",
        `**{FROM.name}**: **-1** Used Diplomatic Slot.`,
        `**{FROM.name}**: Receives **Pouring Over The Maps**.`
      ],
      effect: function (options) {
        var FROM_USER = main.users[options.FROM];

        //Decrease mutual relations by 30
        modifyRelations(options.FROM, {
          target: options.TO,
          value: -30
        });
        modifyRelations(options.TO, {
          target: options.FROM,
          value: -30
        });

        //Liberate country
        FROM_USER.diplomacy.used_diplomatic_slots--;
        dissolveVassal(options.FROM, options.TO);

        //Send alert
        sendAlert(options.FROM, "pouring_over_the_maps", {
          TO: options.FROM,
          FROM: options.TO
        });
      }
    },

    btn_accept_annexation: {
      title: "We have no choice. Goodbye, cruel world!",
      ai_chance: 100,
      description: [
        `We will be annexed by **{FROM.name}**, and the game will immediately end.`
      ],
      effect: function (options) {
        inherit(options.TO, options.FROM);
      }
    }
  },

  the_national_disaster: {
    name: "The National Disaster!",
    description: "War exhaustion in our countries and in those of our allies have finally reached record highs. With the enemy willing to talk peace terms, we have no choice but to concede to their demands, whatever they may be. Let us hope that they shall be merciful.",

    btn_the_national_disaster: {
      title: "It's over ... I can't believe it's over.",
      description: [
        "We now have to obey the diktats of our enemies."
      ]
    }
  },

  the_option_to_submit: {
    name: "The Option To Submit.",
    description: "Diplomats in our country are hastily screening over {FROM.name}'s proposal, which if accepted, could drastically change the future of our nation. {FROM.name} promises to deliver us economic and military support in exchange for, well let's just say ... our independence. We would have to be a subservient client state to {FROM.name} in order for them to provide this aid. We could of course decline, but that might anger {FROM.name}'s envoys.",

    btn_accept_vassalisation: {
      title: "This is a diplomatic insult!",
      description: [
        `**-50** relations with **{FROM.name}**.`,
        `**{FROM.name}**'s relations with us will decrease by **50**.`
      ],
      ai_chance: 100,
      effect: function (options) {
        modifyRelations(options.TO, {
          target: options.FROM,
          value: -50
        });
        modifyRelations(options.FROM, {
          target: options.TO,
          value: -50
        });
      }
    },
    btn_decline_vassalisation: {
      title: "We have no choice but to accept.",
      description: [
        `We will become the vassal of **{FROM.name}**.`,
        `**-15%** Stability Modifier for **5** turns.`
      ],
      effect: function (options) {
        createVassal(options.FROM, {
          target: options.TO
        });
        addTemporaryModifier(options.FROM, {
          type: "stability_modifier",
          value: -0.15,
          duration: 5
        });
      }
    }
  },

  the_promise_we_made: {
    name: "The Promise We Made.",
    description: "A nation we had previously announced our intention to protect, {FROM.name} has been attacked in a perfidious act of war! Although we could simply opt out of risking both our resources and armies to protect {FROM.name}, such an action would likely ruin our diplomatic reputation on the world stage. What should we do?",

    btn_accept_call_to_arms: {
      title: "Let the world know we stand by {FROM.name}. Enter the war.",
      description: [
        `We shall join the **{LOCAL.war_name}** on the **{LOCAL.friendly_side}** side.`
      ],
      ai_chance: 90,
      effect: function (options) {
        joinWar(options.TO, options.LOCAL.friendly_side, options.LOCAL.war_name);
      }
    },
    btn_decline_call_to_arms: {
      title: "{FROM.name}!? I've never heard of such a place before!",
      ai_chance: 10,
      description: [
        `**{FROM.name}**'s relations with us will decrease by **50**.`,
        `**-5%** Stability Modifier for **5** turns.`
      ],
      effect: function (options) {
        modifyRelations(options.FROM, {
          target: options.TO,
          value: -50
        });
        addTemporaryModifier(options.TO, {
          type: "stability_modifier",
          value: -0.05,
          duration: 5
        });
      }
    }
  },

  they_stand_defiant: {
    name: "They Stand Defiant",
    description: "{FROM.name} has refused to give up their independence, even in the face of our combined economic and military assets. Either they treat us as a laughing stock, or they hold the means to protect their independence at all costs. Either way, our military is preparing to move in.",

    btn_they_stand_defiant: {
      title: "How dare they defy us!?"
    }
  },

  we_are_free: {
    name: "We Are Free!",
    description: "Our nation has recently gained independence from {FROM.name} after our overlord announced that our vassalisation treaties and contractual obligations had been annulled. Their given reason for doing this is unclear, but our diplomats are speculating that they might have lost the economic and military strength needed to enforce such a policy. As such we have once again become an independent nation.",

    btn_we_are_free: {
      title: "Long live our new country!"
    }
  }
};
