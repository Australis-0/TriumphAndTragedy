config.alerts.diplomacy = {
  access_cancelled: {
    name: "Military Access Cancelled.",
    description: "{FROM.name} has cancelled our right to passage through their territorial claims for our military assets. Oh, well, we didn't need those traitorious scum anyway.",

    btn_access_cancelled: {
      name: "We really should have beaten them to it",
      description: [
        "Your military access has been cancelled by **{FROM.name}**!"
      ]
    }
  },

  access_denied: {
    name: "Request for Military Access Denied.",
    description: "{FROM.name} has denied our requests for military access repeatedly. If we can't get our way, we may just have to circumvent them ... one way or the other.",

    btn_unfortunate: {
      name: "Unfortunate."
    }
  },

  a_guarantee_for_our_nation: {
    name: "Our Sovereignty Guaranteed!",
    description: "{FROM.name}, seeking to form closer relations with our state, has decided to extend a guarantee of sovereignty to us to protect us from both internal and external threats. Our envoys and diplomats are looking forward to working with {FROM.name} in the future, and our people are relieved to finally have an ally in their time of need.",

    btn_guarantee_positive_relations: {
      title: "They must be proud to offer this arrangement to such a noble nation.",
      ai_chance: 100,
      effect: function (options) {
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
      name: "How patronising!"
    }
  },

  a_guaranteed_peace: {
    name: "A Guaranteed Peace.",
    description: "{FROM.name} is offering us a non-aggression pact for the next 10 turns. It is up to you, however, as to how to respond to this present opportunity for making peace with the nation of {FROM.name}. Should we accept this opportunity for peace, or should we plan for war?",

    btn_accept_non_aggression: {
      title: "We shall accept the offer.",
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
      name: "We respectfully decline the offer.",
      ai_chance: 100,
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
      name: "We shall accomplish much together.",
      ai_chance: 100,
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
      name: "What could we have done?"
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
      name: "It is in our best interest to conclude an alliance.",
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
      name: "Respectfully decline the offer for now.",
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

  //[WIP] - Rescripting done up to here
  an_offer_to_lay_down_arms: {
    name: "An Offer to Lay Down Arms.",
    description: "{FROM.name} is offering us peace in exchange for the terms listed below. We have the option to either accept or deny this.",

    btn_accept_conditional_peace: {
      name: "We accept this offer.",
      effect: {
        accept_peace_offer: {
          target: "LOCAL.peace_treaty_id"
        }
      }
    },
    btn_decline_conditional_peace: {
      name: "And they call it ''peace''?",
      description: [
        "The war rages on .."
      ]
    }
  },

  an_uneasy_peace: {
    name: "An Uneasy Peace.",
    description: "An uneasy peace is now forming between us and {FROM.name} as the former has refused our requests for a non-aggression pact, which would surely be mutually beneficial to us both! Perhaps they have something to hide, and if they do, we'd better be ready ...",

    btn_an_uneasy_peace: {
      name: "Stand vigilant."
    }
  },

  call_to_arms: {
    name: "Call to Arms!",
    description: "{FROM.name} is attempting to call us into their war! Although this war may have been started by another country, we hold an alliance with {FROM.name}, and so if we seek to honour our alliance, we'll also need to muster our armed forces together. For us all.",

    btn_accept_call_to_arms: {
      name: "Our nation is one of honour!",
      effect: {
        join_war: {
          target: "LOCAL.war_id",
          side: "LOCAL.friendly_side"
        }
      }
    },
    btn_decline_call_to_arms: {
      name: "We can't afford this war.",
      effect: {
        break_alliance: {
          target: "FROM",
          add_temporary_modifier: {
            type: "stability_modifier",
            value: -0.15,
            duration: 5
          }
        }
      }
    }
  },

  guarantee_broken: {
    name: "Guarantee Broken",
    description: "{FROM.name} has rescinded their guarantee for our nation. It seems that they no longer wish to be friends with our great and mighty nation. Whatever the case, our military and our diplomats shall always be standing by at your service.",

    btn_guarantee_broken: {
      name: "Shame."
    }
  },

  non_aggression_pact_expired: {
    name: "The Expiry Of A Pact.",
    description: "Our non-aggression pact with {0} has expired, and our secretaries are urging for you to renew the pact with **{0}** in order to preserve peace and stability in the region and for our peoples. On the other hand, we could use it as an opportunity to attack, if we so desire ...",

    btn_non_aggression_pact_expired: {
      name: "Alright. Next brief, please!"
    }
  },

  other_armies_our_soil: {
    name: "Other Armies, Our Soil.",
    description: "{FROM.name} is proposing to be able to move troops through our territory! Our advisors believe that it will likely have a negative impact on the stability of certain regions of our country, however, some advisors also say that the best option may simply be to yield into {FROM.name}'s demands. How should we respond?",

    btn_accept_military_access: {
      name: "Let them march through.",
      effect: {
        improve_relations: {
          target: "FROM",
          value: 10
        },
        add_temporary_modifier: {
          type: "stability_modifier",
          value: -0.05,
          duration: 10
        }
      }
    },

    btn_decline_military_access: {
      name: "They'll march through when we're dead!"
    }
  },

  our_hour_of_need: {
    name: "Our Hour of Need",
    description: "Our nation is now locked in a state of war that threatens to consume our country. Our old friend, {FROM.name}, has promised to help us in this struggle. Our diplomats and envoys are standing by. What should we do?",

    btn_request_support: {
      name: "We need every friend we can get.",
      description: "**{FROM.name}** may join the war.",
      effect: {
        every_country: {
          limit: {
            is_ally_of: "TO"
          },
          send_alert: {
            target: "FROM",
            type: "the_promise_we_made"
          }
        }
      }
    },
    btn_decline_support: {
      name: "We shall fight alone."
    }
  },

  pouring_over_the_maps: {
    name: "Pouring Over The Maps.",
    description: "Somewhere in High Command sits a map that countless generals have spent years working on, that countless agents of our intelligence have been working for, a map littered with arrows stabbing into the heart of the {FROM.name} nation. They've refused to be rightfully incorporated into our burgeoning nation, so now we must give them war.",

    btn_accept_anschluss_cb: {
      name: "It was our land anyway,",
      effect: {
        add_cb: {
          target: "FROM",
          type: "anschluss",
          duration: 10
        }
      }
    },
    btn_decline_anschluss_cb: {
      name: "Call it off."
    }
  },

  rival_declared: {
    name: "A New Rival!",
    description: "Relations between us and {FROM.name} have never been colder. Diplomatic relations have been suspended, and our forces are marching to the border immediately. Our citizens are growing more and more eager to view them, if not as rivals, then at least as enemies.",

    btn_rival_declared: {
      name: "It's either us or them.",
      effect: {
        decrease_relations: {
          target: "FROM",
          value: 50
        }
      }
    }
  },

  the_coming_integration: {
    name: "The Coming Integration.",
    description: "Although we were the protectorate of {FROM.name}, the last thing we expected them to do was to betray that trust and request our annexation! However, we have just received word that their armies on our doorstep, and refusing their request to annex us could result in open conflict. What shall we do?",

    btn_decline_annexation: {
      name: "Those bloody backstabbers!",
      effect: {
        decrease_relations: {
          target: "FROM",
          value: 30
        },
        FROM: {
          decrease_relations: {
            target: "FROM",
            value: 30
          }
        },
        liberate_country: true,
        send_alert: {
          target: "FROM",
          type: "pouring_over_the_maps"
        }
      }
    },

    btn_accept_annexation: {
      name: "We have no choice. Goodbye, cruel world!",
      effect: {
        FROM: {
          annex_country: {
            target: "FROM"
          }
        }
      }
    }
  },

  the_national_disaster: {
    name: "The National Disaster!",
    description: "War exhaustion in our countries and in those of our allies have finally reached record highs. With the enemy willing to talk peace terms, we have no choice but to concede to their demands, whatever they may be. Let us hope that they shall be merciful.",

    btn_the_national_disaster: {
      name: "It's over ... I can't believe it's over.",
      description: [
        "We now have to obey the diktats of our enemies."
      ]
    }
  },

  the_option_to_submit: {
    name: "The Option To Submit.",
    description: "Diplomats in our country are hastily screening over {FROM.name}'s proposal, which if accepted, could drastically change the future of our nation. {FROM.name} promises to deliver us economic and military support in exchange for, well let's just say ... our independence. We would have to be a subservient client state to {FROM.name} in order for them to provide this aid. We could of course decline, but that might anger {FROM.name}'s envoys.",

    btn_accept_vassalisation: {
      name: "This is a diplomatic insult!",
      effect: {
        decrease_relations: {
          target: "FROM",
          value: 50
        },
        FROM: {
          decrease_relations: {
            target: "FROM",
            value: 50
          }
        }
      }
    },
    btn_decline_vassalisation: {
      name: "We have no choice but to accept.",
      effect: {
        FROM: {
          add_vassal: {
            target: "FROM"
          }
        },
        add_temporary_modifier: {
          type: "stability_modifier",
          value: -0.15,
          duration: 5
        }
      }
    }
  },

  the_promise_we_made: {
    name: "The Promise We Made.",
    description: "A nation we had previously announced our intention to protect, {FROM.name} has been attacked in a perfidious act of war! Although we could simply opt out of risking both our resources and armies to protect {FROM.name}, such an action would likely ruin our diplomatic reputation on the world stage. What should we do?",

    btn_accept_call_to_arms: {
      name: "Let the world know we stand by {FROM.name}. Enter the war.",
      effect: {
        join_war: {
          target: "LOCAL.war_id",
          side: "LOCAL.friendly_side"
        }
      }
    },
    btn_decline_call_to_arms: {
      name: "{FROM.name}!? I've never heard of such a place before!",
      effect: {
        FROM: {
          decrease_relations: {
            target: "FROM",
            value: 50
          }
        },
        add_temporary_modifier: {
          type: "stability_modifier",
          value: -0.05,
          duration: 5
        }
      }
    }
  },

  they_stand_defiant: {
    name: "They Stand Defiant",
    description: "{FROM.name} has refused to give up their independence, even in the face of our combined economic and military assets. Either they treat us as a laughing stock, or they hold the means to protect their independence at all costs. Either way, our military is preparing to move in.",

    btn_they_stand_defiant: {
      name: "How dare they defy us!?"
    }
  },

  we_are_free: {
    name: "We Are Free!",
    description: "Our nation has recently gained independence from {FROM.name} after our overlord announced that our vassalisation treaties and contractual obligations had been annulled. Their given reason for doing this is unclear, but our diplomats are speculating that they might have lost the economic and military strength needed to enforce such a policy. As such we have once again become an independent nation.",

    btn_we_are_free: {
      name: "Long live our new country!"
    }
  }
};
