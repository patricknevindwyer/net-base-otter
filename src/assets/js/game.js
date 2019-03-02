
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
    window.stats_hud.update_location();
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
        window.status_hud.success("MOAR SIMOLEANS")
        game_state.player.credits += 1000000;
        update_game_state = true;
    }
    
    if (update_game_state) {
        setTimeout(updateGameState, 100);
    }
}

window.onload = function() {

    var canvas_width = document.getElementById("canvas-console-container").offsetWidth;
    // var game_map = map_generators.demo();
    var game_map = map_generators.empty_room({width: 40, height: 20});
    
    // initialize the display canvas
    Crafty.init(canvas_width - 8, game_map.view.height, "canvas-console")
	
    // setup the UI layer
    Crafty.createLayer("UICanvasLayer", "Canvas", {scaleResponse: 1, xResponse: 0, yResponse: 0, z: 120});
    Crafty.createLayer("UIDOMLayer", "DOM", {scaleResponse: 1, xResponse: 0, yResponse: 0, z: 130});
    
    // sprites.js has our sprite data
    load_game_sprites();
	
    Crafty.viewport.clampToEntities = false;
    
	// Main scene control
	Crafty.scene("main", function() {
        
        
        // initialize the status bar HUD
        window.status_hud = new StatusHud(6, game_map.view.height - 70, canvas_width - 256 - 8 - 6 - 16);
        window.status_hud.start();
        
        // initialize the Stats HUD
        window.stats_hud = new StatsHud(canvas_width - 8 - 256, 6, 256, game_map.view.height - 12);
        window.stats_hud.show();
        updateGameState();
        
        // setup and render the map
        renderGameMap(game_map);
        
        // setup any bots/npcs
        
        // setup any drops
        window.drops = new Drops();
        window.drops.addDrop(100, 100);
		
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
                        
                        if ((hitDatas = this.hit('drop'))) {
                            
                            // we've hit an item!
                            console.log("got an item!")
                            
                            hitDatas.forEach(function (hd) {
                                var d = window.drops.getDropFromEntity(hd.obj);
                                window.drops.collectDrop(d);
                            })
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
                        
                        if (hasTileAt(game_map, headingLoc.x, headingLoc.y)) {
                            var tileId = tileIdAt(game_map, headingLoc.x, headingLoc.y);
                            
                            // are we interacting with an interesting, or uninteresting item?
                            var interact_type = "interact_uninteresting";
                            var sprite_sheet_y = 2;
                            
                            // correlate the game map to the tile set, which we can then use to check
                            var tile_set = window.tile_sets[game_map.tile_set];
                            
                            if (_has(tile_set.interactions, tileId)) {
                                if (tile_set.interactions[tileId].interesting) {
                                    interact_type = "interact_interesting";
                                    sprite_sheet_y = 1;
                                }
                            }
                            
                            // display our interaction sprite for half a second
                            var tile_e = Crafty.e("2D, Canvas, SpriteAnimation, " + interact_type)
                            .reel("InteractInteresting", 250, 0, sprite_sheet_y, 5)
                            .animate("InteractInteresting", -1)
                            .attr({x: headingLoc.x * tile_set.width + 8, y: headingLoc.y * tile_set.height + 8});
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
            
        // follow the player
        Crafty.viewport.follow(window.game_state.player.sprite, 0, 0);
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