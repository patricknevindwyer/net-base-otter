function load_game_sprites() {
    // SPRITE LOADING
    Crafty.sprite(32, "assets/img/hud.png",
        {
            // Green / Success HUD
            hud_g_nw: [3, 3],
            hud_g_n: [4, 3],
            hud_g_ne: [5, 3],
            hud_g_w: [3, 4],
            hud_g_c: [4, 4],
            hud_g_e: [5, 4],
            hud_g_sw: [3, 5],
            hud_g_s: [4, 5],
            hud_g_se: [5, 5],

            // Blue / Info HUD
            hud_b_nw: [3, 0],
            hud_b_n: [4, 0],
            hud_b_ne: [5, 0],
            hud_b_w: [3, 1],
            hud_b_c: [4, 1],
            hud_b_e: [5, 1],
            hud_b_sw: [3, 2],
            hud_b_s: [4, 2],
            hud_b_se: [5, 2],

            // Yellow / Warn HUD
            hud_y_nw: [0, 3],
            hud_y_n: [1, 3],
            hud_y_ne: [2, 3],
            hud_y_w: [0, 4],
            hud_y_c: [1, 4],
            hud_y_e: [2, 4],
            hud_y_sw: [0, 5],
            hud_y_s: [1, 5],
            hud_y_se: [2, 5],
            
            // Red / Error HUD
            hud_r_nw: [0, 0],
            hud_r_n: [1, 0],
            hud_r_ne: [2, 0],
            hud_r_w: [0, 1],
            hud_r_c: [1, 1],
            hud_r_e: [2, 1],
            hud_r_sw: [0, 2],
            hud_r_s: [1, 2],
            hud_r_se: [2, 2],
            
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
            hud_stats_se: [8, 5],
            
            inventory_gray: [1, 6],
            inventory_red: [0, 6],
            inventory_blue: [2, 6],
            inventory_yellow: [1, 7],
            inventory_green: [0, 7]
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
    });
    
    Crafty.sprite(16, "assets/img/drops_16x16.png", {
        bronze_1: [0, 0],
        bronze_2: [1, 0],
        bronze_3: [2, 0],
        bronze_4: [3, 0],
        bronze_5: [4, 0],
        bronze_6: [5, 0],
        silver_1: [0, 1],
        silver_2: [1, 1],
        silver_3: [2, 1],
        silver_4: [3, 1],
        silver_5: [4, 1],
        silver_6: [5, 1],
        gold_1: [0, 2],
        gold_2: [1, 2],
        gold_3: [2, 2],
        gold_4: [3, 2],
        gold_5: [4, 2],
        gold_6: [5, 2],
        default_drop_1: [0, 3],
        default_drop_2: [1, 3],
        default_drop_3: [2, 3],
        default_drop_4: [3, 3],
        default_drop_5: [4, 3],
        default_drop_6: [5, 3],

    })
}