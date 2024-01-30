module.exports = {
  /*
    getBuildingHiringMap() - Fetches an object map of pop types to the amount of people currently being hired.
    options: {
      sort: "wage"/"positions", - Optional. "positions" by default
      return_job_postings: true/false - Optional. False by default. Whether to return an object of all job postings from all buildings instead.
    }

    Default:
      Returns: {
        <pop_type>: { positions: 0, wage: 0 }
      }
    (options.return_job_postings):
      Returns: {
        <building_id>-<pop_type>: { positions: 0, wage: 0 }
      }
  */
  getBuildingHiringMap: function (arg0_province_id, arg1_options) {
    //Convert from parameters
    var province_id = arg0_province_id;
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var all_pops = Object.keys(config.pops);
    var province_obj = (typeof province_id != "object") ? main.provinces[province_id] : province_id;
    var return_object = {};
    var sort_key = (options.sort) ? options.sort : "positions";

    if (province_obj)
      if (province_obj.buildings)
        for (var i = 0; i < province_obj.buildings.length; i++) {
          var local_building = province_obj.buildings[i];

          var all_local_building_keys = Object.keys(local_building);

          for (var x = 0; x < all_local_building_keys.length; x++)
            if (all_local_building_keys[x].endsWith(`_positions`)) {
              var local_pop_type = all_local_building_keys[x].replace("_positions", "");
              var local_value = local_building[all_local_building_keys[x]];

              if (all_pops.includes(local_pop_type))
                if (!options.return_job_postings) {
                  if (!return_object[local_pop_type]) {
                    return_object[local_pop_type] = {
                      positions: local_value
                    };
                  } else {
                    return_object[local_pop_type].positions += local_value;
                  }
                } else {
                  return_object[`${local_building.id}-${local_pop_type}`] = {
                    positions: local_value,
                    wage: returnSafeNumber(local_building[`${local_pop_type}_wage`])
                  };
                }
            }
        }

    //Post-processing for .median_wage
    if (!options.return_job_postings) {
      var all_return_keys = Object.keys(return_object);

      for (var i = 0; i < all_return_keys.length; i++) {
        var local_median_wage = getMedianWage(province_obj.id, { pop_type: all_return_keys[i] });
        var local_value = return_object[all_return_keys[i]];

        //Set .median_wage
        local_value.wage = returnSafeNumber(local_median_wage);
      }
    }

    //Sort object by .positions
    var sorted_keys = Object.keys(return_object).sort((a, b) => {
      return return_object[b][sort_key] - return_object[a][sort_key];
    });
    var sorted_obj = {};

    sorted_keys.forEach(key => {
      sorted_obj[key] = return_object[key];
    });

    //Return statement
    return sorted_obj;
  }
};
