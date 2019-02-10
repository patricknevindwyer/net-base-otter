var opt_props = ""; //", SolidHitBox";

var game_map = {
    view: {width: 500, height: 400},
    tiles: {
        width: 32, height: 32,
        tile_set: {
            "b_nw": {
                props: "2D, Canvas, solid, blue_wall_nw, Collision" + opt_props,
                collision: [0, 0, 16, 0, 16, 16, 0, 16]
            },
            "b_n" : {
                props: "2D, Canvas, solid, blue_wall_n, Collision" + opt_props,
                collision: [0, 0, 32, 0, 32, 6, 0, 6]
            },
            "b_ne": {
                props: "2D, Canvas, solid, blue_wall_ne, Collision" + opt_props,
                collision: [16, 0, 32, 0, 32, 16, 16, 16]
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
                collision: [0, 16, 16, 16, 16, 32, 0, 32]
            },
            "b_s" : {
                props: "2D, Canvas, solid, blue_wall_s, Collision" + opt_props,
                collision: [0, 26, 32, 26, 32, 32, 0, 32]
            },
            "b_se": {
                props: "2D, Canvas, solid, blue_wall_se, Collision" + opt_props,
                collision: [16, 16, 32, 16, 32, 32, 16, 32]
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
            }
        }
    },
    map_size: {width: 14, height: 10},
    map: [
        [""    , "b_nw"    , "b_n" , "b_n"     , "b_n" , "b_n"     , "b_n" , "b_n" , "b_n" , "b_n" , "b_n" , "b_n" , "b_ne"    , ""     ],
        ["b_nw", "b_nw_nub", "c"   , "c"       , "c"   , "c"       , "c"   , "c"   , "c"   , "c"   , "c"   , "c"   , "b_ne_nub", "b_ne" ],
        ["b_w" , "c"       , "c"   , "c"       , "c"   , "c"       , "c"   , "c"   , "c"   , "c"   , "c"   , "c"   , "c"       , "b_e"  ],
        ["b_w" , "c"       , "c"   , "c"       , "c"   , "c"       , "c"   , "c"   , "c"   , "c"   , "c"   , "c"   , "c"       , "b_e"  ],
        ["b_w" , "c"       , "c"   , "b_se_nub", "b_s" , "b_sw_nub", "c"   , "c"   , "c"   , "c"   , "c"   , "c"   , "c"       , "b_e"  ],
        ["b_w" , "c"       , "c"   , "b_e"     , ""    , "b_w"     , "c"   , "c"   , "c"   , "c"   , "c"   , "c"   , "c"       , "b_e"  ],
        ["b_w" , "c"       , "c"   , "b_ne_nub", "b_n" , "b_nw_nub", "c"   , "c"   , "c"   , "c"   , "c"   , "c"   , "c"       , "b_e"  ],
        ["b_w" , "c"       , "c"   , "c"       , "c"   , "c"       , "c"   , "c"   , "c"   , "c"   , "c"   , "c"   , "c"       , "b_e"  ],
        ["b_sw", "b_sw_nub", "c"   , "c"       , "c"   , "c"       , "c"   , "c"   , "c"   , "c"   , "c"   , "c"   , "b_se_nub", "b_se" ],
        [""    , "b_sw"    , "b_s" , "b_s"     , "b_s" , "b_s"     , "b_s" , "b_s" , "b_s" , "b_s" , "b_s" , "b_s" , "b_se"    , ""     ]
        
    ]
}

window.onload = function() {
    
    
	//start crafty
    // Crafty.init(416, 380);
    Crafty.init(game_map.view.width, game_map.view.height);
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
		player: [2,5],
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
        floor_tile: [6, 1]
	});
	
    function generateGameMap() {
        for (var mx = 0; mx < game_map.map_size.width; mx++) {
            for (var my = 0; my < game_map.map_size.height; my++) {
                
                // get the curren tile
                var tile_id = game_map.map[my][mx];
                if (tile_id !== "") {
                    var tile_data = game_map.tiles.tile_set[tile_id];
                    var tile_e = Crafty.e(tile_data.props).attr({x: mx * game_map.tiles.width, y: my * game_map.tiles.height});
                
                    if (typeof tile_data.collision !== 'undefined') {
                        tile_e.collision(tile_data.collision);
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
					.reel("walk_left", 0, 3, 3)
					.reel("walk_right", 0, 3, 3)
					.reel("walk_up", 0, 3, 3)
					.reel("walk_down", 0, 3, 3)
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
							if(!direction.x && !direction.y) {
								this.pauseAnimation();
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
		
		//create our player entity with some premade components
		player = Crafty.e("2D, Canvas, player, RightControls, Hero, Animate, Collision")
			.attr({x: 192, y: 128, z: 20})
            .collision([0, 0, 32, 0, 32, 32, 0, 32])
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