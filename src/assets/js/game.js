var opt_props = ""; //", SolidHitBox";

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

// var player

var game_state = {
    
    // Player model
    player: {
        credits: 0
    },
    computer: {
        model: "Seerlight 300",
        cpu: {
            max: 100,
            current: 0
        },
        storage: {
            max: 100,
            current: 0
        },
        programs: [
            {
                name: "CryptoMine Beta v0.1",
                type: "cryptominer",
                stealth: 1,
                efficiency: 0.25,
                cost: {
                    cpu: 25,
                    storage: 50
                }
            }
        ]
    }
}

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

// Update the state of the player computer
function syncComputer() {
    
    // check the program list, and build up the computer stats
    var cpu_total = 0;
    var str_total = 0;
    
    game_state.computer.programs.forEach(
        function (program) {
            cpu_total += program.cost.cpu;
            str_total += program.cost.storage;
        }
    );
    
    game_state.computer.cpu.current = cpu_total;
    game_state.computer.storage.current = str_total;
}

function updateComputerDisplay() {
    
    // update the progress bars for total usage
    cpu_perc = game_state.computer.cpu.current / game_state.computer.cpu.max * 100.0;
    str_perc = game_state.computer.storage.current / game_state.computer.storage.max * 100.0;
    
    document.getElementById("cpu-usage").value = "" + Math.trunc(cpu_perc);
    document.getElementById("storage-usage").value = "" + Math.trunc(str_perc);
    
    // check the display of computer programs
}

