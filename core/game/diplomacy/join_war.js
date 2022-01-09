module.exports = {
    joinWar: function (arg0_user, arg1_user, arg2_war_id) {
        //Convert from parameters
        var user_id = arg0_user;
        var ot_user_id = arg1_user;
        var joiner_id = main.global.user_map[user_id];
        var joiner_obj = main.users[joiner_id];
        var game_obj = getGameObject(user_id);
        var ally_id = main.global.user_map[ot_user_id];
        var ally_obj = main.users[ally_id];
        var war_id = arg2_war_id;
        var war = main.global.wars[war_id];
        var opp_side;

        //Check if joining against yourself
        if(!(war.defenders.includes(joiner_id)||war.attackers.includes(joiner_id))){

            //Assign opposing side & side
            if(war.defenders.includes(ally_id)){
                opp_side = war.attackers
            } else if(war.attackers.includes(ally_id)){
                opp_side = war.defenders
            }

            //Check if allied to anyone on the opposing side
            if(!joiner_obj.diplomacy.allies.some((val)=>opp_side.indexOf(val)!==-1)) {
                //Check for non-aggression pact
                if(!joiner_obj.diplomacy.non_aggression_pacts.some((val)=>opp_side.indexOf(val)!==-1)) {
                    //Joins user to the war

                    opp_side == war.attackers ? war.defenders.push(user_id) : war.attackers.push(user_id)
                    printAlert(game_obj.id, `${config.icons.defender} You have joined the **${war.name}** in support of **${ally_obj.name}**`)
                } else {
                    printError(game_obj.id, `You can't join a war against someone you have a non-agression pact with!`);
                }
            } else {
                printError(game_obj.id, `You can't join a war against one of your allies!`);
            }
        } else {
            printError(game_obj.id, `You can't join a war you're already involved in!`);
        }
    }
}