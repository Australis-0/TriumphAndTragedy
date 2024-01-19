module.exports = {
  pageHandlerPops: function (arg0_user, arg1_input) {
    //Convert from parameters
    var arg = arg1_input.split(" ");
    var input = arg1_input;

    //Declare local instance variables
    var actual_id = main.global.user_map[arg0_user];
    var current_page = 0;
    var game_obj = getGameObject(arg0_user);
    var user_id = arg0_user;
    var usr = main.users[actual_id];

    //Make sure user isn't in a visual prompt
    var in_founding_map = (game_obj.page == "founding_map");
    var in_visual_prompt = interfaces[user_id];

    if (in_visual_prompt)
      in_visual_prompt = (in_visual_prompt.type == "visual_prompt");

    //Pops page handler
    if (game_obj.page == "population") {
      //[Display All Pops]
      if (input == "display all pops") {
        game_obj.display_no_pops = true;
        printPops(user_id);

        return true;
      }

      //[Display Irrelevant Pops]
      if (input == "display irrelevant pops") {
        game_obj.display_irrelevant_pops = true;
        printPops(user_id);

        return true;
      }

      //[Display Relevant Pops]
      if (input == "display relevant pops") {
        delete game_obj.display_irrelevant_pops;
        printPops(user_id);

        return true;
      }

      //[Display Populated Pops]
      if (input == "display populated pops") {
        delete game_obj.display_no_pops;
        printPops(user_id);

        return true;
      }

      //[Display Social Mobility]
      if (input == "display social mobility") {
        delete game_obj.hide_social_mobility;
        printPops(user_id);

        return true;
      }

      //[Hide Social Mobility]
      if (input == "hide social mobility") {
        game_obj.hide_social_mobility = true;
        printPops(user_id);

        return true;
      }
    }

    if (game_obj.page.startsWith("view_demographics_")) {
      var province_id = game_obj.page.replace("view_demographics_", "");
      var province_obj = getProvince(province_id);

      if (province_obj)
        province_id = province_obj.id;

      //[Back]
      if (input == "back") {
        printProvince(user_id, province_id);

        return true;
      }

      //[Births]
      if (input == "births") {
        printDemographicsLimitTooltip(user_id, province_id, {
          mode: "births"
        });

        return true;
      }

      //[Deaths]
      if (input == "deaths") {
        printDemographicsLimitTooltip(user_id, province_id, {
          mode: "deaths"
        });

        return true;
      }

      //[Demotion]
      if (input == "demotion") {
        printDemographicsLimitTooltip(user_id, province_id, {
          mode: "demotion"
        });

        return true;
      }

      //[Emigration]
      if (input == "emigration") {
        printDemographicsLimitTooltip(user_id, province_id, {
          mode: "emigration"
        });

        return true;
      }

      //[Expand Economic Statistics]
      if (input == "expand economic statistics") {
        delete game_obj.minimise_economic_statistics;
        printDemographics(user_id, province_id, current_page);

        return true;
      }

      //[Expand Pop Breakdown]
      if (input == "expand pop breakdown") {
        delete game_obj.minimise_pop_breakdown;
        printDemographics(user_id, province_id, current_page);

        return true;
      }

      //[Expand Profession Breakdown]
      if (input == "expand profession breakdown") {
        delete game_obj.hide_profession_breakdown;
        printDemographics(user_id, province_id, current_page);

        return true;
      }

      //[Expand Wealth Pools]
      if (input == "expand wealth pools") {
        delete game_obj.minimise_wealth_pools;
        printDemographics(user_id, province_id, current_page);

        return true;
      }

      //[Hide Age Composition]
      if (["hide age breakdown", "hide age composition", "hide age distribution"].includes(input)) {
        delete game_obj.show_age_composition;
        printDemographics(user_id, province_id, current_page);

        return true;
      }

      //[Hide All Details]
      if (input == "hide all details") {
        game_obj.hide_employers = true;
        game_obj.hide_needs_categories = true;
        game_obj.minimise_economic_statistics = true;
        game_obj.minimise_pop_breakdown = true;
        game_obj.minimise_wealth_pools = true;

        printDemographics(user_id, province_id, current_page);

        return true;
      }

      //[Hide Employers]
      if (input == "hide employers") {
        game_obj.hide_employers = true;
        printDemographics(user_id, province_id, current_page);

        return true;
      }

      //[Hide Needs Categories]
      if (input == "hide needs categories") {
        game_obj.hide_needs_categories = true;
        printDemographics(user_id, province_id, current_page);

        return true;
      }

      //[Hide Profession Breakdown]
      if (input == "hide profession breakdown") {
        game_obj.hide_profession_breakdown = true;
        printDemographics(user_id, province_id, current_page);

        return true;
      }

      //[Immigration]
      if (input == "immigration") {
        printDemographicsLimitTooltip(user_id, province_id, {
          mode: "immigration"
        });

        return true;
      }

      //[Jump To Page]
      if (input == "jump to page") {
        visualPrompt(game_obj.alert_embed, user_id, {
          title: `Jump To Page:`,
          prompts: [
            [`Which page would you like to jump to?`, "number", { min: 1, max: printDemographics(user_id, province_id, undefined, true).length }]
          ]
        },
        function (arg) {
          printDemographics(game_obj.user, province_id, arg[0] - 1);
        });

        return true;
      }

      //[Minimise Economic Statistics]
      if (["minimise economic statistics", "minimize economic statistics"].includes(input)) {
        game_obj.minimise_economic_statistics = true;
        printDemographics(user_id, province_id, current_page);
      }

      //[Minimise Pop Breakdown]
      if (["minimise pop breakdown", "minimize pop breakdown", "minimise population breakdown", "minimize population breakdown"].includes(input)) {
        game_obj.minimise_pop_breakdown = true;
        printDemographics(user_id, province_id, current_page);

        return true;
      }

      //[Minimise Wealth Pools]
      if (["minimise wealth pools", "minimize wealth pools", "minimise wealth pool", "minimize wealth pool"].includes(input)) {
        game_obj.minimise_wealth_pools = true;
        printDemographics(user_id, province_id, current_page);

        return true;
      }

      //[Promotion]
      if (input == "promotion") {
        printDemographicsLimitTooltip(user_id, province_id, {
          mode: "promotion"
        });

        return true;
      }

      //[Show Age Composition]
      if (["show age breakdown", "show age composition", "show age distribution"].includes(input)) {
        game_obj.show_age_composition = true;
        printDemographics(user_id, province_id, current_page);

        return true;
      }

      //[Show All Details]
      if (input == "show all details") {
        delete game_obj.hide_employers;
        delete game_obj.hide_needs_categories;
        delete game_obj.minimise_economic_statistics;
        delete game_obj.minimise_pop_breakdown;
        delete game_obj.minimise_wealth_pools;

        printDemographics(user_id, province_id, current_page);

        return true;
      }

      //[Show Employers]
      if (input == "show employers") {
        delete game_obj.hide_employers;
        printDemographics(user_id, province_id, current_page);

        return true;
      }

      //[Show Needs Categories]
      if (input == "show needs categories") {
        delete game_obj.hide_needs_categories;
        printDemographics(user_id, province_id, current_page);

        return true;
      }
    }

    if (population_pages.includes(game_obj.page)) {
      //[Culture]
      if (input == "culture") {
        createPageMenu(game_obj.middle_embed, {
          embed_pages: printCultures(user_id),
          user: game_obj.user
        });
        game_obj.page = "culture";

        return true;
      }
    }
  }
};
