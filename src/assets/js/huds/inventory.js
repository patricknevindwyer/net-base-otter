/*
    The Inventory HUD is the display for the player computer inventory on screen, much
    like item inventories for other games.
    
    Use with:
        
        // show an inventory with 3 rows of 7 columns, with 18 item slots
        var ih = new InventoryHud(0, 0); // display at 0, 0
        ih.slots({grid: {columns: 7, rows: 3}, slots: 18})
        ih.show();

        // select item 16
        ih.select({slot: 16});

*/
class InventoryHud {
    constructor(offset_x, offset_y) {
        
        // position control
        this.offset_x = offset_x;
        this.offset_y = offset_y;
        
        // we start with a default grid size of 5 columns of 3 rows, with 12 slots
        this.slots({grid: {columns: 7, rows: 3}, slots: 12});
        
        // message display control
        this.font_size = 12;
                
        // sprite tracking
        this.hud_sprites = [];
                
    }
    
    /*
        Use a slot configuration to build our layout data.
    
        This configuration should look like:
            
            {
                grid: {
                    columns: 5,
                    row: 3
                },
                slot: 12
            }
    
    */
    slots(slot_conf) {
    
        // store our config data
        this.grid = {columns: slot_conf.grid.columns, rows: slot_conf.grid.rows};
        this.slots = {total: slot_conf.slots}
        
        // rebuild layout data
        this.width = 2 + this.grid.columns;
        this.height = 2 + this.grid.rows;
    }
    
    /*
        Bind the refresh event, so we trigger our switch between different
        messages as needed.
    */
    start() {
                
    }
    
    /*
        Function: show/0
        
        Update the HUD and bring up the inventory display
    */
    show() {
        
        // select the background and show
        this.show_hud("b");
        
        // show the text
        // this.show_message(message.message);
        
    }
    
    /*
        Function: hide/0
        
        Destroy the hud and inventory display data.
    */
    hide() {
        this.destory_hud();
    }
    /*
        Function: destroy_hud/0
    
        Destroy the HUD sprites
    */
    destroy_hud() {
        // destroy any existing HUD sprites
        this.hud_sprites.forEach(function (s) {
            s.destroy();
        });
        this.hud_sprites = [];        
    }
    
    /*
        Function: show_hud/1
        Parameters:
            - `hud_color`: String. One of [b, g, y, e]
    
        Display the HUD background
    */
    show_hud(hud_color) {
        
        var hud_right = this.width - 1;
        var hud_bottom = this.height - 1;
        
        for (var hx = 0; hx < this.width; hx++) {
            for (var hy = 0; hy < this.height; hy++) {
                
                // figure out our hud sprite
                var inv_tile = "hud_" + hud_color + "_c";
                
                // Top Left
                if (hx == 0 && hy == 0) {
                    inv_tile = "hud_" + hud_color + "_nw";
                }
                
                // Top Right
                else if (hx == hud_right && hy == 0) {
                    inv_tile = "hud_" + hud_color + "_ne";
                }
                
                // Top
                else if (hy == 0) {
                    inv_tile = "hud_" + hud_color + "_n";
                }
                
                // Left
                else if (hy != hud_bottom && hx == 0) {
                    inv_tile = "hud_" + hud_color + "_w";
                }
                
                // Right
                else if (hy != hud_bottom && hx == hud_right) {
                    inv_tile = "hud_" + hud_color + "_e";
                }
                
                // Bottom Left
                else if (hy == hud_bottom && hx == 0) {
                    inv_tile = "hud_" + hud_color + "_sw";
                }                
                
                // Bottom Right
                else if (hy == hud_bottom && hx == hud_right) {
                    inv_tile = "hud_" + hud_color + "_se"
                }
                
                // Bottom
                else if (hy == hud_bottom) {
                    inv_tile = "hud_" + hud_color + "_s";
                }
                
                // Inventory Slot
                else {
                    
                    // let's do a simple check for how many slots we have available
                    if (hx <= this.grid.columns && hy <= this.grid.rows && (((hy - 1) * this.grid.columns + hx) <= this.slots.total)) {
                    // if (hx * hy <= this.slots.total) {
                        inv_tile = "inventory_gray";
                    }
                }
                
                var t_tile = Crafty.e("2D, UICanvasLayer, " + inv_tile).attr({x: hx * 32 + this.offset_x, y: hy * 32 + this.offset_y, z: 100000});
                this.hud_sprites.push(t_tile);
                
            }
        }
        
    }
    
}