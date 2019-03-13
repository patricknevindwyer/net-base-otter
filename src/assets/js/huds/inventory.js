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
        this.slots({grid: {columns: 7, rows: 3}, total: 12});
        
        // message display control
        this.font_size = 12;
                
        // sprite tracking
        this.hud_sprites = [];
        this.description_sprite = undefined;
        
        // set the cursor position
        this.cursor_index = -1;
        
        // set the inventory object that we're linked to..
        this.active_inventory = undefined;
        
        // handle selections
        this.in_selection = false;
        this.selected_index = -1;        
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
        Function: active/0
    
        Return true if the Inventory HUD is currently active, otherwise False
    */
    active() {
        return this.hud_sprites.length > 0;
    }
    
    /*
        Function: handleKeypress/1
    
        Handle a key press event delegated from the MenuControls object. This will only be delegated when
        the inventory is active (as determined by the `active/0` call).
    */
    handleKeypress(event) {

        // handle standard inventory movement
        if (event.key === Crafty.keys.LEFT_ARROW) {
            var next_cursor = this.cursor_index - 1;
            if (next_cursor < 0) {
                next_cursor = 0;
            }
            this.move_cursor_to(next_cursor);
        }
        else if (event.key === Crafty.keys.RIGHT_ARROW) {
            var next_cursor = this.cursor_index + 1;
            if (next_cursor >= this.slots.total) {
                next_cursor = this.slots.total - 1;
            }
            this.move_cursor_to(next_cursor);
        }
        else if (event.key === Crafty.keys.DOWN_ARROW) {
            if (this.cursor_index + this.grid.columns < this.slots.total) {
                this.move_cursor_to(this.cursor_index + this.grid.columns);
            }
        }
        else if (event.key === Crafty.keys.UP_ARROW) {
            if (this.cursor_index > this.grid.columns - 1) {
                this.move_cursor_to(this.cursor_index - this.grid.columns);
            }
        }
        else if (event.key === Crafty.keys.SPACE) {
            if (this.cursor_index !== -1) {
                console.log("Selected", this.active_inventory.slots[this.cursor_index]);
                
                if (!this.in_selection) {
                    // select the slot
                    this.select_slot(this.cursor_index);
                }
                else {
                    // do something with the selection
                    
                    if (this.cursor_index === this.selected_index) {
                        this.unselect_slot(this.cursor_index);
                    }
                }
            }
        }

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
        
        // don't rebuild if we're already showing
        if (this.active()) {
            return;
        }
        
        // track this inventory
        this.active_inventory = inv;
        
        // how many slots do we have?
        this.set_slot_count(inv.max_size);
        
        // select the background and show
        this.show_hud("b");
        this.show_slots(inv.slots);
        
    }
    
    /*
        Function: hide/0
        
        Destroy the hud and inventory display data.
    */
    hide() {
        this.in_selection = false;
        this.selected_index = -1;
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
        
        if (this.description_sprite !== undefined) {
            this.description_sprite.destroy();
            this.description_sprite = undefined;
        }   
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
                
                // how about a text sprite
                var t_tile_quant = Crafty.e("2D, UIDOMLayer, Text")
                .attr({x: slot_x * 32 + this.offset_x + 5, y: slot_y * 32 + this.offset_y + 16, w: 32 })
                .textFont({family: "SFMono-Regular, Consolas, Courier, Menlo, monospace", size: "10px", type: "bold"})
                .text(item.quantity);
                this.hud_sprites.push(t_tile_quant);
                
            }
        }
    }
    
    /*
        Function: toggle_slot(slot_index, state)
    */
    toggle_slot(slot_index, state) {
        
        // if we're in a selection, and we're trying to toggle the selected slot, then
        // don't. Selection state needs to be cleared first
        if (this.in_selection && slot_index == this.selected_index) {
            return;
        }
        
        // find the tile
        var tile = undefined;
        
        this.hud_sprites.forEach(function (s) {
            if (s.slot_index === slot_index) {
                tile = s
            }
        });
        
        // bail out early if we don't have a tile
        if (tile === undefined) {
            console.log("Couldn't find the proper sprite for inventory tile toggle");
            return;
        }
        
        // what are we doing?
        var removals = ["gray", "red", "blue", "yellow", "green"];
        var new_component = undefined;
        
        if (state === "cursor") {
            new_component = "blue";
        }
        else if (state === "selected") {
            new_component = "green";
        }
        else if (state == "normal") {
            new_component = "gray";
        }
        
        // if we have a new state, let's clear out any old states and update
        if (new_component !== undefined) {
            
            // clear old states
            removals.forEach(function (r) {
                tile.removeComponent("inventory_" + r, true);
            });
            
            // set new state
            tile.addComponent("inventory_" + new_component);
        }
    }
    
    /*
        Function: move_cursor_to/1
    
        Move the cursor to a specific slot index. This function WILL NOT auto-clamp to the
        proper number of slots - this needs to be handled in separate logic.
    
        # Example
            
            move_cursor_to(0) // start of the inventory
            move_cursor_to(7) // move to the seventh item in inventory, which might be on a different row
    
    */
    move_cursor_to(slot_index) {
        
        // reset the old slot
        if (this.cursor_index !== -1) {
            this.toggle_slot(this.cursor_index, "normal");
        }
        
        // set and highlight the new slot
        this.cursor_index = slot_index;
        this.toggle_slot(this.cursor_index, "cursor");
        
        // setup our text sprite for our inventory item
        var item = this.active_inventory.slots[this.cursor_index];
        if (item !== undefined) {
            this.toggle_cursor_description(item.name);
        }
        else {
            this.toggle_cursor_description(undefined);
        }
    }
    
    /*
        Function: select_slot/1
    
        Select the item at the given slot.
    */
    select_slot(slot_index) {
        
        // don't reselect
        if (this.in_selection) {
            return;
        }
        
        this.toggle_slot(slot_index, "selected");
        this.in_selection = true;
        this.selected_index = slot_index
    }
    
    unselect_slot(slot_index) {
        
        this.in_selection = false;
        
        if (slot_index === this.cursor_index) {
            this.toggle_slot(slot_index, "cursor");
        }
        else {
            this.toggle_slot(slot_index, "normal");
        }
        
        this.selected_index = -1;
    }
    
    /*
        Function: toggle_cursor_description/1
        
        Change the description of the currently navigated item.
    
    */
    toggle_cursor_description(text) {
        
        if (this.description_sprite !== undefined) {
            this.description_sprite.destroy();
        }
        
        if (text !== undefined) {
            this.description_sprite = Crafty.e("2D, UIDOMLayer, Text")
            .attr({x: this.offset_x + 40, y: this.offset_y + 8, w: 32 * (this.width - 2)})
            .textFont({family: "SFMono-Regular, Consolas, Courier, Menlo, monospace", size: "14px"})
            .text(text);
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

                var slot_index = -1;
                
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
                        
                        // let's set the slot index
                        slot_index = (hy - 1) * this.grid.columns + hx - 1
                    }
                }
                
                // create the tile
                var t_tile = Crafty.e("2D, UICanvasLayer, " + inv_tile).attr({x: hx * 32 + this.offset_x, y: hy * 32 + this.offset_y, z: 100000});
                t_tile.slot_index = slot_index

                this.hud_sprites.push(t_tile);
                
            }
        }
        
        // setup the cursor
        this.move_cursor_to(0);
        
    }
    
}