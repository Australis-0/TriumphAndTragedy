//Initialise map viewer framework
module.exports = {
  initialiseMapViewer: function (arg0_game_id) {
    //Convert from parameters
    var game_id = arg0_game_id;
    var game_obj = interfaces[game_id];

    //Set map data if not defined
    var map_obj = game_obj.map;
    if (Object.keys(map_obj).length == 0) {
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
      map_obj.decrease_pon_speed = false;

      //Initialise tracker variables
      map_obj.original_img = "";
      map_obj.speed = 1000;
      map_obj.x = 0;
      map_obj.y = 0;
      map_obj.zoom = 0;

      
    }
  }
};