function updateResourceDisplay() {
    
    var cred_string = numberWithCommas(game_state.player.credits) + " credits";
    document.getElementById("resource-credits").innerHTML = cred_string;
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function updateGameState() {
    
    syncComputer();
    updateComputerDisplay();
    clearProgramTable();
    fillProgramTable();
    
    updateResourceDisplay();
    
}

function clearProgramTable() {

    var rows = document.getElementById("program-table").rows;
    var table = document.getElementById("program-table");
    for (var r_idx = rows.length - 1; r_idx > 0; r_idx--) {
        table.deleteRow(r_idx);
    }
    
}

function fillProgramTable() {
    
    var table = document.getElementById("program-table");
    
    game_state.computer.programs.forEach(
        function (program) {
            var row = table.insertRow(1);
            var c_name = row.insertCell(0);
            var c_cpu = row.insertCell(1);
            var c_str = row.insertCell(2);
            
            c_name.innerHTML = program.name;
            c_cpu.innerHTML = program.cost.cpu;
            c_str.innerHTML = program.cost.storage;
        }
    );
}

setTimeout(updateGameState, 500);


// Take the keyboard buffer and process it, looking for particular commands
function processKeyBuffer(buffer) {
    var update_game_state = false;
    
    if (buffer === "simoleans") {
        game_state.player.credits += 1000000;
        update_game_state = true;
    }
    
    if (update_game_state) {
        setTimeout(updateGameState, 100);
    }
}

// Game Map
var game_map = {
    view: {width: 500, height: 400},
    tiles: {
        width: 32, height: 32,
        tile_set: {
            "b_nw": {
                props: "2D, Canvas, solid, blue_wall_nw, Collision" + opt_props,
                collision: [0, 0, 32, 0, 32, 6, 0, 6],
                children: [
                    {
                        props: "2d, Canvas, Collision, solid" + opt_props,
                        collision: [0, 6, 6, 6, 6, 32, 0, 32]
                    }
                ]
            },
            "b_n" : {
                props: "2D, Canvas, solid, blue_wall_n, Collision" + opt_props,
                collision: [0, 0, 32, 0, 32, 6, 0, 6]
            },
            "b_ne": {
                props: "2D, Canvas, solid, blue_wall_ne, Collision" + opt_props,
                collision: [0, 0, 32, 0, 32, 6, 0, 6],
                children: [
                    {
                        props: "2d, Canvas, Collision, solid" + opt_props,
                        collision: [26, 6, 32, 6, 32, 32, 26, 32]
                    }
                ]
            },
            "b_w" : {
                props: "2D, Canvas, solid, blue_wall_w, Collision" + opt_props,
                collision: [0, 0, 6, 0, 6, 32, 0, 32]
            },
            "c"   : {props: "2D, Canvas, floor_tile"},
            "b_e" : {
                props: "2D, Canvas, solid, blue_wall_e, Collision" + opt_props,
                collision: [26, 0, 32, 0, 32, 32, 26, 32]
            },
            "b_sw": {
                props: "2D, Canvas, solid, blue_wall_sw, Collision" + opt_props,
                collision: [0, 0, 6, 0, 6, 32, 0, 32],
                children: [
                    {
                        props: "2d, Canvas, Collision, solid" + opt_props,
                        collision: [6, 26, 32, 26, 32, 32, 6, 32]
                    }
                ]
            },
            "b_s" : {
                props: "2D, Canvas, solid, blue_wall_s, Collision" + opt_props,
                collision: [0, 26, 32, 26, 32, 32, 0, 32]
            },
            "b_se": {
                props: "2D, Canvas, solid, blue_wall_se, Collision" + opt_props,
                collision: [26, 0, 32, 0, 32, 32, 26, 32],
                children: [
                    {
                        props: "2D, Canvas, Collision, solid" + opt_props,
                        collision: [0, 26, 26, 26, 26, 32, 0, 32]
                    }
                ]
            },
            "b_nw_nub": {
                props: "2D, Canvas, solid, blue_wall_nw_nub, Collision" + opt_props,
                collision: [0, 0, 6, 0, 6, 6, 0, 6]
            },
            "b_ne_nub": {
                props: "2D, Canvas, solid, blue_wall_ne_nub, Collision" + opt_props,
                collision: [26, 0, 32, 0, 32, 6, 26, 6]
            },
            "b_sw_nub": {
                props: "2D, Canvas, solid, blue_wall_sw_nub, Collision" + opt_props,
                collision: [0, 26, 6, 26, 6, 32, 0, 32]
            },
            "b_se_nub": {
                props: "2D, Canvas, solid, blue_wall_se_nub, Collision" + opt_props,
                collision: [26, 26, 32, 26, 32, 32, 26, 32]
            },
            "b_hall_v": {
                props: "2D, Canvas, solid, blue_hall_vert, Collision" + opt_props,
                collision: [0, 0, 6, 0, 6, 32, 0, 32],
                children: [
                    {
                        collision: [26, 0, 32, 0, 32, 32, 26, 32],
                        props: "2d, Canvas, Collision, solid" + opt_props
                    }
                ]
            },
            "b_hall_h": {
                props: "2D, Canvas, solid, blue_hall_horz, Collision" + opt_props,
                collision: [0, 0, 32, 0, 32, 6, 0, 6],
                children: [
                    {
                        collision: [0, 26, 32, 26, 32, 32, 0, 32],
                        props: "2D, Canvas, Collision, solid" + opt_props
                    }
                ]                
            },
            "b_door_s": {
                props: "2D, Canvas, blue_door_s" + opt_props,                
            },
            "b_door_n": {
                props: "2D, Canvas, blue_door_n" + opt_props,                
            },
            "b_door_w": {
                props: "2D, Canvas, blue_door_w" + opt_props,                
            },
            "b_door_e": {
                props: "2D, Canvas, blue_door_e" + opt_props,                
            },
            "b_elb_sw": {
                props: "2D, Canvas, solid, blue_elbow_sw, Collision" + opt_props,
                collision: [0, 0, 6, 0, 6, 32, 0, 32],
                children: [
                    {
                        collision: [6, 26, 32, 26, 32, 32, 6, 32],
                        props: "2D, Canvas, Collision, solid" + opt_props
                    }
                ]
            },
            "b_elb_se": {
                props: "2D, Canvas, solid, blue_elbow_se, Collision" + opt_props,
                collision: [26, 0, 32, 0, 32, 32, 26, 32],
                children: [
                    {
                        collision: [0, 26, 26, 26, 26, 32, 0, 32],
                        props: "2D, Canvas, Collision, solid" + opt_props
                    }
                ]
            },
            "b_elb_ne": {
                props: "2D, Canvas, solid, blue_elbow_ne, Collision" + opt_props,
                collision: [26, 0, 32, 0, 32, 32, 26, 32],
                children: [
                    {
                        collision: [0, 0, 26, 0, 26, 6, 0, 6],
                        props: "2D, Canvas, Collision, solid" + opt_props
                    }
                ]                
            },
            "b_elb_nw": {
                props: "2D, Canvas, solid, blue_elbow_nw, Collision" + opt_props,
                collision: [0, 0, 32, 0, 32, 6, 0, 6],
                children: [
                    {
                        collision: [0, 6, 6, 6, 6, 32, 0, 32],
                        props: "2D, Canvas, Collision, solid" + opt_props
                    }
                ]                                
            },
            "b_tee_n": {
                props: "2D, Canvas, solid, blue_tee_n, Collision" + opt_props,
                collision: [0, 0, 32, 0, 32, 6, 0, 6],
                children: [
                    {
                        collision: [0, 26, 6, 26, 6, 32, 0, 32],
                        props: "2D, Canvas, Collision, solid" + opt_props
                    },
                    {
                        collision: [26, 26, 32, 26, 32, 32, 26, 32],
                        props: "2D, Canvas, Collision, solid" + opt_props
                    }
                ]
            },
            "b_tee_s": {
                props: "2D, Canvas, solid, blue_tee_s, Collision" + opt_props,
                collision: [0, 26, 32, 26, 32, 32, 0, 32],
                children: [
                    {
                        collision: [0, 0, 6, 0, 6, 6, 0, 6],
                        props: "2D, Canvas, Collision, solid" + opt_props
                    },
                    {
                        collision: [26, 0, 32, 0, 32, 6, 26, 6],
                        props: "2D, Canvas, Collision, solid" + opt_props
                    }
                ]                
            },
            "b_tee_e": {
                props: "2D, Canvas, solid, blue_tee_e, Collision" + opt_props,
                collision: [26, 0, 32, 0, 32, 32, 26, 32],
                children: [
                    {
                        collision: [0, 0, 6, 0, 6, 6, 0, 6],
                        props: "2D, Canvas, Collision, solid" + opt_props
                    },
                    {
                        collision: [0, 26, 6, 26, 6, 32, 0, 32],
                        props: "2D, Canvas, Collision, solid" + opt_props
                    }
                ]                                
            },
            "b_tee_w": {
                props: "2D, Canvas, solid, blue_tee_w, Collision" + opt_props,
                collision: [0, 0, 6, 0, 6, 32, 0, 32],
                children: [
                    {
                        collision: [26, 0, 32, 0, 32, 6, 26, 6],
                        props: "2D, Canvas, Collision, solid" + opt_props
                    },
                    {
                        collision: [26, 26, 32, 26, 32, 32, 26, 32],
                        props: "2D, Canvas, Collision, solid" + opt_props
                    }
                ]                
            },
            "cpu_1_a": {
                props: "2D, Canvas, solid, computer_single_a, Collision" + opt_props
            },
            "cpu_1_b": {
                props: "2D, Canvas, solid, computer_single_b, Collision" + opt_props
            },
            "cpu_1_c": {
                props: "2D, Canvas, solid, computer_single_c, Collision" + opt_props
            },
            "cpu_2_at": {
                props: "2D, Canvas, computer_double_a_top",
                attrs: {
                    z: 1000
                }
            },
            "cpu_2_ab": {
                props: "2D, Canvas, solid, computer_double_a_bot, Collision" + opt_props
            },
            "cpu_2_bt": {
                props: "2D, Canvas, computer_double_b_top",
                attrs: {
                    z: 1000
                }
            },
            "cpu_2_bb": {
                props: "2D, Canvas, solid, computer_double_b_bot, Collision" + opt_props
            },
            "cpu_2_ct": {
                props: "2D, Canvas, computer_double_c_top",
                attrs: {
                    z: 1000
                }
            },
            "cpu_2_cb": {
                props: "2D, Canvas, solid, computer_double_c_bot, Collision" + opt_props
            },
            "disk_sc": {
                props: "2D, Canvas, solid, disk_single_closed, Collision" + opt_props
            },
            "disk_so": {
                props: "2D, Canvas, solid, disk_single_open, Collision" + opt_props
            },
            "disk_dlc": {
                props: "2D, Canvas, solid, disk_double_closed_left, Collision" + opt_props
            },
            "disk_drc": {
                props: "2D, Canvas, solid, disk_double_closed_right, Collision" + opt_props
            },
            "disk_dlo": {
                props: "2D, Canvas, solid, disk_double_open_left, Collision" + opt_props
            },
            "disk_dro": {
                props: "2D, Canvas, solid, disk_double_open_right, Collision" + opt_props
            },
            "teleport": {
                props: "2D, Canvas, teleport"
            },
            "b_exit_e": {
                props: "2D, Canvas, exit, solid, blue_exit_east, Collision" + opt_props,
                collision: [26, 0, 32, 0, 32, 32, 26, 32],
                children: [
                    {
                        props: "2D, Canvas, Collision, solid" + opt_props,
                        collision: [0, 0, 26, 0, 26, 6, 0, 6]
                    },
                    {
                        props: "2D, Canvas, Collision, solid" + opt_props,
                        collision: [0, 26, 26, 26, 26, 32, 0, 32]
                    }
                ]
            },
            "b_exit_s": {
                props: "2D, Canvas, exit, solid, blue_exit_south, Collision" + opt_props,
                collision: [0, 26, 32, 26, 32, 32, 0, 32],
                children: [
                    {
                        props: "2D, Canvas, Collision, solid" + opt_props,
                        collision: [0, 0, 6, 0, 6, 26, 0, 26]
                    },
                    {
                        props: "2D, Canvas, Collision, solid" + opt_props,
                        collision: [26, 0, 32, 0, 32, 26, 26, 26]
                    }
                ]
            },
            "b_exit_n": {
                props: "2D, Canvas, exit, solid, blue_exit_north, Collision" + opt_props,
                collision: [0, 0, 32, 0, 32, 6, 0, 6],
                children: [
                    {
                        props: "2D, Canvas, Collision, solid" + opt_props,
                        collision: [0, 6, 6, 6, 6, 32, 0, 32]
                    },
                    {
                        props: "2D, Canvas, Collision, solid" + opt_props,
                        collision: [26, 6, 32, 6, 32, 32, 26, 32]
                    }
                ]
            },
            "b_exit_w": {
                props: "2D, Canvas, exit, solid, blue_exit_west, Collision" + opt_props,
                collision: [0, 0, 6, 0, 6, 32, 0, 32],
                children: [
                    {
                        props: "2D, Canvas, Collision, solid" + opt_props,
                        collision: [6, 0, 32, 0, 32, 6, 6, 6]
                    },
                    {
                        props: "2D, Canvas, Collision, solid" + opt_props,
                        collision: [6, 26, 32, 26, 32, 32, 6, 32]
                    }
                ]                
            }
        }
    },
    interactions: {
        cpu_1_a: {interesting: true},
        cpu_1_b: {interesting: true},
        cpu_1_c: {interesting: true},
        cpu_2_ab: {interesting: true},
        cpu_2_bb: {interesting: true},
        cpu_2_cb: {interesting: true},
        disk_sc: {interesting: true},
        disk_so: {interesting: true},
        disk_dlc: {interesting: true},
        disk_drc: {interesting: true},
        disk_dlo: {interesting: true},
        disk_dro: {interesting: true}
    },
    map_size: {width: 15, height: 12},
    teleport: {
        x: 8, y: 3
    },
    map: [
        ["b_elb_nw", "b_n"     , "disk_dlc", "disk_drc", "b_n"    , "b_hall_h", "b_tee_n" , "b_hall_h", "b_n"     , "disk_dlo", "disk_dro", "b_n"     , "b_ne"    , ""        , ""        ],
        ["b_elb_sw", "b_door_w", "c"       , "c"       , "c"      , "c"       , "c"       , "c"       , "c"       , "c"       , "c"       , "c"       , "b_ne_nub", "b_ne"    , ""        ],
        [""        , "b_w"     , "c"       , "cpu_1_a" , "cpu_1_b", "cpu_1_c" , "c"       , "b_nw"    , "b_door_n", "b_ne"    , "c"       , "c"       , "c"       , "b_door_e", "b_exit_e"],
        ["b_nw"    , "b_nw_nub", "c"       , "c"       , "c"      , "c"       , "c"       , "b_door_w", "teleport", "b_door_e", "c"       , "cpu_2_ct", "c"       , "b_hall_v", ""        ],
        ["b_hall_v", "c"       , "c"       , "b_se_nub", "b_s"    , "b_sw_nub", "c"       , "b_sw"    , "b_door_s", "b_se"    , "c"       , "cpu_2_cb", "c"       , "b_tee_e" , ""        ],
        ["b_tee_w" , "c"       , "c"       , "b_e"     , ""       , "b_w"     , "c"       , "c"       , "c"       , "c"       , "c"       , "c"       , "c"       , "b_hall_v", ""        ],
        ["b_hall_v", "c"       , "cpu_2_at", "b_ne_nub", "b_n"    , "b_nw_nub", "cpu_2_bt", "b_se_nub", "b_door_s", "b_hall_h", "b_tee_s" , "b_hall_h", "b_hall_h", "b_elb_se", ""        ],
        ["b_w"     , "c"       , "cpu_2_ab", "c"       , "c"      , "c"       , "cpu_2_bb", "b_e"     , "c"       , "c"       , "c"       , "disk_sc" , "disk_so" , "b_e"     , ""        ],
        ["b_sw"    , "b_sw_nub", "c"       , "c"       , "c"      , "c"       , "c"       , "b_door_e", "b_hall_h", "b_elb_ne", "c"       , "c"       , "b_se_nub", "b_se"    , ""        ],
        [""        , "b_sw"    , "b_door_s", "b_s"     , "b_s"    , "b_door_s", "b_s"     , "b_se"    , ""        , "b_hall_v", "b_s"     , "b_door_s", "b_se"    , ""        , ""        ],
        [""        , ""        , "b_exit_s", ""        , ""       , "b_hall_v", ""        , "b_exit_n", ""        , "b_hall_v", ""        , "b_hall_v", ""        , ""        , ""        ],
        [""        , ""        , ""        , ""        , ""       , "b_elb_sw", "b_hall_h", "b_tee_s" , "b_hall_h", "b_elb_se", "b_exit_w", "b_elb_se", ""        , ""        , ""        ],
    ]
}

function _has(obj, attr) {
    return typeof obj[attr] !== 'undefined';
}





window.onload = function() {
    
    
	//start crafty
    // Crafty.init(416, 380);
    // Crafty.init(game_map.view.width, game_map.view.height, "canvas-console");
    Crafty.init(document.getElementById("canvas-console-container").offsetWidth - 8, game_map.view.height, "canvas-console")
//	Crafty.canvas.init();
	
    Crafty.sprite(32, "assets/img/scifitiles-menu.png",
        {
            menu_nw: [5, 3],
            menu_n: [6, 3],
            menu_ne: [7, 3],
            menu_w: [5, 4],
            menu_c: [6, 4],
            menu_e: [7, 4],
            menu_sw: [5, 5],
            menu_s: [6, 5],
            menu_se: [7, 5],
            menu_danger: [4, 3]
        }
    );
    
	//turn the sprite map into usable components
	Crafty.sprite(32, "assets/img/scifitiles-sheet.png", {
		grass1: [6,1],
		grass2: [6,1],
		grass3: [6,1],
		grass4: [6,1],
		flower: [0,1],
		bush1: [6,0],
		bush2: [6,0],
        blue_wall_nw: [5, 0],
        blue_wall_n: [6, 0],
        blue_wall_ne: [7, 0],
        blue_wall_w: [5,1],
        blue_wall_e: [7,1],
        blue_wall_sw: [5, 2],
        blue_wall_s: [6, 2],
        blue_wall_se: [7, 2],
        blue_wall_nw_nub: [9, 1],
        blue_wall_ne_nub: [8, 1],
        blue_wall_sw_nub: [9, 0],
        blue_wall_se_nub: [8, 0],
        floor_tile: [6, 1],
        blue_hall_vert: [4, 1],
        blue_hall_horz: [4, 2],
        blue_door_s: [8, 2],
        blue_door_n: [10, 2],
        blue_door_w: [9, 2],
        blue_door_e: [11, 2],
        blue_elbow_sw: [10, 1],
        blue_elbow_se: [11, 1],
        blue_elbow_ne: [11, 0],
        blue_elbow_nw: [10, 0],
        blue_tee_n: [12, 0],
        blue_tee_s: [13, 1],
        blue_tee_e: [13, 0],
        blue_tee_w: [12, 1],
        computer_single_a: [0, 3],
        computer_single_b: [1, 3],
        computer_single_c: [2, 3],
        teleport: [6, 4],
        blue_exit_east: [1, 1],
        blue_exit_south: [1, 0],
        blue_exit_north: [0, 0],
        blue_exit_west: [0, 1]
	});
	
    Crafty.sprite(16, "assets/img/avatar_16x16.png", {
        player: [0, 0],
        interact_interesting: [0, 1],
        interact_uninteresting: [0, 2]
    });
    
    Crafty.sprite(32, "assets/img/sci-fi-obj-set-1.png", {
        computer_double_a_top: [0, 1],
        computer_double_a_bot: [0, 2],
        computer_double_b_top: [1, 1],
        computer_double_b_bot: [1, 2],
        computer_double_c_top: [2, 1],
        computer_double_c_bot: [2, 2],
        disk_single_closed: [0, 0],
        disk_single_open: [1, 0],
        disk_double_closed_left: [3, 0],
        disk_double_closed_right: [4, 0],
        disk_double_open_left: [5, 0],
        disk_double_open_right: [6, 0]
    })
    
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
	
	// Main scene control
	Crafty.scene("main", function() {
        // generateWorld();
        generateGameMap();
		
		Crafty.c('Hero', {
			init: function() {
                //setup animations
                this.requires("SpriteAnimation, Collision");
                
                // set the character facing
                this.facing = "";
                
				//change direction when a direction change event is received
                this.bind("NewDirection",
						function (direction) {
                            
                            // track our orientation in NSEW and NW/NE/SW/SE directions, which
                            // we'll use later when interacting with objects
                            if(!direction.x && !direction.y) {
                                // no directional change, but don't zero out our facing
                            }
                            else {
                            
                                this.facing = "";
                            
    							if (direction.y < 0) {
                                    this.facing += "N";
    							}
    							if (direction.y > 0) {
                                    this.facing += "S";
    							}
    							if (direction.x < 0) {
                                    this.facing += "W";
    							}
    							if (direction.x > 0) {
                                    this.facing += "E"
    							}
                            }
					})
					// A rudimentary way to prevent the user from passing solid areas
					.bind('Move', function(from) {
                        var hitDatas, hitData;
						if((hitDatas = this.hit('solid'))){
                            
                            // default to the first hit data
                            hitData = hitDatas[0];
                            
                            // find the largest magnatude hit data
                            for (var hit_idx = 0; hit_idx < hitDatas.length; hit_idx++) {
                                if (Math.abs(hitDatas[hit_idx].overlap) > Math.abs(hitData.overlap)) {
                                    hitData = hitDatas[hit_idx];                                    
                                }
                            }
                            
                            if (hitData.type === 'SAT') {
                                this.x -= hitData.overlap * hitData.nx;
                                this.y -= hitData.overlap * hitData.ny;
                                
                            }
                            else {
                                this.x = from._x;
                                this.y = from._y;
                            }
						}
					});
				return this;
			}
		});

		Crafty.c("RightControls", {
			init: function() {
				this.requires('Multiway');
			},

			rightControls: function(speed) {
				this.multiway(speed, {UP_ARROW: -90, DOWN_ARROW: 90, RIGHT_ARROW: 0, LEFT_ARROW: 180})
				return this;
			}

		});
        
        Crafty.s("MenuControls", 
            {
                init: function() {
                    console.log("Menu Controls system started");
                    this.keyboard_buffer = "";
                    this.keyboard_buffer_max = 9;
                    
                    this.menu_manager = new MenuManager();
                    
                    // this.requires("Keyboard");
                    
                    this.bind('KeyDown', function (e) {
                        
                        // menu toggling
                        if (e.originalEvent.key === "q") {
                            console.log("opening menu");
                            this.menu_manager.open(
                                {
                                    width: 15,
                                    height: 8,
                                    title: "I'm a Menu!",
                                    items: [
                                        "Menu item 1", "Menu Item 2", "Another!", "Aaaand another!?"
                                    ]
                                }
                            );
                        }
                        else if (e.key == Crafty.keys.ESC) {
                            this.menu_manager.close();
                        }
                        else if (e.originalEvent.key === "e") {
                            this.menu_manager.close_all();
                        }
                        else {
                            this.menu_manager.handleKeypress(e);
                        }
                        
                        // handle longer out of cycle commands, like shortcuts, easter eggs, etc
                        this.keyboard_buffer += e.originalEvent.key;
                        if (this.keyboard_buffer.length > this.keyboard_buffer_max) {
                            this.keyboard_buffer = this.keyboard_buffer.substr(-1 * this.keyboard_buffer_max);
                        }
                        processKeyBuffer(this.keyboard_buffer);
                        
                    });
                }
            },
            {},
            false
        );
        
        Crafty.c("PlayerInteractions", {
            init: function() {
                
                this.requires("Keyboard");
                
                this.bind('KeyDown', function (e) {
                    
                    if (e.key == Crafty.keys.SPACE) {
                        
                        // try and interact with an item
                        var tileLoc = pointToTile(this.x, this.y);
                        var headingLoc = tileAtHeading(tileLoc.x, tileLoc.y, this.facing);
                        
                        if (hasTileAt(headingLoc.x, headingLoc.y)) {
                            var tileId = tileIdAt(headingLoc.x, headingLoc.y);
                            
                            // are we interacting with an interesting, or uninteresting item?
                            var interact_type = "interact_uninteresting";
                            var sprite_sheet_y = 2;
                            if (_has(game_map.interactions, tileId)) {
                                if (game_map.interactions[tileId].interesting) {
                                    interact_type = "interact_interesting";
                                    sprite_sheet_y = 1;
                                }
                            }
                            
                            // display our interaction sprite for half a second
                            var tile_e = Crafty.e("2D, Canvas, SpriteAnimation, " + interact_type)
                            .reel("InteractInteresting", 250, 0, sprite_sheet_y, 5)
                            .animate("InteractInteresting", -1)
                            .attr({x: headingLoc.x * game_map.tiles.width + 8, y: headingLoc.y * game_map.tiles.height + 8});
                            setTimeout(function() {tile_e.destroy()}, 500);
                        }
                        
                    }
                    
                })
            }
        })
		
		//create our player entity with some premade components
		window.game_state.player.sprite = Crafty.e("2D, Canvas, player, RightControls, Hero, SpriteAnimation, Animate, Collision, Keyboard, PlayerInteractions")
            .attr({x: game_map.teleport.x * 32 + 8, y: game_map.teleport.y * 32 + 8, z:20})
            // .attr({x: 192, y: 128, z: 20})
			.reel("PlayerWalking", 1000, 0, 0, 5)
            .animate("PlayerWalking", -1)
            .collision([0, 0, 16, 0, 16, 16, 0, 16])
			.rightControls(200);
	});
    
	//the loading screen that will display while our assets load
	Crafty.scene("loading", function() {
		//load takes an array of assets and a callback when complete
		Crafty.load({}, function () {
			Crafty.scene("main"); //when everything is loaded, run the main scene
		});
		
		//black background with some loading text
		Crafty.background("#000");
        // Crafty.e("2D, DOM, Text").attr({w: 100, h: 20, x: 150, y: 120})
        //     .text("Loading")
        //     .css({"text-align": "center"});
	});
	
	//automatically play the loading scene
	Crafty.scene("loading");
    
};