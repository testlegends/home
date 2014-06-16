//-----------------------------------------------------------------------------
// ContentManager.js
//
// Used to download all needed resources from our
// webserver
//-----------------------------------------------------------------------------

// --------------------------
// Constructor
// --------------------------
// callback -> game start function
var ContentManager = function (stage,callback) {

  // -- Assets List
  // All the Images & Sounds of our game
  this.queue = {};

  // All Assets Manifest
  this.manifest = [
    {id:"background_forest_backbone", src:"images/game/background_forest_backbone.png"},
    {id:"background_official", src:"images/game/background_official.png"},
    {id:"mockup_high_res", src:"images/game/mockup_high_res.png"},
    {id:"mockup_trajectory", src:"images/game/mockup_trajectory.png"},
    {id:"mockup_hit", src:"images/game/mockup_hit.png"},

    {id:"warrior_breath", src:"images/game/Warrior-breath.png"},
    {id:"warrior_attack", src:"images/game/Warrior-attack.png"},
    {id:"warrior_move", src:"images/game/Warrior-move.png"},
    {id:"warrior_ouch", src:"images/game/Warrior_ouch.png"},

    {id:"warrior_pre_attack", src:"images/game/Warrior_pre_attack.png"},
    {id:"warrior_end_attack", src:"images/game/Warrior_end_attack.png"},


    {id:"hit_red", src:"images/game/hit_red.png"},
    {id:"hit_white", src:"images/game/hit_white.png"},

    {id:"monster_breath", src:"images/game/monster-breath.png"},
    {id:"monster_attacked", src:"images/game/monster-ouch.png"},
    {id:"monster_select", src:"images/game/monster-breathe-select.png"},
    {id:"monster_landed", src:"images/game/monster-landed.png"},
    {id:"monster_jump", src:"images/game/monster-jump.png"},
    {id:"monster_dodge", src:"images/game/monster-dodge.png"},
    {id:"monster_dead", src:"images/game/monster_dead.png"},
    {id:"monster_pre_ouch", src:"images/game/monster_pre_ouch.png"},
    {id:"monster_end_ouch", src:"images/game/monster_end_ouch.png"},

    {id:"puff_back", src:"images/game/puff_back.png"},
    {id:"puff_0", src:"images/game/puff0.png"},
    {id:"puff_1", src:"images/game/puff1.png"},
    {id:"puff_2", src:"images/game/puff2.png"},
    {id:"puff_3", src:"images/game/puff3.png"},
    {id:"puff_4", src:"images/game/puff4.png"},



  ];

  // -- Preload Helper
  this.totalLoaded = 0;
  // -- Game Start
  this.game_start = callback;

  this.initialize();

}


ContentManager.prototype.initialize = function (){

  // -- Preload Helper
  var parent = this;

  // --------------------------
  // Preload Helpers
  // note: (this) is not ContentManager anymore
  // this is in the Preload world for these functions
  // --------------------------
  handleProgress = function (event){
    //console.log('Progress: '+String(event.loaded));
  };

  handleComplete = function(event)
  {
    //console.log('ContentManager - Finish Loading!!!!');
    parent.game_start();
  };

  this.queue = new createjs.LoadQueue();
  this.queue.installPlugin(createjs.Sound);
  this.queue.addEventListener("complete", handleComplete);
  this.queue.addEventListener("progress", handleProgress);
  this.queue.loadManifest(this.manifest);
}
