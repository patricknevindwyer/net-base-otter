class StatsHud {

    // Build the Stats HUD at the given x/y coordinates
    // with the given pixel width and height
    constructor(offset_x, offset_y, width, height) {
        this.offset_x = offset_x;
        this.offset_y = offset_y;
        this.width = Math.floor(width / 32);
        
        // determine the height of our three sections, if x/y offset
        // and tile height
        var ratios = [0.6, 0.22, 0.2];
        
        this.sections = {
            top: {
                offset_x: this.offset_x,
                offset_y: this.offset_y,
                tile_height: Math.floor((height * ratios[0]) / 32),
                tile_width: this.width,
                width: width,
                tiles: {
                    nw: "hud_stats_nw_notch",
                    n: "hud_stats_n",
                    ne: "hud_stats_ne",
                    w: "hud_stats_w",
                    c: "hud_stats_c",
                    e: "hud_stats_e",
                    sw: "hud_stats_sw",
                    s: "hud_stats_s",
                    se: "hud_stats_se"
                }
            },
            middle: {
                offset_x: this.offset_x,
                offset_y: Math.floor(height * ratios[0]) + this.offset_y,
                tile_height: Math.floor((height * ratios[1]) / 32),
                tile_width: this.width,
                width: width,
                tiles: {
                    nw: "hud_stats_nw",
                    n: "hud_stats_n",
                    ne: "hud_stats_ne",
                    w: "hud_stats_w",
                    c: "hud_stats_c",
                    e: "hud_stats_e",
                    sw: "hud_stats_sw",
                    s: "hud_stats_s",
                    se: "hud_stats_se"
                }
            },
            bottom: {
                offset_x: this.offset_x,
                
                // anchor to bottom of screen area
                offset_y: (this.offset_y + height) - Math.floor((height * ratios[2]) / 32) * 32,
                tile_height: Math.floor((height * ratios[2]) / 32),
                tile_width: this.width,
                width: width,
                font_size: 10,
                tiles: {
                    nw: "hud_stats_nw",
                    n: "hud_stats_n",
                    ne: "hud_stats_ne",
                    w: "hud_stats_w",
                    c: "hud_stats_c",
                    e: "hud_stats_e",
                    sw: "hud_stats_sw_notch",
                    s: "hud_stats_s",
                    se: "hud_stats_se"
                }
            }
        };
        
        // track hud sprites
        this.hud_sprites = [];
        
        // text sprite tracking
        this.resource_text_sprites = [];
    }
    
    show() {
        
        this.draw_hud(this.sections.top);
        this.draw_hud(this.sections.middle);
        this.draw_hud(this.sections.bottom);
    }
    
    draw_hud(hud_props) {
        
        for (var mx = 0; mx < hud_props.tile_width; mx++) {
            for (var my = 0; my < hud_props.tile_height; my++) {
                var props = "2D, Canvas, ";
            
                // corners
                if (mx == 0 && my == 0) {
                    props += hud_props.tiles.nw;
                }
                else if (mx == 0 && my == (hud_props.tile_height - 1)) {
                    props += hud_props.tiles.sw;
                }
                else if (mx == (hud_props.tile_width - 1) && my == 0) {
                    props += hud_props.tiles.ne;
                }
                else if (mx == (hud_props.tile_width - 1) && my == (hud_props.tile_height - 1)) {
                    props += hud_props.tiles.se;
                }
            
                // top
                else if (my == 0) {
                    props += hud_props.tiles.n;
                }
            
                // bottom
                else if (my == (hud_props.tile_height - 1)) {
                    props += hud_props.tiles.s;
                }
            
                // left
                else if (mx == 0) {
                    props += hud_props.tiles.w;
                }
            
                // right
                else if (mx == (hud_props.tile_width - 1)) {
                    props += hud_props.tiles.e;
                }
            
                // inside
                else {
                    props += hud_props.tiles.c;
                }        
                
                Crafty.e(props).attr({x: mx * 32 + hud_props.offset_x, y: hud_props.offset_y + 32 * my, z: 100000});        
            }
        }
    }
    
    /*
        Update the resources area to show the current credits/accounting for the
        player.
    */
    update_resources() {
        
        // destroy the old sprites
        this.resource_text_sprites.forEach(function (s) {
            s.destroy();
        });
        
        // clear the entries
        this.resource_text_sprites = [];
        
        // update the sprites
        var text_sprite = Crafty.e("2D, DOM, Text")
            .attr({x: this.sections.bottom.offset_x + 4, y: this.sections.bottom.offset_y + 8, w: (this.sections.bottom.width - 16)})
            .textFont({type: "Press Start 2P", size: this.sections.bottom.font_size + "px"})
            .textColor("#FFFFFF")
            .textAlign("right")
            .text(numberWithCommas(game_state.player.credits) + " creds");
            
        this.resource_text_sprites.push(text_sprite);
        
    }
}