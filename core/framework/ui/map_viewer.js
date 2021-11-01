//Initialise map viewer framework
module.exports = {
  initialiseMapViewer: function (arg0_game_id) {
    //Convert from parameters
    var game_id = arg0_game_id;
    var game_obj = interfaces[game_id];

    //Initialise map data and object
    var map_obj = game_obj.map;
    map_obj.embed_history = [];
    map_obj.objects = [];

    map_obj.title = "Please wait ..";
    map_obj.thumbnail_url = "https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png";
    map_obj.interface_string = [
      `${config.icons.loading} Currently loading map viewer ..`
    ];
    map_obj.image_url = "https://cdn.discordapp.com/attachments/722997700391338046/736141424315203634/margin.png";

    //Initialise controls
    map_obj.left_arrow = false;
    map_obj.right_arrow = false;
    map_obj.up_arrow = false;
    map_obj.down_arrow = false;

    map_obj.zoom_in = false;
    map_obj.zoom_out = false;

    map_obj.increase_pan_speed = false;
    map_obj.decrease_pan_speed = false;

    //Initialise tracker variables
    map_obj.mapmode = "political";
    map_obj.original_img = "";
    map_obj.speed = 1000;
    map_obj.x = 0;
    map_obj.y = 0;
    map_obj.zoom = 1;

    //Add collector reactions
    initialiseControlPanel(game_id, "map");

    //Initialise map and upload it to a separate cache channel
    cacheSVG("political");

    //setTimeout() just for safety
    setTimeout(function(){
      returnCacheChannel().send({
        content: `${generateRandomID()}_${game_id}`,
        files: [`./map/cache/${map_obj.mapmode}.jpg`]
      }).then((message) => {
        var Attachment = Array.from(message.attachments);

        Attachment.forEach(function(attachment) {
          //Reload map
          reloadMap(game_id, true);

          //Initialise map
          map_obj.original_img = attachment[1].url;
          map_obj.image_url = attachment[1].url;

          //Establish logic loop
          var logic_loop = setInterval(function(){
            try {
              const map_interface_embed = {
                title: map_obj.title,
                color: 9686188,
                thumbnail: {
                  url: map_obj.thumbnail_url
                },
                description: map_obj.interface_string.join("\n"),
                image: {
                  url: map_obj.image_url
                }
              };

              //Keep track of embed_history (interface string), and objects (map image)
              map_obj.embed_history.push(map_obj.interface_string.join("\n"));
              map_obj.objects.push(map_obj.image_url);

              //End of loop
              if (map_obj.embed_history.length > 3) map_obj.embed_history.splice(0, 1);
              if (map_obj.objects.length > 3) map_obj.objects.splice(0, 1);

              //Controls
              if (map_obj.zoom_in) map_obj.zoom++;
              if (map_obj.zoom_out) map_obj.zoom = (map_obj.zoom > 1) ? map_obj.zoom - 1 : 1;

              if (map_obj.decrease_pan_speed) map_obj.speed = map_obj.speed*0.9;
              if (map_obj.increase_pan_speed) map_obj.speed = map_obj.speed*1.1;

              if (map_obj.left_arrow) map_obj.x += (map_obj.speed/map_obj.zoom);
              if (map_obj.right_arrow) map_obj.x -= (map_obj.speed/map_obj.zoom);
              if (map_obj.up_arrow) map_obj.y += (map_obj.speed/map_obj.zoom);
              if (map_obj.down_arrow) map_obj.y -= (map_obj.speed/map_obj.zoom);

              //Reset map data states
              reloadMap(game_id);
              reloadMapInterface(map_interface_embed, game_id);

              map_obj.increase_pan_speed = false;
              map_obj.decrease_pan_speed = false;

              map_obj.zoom_in = false;
              map_obj.zoom_out = false;

              map_obj.left_arrow = false;
              map_obj.right_arrow = false;
              map_obj.up_arrow = false;
              map_obj.down_arrow = false;
            } catch (e) {
              log.warn(`logic_loop under initialiseMapViewer() was unable to proceed! ${e}.`);
              clearInterval(logic_loop);
            }
          }, 100);

          //Initialise control panel outside of loop
          initialiseControlPanel(game_id, "map");

          //Set control function of interface
          game_obj.control_function = function (arg0_actions) {
            //Convert from parameters
            var actions = arg0_actions;

            if (actions.zoom_in) map_obj.zoom_in = true;
            if (actions.zoom_out) map_obj.zoom_out = true;

            if (actions.up_arrow) map_obj.up_arrow = true;
            if (actions.down_arrow) map_obj.down_arrow = true;
            if (actions.left_arrow) map_obj.left_arrow = true;
            if (actions.right_arrow) map_obj.right_arrow = true;
          };
        });
      });
    }, 3000);
  },

  reloadMapInterface: function (arg0_embed_obj, arg1_game_id, arg2_message) {
    //Convert from parameters
    var embed_obj = arg0_embed_obj;
    var game_id = arg1_game_id;

    //Declare local instance variables
    var game_obj = interfaces[game_id];
    var map_obj = game_obj.map;

    if (map_obj.embed_history[map_obj.embed_history.length-2] != map_obj.embed_history[map_obj.embed_history.length-1] || map_obj.objects[map_obj.objects.length-2] != map_obj.objects[map_obj.objects.length-1]) {
      game_obj.main_embed = embed_obj;
      game_obj.middle_embed.edit({ embeds: [embed_obj] });
    }
  },

  reloadMap: async function (arg0_game_id, arg1_do_not_reload_image, arg2_force_reload) {
    //Convert from parameters
    var game_id = arg0_game_id;
    var game_obj = interfaces[game_id];
    var do_not_reload_image = arg1_do_not_reload_image;
    var force_reload = arg2_force_reload;

    //Declare local instance variables
    try {
      var map_obj = game_obj.map;

      //Check if anything new has to be rendered first
      var render_new = (map_obj.left_arrow || map_obj.right_arrow || map_obj.up_arrow || map_obj.down_arrow || map_obj.zoom_in || map_obj.zoom_out || map_obj.increase_pan_speed || map_obj.decrease_pan_speed || do_not_reload_image || force_reload);

      //If a new map has to be rendered, apply the zoom algorithm
      if (render_new) {
        //Change map object values
        map_obj.title = "Map Viewer:" //Temporary, rename to 'Map of the World, ${getDateString()} later' [WIP]
        map_obj.interface_string = [
          `You are now viewing the **${map_obj.mapmode}** mapmode.`,
          `Zoom: ${map_obj.zoom} ¦ Speed: ${map_obj.speed/1000} ¦ X: ${Math.round(map_obj.x)} ¦ Y: ${Math.round(map_obj.y)}`,
          "",
          "Use the arrow keys and magnifying icons at the bottom to navigate around the map."
        ];

        if (!do_not_reload_image) {
          var local_canvas = Canvas.createCanvas(Math.ceil(config.defines.map.map_resolution[0]/4), Math.ceil(config.defines.map.map_resolution[1]/4));
          var ctx = local_canvas.getContext("2d");
          var img = await Canvas.loadImage(map_obj.original_img);

          //Centre alignment first
          var offset_x = 0;
          var offset_y = 0;
          if (map_obj.zoom > 1) {
            offset_x = -(Math.ceil(config.defines.map.map_resolution[0]/8)*(map_obj.zoom-1));
            offset_y = -(Math.ceil(config.defines.map.map_resolution[1]/8)*(map_obj.zoom-1));
          }

          //Draw image on ctx
          ctx.drawImage(img,
            offset_x + (map_obj.x*map_obj.zoom),
            offset_y + (map_obj.y*map_obj.zoom),

            Math.ceil(config.defines.map.map_resolution[0]/4)*map_obj.zoom, Math.ceil(config.defines.map.map_resolution[1]/4)*map_obj.zoom
          );

          var attachment = new Discord.MessageAttachment(local_canvas.toBuffer(), "map_viewer.jpg");

          returnCacheChannel().send({
            content: `${generateRandomID()}_${game_id}`,
            files: [attachment]
          }).then((message) => {
            var Attachment = Array.from(message.attachments);

            Attachment.forEach(function(attachment) {
              map_obj.image_url = attachment[1].url.toString();
            });
          });
        }
      }
    } catch {}
  }
};
