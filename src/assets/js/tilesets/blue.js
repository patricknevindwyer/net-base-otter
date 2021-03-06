var opt_props = ""; //", SolidHitBox";

window.tile_sets.blue = {
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
    }
}