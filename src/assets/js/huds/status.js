class StatusHud {
    constructor(offset_x, offset_y) {
        
        // position control
        this.offset_x = offset_x;
        this.offset_y = offset_y;
        
        // tile width
        this.width = 15;
        
        // message 
        this.message = "Reticulating splines...";
        
        // message display control
        this.font_size = 12;
        
        // sprite tracking
        this.hud_sprites = [];
        this.text_sprite = 0;
        
    }
    
    show() {
        
        var hud_color = "g";
        
        for (var hx = 0; hx < this.width; hx++) {
            
            var tt_name = "nw";
            var tb_name = "sw"
            
            if (hx == (this.width - 1)) {
                tt_name = "ne";
                tb_name = "se";
            }
            else if (hx > 0) {
                tt_name = "n";
                tb_name = "s";
            }
            
            // top
            var t_tile = Crafty.e("2D, Canvas, hud_" + hud_color + "_" + tt_name).attr({x: hx * 32 + this.offset_x, y: this.offset_y, z: 100000});
            this.hud_sprites.push(t_tile);
            
            
            // bottom
            var b_tile = Crafty.e("2D, Canvas, hud_" + hud_color + "_" + tb_name).attr({x: hx * 32 + this.offset_x, y: this.offset_y + 32, z: 100000});
            this.hud_sprites.push(b_tile);
            
        }
        
        this.status(this.message);
        
    }
    
    status(msg) {
     
        this.message = msg;
        if (this.text_sprite !== 0) {
            this.text_sprite.destroy();
        }
        
        this.text_sprite = Crafty.e("2D, DOM, Text")
            .attr({x: this.offset_x + 40, y: this.offset_y + 8, w: 32 * (this.width - 2)})
            .textFont({type: "Press Start 2P", size: this.font_size + "px"})
            .text(this.message);

    }
}