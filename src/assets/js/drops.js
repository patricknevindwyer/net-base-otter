class Drops {
    
    constructor() {
        this.drop_list = [];
    }
    
    /*
        Add a credits drop. If type is undefined, it will default to BRONZE.
    
        # Examples
    
            credits("bronze", 200, 150)
            credits("gold", 120, 300)
            credits("silver", 100, 300)
    */
    credits(t, x, y) {
        
        var sprite_base = "bronze";
        var reel_base = "Bronze";
        var value = 1;
        
        if (t === "silver") {
            sprite_base = "silver";
            reel_base = "Silver";
            value = 25;
        }
        else if (t === "gold") {
            sprite_base = "gold";
            reel_base = "gold";
            value = 100;
        }

        // create the sprite for the drop
        var drop  = Crafty.e("2D, Canvas, SpriteAnimation, " + sprite_base + "_1, drop")
        .reel(reel_base + "Drop", 600, [sprite_base + "_2", sprite_base + "_3", sprite_base + "_4", sprite_base + "_5", sprite_base + "_6", sprite_base + "_1"])
        .animate(reel_base + "Drop", -1)
        .attr({x: x, y: y, z: 100000});
        
        this.drop_list.push(
            {
                x: x,
                y: y,
                sprite: drop,
                value: value,
                name: sprite_base + " coin",
                type: "credits"
            }
        )
        
        
    }
    
    /*
        Add a data drop. The payload should contain, at the least:
            
            {
                sprite: {
                    sprite_base: "default",
                    sprite_count: 6,
                    reel_base: "Default",
                },
                name: "default data",
                id: "default-data-level-1"
            }
    
        The entire data payload will be returned as part of sprite matching. Data drops
        are processed by the inventory handler.
    
        The `name` field is the human readable, nice name, for the data.
    
        The `id` field is the type and level of the data. Items with the same ID can be stacked,
        while items with different IDs cannot. The ID is used to denote the different between, say,
        the different levels/quantities of different data items.
    */
    data(payload, x, y) {

        // build out the sprites we'll use for animation
        var reel_sprites = [];
        var reel_name = "Data" + payload.sprite.reel_base + "Drop";
        
        for (var i = 2; i <= payload.sprite.sprite_count; i++) {
            reel_sprites.push(payload.sprite.sprite_base + "_drop_" + i);
        }
        reel_sprites.push(payload.sprite.sprite_base + "_drop_1");
        
        var drop = Crafty.e("2D, Canvas, SpriteAnimation, drop, " + payload.sprite.sprite_base + "_drop_1");
        drop.reel(reel_name, 600, reel_sprites);
        drop.animate(reel_name, -1);
        drop.attr({x: x, y: y, z: 100000});
        
        this.drop_list.push(
            {
                x: x,
                y: y,
                sprite: drop,
                name: payload.name,
                type: "data"
            }
        )
        
    }
    
    addDrop(x, y, props, data) {
        
        // create the sprite for the drop
        var drop  = Crafty.e("2D, Canvas, SpriteAnimation, bronze_1, drop")
        .reel("BronzeDrop", 600, ["bronze_2", "bronze_3", "bronze_4", "bronze_5", "bronze_6", "bronze_1"])
        .animate("BronzeDrop", -1)
        .attr({x: x, y: y, z: 100000});
        
        this.drop_list.push(
            {
                x: x,
                y: y,
                sprite: drop,
                value: 1,
                name: "bronze coin",
                type: "credits"
            }
        )
    }
    
    /*
        Convert from a sprite entity (like those found during MBR/SAT hit testing) into
        a drop entity.
    
        # Examples
            
            getDropFromEntity(Crafty.e());
            > {x, y, sprite, value, name, type}
    
    */
    getDropFromEntity(e) {
        var ents = this.drop_list.filter( dl => dl.sprite == e);
        
        if (ents.length == 0) {
            return undefined;
        }
        else {
            return ents[0];
        }
    }
    
    /*
        Take an item drop (like the drop retrieved with getDropFromEntity) and collect it. This will:
    
          1. Remove the sprite
          2. Process the drop contents
    */
    collectDrop(d) {
        
        // filter out the drop
        this.drop_list = this.drop_list.filter( dl => dl !== d);

        // destroy the sprite
        d.sprite.destroy();
        
        // process the drop data
        if (d.type === "credits") {
            // player got credits
            window.game_state.player.credits += d.value;
            
            // set a window update trigger
            setTimeout(updateGameState, 100);
        }
        else if (d.type === "data") {
            
            // picking up some data for the inventory
            console.log("picked up some data");
        }
        
    }
    
    
}