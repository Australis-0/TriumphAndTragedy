module.exports = {
  cacheSVG: function (arg0_map_name, arg1_hide_province_labels) {
    //Convert from parameters
    var map_name = arg0_map_name;
    var hide_province_labels = arg1_hide_province_labels;

    //Check if Worker is available
    if (hasAvailableWorker(2)) {
      var random_index = randomNumber(0, thread_two_workers.length - 1);

      thread_two_workers[random_index].send({
        command: "cacheSVG",
        map_name: map_name,
        hide_province_labels: hide_province_labels
      });
    }
  },

  convertSVG: async function (arg0_map_name) {
    //Convert from parameters
    var map_name = arg0_map_name;

    //Declare local instance variables
    var file_path = "./map/" + global[`${map_name}_file`];

    //Convert file
    var output_file_path = await SVG.convertFile(file_path);

    try {
      cacheSVG(map_name);
    } catch {
      cacheSVG(map_name); //Very creative fix, I know
    }
  },

  forceRender: function (arg0_map_name) {
    //Convert from parameters
    var map_name = arg0_map_name;

    //Declare local instance variables
    if (thread_two_workers.length > 0) {
      var random_index = randomNumber(0, thread_two_workers.length - 1);

      thread_two_workers[random_index].send(getMasterObject());
      thread_two_workers[random_index].send({
        command: "forceRender",
        map_name: map_name
      });
    }
  },

  internalCacheSVG: function (arg0_map_name, arg1_hide_province_labels) {
    //Convert from parameters
    var map_name = arg0_map_name;
    var hide_province_labels = arg1_hide_province_labels;

    var map_file = global[`${map_name}_file`];

    //Declare local instance variables
    var all_users = (main.users) ? Object.keys(main.users) : {};
    var label_placement = config.defines.map.map_label_placement;
    var labels = [];

    log.info(`internalCacheSVG() called for ${map_file}!`);

    var current_file_data = global[`${map_name}_parsed`].toString()
      .replace(/><\/path>/gm, " />")
      .trim();

    fs.promises.writeFile(`./map/${map_file}`, current_file_data, (err) => {
      console.log(err);
    }).then(() => {
      SVG.convertFile(`./map/${map_file}`).then((png) => {
          //Check to make sure that map file is valid
          if (fs.readFileSync(`./map/${map_file}`, "utf8").toString().length > 0) {
            //Regular error trapping just in case
            try {
              switch (map_name) {
                case "atlas":
                  //Political map rendering
                  var current_element = 0;
                  var counter = 0;

                  //Separate labels into columns
                  for (var i = 0; i < all_users.length; i++) {
                    var local_user = main.users[all_users[i]];

                    //Only display label if user is not eliminated and has more than zero provinces
                    if (!local_user.eliminated && local_user.provinces > 0)
                      if (label_placement[current_element]) {
                        if (counter == label_placement[current_element]) {
                          counter = 0;
                          current_element++;
                        }

                        counter++;
                        if (labels[current_element])
                          labels[current_element].push(all_users[i]);
                        else
                          labels[current_element] = [all_users[i]];
                      }
                  }

                  //Initialise canvas and draw key for atlas map
                  {
                    var canvas = Canvas.createCanvas(config.defines.map.map_resolution[0], config.defines.map.map_resolution[1]);
                    var ctx = canvas.getContext("2d");

                    //Load map
                    var background_layer = new Canvas.Image();
                    var atlas_svg_layer = new Canvas.Image();

                    background_layer.onload = () => ctx.drawImage(background_layer, 0, 0, config.defines.map.map_resolution[0], config.defines.map.map_resolution[1]);
                    background_layer.onerror = err => { throw err; }

                    background_layer.src = `./map/${config.defines.map.map_terrain}`;

                    atlas_svg_layer.onload = () => ctx.drawImage(atlas_svg_layer, 0, 0, config.defines.map.map_resolution[0], config.defines.map.map_resolution[1]);
                    atlas_svg_layer.onerror = err => { throw err; }
                    atlas_svg_layer.src = `./map/atlas_map.png`;

                    //Generate key
                    ctx.font = "36px Oswald";
                    ctx.fillStyle = "#ffffff";
                    ctx.fillText("Nations of the World:", config.defines.map.map_label_coords[0], config.defines.map.map_label_coords[1]);

                    //Generate colour key and accompanying labels
                    ctx.strokeStyle = "#ffffff";

                    for (var i = 0; i < labels.length; i++)
                      for (var x = 0; x < labels[i].length; x++) {
                        var local_user = main.users[labels[i][x]];

                        ctx.fillStyle = RGBToHex(parseInt(local_user.colour[0]), parseInt(local_user.colour[1]), parseInt(local_user.colour[2]));
                        ctx.fillRect(config.defines.map.map_label_coords[0] + i*320, config.defines.map.map_label_coords[1] + 15 + x*40, 36, 36);
                        ctx.beginPath();
                        ctx.rect(config.defines.map.map_label_coords[0] + i*320, config.defines.map.map_label_coords[1] + 15 + x*40, 36, 36);
                        ctx.stroke();

                        ctx.fillStyle = "#ffffff";
                        ctx.fillText(truncateString(local_user.name, 15), config.defines.map.map_label_coords[0] + 50 + i*320, config.defines.map.map_label_coords[1] + 47 + x*40);
                      }
                  }

                  break;
                case "population":
                  var all_provinces = Object.keys(main.provinces);
                  var maximum_population = 0;

                  //Get maximum population
                  for (var i = 0; i < all_provinces.length; i++) {
                    var local_province = main.provinces[all_provinces[i]];

                    if (local_province.pops)
                      maximum_population = Math.max(
                        maximum_population, returnSafeNumber(local_province.pops.population)
                      );
                  }

                  //Initialise canvas
                  var canvas = Canvas.createCanvas(config.defines.map.map_resolution[0], config.defines.map.map_resolution[1]);
                  var ctx = canvas.getContext("2d");

                  //Load map
                  var background_layer = new Canvas.Image();
                  var population_layer = new Canvas.Image();

                  background_layer.onload = () => ctx.drawImage(background_layer, 0, 0, config.defines.map.map_resolution[0], config.defines.map.map_resolution[1]);
                  background_layer.onerror = err => { throw err; }
                  background_layer.src = `./map/${config.defines.map.map_background}`;

                  population_layer.onload = () => ctx.drawImage(population_layer, 0, 0, config.defines.map.map_resolution[0], config.defines.map.map_resolution[1]);
                  population_layer.onerror = err => { throw err; }
                  population_layer.src = `./map/${map_file.replace(".svg", ".png")}`;

                  //Only render province labels if applicable
                  if (!hide_province_labels) {
                    var province_id_layer = new Canvas.Image();

                    province_id_layer.onload = () => ctx.drawImage(province_id_layer, 0, 0, config.defines.map.map_resolution[0], config.defines.map.map_resolution[1]);
                    province_id_layer.onerror = err => { throw err; }
                    province_id_layer.src = `./map/${config.defines.map.map_overlay}`;
                  }

                  //Population rendering; render linear scale
                  ctx.font = "36px Oswald";
                  ctx.fillStyle = "#ffffff";
                  ctx.fillText("Population:", config.defines.map.map_label_coords[0], config.defines.map.map_label_coords[1]);

                  //Generate colour key and accompanying labels
                  ctx.strokeStyle = "#ffffff";

                  for (var i = 0; i < 110; i+= 10) {
                    var local_index = i;
                    if (local_index == 100) local_index--; //Render 99

                    if (i == 0 || maximum_population > 0) {
                      ctx.fillStyle = RGBToHex(
                        config.defines.map.scalar_gradient[local_index][0], config.defines.map.scalar_gradient[local_index][1], config.defines.map.scalar_gradient[local_index][2]
                      );
                      ctx.fillRect(config.defines.map.map_label_coords[0], config.defines.map.map_label_coords[1] + 15 + (i/10)*40, 36, 36);
                      ctx.beginPath();
                      ctx.rect(config.defines.map.map_label_coords[0], config.defines.map.map_label_coords[1] + 15 + (i/10)*40, 36, 36);
                      ctx.stroke();

                      ctx.fillStyle = "#ffffff";
                      ctx.fillText(truncateString(`${parseNumber((local_index < 99) ? getLogarithmicScale(local_index, 1, maximum_population, 3) : maximum_population)}`, 15), config.defines.map.map_label_coords[0] + 50, config.defines.map.map_label_coords[1] + 47 + (i/10)*40);
                    }
                  }

                  break;
                case "supply":
                  var all_provinces = Object.keys(main.provinces);
                  var maximum_supply_limit = 0;

                  //Get maximum supply limit
                  for (var i = 0; i < all_provinces.length; i++)
                    maximum_supply_limit = Math.max(
                      maximum_supply_limit, returnSafeNumber(main.provinces[all_provinces[i]].supply_limit)
                    );

                  //Initialise canvas
                  var canvas = Canvas.createCanvas(config.defines.map.map_resolution[0], config.defines.map.map_resolution[1]);
                  var ctx = canvas.getContext("2d");

                  //Load map
                  var background_layer = new Canvas.Image();
                  var supply_svg_layer = new Canvas.Image();

                  background_layer.onload = () => ctx.drawImage(background_layer, 0, 0, config.defines.map.map_resolution[0], config.defines.map.map_resolution[1]);
                  background_layer.onerror = err => { throw err; }
                  background_layer.src = `./map/${config.defines.map.map_background}`;

                  supply_svg_layer.onload = () => ctx.drawImage(supply_svg_layer, 0, 0, config.defines.map.map_resolution[0], config.defines.map.map_resolution[1]);
                  supply_svg_layer.onerror = err => { throw err; }
                  supply_svg_layer.src = `./map/${map_file.replace(".svg", ".png")}`;

                  //Only render province labels if applicable
                  if (!hide_province_labels) {
                    var province_id_layer = new Canvas.Image();

                    province_id_layer.onload = () => ctx.drawImage(province_id_layer, 0, 0, config.defines.map.map_resolution[0], config.defines.map.map_resolution[1]);
                    province_id_layer.onerror = err => { throw err; }
                    province_id_layer.src = `./map/${config.defines.map.map_overlay}`;
                  }

                  //Supply legend rendering; render linear scale
                  ctx.font = "36px Oswald";
                  ctx.fillStyle = "#ffffff";
                  ctx.fillText("Supply Limit:", config.defines.map.map_label_coords[0], config.defines.map.map_label_coords[1]);

                  //Generate colour key and accompanying labels
                  ctx.strokeStyle = "#ffffff";

                  for (var i = 0; i < 110; i+= 10) {
                    var local_index = i;
                    if (local_index == 100) local_index--; //Render 99

                    if (i == 0 || maximum_supply_limit > config.defines.combat.base_supply_limit) {
                      ctx.fillStyle = RGBToHex(
                        config.defines.map.scalar_gradient[local_index][0], config.defines.map.scalar_gradient[local_index][1], config.defines.map.scalar_gradient[local_index][2]
                      );
                      ctx.fillRect(config.defines.map.map_label_coords[0], config.defines.map.map_label_coords[1] + 15 + (i/10)*40, 36, 36);
                      ctx.beginPath();
                      ctx.rect(config.defines.map.map_label_coords[0], config.defines.map.map_label_coords[1] + 15 + (i/10)*40, 36, 36);
                      ctx.stroke();

                      ctx.fillStyle = "#ffffff";
                      ctx.fillText(truncateString(`${Math.round(Math.max(maximum_supply_limit*(local_index/100), config.defines.combat.base_supply_limit))}`, 15), config.defines.map.map_label_coords[0] + 50, config.defines.map.map_label_coords[1] + 47 + (i/10)*40);
                    }
                  }

                  break;
                default:
                  //Political map rendering
                  var current_element = 0;
                  var counter = 0;

                  //Separate labels into columns
                  for (var i = 0; i < all_users.length; i++) {
                    var local_user = main.users[all_users[i]];

                    //Only display label if user is not eliminated and has more than zero provinces
                    if (local_user)
                      if (!local_user.eliminated && local_user.provinces > 0)
                        if (label_placement[current_element]) {
                          if (counter == label_placement[current_element]) {
                            counter = 0;
                            current_element++;
                          }

                          counter++;
                          if (labels[current_element])
                            labels[current_element].push(all_users[i]);
                          else
                            labels[current_element] = [all_users[i]];
                        }
                  }

                  //Initialise canvas and draw key for political map
                  {
                    var canvas = Canvas.createCanvas(config.defines.map.map_resolution[0], config.defines.map.map_resolution[1]);
                    var ctx = canvas.getContext("2d");

                    //Load map
                    var background_layer = new Canvas.Image();
                    var political_svg_layer = new Canvas.Image();

                    background_layer.onload = () => ctx.drawImage(background_layer, 0, 0, config.defines.map.map_resolution[0], config.defines.map.map_resolution[1]);
                    background_layer.onerror = err => { throw err; }

                    background_layer.src = `./map/${config.defines.map.map_background}`;

                    political_svg_layer.onload = () => ctx.drawImage(political_svg_layer, 0, 0, config.defines.map.map_resolution[0], config.defines.map.map_resolution[1]);
                    political_svg_layer.onerror = err => { throw err; }
                    political_svg_layer.src = `./map/${map_file.replace(".svg", ".png")}`;

                    //Only render province labels if applicable
                    if (!hide_province_labels) {
                      var province_id_layer = new Canvas.Image();

                      province_id_layer.onload = () => ctx.drawImage(province_id_layer, 0, 0, config.defines.map.map_resolution[0], config.defines.map.map_resolution[1]);
                      province_id_layer.onerror = err => { throw err; }
                      province_id_layer.src = `./map/${config.defines.map.map_overlay}`;
                    }

                    //Generate key
                    ctx.font = "36px Oswald";
                    ctx.fillStyle = "#ffffff";
                    ctx.fillText("Nations of the World:", config.defines.map.map_label_coords[0], config.defines.map.map_label_coords[1]);

                    //Generate colour key and accompanying labels
                    ctx.strokeStyle = "#ffffff";

                    for (var i = 0; i < labels.length; i++)
                      for (var x = 0; x < labels[i].length; x++) {
                        var local_user = main.users[labels[i][x]];

                        ctx.fillStyle = RGBToHex(parseInt(local_user.colour[0]), parseInt(local_user.colour[1]), parseInt(local_user.colour[2]));
                        ctx.fillRect(config.defines.map.map_label_coords[0] + i*320, config.defines.map.map_label_coords[1] + 15 + x*40, 36, 36);
                        ctx.beginPath();
                        ctx.rect(config.defines.map.map_label_coords[0] + i*320, config.defines.map.map_label_coords[1] + 15 + x*40, 36, 36);
                        ctx.stroke();

                        ctx.fillStyle = "#ffffff";
                        ctx.fillText(truncateString(local_user.name, 15), config.defines.map.map_label_coords[0] + 50 + i*320, config.defines.map.map_label_coords[1] + 47 + x*40);
                      }
                  }

                  break;
              }

              //JPEG compression
              var main_cache = canvas.toBuffer("image/jpeg");
              fs.promises.writeFile(`./map/cache/${map_name}.jpg`, main_cache).then(() => {
                module.exports.reloadAllMapInterfaces(map_name);
              });
            } catch (e) {
              log.error(`internalCacheSVG() encountered an error whilst parsing file ${map_file} of map name ${map_name}: ${e}.`);
              console.log(e);
            }
          }
        });
    });
  },

  internalForceRender: function (arg0_map_name) {
    //Convert from parameters
    var map_name = arg0_map_name;

    //Declare local instance variables
    var all_provinces = Object.keys(main.provinces);
    var all_users = Object.keys(main.users);

    //Set all provinces to default first
    try {
      for (var i = 0; i < all_provinces.length; i++)
        setProvinceColour(map_name, all_provinces[i], [
          config.defines.map.default_province_colour[0],
          config.defines.map.default_province_colour[1],
          config.defines.map.default_province_colour[2],
        ]);
    } catch {}

    //Map case handler
    switch (map_name) {
      case "atlas":
        var provinces_file = fs.readFileSync("./map/provinces.svg");
        atlas_parsed = HTML.parse(provinces_file.toString());

        renderAtlas();

        break;
      case "colonisation":
        //Loop over all provinces and shade them in normally!
        for (var i = 0; i < all_provinces.length; i++) {
          var local_province = main.provinces[all_provinces[i]];

          try {
            if (local_province.controller) {
              var local_user = main.users[local_province.controller];

              if (local_province.controller == local_province.owner)
                setProvinceColour(map_name, all_provinces[i], local_user.colour);
              else
                setProvinceColour(map_name, all_provinces[i], [
                  Math.min(local_user.colour[0] + 20, 255),
                  Math.min(local_user.colour[1] + 20, 255),
                  Math.min(local_user.colour[2] + 20, 255)
                ]);
            }
          } catch (e) {
            log.error(`Could not parse colonisation users!`);
            console.log(e);
            console.log(`Province ID: ${all_provinces[i]}`)
          }
        }

        //Loop over all users and determine where they're colonising
        for (var i = 0; i < all_users.length; i++) {
          var local_user = main.users[all_users[i]];

          var colour_cache = [];
          var local_expeditions = Object.keys(local_user.expeditions);

          for (var x = 0; x < local_expeditions.length; x++) {
            var local_expedition = local_user.expeditions[local_expeditions[x]];

            //Assign colour if not assigned
            if (!local_expedition.colour)
              local_expedition.colour = generateColonisationColour(all_users[i]);

            //Assign colours to province map for charter
            for (var y = 0; y < local_expedition.provinces.length; y++)
              setProvinceColour(map_name, local_expedition.provinces[y], local_expedition.colour);
          }
        }

        //Cache SVG
        module.exports.internalCacheSVG("colonisation");

        break;
      case "political":
        for (var i = 0; i < all_provinces.length; i++) {
          var local_province = main.provinces[all_provinces[i]];

          try {
            if (local_province.controller) {
              var local_user = main.users[local_province.controller];

              if (local_province.controller == local_province.owner) {
                setProvinceColour(map_name, all_provinces[i], local_user.colour);
              } else {
                setProvinceColour(map_name, all_provinces[i], [
                  Math.min(local_user.colour[0] + 20, 255),
                  Math.min(local_user.colour[1] + 20, 255),
                  Math.min(local_user.colour[2] + 20, 255)
                ]);

                //Demilitarised shader
                var outline_colour = [0, 0, 0];

                if (local_province.demilitarised)
                  outline_colour = [240, 60, 60];

                if (local_province[`${map_name}_stroke`] != RGBToHex(outline_colour))
                  setProvinceOutline(map_name, all_provinces[i], outline_colour);
              }
            }
          } catch {}
        }

        //Cache SVG
        module.exports.internalCacheSVG("political");

        break;
      case "population":
        var maximum_population = 0;

        for (var i = 0; i < all_provinces.length; i++) {
          var local_province = main.provinces[all_provinces[i]];

          if (local_province.pops)
            maximum_population = Math.max(
              maximum_population,
              returnSafeNumber(local_province.pops.population)
            );
        }

        //Shade in province population based on % from 0 to maximum_population
        for (var i = 0; i < all_provinces.length; i++) {
          var local_province = main.provinces[all_provinces[i]];
          var local_population = (local_province.pops) ?
            returnSafeNumber(local_province.pops.population) : 0;

          var local_colour = (local_population > 0) ?
            config.defines.map.scalar_gradient[
              Math.max(
                getLogarithmic(local_population, 1, maximum_population, 3) - 1,
              0)
            ] :
            config.defines.map.scalar_gradient[0];

          try {
            setProvinceColour(map_name, all_provinces[i], local_colour);
          } catch {
            log.warn(`Could not read colour ${local_population} from index ${(local_population/maximum_population) - 1}`);
          }
        }

        break;
      case "supply":
        var maximum_supply_limit = 0;

        for (var i = 0; i < all_provinces.length; i++)
          maximum_supply_limit = Math.max(
            maximum_supply_limit, returnSafeNumber(main.provinces[all_provinces[i]].supply_limit)
          );

        //The maximum supply limit must be at least one
        if (maximum_supply_limit == 0)
          maximum_supply_limit = config.defines.combat.base_supply_limit;

        //Shade in province supply limit based on % from 0 to maximum_supply_limit
        for (var i = 0; i < all_provinces.length; i++) {
          var local_province = main.provinces[all_provinces[i]];
          var local_supply = Math.max(returnSafeNumber(local_province.supply_limit), config.defines.combat.base_supply_limit);

          var local_colour = (local_supply > config.defines.combat.base_supply_limit) ?
            config.defines.map.scalar_gradient[
              Math.max(
                Math.round((local_supply/maximum_supply_limit)*100) - 1,
              0)
            ] :
            config.defines.map.scalar_gradient[0];

          try {
            setProvinceColour(map_name, all_provinces[i], local_colour);
          } catch {
            log.warn(`Could not read colour ${local_colour} from index ${(local_supply/maximum_supply_limit) - 1}`);
          }
        }

        //Cache SVG
        module.exports.internalCacheSVG("supply");

        break;
    }
  },

  reloadAllMaps: function (arg0_map_name) {
    //Convert from parameters
    var map_name = arg0_map_name;

    //Declare local instance variables
    var all_interfaces = Object.keys(interfaces);
    var map_file = global[`${map_name}_file`];

    //Cache SVGs
    internalCacheSVG(map_name);
  },

  reloadAllMapInterfaces: function (arg0_map_name) {
    //Convert from parameters
    var map_name = arg0_map_name;

    //Declare local instance variables
    var all_interfaces = Object.keys(interfaces);
    var map_file = global[`${map_name}_file`];

    //Upload newest map to cache channel
    setTimeout(function(){
      try {
        returnCacheChannel().send({
          content: `${generateRandomID()}_reload`,
          files: [`./map/cache/${map_name}.jpg`]
        }).then((message) => {
          var Attachment = Array.from(message.attachments);

          Attachment.forEach(function(attachment) {
            //Iterate through all interfaces, checking for open maps and reloading their respective maps
            for (var i = 0; i < all_interfaces.length; i++) try {
              if (interfaces[all_interfaces[i]].type == "game")
                if (["founding_map", "map"].includes(interfaces[all_interfaces[i]].page)) {
                  var map_obj = interfaces[all_interfaces[i]].map;

                  //Check to make sure mapmode is indeed compatible
                  if (map_obj.mapmode == map_name) {
                    map_obj.original_img = attachment[1].url.toString();
                    reloadMap(all_interfaces[i], false, true);
                  }
                }
            } catch {}
          });
        });
      } catch (e) {
        console.log(e);
      }
    }, 3000);
  }
};
