var opt_props = ""; //", SolidHitBox";

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

function updateGameState() {
    
    syncComputer();
    updateComputerDisplay();
    clearProgramTable();
    fillProgramTable();
    
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
                        props: "2d, Canvas, Collision, solid" + opt_props,
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
            }
            
        }
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
        [""        , "b_sw"    , "b_s"     , "b_s"     , "b_s"    , "b_door_s", "b_s"     , "b_se"    , ""        , "b_hall_v", "b_s"     , "b_s"     , "b_se"    , ""        , ""        ],
        [""        , ""        , ""        , ""        , ""       , "b_hall_v", ""        , ""        , ""        , "b_hall_v", ""        , ""        , ""        , ""        , ""        ],
        [""        , ""        , ""        , ""        , ""       , "b_elb_sw", "b_hall_h", "b_hall_h", "b_hall_h", "b_elb_se", ""        , ""        , ""        , ""        , ""        ],
    ]
}

window.onload = function() {
    
    
	//start crafty
    // Crafty.init(416, 380);
    // Crafty.init(game_map.view.width, game_map.view.height, "canvas-console");
    Crafty.init(document.getElementById("canvas-console-container").offsetWidth - 8, game_map.view.height, "canvas-console")
//	Crafty.canvas.init();
	
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
        blue_exit_east: [1, 1]
	});
	
    Crafty.sprite(16, "assets/img/avatar_16x16.png", {
        player: [0, 0]
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
    
	//method to randomy generate the map
	function generateWorld() {
		//generate the grass along the x-axis
		for(var i = 0; i < 13; i++) {
			//generate the grass along the y-axis
			for(var j = 0; j < 10; j++) {
				grassType = Crafty.math.randomInt(1, 4);
				Crafty.e("2D, Canvas, grass"+grassType)
					.attr({x: i * 32, y: j * 32});
				
				//1/50 chance of drawing a flower and only within the bushes
				if(i > 0 && i < 12 && j > 0 && j < 9 && Crafty.math.randomInt(0, 50) > 49) {
					Crafty.e("2D, DOM, flower, solid, SpriteAnimation")
						.attr({x: i * 32, y: j * 32})
						//.animate("wind", 0, 1, 3)
						//.animate("wind", 80, -1);
				}
			}
		}
		
		//create the bushes along the x-axis which will form the boundaries
		for(var i = 1; i < 12; i++) {
            var t_x = i * 32;
            var t_y = 0;
            
			Crafty.e("2D, Canvas, solid, blue_wall_n, Collision, SolidHitBox")
				.attr({x: i * 32, y: 0, z: 2})
                .collision([0, 0, 32, 0, 32, 16, 0, 16]);
			Crafty.e("2D, DOM, solid, blue_wall_s, Collision, SolidHitBox")
				.attr({x: i * 32, y: 288, z: 2})
                .collision([0, 16, 32, 16, 32, 32, 0, 32]);
		}
		
		//create the bushes along the y-axis
		//we need to start one more and one less to not overlap the previous bushes
		for(var i = 1; i < 9; i++) {
			Crafty.e("2D, DOM, solid, blue_wall_w")
				.attr({x: 0, y: i * 32, z: 2});
			Crafty.e("2D, Canvas, solid, blue_wall_e")
				.attr({x: 384, y: i * 32, z: 2});
		}
        
        
	}
	
	
	Crafty.scene("main", function() {
        // generateWorld();
        generateGameMap();
		
		Crafty.c('Hero', {
			init: function() {
					//setup animations
					this.requires("SpriteAnimation, Collision")
					//change direction when a direction change event is received
					.bind("NewDirection",
						function (direction) {
							if (direction.x < 0) {
                                // if (!this.isPlaying("walk_left"))
                                    // this.pauseAnimation().animate("walk_left", 20, -1);
							}
							if (direction.x > 0) {
                                // if (!this.isPlaying("walk_right"))
                                    // this.pauseAnimation().animate("walk_right", 20, -1);
							}
							if (direction.y < 0) {
                                // if (!this.isPlaying("walk_up"))
                                    // this.pauseAnimation().animate("walk_up", 20, -1);
							}
							if (direction.y > 0) {
                                // if (!this.isPlaying("walk_down"))
                                    // this.pauseAnimation().animate("walk_down", 20, -1);
							}
                            // if(!direction.x && !direction.y) {
                            //     this.pauseAnimation();
                            // }
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
		
		//create our player entity with some premade components
		player = Crafty.e("2D, Canvas, player, RightControls, Hero, SpriteAnimation, Animate, Collision")
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