module.exports = {
  cacheSVG: function (arg0_map_name, arg1_hide_province_labels) {
    //Convert from parameters
    var map_name = arg0_map_name;
    var hide_province_labels = arg1_hide_province_labels;

    var map_file = global[`${map_name}_file`];

    //Declare local instance variables
    var all_users = Object.keys(main.users);
    var label_placement = config.defines.map.map_label_placement;
    var labels = [];

    log.info(`cacheSVG() called for ${map_file}!`);

    //Write to file first before pulling any more shenanigans
    let cache_write_stream = fs.createWriteStream(`./map/${map_file}`);

    cache_write_stream.write(global[`${map_name}_parsed`].toString(), "utf8");

    cache_write_stream.on("finish", () => {
      //Check to make sure that map file is valid
      if (fs.readFileSync(`./map/${map_file}`, "utf8").toString().length > 0) {
        //Regular error trapping just in case
        try {
          switch (map_name) {
            default:
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
                political_svg_layer.src = `./map/${map_file}`;

                //Only render province labels if applicable
                if (!hide_province_labels) {
                  var province_id_layer = new Canvas.Image();

                  province_id_layer.onload = () => ctx.drawImage(province_id_layer, 0, 0, config.defines.map.map_resolution[0], config.defines.map.map_resolution[1]);
                  province_id_layer.onerror = err => { throw err; }
                  province_id_layer.src = `./map/${config.defines.map.map_overlay}`;
                }

                console.log(labels);

                //Generate key
                ctx.font = "36px Bahnschrift Condensed";
                ctx.fillStyle = "#ffffff";
                ctx.fillText("Nations of the World: ", config.defines.map.map_label_coords[0], config.defines.map.map_label_coords[1]);

                //Generate colour key and accompanying labels
                ctx.strokeStyle = "#ffffff";

                for (var i = 0; i < labels.length; i++)
                  for (var x = 0; x < labels[i].length; x++) {
                    var local_user = main.users[labels[i][x]];

                    ctx.fillStyle = RGBToHex(parseInt(local_user.colour[0]), parseInt(local_user.colour[1]), parseInt(local_user.colour[2]));
                    ctx.fillRect(config.defines.map.map_label_coords[0] + 15 + i*320, config.defines.map.map_label_coords[1] + 15 + x*40, 36, 36);
                    ctx.stroke();

                    ctx.fillStyle = "#ffffff";
                    ctx.fillText(truncateString(local_user.name, 15), config.defines.map.map_label_coords[0] + 50 + i*320, config.defines.map.map_label_coords[1] + 47 + x*40);
                  }

                //JPEG compression
                var main_cache = canvas.toBuffer("image/jpeg");
                fs.writeFileSync(`./map/cache/${map_name}.jpg`, main_cache);
              }

              break;
          }
        } catch (e) {
          log.error(`cacheSVG() encountered an error whilst parsing file ${map_file} of map name ${map_name}: ${e}.`);
          console.log(e);
        }
      }
    });

    cache_write_stream.on("error", (err) => {
      log.error(`cacheSVG() ran into a cache_write_stream error: ${err}.`);
    });

    cache_write_stream.end();
  },

  reloadAllMaps: function (arg0_map_name) {
    //Convert from parameters
    var map_name = arg0_map_name;

    //Declare local instance variables
    var all_interfaces = Object.keys(interfaces);
    var map_file = global[`${map_name}_file`];

    //Cache SVG first
    cacheSVG(map_name);

    //setTimeout() for good measure since cacheSVG() is de facto asynchronous
    setTimeout(function(){
      //Upload newest map to cache channel
      returnCacheChannel().send({
        content: `${generateRandomID()}_reload`,
        files: [`./map/cache/${map_name}.jpg`]
      }).then((message) => {
        var Attachment = Array.from(message.attachments);

        Attachment.forEach(function(attachment) {
          //Iterate through all interfaces, checking for open maps and reloading their respective maps
          for (var i = 0; i < all_interfaces.length; i++) try {
            if (interfaces[all_interfaces[i]].type == "game")
              if (["founding_map"].includes(interfaces[all_interfaces[i]].page)) {
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
    }, 3000);
  }
};
