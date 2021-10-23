module.exports = {
  cacheSVG: function (arg0_map_name, arg1_hide_province_labels) {
    //Convert from parameters
    var map_name = arg0_map_name;
    var hide_province_labels = arg1_hide_province_labels;

    var map_file = global[`${map_name}_file`];

    //Declare local instance variables
    var all_users = Object.keys(main.users);
    var label_placement = config.map_label_placement;
    var labels = [];

    log.info("cacheSVG() called!");

    if (fs.readFileSync(`./map/${map_file}`, "utf8").toString().length > 0) {
      //Regular error trapping just in case

      try {
        switch (map_name) {
          case "political_svg":
            //Political map rendering
            var current_element = 0;
            var counter = 0;

            //Separate labels into columns
            for (var i = 0; i < all_users.length; i++) {
              var local_user = main.users[all_users[i]];

              //Only display label if user is not eliminated and has more than zero provinces
              if (!local_user.eliminated && local_user.provinces > 0)
                (labels[current_element]) ? labels.push(all_users[i]) : [all_users[i]];
            }

            //Initialise canvas and draw key for political map
            {
              var canvas = Canvas.createCanvas(config.defines.map.map_resolution[0], config.defines.map.map_resolution[1]);
              var ctx = Canvas.getContext("2d");

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
              var main_cache = Canvas.toBuffer("image/jpeg");
              fs.writeFileSync(`./map/cache/${map_name}.jpg`);
            }

            break;
        }
      } catch (e) {
        log.error(`cacheSVG() encountered an error whilst parsing file ${map_file} of map name ${map_name}: ${e}.`);
      }
    }
  }
};
