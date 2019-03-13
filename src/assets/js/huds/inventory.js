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
        Set the number of slots to display.
    */
    set_slot_count(slot_count) {
        this.slots.total = slot_count;
    }
    
    /*
        Bind the refresh event, so we trigger our switch between different
        messages as needed.
    */
    start() {
                
    }
    
    /*
        Function: show/1
        
        Update the HUD and bring up the inventory display, using the contents of the given inventory. The
        inventory should look like:
    
            {
                max_size: 12,
                slots: [
                    {
                        name: "item name",
                        id: "item id",
                        sprite: "static sprite name"
                    },
                    {
                        name: "",
                        id: 0,
                        sprite: ""
                    }
                ]
            }
        
        If the inventory `max_size` is different from the currently configured slot size of
        the inventory HUD, the HUD will be adjusted.
    */
    show(inv) {
        
        this.set_slot_count(inv.max_size);
        
        // select the background and show
        this.show_hud("b");
        
        this.show_slots(inv.slots);
        
        // show the text
        // this.show_message(message.message);
        
    }
    
    /*
        Function: hide/0
        
        Destroy the hud and inventory display data.
    */
    hide() {
        this.destroy_hud();
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
        Display each of the items in the inventory, keeping in mind that inventory items
        can represent "blank" items.
    */
    show_slots(items) {
        
        for (var idx = 0; idx < items.length; idx++) {
            
            // pick the item
            var item = items[idx];
            
            // is this a real item, or an empty spot?
            if (item.id !== 0) {
                
                // determine the slot
                var slot_x = idx % this.width + 1;
                var slot_y = Math.floor(idx / this.width) + 1
                
                // now where do we draw this sprite?
                var t_tile = Crafty.e("2D, UICanvasLayer, " + item.sprite).attr({x: slot_x * 32 + this.offset_x + 8, y: slot_y * 32 + this.offset_y + 8, z: 100000});
                this.hud_sprites.push(t_tile);
                
            }
        }
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