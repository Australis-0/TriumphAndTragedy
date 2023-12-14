module.exports = {
  /*
    enactReform() - Enacts a reform with options.
    options: {
      force_reform: true/false - Forces a reform to occur, regardless of votes.
    }
  */
  enactReform: function (arg0_user, arg1_reform_name, arg2_options) {
    //Convert from parameters
    var user_id = arg0_user;
    var reform_name = arg1_reform_name.trim().toLowerCase();

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_governments = Object.keys(config.governments);
    var game_obj = getGameObject(user_id);
    var options = (arg2_options) ? arg2_options: {};
    var raw_reform_name = getReform(reform_name, { return_key: true });
    var reform_obj = getReform(reform_name);
    var usr = main.users[actual_id];

    var current_government = config.governments[usr.government];

    //Check if government can actually pass a reform or not
    if (!current_government.effect.disabled_reforms) {
      //Check if user is at peace (cannot pass reforms whilst at war)
      if (usr.at_war.length == 0 || options.force_reform) {
        //Check if user has enough political capital
        if (usr.modifiers.political_capital >= config.defines.politics.reform_cost || options.force_reform) {
          //Check if the reform object even exists
          if (reform_obj) {
            var actual_reform_name = (reform_obj.name) ? reform_obj.name : raw_reform_name;
            var can_enact_reform = false;
            var raw_reform_category_name = getReformCategoryFromReform(raw_reform_name, { return_key: true });
            var reform_category = getReformCategoryFromReform(raw_reform_name);
            var reform_category_name = (reform_category.name) ? reform_category.name : raw_reform_category_name;
            var reforms_in_category = getReformsInCategory(raw_reform_category_name);

            //Check if user has even unlocked the reform yet
            if (usr.available_reforms.includes(raw_reform_category_name)) {
              //Check if specified index is valid compared to the current numeric index of the current legal position
              var current_reform_index = reforms_in_category.indexOf(usr.laws[raw_reform_category_name]);
              var old_reform_obj = getReform(usr.laws[raw_reform_category_name]);
              var new_reform_index = reforms_in_category.indexOf(raw_reform_name);

              var old_reform_name = (old_reform_obj.name) ? old_reform_obj.name : usr.laws[raw_reform_category_name];

              //Check if user has the correct index for enacting the reform
              if (
                (
                  new_reform_index == current_reform_index - 1 || //1 reform down
                  new_reform_index == current_reform_index + 1 //1 reform up
                ) ||
                options.force_reform
              ) {
                //User can pass reform, initiate parliamentary vote/simply pass it if user is a dictatorship that can pass reforms at will
                if (!options.force_reform)
                  usr.modifiers.political_capital -= config.defines.politics.reform_cost;

                //Random voting by which parties would be in favour of such a bill if user is a democracy
                var government_obj = config.governments[usr.government];

                var abstentions = 0;
                var ayes = 0;
                var nays = 0;

                //Declare parliament_string
                var parliament_string = [];

                //Format parliament_string
                parliament_string.push(`**__${actual_reform_name} Act__**`);
                parliament_string.push(config.localisation.divider);
                parliament_string.push("");

                //Start voting process
                if (government_obj.has_elections) {
                  for (var i = 0; i < all_governments.length; i++) {
                    var local_government = usr.politics[all_governments[i]];
                    var local_government_obj = config.governments[all_governments[i]];

                    var local_government_adjective = (local_government_obj.adjective) ?
                      local_government_obj.adjective :
                      all_governments[i];

                    var stance = ""; //in support, in opposition, neutral
                    var local_reform_discontent = (reform_obj.political_appeasement) ?
                      (reform_obj.political_appeasement[all_governments[i]]) ?
                        reform_obj.political_appeasement[`${all_governments[i]}_discontent`] :
                        0 :
                      0;
                    var old_reform_discontent = (old_reform_obj.political_appeasement) ?
                      (old_reform_obj.political_appeasement[all_governments[i]]) ?
                        old_reform_obj.political_appeasement[`${all_governments[i]}_discontent`] :
                        0 :
                      0;

                    //Check whether party is in opposition, in support, or neutral
                    if (local_reform_discontent == old_reform_discontent) {
                      stance = "neutral";
                    } else if (local_reform_discontent > old_reform_discontent) {
                      stance = "in opposition";
                    } else {
                      stance = "in support";
                    }

                    if (local_government.popularity > 0)
                      if (stance == "in support") {
                        var party_ayes = randomNumber(0, local_government.popularity);
                        var party_abstentions = local_government.popularity - party_ayes;

                        ayes += party_ayes;
                        abstentions += party_abstentions;

                        parliament_string.push(`The **${local_government_adjective.toLowerCase()}** were **supportive** of the motion, with **${parseNumber(party_ayes)}** voting in favour, and **${parseNumber(party_abstentions)}** abstaining.`);
                      } else if (stance == "in opposition") {
                        var party_nays = randomNumber(0, local_government.popularity);
                        var party_abstentions = local_government.popularity - party_nays;

                        nays += party_nays;
                        abstentions += party_abstentions;

                        parliament_string.push(`The **${local_government_adjective.toLowerCase()}** were **opposed** to the motion, with **${parseNumber(party_nays)}** voting in opposition, and **${parseNumber(party_abstentions)}** abstaining.`);
                      } else {
                        abstentions += local_government.popularity;

                        parliament_string.push(`The **${local_government_adjective.toLowerCase()} were neither **in favour** nor **in opposition** to the motion, with their entire party of **${parseNumber(local_govenrment.popularity)}** representatives abstaining.`);
                      }
                  }

                  parliament_string.push("");
                  parliament_string.push(`The Ayes to the right, **${parseNumber(ayes)}**, the Noes to the left, **${parseNumber(nays)}**.\n**${parseNumber(abstentions)}** MPs refrained from voting on the issue. Unlock.`);
                }

                //Check if reform passed
                if ((ayes > nays) || !current_government.has_elections || options.force_reform) {
                  parliament_string.push(`${config.icons.checkmark} You have changed your policy on **${reform_category_name}** from **${old_reform_name}** to **${actual_reform_name}**.`);
                  usr.laws[raw_reform_category_name] = raw_reform_name;

                  //Pass reform block
                  {
                    var inverted_old_reform_modifiers = [];

                    //Remove old reform modifiers
                    if (old_reform_obj.political_appeasement)
                      for (var i = 0; i < all_governments.length; i++)
                        try {
                          var local_government = config.governments[all_governments[i]];
                          var old_reform_appeasement = old_reform_obj.political_appeasement[`${all_governments[i]}_discontent`];

                          if (old_reform_appeasement)
                            usr.politics[all_governments[i]].discontent += old_reform_appeasement*-1;
                        } catch {}

                    //Remove old reform effects
                    if (old_reform_obj.effects) {
                      var all_effects = Object.keys(old_reform_obj.effects);

                      for (var i = 0; i < all_effects.length; i++)
                        try {
                          inverted_old_reform_modifiers[all_effects[i]] = old_reform_obj.effects[all_effects[i]]*-1;
                        } catch {}
                    }
                    applyModifiers(user_id, inverted_old_reform_modifiers);

                    //Add new reform modifiers
                    if (reform_obj.political_appeasement)
                      for (var i = 0; i < all_governments.length; i++)
                        try {
                          var local_government = config.governments[all_governments[i]];
                          var new_reform_appeasement = reform_obj.political_appeasement[`${all_governments[i]}_discontent`];

                          if (new_reform_appeasement)
                            usr.politics[all_governments[i]].discontent += new_reform_appeasement;
                        } catch {}

                    //Add new reform effects
                    if (reform_obj.effects)
                      applyModifiers(user_id, reform_obj.effects);
                  }
                } else {
                  parliament_string.push(`The reform unfortunately failed to pass Parliament.`);
                }

                //Print user feedback
                printAlert(game_obj.id, parliament_string.join("\n"));

                //Subtract from reform_desire
                {
                  usr.modifiers.reform_desire = Math.max(usr.modifiers.reform_desire - 0.5, 0);
                }

                //Update reform UI if user is currently viewing it
                if (game_obj.page == "reforms")
                  createPageMenu(game_obj.middle_embed, {
                    embed_pages: printReforms(user_id),
                    page: interfaces[game_obj.middle_embed.id].page,
                    user: game_obj.user
                  });

              } else if (new_reform_index == current_reform_index) {
                printError(game_obj.id, `You have already enacted **${actual_reform_name}** as your stance on **${reform_category_name}**!`);
              } else {
                printError(game_obj.id, `You cannot proceed to that reform yet!`);
              }
            } else {
              printError(game_obj.id, `You have not yet unlocked the category needed to enact **${actual_reform_name}**! Try researching additional technologies first.`);
            }
          } else {
            printError(game_obj.id, `**${reform_name}** is not a valid reform you can enact!`);
          }
        } else {
          printError(game_obj.id, `You don't have enough Political Capital to enact that reform yet! You need **${parseNumber(config.defines.politics.reform_cost - usr.modifiers.political_capital)}** ${config.icons.political_capital} more Political Capital.`);
        }
      } else {
        printError(game_obj.id, `You can't enact reforms whilst you're at war! Focus on the war effort first.`);
      }
    } else {
      //Check if government is of type anarchy or not
      (current_government.is_anarchy) ?
        printError(game_obj.id, `You can't pass reforms as a non-state actor! Get your government out of anarchy first before attempting to pass anything.`) :
        printError(game_obj.id, `You can't pass reforms as an **${(current_government.name) ? current_government.name : usr.government}**! Try managing your stability the good-old fashioned way instead.`);
    }
  },

  initialiseEnactReform: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Enact Reform:`,
      prompts: [
        [`What is the name of the reform you wouid like to enact?\n\nType **[View Reforms]** for a list of valid reforms.`, "string"]
      ]
    },
    function (arg) {
      module.exports.enactReform(user_id, arg[0]);
    },
    function (arg) {
      switch (arg) {
        case "view reforms":
          createPageMenu(game_obj.middle_embed, {
            embed_pages: printReforms(user_id),
            user: game_obj.user
          });
          return true;

          break;
      }
    });
  }
};
