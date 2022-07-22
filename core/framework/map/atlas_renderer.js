module.exports = {
  renderAtlas: function () {
    //Insert patterns
    if (!atlas_parsed.querySelector("#diagonal-stripe-4"))
      atlas_parsed.querySelector("svg").insertAdjacentHTML("afterbegin", config.fill_patterns.striped);

    //Iterate over all provinces. Colonised provinces should have 50% opacity and be unioned into the same country
    var all_provinces = Object.keys(main.provinces);
    var all_paths = atlas_parsed.querySelectorAll("path");
    var all_users = Object.keys(main.users);
    var union_data = {};

    for (var i = 0; i < all_users.length; i++)
      union_data[all_users[i]] = "";

    //Push to union_data for singular decorative outline
    for (var i = 0; i < all_provinces.length; i++) {
      var local_province = main.provinces[all_provinces[i]];

      //Surround in try/catch in case element is nonexistent
      try {
        if (local_province.owner != local_province.controller) {
          var local_key = `${local_province.owner}--${local_province.controller}`;

          if (!union_data[local_key])
            union_data[local_key] = "";

          //Push d in path
          union_data[local_key] += ` ${atlas_parsed.querySelector("#" + all_provinces[i]).getAttribute("d")}`;
          union_data[local_province.owner] += ` ${atlas_parsed.querySelector("#" + all_provinces[i]).getAttribute("d")}`;
        } else if (local_province.owner == local_province.controller) {
          //Push d in path
          union_data[local_province.owner] += ` ${atlas_parsed.querySelector("#" + all_provinces[i]).getAttribute("d")}`;
        }
      } catch (e) {
        console.log(e);
        log.warn(`Attempted Province ID: #${all_provinces[i]}`);
      }
    }

    //Set styling to invisible
    for (var i = 0; i < all_paths.length; i++)
      all_paths[i].setAttribute("style", `fill:none;stroke:#000000;stroke-width:0.26458332px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:0;opacity:0`);

    //Render outlines
    var all_unions = Object.keys(union_data);

    //Tidy up union_data
    for (var i = 0; i < all_unions.length; i++) {
      var local_union_data = union_data[all_unions[i]];

      var all_coordinates = local_union_data.match(/m (?<=m )(.*?)(?= ) z/gm);
      var all_moves = local_union_data.match(/m (?<=m )(.*?)(?= )/gm);

      if (all_moves)
        for (var x = 0; x < all_moves.length; x++)
          if (x == 0)
            local_union_data = local_union_data.replace(all_moves[x], all_moves[x].toLowerCase());
          else
            try {
              var current_coords = all_coordinates[x].split(" ");
              var unprocessed_coords = all_moves[x].trim().split(" ");

              var new_coords = unprocessed_coords[1].split(",");

              var coords_difference = all_moves[x-1].replace("m ", "").split(",");
                coords_difference = [
                  (parseFloat(coords_difference[0]) - parseFloat(new_coords[0]))*-1,
                  (parseFloat(coords_difference[1]) - parseFloat(new_coords[1]))*-1
                ];

              new_coords = [
                coords_difference[0],
                coords_difference[1]
              ].toString();

              local_union_data = local_union_data.replace(all_moves[x], `m ${new_coords}`);
            } catch {}

      //Set union_data
      union_data[all_unions[i]] = local_union_data;
    }

    //Normal shader
    for (var i = 0; i < all_unions.length; i++)
      try {
        if (!all_unions[i].includes("--")) {
          var local_user = main.users[all_unions[i]];

          //Error while reading from input stream; readjust to getDefaultProvinceStyling()
          var local_element_stroke = `<path style = "
              fill-opacity: 0.5;
              stroke-linecap: butt;
              stroke-linejoin: miter;
              stroke-opacity: 0.9;
              stroke-width: 1px;
              fill: ${RGBToHex(local_user.colour[0], local_user.colour[1], local_user.colour[2])};
              stroke: ${RGBToHex(0, 0, 0)}"
            d = "${union_data[all_unions[i]]}" id = "${all_unions[i]}" />`;
          var local_element_fill = `<path style = "
              fill-opacity: 0.5;
              stroke-linecap: butt;
              stroke-linejoin: miter;
              stroke-opacity: 0;
              stroke-width: 1px;
              fill: ${RGBToHex(local_user.colour[0], local_user.colour[1], local_user.colour[2])};
              stroke: ${RGBToHex(0, 0, 0)}"
            d = "${union_data[all_unions[i]]}" id = "${all_unions[i]}" />`;

          //Push local_element to SVG
          atlas_parsed.querySelector("svg g").insertAdjacentHTML("beforeend", local_element_stroke);
          atlas_parsed.querySelector("svg g").insertAdjacentHTML("beforeend", local_element_fill);
        }
      } catch {}

    //Occupation shader
    for (var i = 0; i < all_unions.length; i++)
      try {
        if (all_unions[i].includes("--")) {
          var local_user = main.users[all_unions[i].split("--")[1]];

          var local_element_stroke = `<path style = "
              fill-opacity: 0.5;
              stroke-linecap: butt;
              stroke-linejoin: miter;
              stroke-opacity: 0;
              stroke-width: 1px;
              fill: url(#diagonal-stripe-4) #${RGBToHex(local_user.colour[0], local_user.colour[1], local_user.colour[2])};
              stroke: ${RGBToHex(0, 0, 0)}"
            d = "${union_data[all_unions[i]]}" id = "${all_unions[i]}" />`;

          //Push local_element to SVG
          atlas_parsed.querySelector("svg g").insertAdjacentHTML("beforeend", local_element_stroke);
        }
      } catch {}
  }
};
