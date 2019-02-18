/*
    Generate an empty room.
*/

window.map_generators.empty_room = function (opts) {
    
    var g_width = _has(opts, "width") ? opts.width : 30;
    var g_height = _has(opts, "height") ? opts.height : 20;
    
    // we expect a width and height
    
    // Game Map
    var game_map = {
        view: {width: 500, height: 600},
        tile_set: "blue",
        map_size: {width: g_width, height: g_height},
        teleport: {
            x: Math.floor(g_width / 2), y: Math.floor(g_height / 2)
        },
        map: []
    }
    
    for (var y_idx = 0; y_idx < g_height; y_idx++) {
        var row = [];
        for (var x_idx = 0; x_idx < g_width; x_idx++) {
            
            
            var tile = "c";
            
            if ( x_idx == 0 && y_idx == 0) {
                tile = "b_nw";
            }
            else if (x_idx == (g_width - 1) && y_idx == 0) {
                tile = "b_ne";
            }
            else if (x_idx == 0 && y_idx == (g_height - 1)) {
                tile = "b_sw";
            }
            else if (x_idx == (g_width - 1) && y_idx == (g_height - 1)) {
                tile = "b_se";
            }
            else if (x_idx == 0) {
                tile = "b_w";
            }
            else if (x_idx == (g_width - 1)) {
                tile = "b_e";
            }
            else if (y_idx == 0) {
                tile = "b_n";
            }
            else if (y_idx == (g_height - 1)) {
                tile = "b_s";
            }
            
            row.push(tile);
            
        }
        game_map.map.push(row);
    }
    
    return game_map;
    
}