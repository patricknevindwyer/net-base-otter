 - [x] hallways
 - [x] New avatar
  - [x] smaller hit box
  - [x] animated
 - [x] doors/exits
  - [x] s
  - [x] n
  - [x] e
  - [x] w
  - [x] hall horizontal
 - [x] elbox hallways
  - [x] nw
  - [x] ne
  - [x] sw
  - [x] se
 - [x] compound hit boxes for corners
  - [x] nw
  - [x] ne
  - [x] sw
  - [x] se
 - [x] hall tee
  - [x] n
  - [x] s
  - [x] e
  - [x] w
 - [x] expanded demo level
  - [x] all doors
  - [x] elbows
  - [x] tees
  - [x] interior rooms
 - [x] computers (alternate sprite sheet as well)
  - [x] single height
  - [x] double height
 - [x] storage (alternate sprite sheet)
  - [x] single width
  - [x] double width
  - [x] closed/open
 - [x] nes.css surround
 - [x] entry point
  - [x] tile
  - [x] positioning of player
 - [x] exit tiles
  - [x] e
  - [x] w
  - [x] s
  - [x] n
 - [x] your computer stats
  - [x] layout
  - [x] css
  - [x] javascript modeling
   - [x] cpu
   - [x] storage
   - [x] program list
   - [x] player model
    - [x] credits
 - [x] interaction indicator
  - [x] make 2 sprite map/reel
   - [x] interesting interaction
   - [x] uninteresting interaction
  - [x] make a component
   - [x] check "interesting" vs "uninteresting" when starting component
  - [x] create/destroy when interacting with environment
  
  
 - use [LinkInput](http://craftyjs.com/api/Controllable.html) to define control groups on systems...

Better Screen

 - [x] bigger terminal area
 - [x] resources in screen (need a ui sprite)
  - [x] lower status side hud
  - [x] tie lower stats hud to lower offset boundary
  - [x] add resource/creds update and text
 - [x] alert area in screen
 - [x] height calculated as viewport size
 - [ ] cpu/computer hud (middle)
  - [ ] float middle stats hud vertically justified between upper and lower stats huds
  - [x] disable program list update
  - [x] disable CPU stats update
  - [x] or put in side bar
  
 - [x] side bar in screen
 - [ ] resizing
 - [ ] top stats bar
  - [ ] current location/map name or type
  - [ ] node address(es)
 - [ ] status hud can scroll through messages, each message gets an age, after which it expires
  - [ ] status hud
  - [ ] age/level/message
  - [ ] default is 20 seconds
  - [ ] messages scroll every 5 seconds
  - [ ] make it wider

Update the menu generator:

 - [x] have a stack of menus
 - [-] keep a menu structure for the game at the window level
 - [x] create a better tileset for menus
 - [x] test out text and sprites in menu
 - [x] use keys to navigate menu items
 - [x] esc to exit
 - [ ] move menu manager to window level
 - [ ] enter/space to select
 - [ ] block all player actions when in menus
 - [ ] have a check for being in the menu, and if in menus, quick return from the PlayerInteractions keydown bind
 - [ ] use function pointers for moving through and managing menu state
 - [ ] menu definition structure
  - [ ] menu generator for interacting with basic computer
   - pass in the object def from the map
   - pass in game state
 - [x] menus need titles
 - better menus: https://opengameart.org/content/ui-pack-space-extension
   
Better Maps
 
 - [ ] map generator
  - [ ] big empty box
  - [ ] data center
  - [ ] router/node
  - [ ] office building like 
 - [ ] consolidate tile definitions and map definitions
 - [ ] move map/tile defs to a different file
 
Map Scrolling
  
 - [ ] scrolling 
 
Programs and Actions
 
 - [ ] move stuff out of the Main Scene, into standard crafty defs
 - [ ] basic crypto miner app
 - [ ] interact with computers
  - [ ] model of items in map
   - [ ] type
   - [ ] effect
  - [ ] UI/modal for interaction with computer
 - [ ] install miner
 - [ ] time tick/earning
 - [ ] computer/storage/tile animation
 - [ ] doors? 
  - activate/interact with doors
 - [ ] bots/moving entities
 - [ ] map swapping
 - [ ] tile loads/specs as part of the game_map structure
 - [x] add collision boxes for elbow nubs
 - [ ] collision boxes for doors?
 - [ ] no interactions through walls?
 - [ ] random map generator
 - [ ] home base generator
 - [ ] teleport to home
 - [ ] network map to select destination
 - [ ] elbow corner collision map for nubs
 
 
# Future textures/sprites

[Sci-Fi Interface Textures](https://opengameart.org/content/sci-fi-interface-textures) 