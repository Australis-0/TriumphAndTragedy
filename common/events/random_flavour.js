config.events.random_flavour = {
  comet_sighted: {
    name: "Comet Sighted",
    description: "Peasants are always superstitious, and the appearance of a comet in the sky has caused panic among our people. They are convinced that this is a sign that the end of times is near or that something bad is going to happen in the near future.",
    image: "https://media.discordapp.net/attachments/682166052393582627/740806719512379432/f65c82ddf92032087e9b472ec36903a5.png",

    trigger: function (usr) {
      var chance = randomNumber(0, 100);

      if (usr.researched_technologies.length < 100)
        if (chance <= 2)
          if (!usr.comet_sighted_event) {
            usr.comet_sighted_event = 1;
            return true;
          } else
            if (usr.comet_sighted_event < 3) {
              usr.comet_sighted_event++;
              return true;
            } else
              return false;
        else
          return false;
      else
        return false;
    },

    option_a: {
      title: `It's an omen!`,
      description: [
        `**-5%** Stability for **3** turns.`
      ],
      effect: function (options) {
        addTemporaryModifier(options.FROM, {
          type: "stability_modifier",
          value: -0.05,
          duration: 3
        });
      }
    }
  }
};
