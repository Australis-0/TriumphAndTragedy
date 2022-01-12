module.exports = {
    addDemand: function (arg0_user, arg1_war_name, arg2_demand_name, arg3_options = {}) {
        /*
          status_quo: true/false
          install_government: { "actual_user_id": { id: "actual_user_id", type: "democracy" }}
          cut_down_to_size: ["actual_user_id", "actual_user_id_2", "actual_user_id_3"],
          liberation: true/false
          puppet: { "actual_user_id": { id: "actual_user_id", overlord: "overlord_id" }}
          retake_cores: ["actual_user_id", "actual_user_id_2"]
          annexation: { "actual_user_id": { id: "actual_user_id", provinces: ["4082", "2179", ...] }}
        */
    
        //Convert from parameters
        var user_id = arg0_user;
        var war_name = arg1_war_name;
        var demand_name = arg2_demand_name;
        var options = arg3_options
    
        //Declare local vars
        var actual_id = main.global.user_map[user_id];
        var war_obj = module.exports.getWar(war_name);
        var demands = war_obj.peace_treaties[actual_id].peace_demands
        
        //Adds requested demand to demands list
        switch (demand_name){
          case 'status_quo': 
            demands.status_quo = true;
            break;
          case 'install_government':
            demands.install_government = options;
            break;
          case 'cut_down_to_size':
            demands.cut_down_to_size = options;
            break;
          case 'liberation':
            demands.liberation = true;
            break;
          case 'puppet':
            demands.puppet = options;
            break;
          case 'retake_cores':
            demands.retake_cores = [actual_id, options];
            break;
          case 'annexation':
            demands.annexation = options;
            break;
        }
    },
    parsePeace: function (arg0_user, arg1_war_name) {
        //Convert from parameters
        var user_id = arg0_user;
        var war_name = arg1_war_name;

        //Declare local vars
        var actual_id = main.global.user_map[user_id];
        var war_obj = module.exports.getWar(war_name);
        var demands = war_obj.peace_treaties[actual_id].peace_demands;
        var [side, opposite_side] = war_obj.attackers.includes(actual_id) ? ['attackers', 'defenders'] : ['defenders', 'attackers'];

        //Checks if demands exist for given user
        if(demands) {
            //Checks if demands status quo
            if(demands.status_quo) {
                var total = 0;
                for(user of war_obj[opposite_side]){
                    total += user.money * 0.15;
                    user.money *= 0.85;
                }
                for(user of war_obj[side]){
                    user.money += total/war_obj[side].length;
                }
            } else {
                if(demands.install_government){
                    //install_government: { "actual_user_id": { id: "actual_user_id", type: "democracy" }}
                    target = demands.install_government.values[0].id;
                    type = demands.install_government[target].type;

                    target.government = type;
                }
                if(demands.cut_down_to_size){
                    for(user of demands.cut_down_to_size){
                        user.cut_down.war_name = 5; //number of years left to pay tax/not build
                        //TODO: destroy half of armies
                    }
                }
                if(demands.liberation){
                    overlord = actual_id.overlord;
                    actual_id.overlord = '';
                    delete overlord.subjects[actual_id];
                }
                if(demands.puppet){
                    //TODO: ask aust how to make puppets
                }
                if(demands.retake_cores){
                    for(user of retake_cores){
                        for(prov of getProvinces(user, {include_hostile_occupations: true, include_occupations: false})){
                            if(actual_id.cores.includes(prov)){
                                main.provinces[prov].owner = actual_id;
                                main.provinces[prov].controller = actual_id;
                            }
                        }
                    }
                }
                if(demands.annexation){
                    //annexation: { "actual_user_id": { id: "actual_user_id", provinces: ["4082", "2179", ...] }}
                    target = demands.annexation.values[0].id
                    provinces = demands.annexation[target].provinces

                    for(prov of provinces){
                        main.provinces[prov].owner = actual_id;
                        main.provinces[prov].controller = actual_id;
                    }
                }
            }
        }
    }
}