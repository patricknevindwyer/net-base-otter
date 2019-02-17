
// Game Map
var game_map = {
    view: {width: 500, height: 600},
    tile_set: "blue",
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