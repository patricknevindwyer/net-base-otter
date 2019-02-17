function pointToTile(x, y) {
    
    return {x: Math.floor(x / 32), y: Math.floor(y / 32) };
    
}

function tileAtHeading(x, y, heading) {
    
    var y_alt = 0;
    var x_alt = 0;
    
    if (heading.indexOf("N") > -1) {
        y_alt = -1;
    }
    
    if (heading.indexOf("S") > -1) {
        y_alt = 1;
    }
    
    if (heading.indexOf("W") > -1) {
        x_alt = -1;
    }
    
    if (heading.indexOf("E") > -1) {
        x_alt = 1;
    }
    
    return {x: x + x_alt, y: y + y_alt};
}

function hasTileAt(x, y) {
    if ((x < 0) || (y < 0)) {
        return false;
    }
    
    if (x >= game_map.map_size.width) {
        return false;
    }
    
    if (y >= game_map.map_size.height) {
        return false;
    }
    
    return true;
}

function tileIdAt(x, y) {
    tile_id = game_map.map[y][x];
    return tile_id;
}

function generateGameMap() {
    for (var mx = 0; mx < game_map.map_size.width; mx++) {
        for (var my = 0; my < game_map.map_size.height; my++) {
            
            // get the current tile
            var tile_id = game_map.map[my][mx];
            
            // skip empty tiles
            if (tile_id !== "") {
                
                // the tile ID in the map translates to a tile definition in the tile set
                var tile_data = game_map.tiles.tile_set[tile_id];
                var tile_e = Crafty.e(tile_data.props).attr({x: mx * game_map.tiles.width, y: my * game_map.tiles.height});
                
                // do we have any more attribute data?
                if (typeof tile_data.attrs !== 'undefined') {
                        
                    // only thing we support so far is Z data
                    if (typeof tile_data.attrs.z !== 'undefined') {
                        tile_e.attr({z: tile_data.attrs.z})
                    }
                }
                
                // apply any collision data
                if (typeof tile_data.collision !== 'undefined') {
                    tile_e.collision(tile_data.collision);
                }
                
                // check for child overlay objects
                if (typeof tile_data.children !== 'undefined') {
                    for (var child_idx = 0; child_idx < tile_data.children.length; child_idx++) {
                        var child_data = tile_data.children[child_idx];
                        var child = Crafty.e(child_data.props).attr({x: mx * game_map.tiles.width, y: my * game_map.tiles.height});
                        if (typeof child_data.collision !== 'undefined') {
                            child.collision(child_data.collision)
                        }
                        tile_e.attach(child)
                    }
                }
            }
        }
    }
}