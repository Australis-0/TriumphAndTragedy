# Triumph & Tragedy

![](https://media.discordapp.net/attachments/829862963485474827/936005762600296458/civilization_mobile_banner_2.png)

![](https://media.discordapp.net/attachments/829862963485474827/962095713225957407/unknown.png)


[![Join our community!](https://img.shields.io/discord/548994743925997570?label=Discord&style=for-the-badge)](https://discord.gg/89kQY2KFQz) ![](https://img.shields.io/github/languages/code-size/Australis-0/TriumphAndTragedy?style=for-the-badge) ![](https://img.shields.io/github/downloads/Australis-0/TriumphAndTragedy/total?style=for-the-badge)

> We're looking for programmers! If you know JS/JSON, please get in touch!

## About

**Triumph & Tragedy** is a turn-based grand-strategy Discord bot game featuring fully automated economic, diplomatic, combat, and political mechanics. It comes with a variety of frameworks as well as a revolutionary new UI system that utilises private channels for a more seamless in-game experience.

* Brutally simple and readable
* Easy to setup
* Modding framework
* Performant

## Contributing

Anyone is welcome to contribute to Triumph & Tragedy! Although we have a variety of [official updates](https://docs.google.com/document/d/1BKCJqh4oHbGyzd0z3Zv7wa1ZYlJANipJ--YZat7OS98/edit?usp=sharing) in the works,  your feedback on these is more than welcome.

If you'd like to create a mod for Triumph & Tragedy, simply fork this repo and start editing!

If you wish to help with official updates, get in touch with `@Australis#6709` or `@Vis#5102` over Discord for information on how to become an official contributor, or simply create a new pull request.

## Data Structure

The data structure of Triumph & Tragedy is brutally simple, and separated into the following categories:

#### Main Folders:

- `common/` - All config and modding files are contained here, and formatted in JSON.
- `core/framework/data` - These contain the core game functions and parsers from common.
- `core/framework/ui` - All UI elements are put here.
- `core/game` - Contains all the command files for the game.

#### Special Files:

- `core/framework/data/turn_framework.js` is used for all turn processing.

- `core/framework/discord/command_handler.js` provides our visual prompt system, an alternative to Discord's base slash commands.

- `core/framework/ui/page_handler.js` handles all buttons and commands.
- `core/framework/ui/topbar_handler.js` handles all topbar buttons (e.g. Country/Economy, etc).
- `core/framework/ui/ui_framework.js` contains the base framework for most UI elements.

- `main.js` contains an overview and directory of all files used in the bot.

## Documentation

Documentation is available for modders! [Click here](https://docs.google.com/document/d/14cIguINtzcLS0-rSkRPAV5VJOIcJPIA1pZzO2k5jEYQ/edit?usp=sharing) to start reading.

The game's code is structured in a reasonable and simple way! Filenames tell you what mechanic and category they sit in, and all functions inside are automatically made global for convenience, and sorted alphabetically. The code inside tries to be as simple and readable as possible.

Feel free to dig right in!

## Help

#### Dependencies:

- **Cairo Graphics**
- **Node.js** 16.9.0+

Make sure to set up a bot client under Discord Developer Portal if you want the bot to run properly!

Create a new file called `settings.js` in the base directory. The template should look like this:

```js
global.settings = {
  //General settings
  administrator_roles: ["<INSERT_YOUR_ADMIN_ID_ROLE_HERE>"], //Role ID's for administrators
  bot_token: "<INSERT_YOUR_BOT_TOKEN_HERE>",
  prefix: "$",
  no_space: true,
  visual_prompt_delay: 5000, //How many milliseconds should the bot wait before moving onto the next visual prompt?

  bot_colour: "#a98ac7", //What is the main default colour that should appear on bot embeds?
  bot_header_colour: "#e22626", //What is the default colour that should appear on the top header?
  cache_channels: [
    "901464985916538880",
    "901465004526686250",
    "901465025661788170",
    "901465032544645161",
    "901465038919987271",
    "901465051062480927",
    "901465060403187734",
    "901465075804696577",
    "901465085053141072",
    "901465092795818044",
    "901465116531384370",
    "901465126073405481",
    "901465135120519198",
    "901465144859688960",
    "901465154624041021",
    "901465163536937041",
    "901465172210749531",
    "901465179739541564",
    "901465198018306099",
    "901465207006691378"
  ], //What are the ID's of all the cache channels to which the bot may randomly upload? (This helps increase 'bandwidth' and reduces rate limiting)
  tt_category_id: "711295102877958195", //What is the ID of the category where new games should be created?

  backup_limit: 15, //How many concurrent backups should be saved before old ones are purged?
  backup_timer: 600, //Save every 10 minutes
  inactivity_timer: 600, //How much time should pass in seconds before a game is considered inactive?
  turn_timer: 10800 //How much time should pass in seconds before a new turn passes?
};
```

Make sure to edit each of these parameters to fit your bot!

You can then launch the bot at anytime by running `autorun.bat`.

---

If you have any additional questions, [Join our Discord](https://discord.gg/89kQY2KFQz)! We're more than happy to help. This bot is a major undertaking, and as such we ourselves need all the help we can get!

Happy modding and coding,

-Australis & Vis
