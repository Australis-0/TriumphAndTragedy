module.exports = {
  renderAtlas: function () {
    //Declare local instance variables
    var all_paths = atlas_parsed.querySelectorAll("path");
    var all_users = Object.keys(main.users);

    //Insert patterns
    if (!atlas_parsed.querySelector("#diagonal-stripe-4"))
      atlas_parsed.querySelector("svg").insertAdjacentHTML("afterbegin", config.fill_patterns.striped);

    //Style all provinces now
    for (var i = 0; i < all_paths.length; i++) {
      var local_id = all_paths[i].getAttribute("id");

      if (main.provinces[local_id]) {
        var local_province = main.provinces[local_id];

        if (local_province.owner) {
          var local_user = main.users[local_province.owner];

          try {
            if (local_province.owner == local_province.controller) {
              var local_element_stroke = `fill-opacity: 0.5;stroke-linecap: butt;stroke-linejoin: miter;stroke-opacity: 0.9;stroke-width: 1px;fill: ${RGBToHex(local_user.colour[0], local_user.colour[1], local_user.colour[2])};stroke: ${RGBToHex(0, 0, 0)}`;
              var local_element_fill = `<path style = "fill-opacity: 0.5;stroke-linecap: butt;stroke-linejoin: miter;stroke-opacity: 0;stroke-width: 1px;fill: ${RGBToHex(local_user.colour[0], local_user.colour[1], local_user.colour[2])};stroke: ${RGBToHex(0, 0, 0)}"
              d = "${all_paths[i].getAttribute("d")}" id = "fill-${local_id}" />`;

              //Push local_element to SVG
              all_paths[i].setAttribute("style", local_element_stroke);
              atlas_parsed.querySelector("svg g").insertAdjacentHTML("beforeend", local_element_fill);
            } else {
              local_user = main.users[local_province.controller];

              var local_element_stroke = `fill-opacity: 0.5;stroke-linecap: butt;stroke-linejoin: miter;stroke-opacity: 0;stroke-width: 1px;fill: url(#diagonal-stripe-4) #${RGBToHex(local_user.colour[0], local_user.colour[1], local_user.colour[2])};stroke: ${RGBToHex(0, 0, 0)}`;

              //Edit stroke fill
              all_paths[i].setAttribute("style", local_element_stroke);
            }
          } catch (e) {
            console.log(e);
            log.warn(`Attempted Province ID: #${local_id}`);
          }
        } else {
          all_paths[i].setAttribute("style", `fill:none;stroke:#000000;stroke-width:0.26458332px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:0;opacity:0`);
        }
      }
    }
  }
};
