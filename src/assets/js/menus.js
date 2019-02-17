class Menu {
    constructor(offset_x, offset_y) {
        
        // is the menu current active
        this.is_active = false;
        
        // spatial parameters for menu construction
        this.offset_x = offset_x;
        this.offset_y = offset_y;
        this.item_offset_x = this.offset_x + 15;
        this.item_offset_y = this.offset_y + 20;
        this.item_font_size = 16;
        this.item_line_height = this.item_font_size + 4;
        
        // sprite tracking
        this.game_menu_sprites = [];
        this.game_menu_item_sprites = [];
        
        // menu items
        this.menu_items = ["Menu item 1", "Another item!", "Item 3?"];
        this.selected_menu_item_idx = 0;
        
    }
    
    isActive() {
        return this.is_active;
    }

    open(props) {
        
        this.width = props.width;
        this.height = props.height;
        this.menu_items = props.items;
        var title_text = props.title;
        
        // track our menu state so we don't stack up a whole bunch of menu sprits
        if (this.is_active) {
            return;
        }
        
        this.is_active = true;
        
        // reset!
        this.selected_menu_item_idx = 0;
        
        // disable the player sprite from receiving controls
        window.game_state.player.sprite.disableControl();
        
        // draw the menu outline
        for (var mx = 0; mx < this.width; mx++) {
            for (var my = 0; my < this.height; my++) {
            
                var props = "2D, Canvas";
            
                // corners
                if (mx == 0 && my == 0) {
                    props += ", menu_nw";
                }
                else if (mx == 0 && my == (this.height - 1)) {
                    props += ", menu_sw";
                }
                else if (mx == (this.width - 1) && my == 0) {
                    props += ", menu_ne";
                }
                else if (mx == (this.width - 1) && my == (this.height - 1)) {
                    props += ", menu_se";
                }
            
                // top
                else if (my == 0) {
                    props += ", menu_n";
                }
            
                // bottom
                else if (my == (this.height - 1)) {
                    props += ", menu_s";
                }
            
                // left
                else if (mx == 0) {
                    props += ", menu_w";
                }
            
                // right
                else if (mx == (this.width - 1)) {
                    props += ", menu_e";
                }
            
                // inside
                else {
                    props += ", menu_c";
                }
            
                var menu_tile = Crafty.e(props).attr({x: mx * 32 + this.offset_x, y: my * 32 + this.offset_y, z: 100000});
                this.game_menu_sprites.push(menu_tile);
            }
        }
        
        // draw the menu title
        var title_offset_x = 16;
        var title_offset_y_top = -24;
        var title_offset_y_bot = -16;
        var title_width = this.width - 3;
        
        for (var t_x = 0; t_x < title_width; t_x++) {
            
            var tile_top = "menu_n";
            var tile_bot = "menu_s";
            
            if (t_x == 0) {
                tile_top = "menu_nw";
                tile_bot = "menu_sw";
            }
            else if (t_x == title_width - 1) {
                tile_top = "menu_ne";
                tile_bot = "menu_se";
            }
            
            var title_t = Crafty.e("2D, Canvas, " + tile_top).attr({x: this.offset_x + title_offset_x + t_x * 32, y: this.offset_y + title_offset_y_top, z: 100000});
            this.game_menu_sprites.push(title_t);
        
            var title_b = Crafty.e("2D, Canvas, " + tile_bot).attr({x: this.offset_x + title_offset_x + t_x * 32, y: this.offset_y + title_offset_y_bot, z: 100000});
            this.game_menu_sprites.push(title_b);
            
        }
        
        // render the menu item text
        for (var menu_idx = 0; menu_idx < this.menu_items.length; menu_idx++) {
            var menu_text = Crafty.e("2D, DOM, Text")
                .attr({x: this.item_offset_x, y: this.item_offset_y + menu_idx * this.item_line_height, w: 32 * 8})
                .textFont({type: "Press Start 2P", size: this.item_font_size + "px"})
                .text(this.menu_items[menu_idx]);
            this.game_menu_item_sprites.push(menu_text);
        }
    
        // render the title text
        this.title_sprite = Crafty.e("2D, DOM, Text")
            .attr({x: this.offset_x + title_offset_x + 12, y: this.offset_y + title_offset_y_bot + 2, w: 32 * (title_width - 1)})
            .textFont({type: "Press Start 2P", size: this.item_font_size + "px"})
            .text(title_text)
        
        this.highlightSelected();
    }
    
    handleKeypress(event) {
        
        if (event.key == Crafty.keys.DOWN_ARROW) {
            this.selected_menu_item_idx++;
        }
        
        else if (event.key == Crafty.keys.UP_ARROW) {
            this.selected_menu_item_idx--;
        }
        
        if (this.selected_menu_item_idx < 0) {
            this.selected_menu_item_idx = this.menu_items.length - 1;
        }
        
        if (this.selected_menu_item_idx >= this.menu_items.length) {
            this.selected_menu_item_idx = 0;
        }
        
        this.highlightSelected();
    }    
    
    highlightSelected() {
        
        this.game_menu_item_sprites.forEach(function (s) {
            s.textColor("#000000");
        })
    
        this.game_menu_item_sprites[this.selected_menu_item_idx].textColor("#FF0000");
        
    }

    // Lose the primary menu focus. We need to hide our text
    unfocus() {
        this.game_menu_item_sprites.forEach(function(s) {
            s.css("display", "none");
        });
        
        this.title_sprite.css("display", "none");
        
    }
    
    focus() {
        this.game_menu_item_sprites.forEach(function(s) {
            s.css("display", "block");
        });        
        
        this.title_sprite.css("display", "block");
        
    }
    
    close() {
    
        // destroy all the menu sprites
        this.game_menu_sprites.forEach(function (menu_tile) {
            menu_tile.destroy();
        });
        this.game_menu_sprites = [];
        
        this.game_menu_item_sprites.forEach(function (item_tile) {
            item_tile.destroy();
        });
        this.game_menu_item_sprites = [];
        
        this.title_sprite.destroy();
        
        this.is_active = false;
        
        // re-enable the player controls
        window.game_state.player.sprite.enableControl();
    
    }
    
}

class MenuManager {
    
    constructor() {
        this.menus = [];
        
        this.offset_x_base = 20;
        this.offset_y_base = 40;
        
        this.offset_x_shift = 8;
        this.offset_y_shift = 8;
    }
    
    isActive() {
        return this.menus.length > 0;
    }
    
    open(props) {
        
        // unfocus any previous menus
        this.menus.forEach(function (menu) {
            menu.unfocus();
        });
        
        // create a new menu, with a higher offset
        var m_depth = this.menus.length;
        var new_menu = new Menu(this.offset_x_base + this.offset_x_shift * m_depth, this.offset_y_base + this.offset_y_shift * m_depth);
        new_menu.open(props);
        this.menus.push(new_menu)
    }
    
    close() {
        // close the last menu in the stack
        
        // don't close anything if we don't have anything
        if (this.menus.length == 0) {
            return;
        }
        
        // pop the last menu in the stack
        var closing = this.menus.pop();
        closing.close();
        
        // if there are any menus left, focus the last of them
        if (this.menus.length > 0) {
            this.menus[this.menus.length - 1].focus();
        }
    }
    
    close_all() {
        
        // close all the menus
        this.menus.forEach(function (m) {
            m.close();
        });
        this.menus = [];
    }
    
    handleKeypress(event) {
        // pass key presses to the last menu in the stack
        if (this.menus.length == 0) {
            return;
        }
        
        this.menus[this.menus.length - 1].handleKeypress(event);
    }
}