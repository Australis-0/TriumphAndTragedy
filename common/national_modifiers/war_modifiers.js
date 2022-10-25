config.national_modifiers.war_modifiers = {
  nation_in_arms: {
    name: "A Nation In Arms!",
    image: "https://media.discordapp.net/attachments/744414944019087451/799507120755441664/mobilisation_impact.png",
    icon: "small_arms",
    description: "With the outbreak of war, we have ordered the conscription of all male personnel into the army and the mobilisation of all reservists, leaving many essential tasks on the home front vacant, and depleting our national coffers. From rural pastures to bustling cities, **{FROM.name}** calls on all its citizens to serve their country!",

    trigger: function (usr) {
      if (usr.mobilisation.is_mobilised)
        return true;
    },

    effect: function (usr) {
      //Declare local instance variables
      var all_mobilisation_impacts = Object.keys(config.defines.combat.base_mobilisation_impact);
      var mobilisation_impact = config.defines.combat.base_mobilisation_impact;
      var modifiers = {};

      for (var i = 0; i < all_mobilisation_impacts.length; i++)
        modifiers[all_mobilisation_impacts[i]] = mobilisation_impact[all_mobilisation_impacts[i]]*usr.modifiers.mobilisation_impact;

      //Return modifier object
      return modifiers;
    }
  },

  peacetime_mobilisation: {
    name: "Peacetime Mobilisation",
    image: "https://media.discordapp.net/attachments/829862963485474827/1034476782570704976/peacetime_mobilisation.png",
    icon: "infamy",
    description: "With us still mobilised despite being at peace, our neighbours have begun to look upon us with more and more concern. If we do not demobilise soon, we risk becoming an international pariah, with a serious drain on our productivity.",

    trigger: function (usr) {
      if (usr.mobilisation.is_mobilised && !atWar(user_id))
        return true;
    },

    modifiers: {
      infamy_loss: 1, //+1.00 Infamy per turn
      production_efficiency: -0.15
    }
  }
};
