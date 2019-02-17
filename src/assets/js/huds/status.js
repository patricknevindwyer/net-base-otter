/*
    The Status HUD is the status bar that rotates between any current messages the
    player needs to see. Messages of different levels have a different HUD color.
    
    Use with:
        
        var sh = new StatusHud(0, 0); // display at 0, 0
        sh.start();
        sh.info("This is an info message");
    
    Message Levels:
        
        Info
            
            Show an informational message, with a BLUE hud background.

            sh.info("Information message");


        Success
        
            Show status about a successful event, with a GREEN hud background.

            sh.success("It was successful!");


        Warning

            Show a warning message, with a YELLOW background.

            sh.warning("WARNING! WARNING!");

        Error

            Show an error condition, with a RED background.
        
            sh.error("Hooray I'm a llama again! wait.");

*/
class StatusHud {
    constructor(offset_x, offset_y, pixel_width) {
        
        // position control
        this.offset_x = offset_x;
        this.offset_y = offset_y;
        
        // tile width
        // this.width = 15;
        this.width = Math.floor(pixel_width / 32);
        
        // messages
        this.messages = [];
        this.current_message_idx = -1;
        
        // message display control
        this.font_size = 12;
        
        // how often to we change messages?
        this.hud_refresh_interval = 3500;
        
        this.is_refreshing = true;
        
        // sprite tracking
        this.hud_sprites = [];
        this.text_sprite = 0;
        
        this.info("Reticulating splines...");
        this.success("Game started!");
        this.warning("DANGER! DANGER!");
        this.error("Hooray, I'm a llama again! ...wait");
        
    }
    
    /*
        Bind the refresh event, so we trigger our switch between different
        messages as needed.
    */
    start() {
        
        this.is_refreshing = true;
        
        // set a timeout to display again
        setTimeout(this.display.bind(this), 100);
        
    }
    
    restart() {
        
        if (!this.is_refreshing) {
            this.start();
        }
        
    }
    
    /*
        Fill in defaults for a message if they don't already exist
    */
    fillDefaults(msg, extras) {
        
        var defs = _merge({show_max: 5, shown: 0}, extras);
        
        Object.entries(defs).forEach(function (def_ent) {
            if (!_has(msg, def_ent[0])) {
                msg[def_ent[0]] = def_ent[1];
            }
        });
        
        return msg;
    }
    
    /*
        Function: StatusHud.info/1
        Parameters:
            - `msg`: String
    */
    info(msg) {
        
        var msg_payload = {message: msg};
        
        // fill in our default values
        msg_payload = this.fillDefaults(msg_payload, {level: "info"});
        
        // add to our message list
        this.messages.push(msg_payload);
        
        this.restart();
    }
    
    /*
        Function: StatusHud.success/1
        Parameters:
            - `msg`: String
    */
    success(msg) {
        var msg_payload = {message: msg};
        
        // fill in our default values
        msg_payload = this.fillDefaults(msg_payload, {level: "success", show_max: 6});
        
        // add to our message list
        this.messages.push(msg_payload);
        
        this.restart();
    }
    
    /*
        Function: StatusHud.warning/1
        Parameters:
            - `msg`: String
    */
    warning(msg) {
        var msg_payload = {message: msg};
        
        // fill in our default values
        msg_payload = this.fillDefaults(msg_payload, {level: "warning", show_max: 7});
        
        // add to our message list
        this.messages.push(msg_payload);
        
        this.restart();        
    }
    
    warn(msg) {
        this.warning(msg);
    }
    
    /*
        Function: StatusHud.error/1
        Parameters:
            - `msg`: String
    */
    error(msg) {
        var msg_payload = {message: msg};
        
        // fill in our default values
        msg_payload = this.fillDefaults(msg_payload, {level: "error", show_max: 9});
        
        // add to our message list
        this.messages.push(msg_payload);
        
        this.restart();
    }
    
    /*
        Function: display/0
        
        Update the HUD Status display to reflect the current message, if any.
    */
    display() {
        
        // do we have any messages?
        if (this.messages.length == 0) {
            this.current_message_idx = -1;
            this.destroy_hud();
            this.destroy_message();
            this.is_refreshing = false;
            return;
        }
        
        // tick forward our message counter, wrapping around if need be
        this.current_message_idx += 1;
        
        if (this.current_message_idx >= this.messages.length) {
            this.current_message_idx = 0;
        }
        
        // select the message to display
        var message = this.messages[this.current_message_idx];
            
        // update the message shown counter
        message.shown += 1;
        
        // select the background and show
        var hud_color_map = {
            info: "b",
            success: "g",
            warning: "y",
            error: "r"
        }
        var hud_color = hud_color_map[message.level];
        this.show_hud(hud_color);
        
        // show the text
        this.show_message(message.message);
        
        // clean out any messages that have been show often enough
        this.messages = this.messages.filter( msg => msg.shown < msg.show_max);
        
        // set a timeout to display again
        setTimeout(this.display.bind(this), this.hud_refresh_interval);
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
        Function: show_hud/1
        Parameters:
            - `hud_color`: String. One of [b, g, y, e]
    
        Display the HUD background
    */
    show_hud(hud_color) {
        
        this.destroy_hud();
        
        // show the HUD sprites
        for (var hx = 0; hx < this.width; hx++) {
            
            var tt_name = "nw";
            var tb_name = "sw"
            
            if (hx == (this.width - 1)) {
                tt_name = "ne";
                tb_name = "se";
            }
            else if (hx > 0) {
                tt_name = "n";
                tb_name = "s";
            }
            
            // top
            var t_tile = Crafty.e("2D, Canvas, hud_" + hud_color + "_" + tt_name).attr({x: hx * 32 + this.offset_x, y: this.offset_y, z: 100000});
            this.hud_sprites.push(t_tile);
            
            
            // bottom
            var b_tile = Crafty.e("2D, Canvas, hud_" + hud_color + "_" + tb_name).attr({x: hx * 32 + this.offset_x, y: this.offset_y + 32, z: 100000});
            this.hud_sprites.push(b_tile);
            
        }        
    }
    
    /*
        Function: destroy_message/0
        
        Destroy the HUD text
    */
    destroy_message() {
        if (this.text_sprite !== 0) {
            this.text_sprite.destroy();
        }
        
    }
    
    /*
        Function: show_message/1
        Parameters:
            - `msg`: String. HUD Message
    
        Display the text for the current HUD message
    */
    show_message(msg) {
         
        this.destroy_message();
        
        this.text_sprite = Crafty.e("2D, DOM, Text")
            .attr({x: this.offset_x + 40, y: this.offset_y + 8, w: 32 * (this.width - 2)})
            .textFont({type: "Press Start 2P", size: this.font_size + "px"})
            .text(msg);

    }
}