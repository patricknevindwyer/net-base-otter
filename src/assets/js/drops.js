class Drops {
    
    constructor() {
        this.drop_list = [];
    }
    
    addDrop(x, y) {
        
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
            return [];
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
        
    }
    
    
}