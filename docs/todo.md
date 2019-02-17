
  
 - use [LinkInput](http://craftyjs.com/api/Controllable.html) to define control groups on systems...



Usability Updates

 - [ ] handle window/viewport resizing
 
Update the menu generator:

 - [x] generateGameMap
  - [x] change name to renderGameMap
  - [x] pass map to function
 - [x] move tile set to top level tile set by name (blue)
 - [x] extract tile set from game map
 - move demo map into a generator
 - use a generator to create the global game map at scene start
  - could we totally bypass using the global game_map?
 - add empty room generator
 - move tile set sprite loader into functions for tile set
 - [x] each map should specify the tile set
 
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