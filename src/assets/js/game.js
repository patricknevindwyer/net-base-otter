
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

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function updateGameState() {
    
    // update the game state for computer related data
    syncComputer();
    // clearProgramTable();
    // fillProgramTable();
    
    // poke the STATS HUD to update
    window.stats_hud.update_resources();
    window.stats_hud.update_computer();
    
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
        window.status_hud.status("MOAR SIMOLEANS")
        game_state.player.credits += 1000000;
        update_game_state = true;
    }
    
    if (update_game_state) {
        setTimeout(updateGameState, 100);
    }
}

function _has(obj, attr) {
    return typeof obj[attr] !== 'undefined';
}

window.onload = function() {

    // initialize the display canvas
    Crafty.init(document.getElementById("canvas-console-container").offsetWidth - 8, game_map.view.height, "canvas-console")
	
    // SPRITE LOADING
    Crafty.sprite(32, "assets/img/hud.png",
        {
            hud_g_nw: [3, 3],
            hud_g_n: [4, 3],
            hud_g_ne: [5, 3],
            hud_g_w: [3, 4],
            hud_g_c: [4, 4],
            hud_g_e: [5, 4],
            hud_g_sw: [3, 5],
            hud_g_s: [4, 5],
            hud_g_se: [5, 5],
            hud_stats_nw_notch: [6, 0],
            hud_stats_sw_notch: [6, 8],
            hud_stats_nw: [6, 3],
            hud_stats_n: [7, 3],
            hud_stats_ne: [8, 3],
            hud_stats_w: [6, 4],
            hud_stats_c: [7, 4],
            hud_stats_e: [8, 4],
            hud_stats_sw: [6, 5],
            hud_stats_s: [7, 5],
            hud_stats_se: [8, 5]
        }
    );
    
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
    
	
	// Main scene control
	Crafty.scene("main", function() {
        
        // initialize the status bar HUD
        window.status_hud = new StatusHud(6, window.game_map.view.height - 70);
        window.status_hud.show();
        
        // initialize the Stats HUD
        window.stats_hud = new StatsHud(document.getElementById("canvas-console-container").offsetWidth - 8 - 256, 6, 256, window.game_map.view.height - 12);
        window.stats_hud.show();
        updateGameState();
        
        // setup the map
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
                        
                        // menu management
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