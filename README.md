# Triumph And Tragedy
Wanna contribute/take a look around the repo? Contact `@Australis#6709` on Discord for more info on what needs to be done, or take a look at the **TODO** section of this page.

## About-
Triumph & Tragedy is a grand-strategy game built on Discord using discord.js. Featuring fully-fledged diplomacy, combat, economic, and political mechanics, this bot is now undergoing an extensive [overhaul and recode](https://docs.google.com/document/d/1BKCJqh4oHbGyzd0z3Zv7wa1ZYlJANipJ--YZat7OS98/edit?usp=sharing) to update a flagging codebase, as much of the code and related planning was introduced piecemeal.

Most of the forty-five thousand lines of code can be found in just two files- `main.js` & `config.js`, both of which are in dire need of refactoring. config.js is currently being slowly replicated into different files (although the file itself remains in the core folder), and main.js is planned to follow suit soon with a complete recode. This process is estimated to take until 14 October to complete.

## Current Update: System Dynamics- _Backend Framework_

System Dynamics will completely overhaul the UI of Triumph & Tragedy 1.0 in addition to constructing a flexible backend framework with a well-documented modding/scripting API to make future updates to the game easier. This also means the partitioning of games in System Dynamics to allow for players to start and join multiple games, as well as the capability for multiple mods in the future.

The first step of the update is to reconstruct the existing game entirely from scratch to ensure that the codebase is modern, up-to-date, and operational. Additional frameworks can then be built around it to ensure future flexibility for ambitious updates going forwards, as well as the continual overhaul of various mechanics. This can be expected to take approximately one and a half months.

- [ ] Config Refactorisation Completion: **14 September 2021** (Planned)
- [ ] Code Refactoring/Replica Completion: **14 October 2021** (Planned)

## Roadmap-

The future of Triumph & Tragedy and its slow progress into 2.0 can be marked by four sweeping updates, each of which constitute a complete overhaul to the game, but can only be implemented after the bot recode is complete.

### **Into Modernity-** 1 March 2022 - _Local Pops, Economies, and Technology_

Into Modernity will focus on modelling simulations of economies and pops at the granular level from the ground up at the broadest scale possible - millions of people - tens of thousands of buildings - entire nations at the local level down to the last individual, providing strategic depth to the player and allowing to immerse themselves in their own nation.

This will involve a total overhaul of the game, and the old version from System Dynamics may continue to be run instead until Last Man Standing is complete if the new version is not entirely compatible with it.

### **Proxy Cables-** 1 June 2022 - _Diplomacy, Politics, and Colonisation_

Focusing on nuanced diplomacy, espionage, politics, and colonisation, Proxy Cables focuses on the subtleties of local, domestic, and international geopolitics with dynamic mechanics to back them up. From procedurally-generated political parties and interest groups to spy games and soft power investments in foreign nations, Proxy Cables is all about the long game, intrigue, and carefully manoeuvring your way out of crises.

It will also feature a completely overhauled colonisation system that seeks to emulate how methods of colonisation and imperialism changed historically over time both through period-specific mechanics and more gradual shifts, as well as the colonial crises and decolonisation that inevitably followed.

### **Last Man Standing-** 30 July 2022 - _Combat, Customisation, and AI_

Watch as the field evolves from set-piece battles and tiny skirmishes to massive operations and front lines spanning entire countries as armies of millions attempt to outflank armies of millions in total wars of desperation. Overhauled army management, special combat units, and customisable order-of-battles and equipment give your army the edge it needs to go to war.

In Last Man Standing, wars of totality are wars where combat takes place outside the box, from guerrilla operations to innovative new tactics your opponents never expected, with customisation at the most granular level of detail: There is a soldier. A soldier is in a fireteam. A fireteam is in a squad. A squad is a platoon. A platoon is in a company. A company is in a battalion. A battalion is in a regiment. A regiment is in a brigade. A brigade is in a division. A division is in a corps. A corps is in a field army. A field army is in an army group. And an army group can be in a theatre. And it will all be customisable down to the buttons on the soldier’s uniform.

Soldiers are tied to pops. Provinces can depopulate through air raids, refugee movements, occupations, sackings and sieges. As technology advances, so too does the level of customisation and complexity, as well as what you can do with it. Special Ops. Biological. Chemical. Cyberwarfare. AI. Satellite. Space. Eventually, even things such as nuclear war won’t be completely off the table. And this time, you’re the one putting the decoys in your missiles. You’re the one designing your country’s nuclear triad. You’re the one crippling other people’s electric grids. And the consequences could be more drastic than you ever expected ..

## TODO-
* [ ] Finish System Dynamics planning
* [ ] Finish refactoring config.js
  * [x] Refactor goods
  * [x] Refactor buildings
  * [x] Refactor units
  * [x] Refactor techs
  * [x] Refactor laws & reforms
  * [x] Refactor governments
  * [x] Refactor map defines
  * [x] Refactor common defines
  * [x] Refactor casus_belli
    * [x] Document casus_belli config
  * [x] Refactor events
    * [x] Document alerts config
    * [x] Document events config
    * [x] Finish diplomatic alerts
    * [ ] Add `ai_chance` to diplomatic alerts
    * [x] Review diplomatic alerts and move some over to events folder if needed
  * [x] Refactor pops
    * [x] Document pops config
  * [x] Add localisation API (in separate folder)

  * [x] Add modifiers scope

  * [x] Add config load order
  * [ ] Finish creating UI and data frameworks
  * [ ] Finish creating localisation and scripting frameworks
  * [ ] Finish implementing and refactoring main.js
  * [ ] Switch over to monospaced fonts

* [ ] Begin replica work
  * [ ] Build basic frameworks
  * [ ] Complete main menu UI work - _WIP_
  * [ ] Complete game saving/loading framework- locked off to 1 game for now!
  * [ ] Finish user initialisation objects
  * [ ] Finish game UI work w/ private channels
  * [ ] Finish soundtrack work

  * [ ] Begin work on API parsers
    * [ ] Finish contextual recursive parser work; compartmentalise per game
    * [ ] Soundtrack parser
    * [ ] Modifiers parser
    * [ ] Government parser
    * [ ] Events parser

  * [ ] Replicate economic mechanics
    * [ ] Create universal province model
    * [ ] Make sure each building is its own object!
  * [ ] Replicate pop mechanics
  * [ ] Replicate colonial mechanics
  * [ ] Replicate technology mechanics
  * [ ] Replicate trade mechanics
    * [ ] Replicate Global Market mechanic
  * [ ] Replicate political mechanics
    * [ ] Create laws & reforms mechanic
  * [ ] Replicate diplomacy mechanics
  * [ ] Replicate combat mechanics
