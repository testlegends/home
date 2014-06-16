function Monster(monster_index,queue,x,y){
  //console.log('Monster '+monster_index+' is called...');

  // ------------------------
  // animation setup
  // ------------------------
  var breath_config = this.generate_furball([queue.getResult('monster_breath').src],x,y,2,0.05);
  var select_config = this.generate_furball([queue.getResult('monster_select').src],x,y,2,0.05);
  var dodge_config = this.generate_furball_dodge([queue.getResult('monster_dodge').src],x,y,8,0.2);
  var jump_config = this.generate_furball([queue.getResult('monster_jump').src],x,y,2,0.05);
  var landed_config = this.generate_furball([queue.getResult('monster_landed').src],x,y,6,0.15);
  // monster attacked
  var pre_ouch_config = this.generate_furball([queue.getResult('monster_pre_ouch')],x,y,3,0.15);
  var end_ouch_config = this.generate_furball([queue.getResult('monster_end_ouch')],x,y,3,0.15);
  var dead_config = this.generate_furball([queue.getResult('monster_dead').src],x,y,2,0.05);


  this.breath_animation = this.init_bitmap_animation(breath_config);
  this.select_animation = this.init_bitmap_animation(select_config);
  this.dodge_animation = this.init_bitmap_animation(dodge_config);
  this.jump_animation = this.init_bitmap_animation(jump_config);
  this.landed_animation = this.init_bitmap_animation(landed_config);
  // monster attacked
  this.pre_ouch_animation = this.init_bitmap_animation(pre_ouch_config);
  this.end_ouch_animation = this.init_bitmap_animation(end_ouch_config);
  this.dead_animation = this.init_bitmap_animation(dead_config);


  this.monster_index = monster_index;
  this.speechBox = '';
  this.speechWord = '';
  this.isCurrentQuestionCorrect = false;


  // ------------------------
  // mouse event setup
  // ------------------------
  this.isHoverListening = false;
  this.mouse_listener_setup();

  this.x = x;
  this.y = y;
  this.frame_height = breath_config.frames.height;
  this.frame_width = breath_config.frames.width;

  // ------------------------
  // display status bar
  // ------------------------
  this.life_bar_background='';
  this.lifebar = '';
  this.show_status_bar_background();

  // monster meta info
  this.life_percentage = 0;
  this.adjust_status_bar_val('life', 1.0);
}
// ---------------------------------
// constructor
// ---------------------------------
Monster.prototype.init_bitmap_animation = function (sprite_config) {

  var sprite_sheet = new createjs.SpriteSheet({
      images:sprite_config['images'],
      frames: sprite_config['frames'],
      animations:sprite_config['animations']
  });

  var animation = new createjs.Sprite(sprite_sheet);
  animation.spriteSheet.getAnimation(sprite_config['animation_move']).speed = sprite_config['speed'];
  animation.gotoAndPlay(sprite_config['animation_move']);
  animation.x = sprite_config['x'];
  animation.y = sprite_config['y'];
  animation.scaleX = sprite_config['scaleX'];
  animation.scaleY = sprite_config['scaleY'];
  return animation;
}

Monster.prototype.mouse_listener_setup = function () {
  var parent = this;

  // hover start listening
  this.breath_animation.addEventListener('mouseover', this.monster_hover_in.bind(this));
  this.select_animation.addEventListener('mouseout', this.monster_hover_out.bind(this));
  this.select_animation.cursor = 'pointer';
  this.isHoverListening = true;

  // when click: hero will attack this monster
  this.select_animation.addEventListener('click',hero.move_and_swing_swords.bind(this));

  // when monster finish dodging: start jumping
  this.dodge_animation.addEventListener('animationend',this.dodge_animation_attack.bind(this));
  this.landed_animation.addEventListener('animationend',this.return_to_original_pos.bind(this));
  this.pre_ouch_animation.addEventListener('animationend',this.get_hit_by_hero_pre.bind(this));
  this.end_ouch_animation.addEventListener('animationend',this.get_hit_by_hero_end.bind(this));

}

// ---------------------------------
// ---------------------------------
// Monster Animation (DODGE)
// ---------------------------------
// ---------------------------------

Monster.prototype.dodge_animation_config = function(){
  var parent = this;
  var pivot_coordinates = {
    1:[950,100, 1100, 650, 1100,300],
    2:[950,100, 1100, 650, 1400,500],
    3:[950,100, 1100, 650, 1600,650],
    4:[950,200, 1100, 650, 1300,800]
  }
  var pivot = pivot_coordinates[this.monster_index];

  // draw path pivot points (debug use)
  var box_ui = new BoxUI();
  // box_ui.draw_a_dot(pivot[0],pivot[1]);
  // box_ui.draw_a_dot(pivot[2],pivot[3]);
  // box_ui.draw_a_dot(pivot[4],pivot[5]);

  // monster dodge and attack path
  var path_pos_1 = [  parent.breath_animation.x+110,parent.breath_animation.y-100,
                      pivot[0],pivot[1],
                      hero.breath_animation.x+200,hero.breath_animation.y+140];

  var path_pos_2 = [  hero.breath_animation.x+200,hero.breath_animation.y+140,
                      pivot[2],pivot[3],
                      hero.breath_animation.x+530,hero.breath_animation.y+270];

  var path_pos_3 = [  hero.breath_animation.x+530,hero.breath_animation.y+270,
                      pivot[4],pivot[5],
                      parent.breath_animation.x,parent.breath_animation.y];
  return [path_pos_1,path_pos_2,path_pos_3];
}

Monster.prototype.dodge_animation_attack = function(){
  this.dodge_animation.gotoAndStop(7);
  var path_config = this.dodge_animation_config();
  var parent = this;

  parent.hide(parent.dodge_animation);
  parent.show(parent.jump_animation);

  // compensating for rotation x pos change
  parent.jump_animation.x = parent.breath_animation.x+140;
  parent.jump_animation.y = parent.breath_animation.y;

  // monster complete dodge process
  var tween = createjs.Tween.get(parent.jump_animation)
  .to({x:path_config[0][0],y:path_config[0][1],rotation:-20},200) // smooth into rotation
  .to({guide:{path:path_config[0]}}, 300)
  .call(hero.hit_by_monster)
  .to({guide:{path:path_config[1]}}, 300,createjs.Ease.cubicIn)
  .to({rotation:0},100)
  .call(parent.dodge_animation_smile.bind(this));
}

Monster.prototype.dodge_animation_smile = function(){
  var path_config = this.dodge_animation_config();
  var parent = this;

  // hide jump and show smile for one iteration
  parent.hide(parent.jump_animation);
  parent.landed_animation.x = path_config[2][0];
  parent.landed_animation.y = path_config[2][1];
  parent.landed_animation.gotoAndStop(0);
  parent.landed_animation.gotoAndPlay('breath');
  parent.show(parent.landed_animation);
}

Monster.prototype.return_to_original_pos = function(){
  var parent = this;
  this.landed_animation.gotoAndStop(0);
  var path_config = this.dodge_animation_config();

  var tween = createjs.Tween.get(parent.landed_animation)
  .to({guide:{path:path_config[2]}}, 400,createjs.Ease.cubicIn)
  .wait(200)
  .call(function(){

    // show breath
    parent.hide(parent.landed_animation);
    parent.show(parent.breath_animation);

    // unlock hover for all monsters
    parent.set_monster_hoverbility(true);

    question_manager.render_next_question();
  });
}

// ---------------------------------
// ---------------------------------
// Monster Animation (ATTACKED)
// ---------------------------------
// ---------------------------------

Monster.prototype.get_hit_by_hero_pre = function(){
  this.pre_ouch_animation.gotoAndStop(0);
  this.hide(this.pre_ouch_animation);
  this.show(this.end_ouch_animation);
  this.end_ouch_animation.gotoAndPlay('breath');
}

Monster.prototype.get_hit_by_hero_end = function(){

  this.end_ouch_animation.gotoAndStop(0);
  this.hide(this.end_ouch_animation);
  this.show(this.breath_animation);

  hero.hide(hero.end_attack_animation);
  hero.return_to_original_pos();

  // animate blood dec
  var isAnswerCorrect = question_manager.did_user_get_it_right(this);
  if(isAnswerCorrect){
    this.adjust_status_bar_val('life',this.life_percentage-0.5);

    // handle monster death
    if(this.life_percentage===0){
      this.hide(this.breath_animation);
      this.show(this.dead_animation);
      this.dead_animation.gotoAndStop(0);
      this.dead_animation.regX= 200;
      this.dead_animation.regY = 147;

      var flyout_path = [ this.dead_animation.x+150,this.dead_animation.y+150,
                          this.dead_animation.x+400, this.dead_animation.y-200,
                          this.dead_animation.x+600,this.dead_animation.y+120];

      // var box_ui = new BoxUI();
      // box_ui.draw_a_dot(flyout_path[0],flyout_path[1]);
      // box_ui.draw_a_dot(flyout_path[2],flyout_path[3]);
      // box_ui.draw_a_dot(flyout_path[4],flyout_path[5]);

      // animate monster dead and puff
      var tween = createjs.Tween.get(this.dead_animation)
      .to({guide:{path:flyout_path}, rotation:360},500)
      .call(this.play_dead_out_and_puff.bind(this))
      .wait(500)
      .to({alpha:0},1000);


      this.remove_monster();
    }
  }

  question_manager.render_next_question();

  // unlock monster
  this.set_monster_hoverbility(true);
}


Monster.prototype.play_dead_out_and_puff = function(){
  var p = this;
  p.dead_animation.gotoAndStop(1);

  var puff0 = new createjs.Bitmap(queue.getResult('puff_0').src);
  var puff1 = new createjs.Bitmap(queue.getResult('puff_1').src);
  var puff2 = new createjs.Bitmap(queue.getResult('puff_2').src);
  var puff3 = new createjs.Bitmap(queue.getResult('puff_3').src);
  var puff4 = new createjs.Bitmap(queue.getResult('puff_4').src);
  var puff_list = [puff0,puff1,puff2,puff3,puff4];
  var time_list = [180,480,330,480,330];
  var expand_list = [150,200,150,200,150];

  for(var i=0;i<puff_list.length;i++){
    puff_list[i].x = p.x+580;
    puff_list[i].y = p.y+180;
    puff_list[i].scaleX = 0.1;
    puff_list[i].scaleY = 0.1;
    puff_list[i].alpha = 1;
    var tween = createjs.Tween.get(puff_list[i])
    .to({scaleX:0.7,scaleY:0.7,x:p.x+430,y:p.y+20}, expand_list[i])
    .to({alpha:0},time_list[i]);
  }

  var puff_back = new createjs.Bitmap(queue.getResult('puff_back').src);
  puff_back.x = p.x+580;
  puff_back.y = p.y+180;
  puff_back.scaleX = 0.1;
  puff_back.scaleY = 0.1;
  puff_back.alpha = 1;
  var tween = createjs.Tween.get(puff_back)
  .to({scaleX:0.7,scaleY:0.7,x:p.x+430,y:p.y+20}, 150)
  .to({alpha:0},180);
  stage.addChildAt(puff_back, stage.getChildIndex(p.dead_animation));

  stage.addChild(puff0,puff1,puff2,puff3,puff4);
}


// ----------------------------
// Mouse Hover Listener: didn't get removeEventListener doesn't work, otherwise I will use it.
// ----------------------------
Monster.prototype.monster_hover_in = function () {
  console.log('hover in');
  var parent = this; // parent is monster scope we passed in
  if(this.isHoverListening===true){
    for(var i=0;i<monster_list.length;i++){
      monster_list[i].hide(monster_list[i].select_animation);
      monster_list[i].show(monster_list[i].breath_animation);
    }
    parent.hide(parent.breath_animation);
    parent.show(parent.select_animation);
  }
}

Monster.prototype.monster_hover_out = function () {
  var parent = this; // parent is monster scope we passed in
  if(this.isHoverListening){
    parent.show(parent.breath_animation);
    parent.hide(parent.select_animation);
  }
}

Monster.prototype.set_monster_hoverbility = function (action) {
  for(var i=0;i<monster_list.length;i++){
    monster_list[i].isHoverListening = action;
  }
}

// ----------------------------
// Animation Toggle(Hide/Show)
// ----------------------------

// add from stage
Monster.prototype.show = function (selected_bitmap_animation) {
  stage.addChild(selected_bitmap_animation);
  stage.update();
}
Monster.prototype.hide = function (selected_bitmap_animation) {
  stage.removeChild(selected_bitmap_animation);
  stage.update();
}


// ----------------------------
// Animation Init Config
// ----------------------------

// basic config template for monsters
Monster.prototype.generate_furball = function (_img,_x,_y, _total_frames,_speed){
    template_config = {
      images: _img,
      framerate: 20,
      frames: {width:400, height:294},
      animations: {breath:[0,_total_frames-1,'breath',10]},
      animation_move:'breath',
      x:_x,
      y:_y,
      scaleX:0.7,
      scaleY:0.7,
      speed:_speed
    };
    return template_config;
}

Monster.prototype.generate_furball_dodge = function (_img,_x,_y, _total_frames,_speed){
    template_config = {
      images: _img,
      framerate: 20,
      frames: {width:600, height:294},
      animations: {breath:[0,_total_frames-1,'breath',10]},
      animation_move:'breath',
      x:_x,
      y:_y,
      scaleX:0.7,
      scaleY:0.7,
      speed:_speed
    };
    return template_config;
}

// ----------------------------
// Question Answer Box
// ----------------------------

Monster.prototype.answer_box = function (option_text) {
  var box_ui = new BoxUI();
  if(this.speechBox){
    this.speechBox.alpha=1;
    var tween = createjs.Tween.get(this.speechBox)
    .to({alpha:0},100);
    stage.removeChild(this.speechBox);
    stage.update();
    setTimeout( this.animate_monster_answer_box(option_text), 3000 );
  }else{
    //console.log('never here');
    this.animate_monster_answer_box(option_text);
  }
};

Monster.prototype.animate_monster_answer_box = function(option_text){
  var box_ui = new BoxUI();
  this.speechWord = option_text;
  this.speechBox = box_ui.draw_dialog_box(this.x+global_width*0.085,this.y-global_height*0.065,option_text);

  this.speechBox.alpha=0;
  var tween = createjs.Tween.get(this.speechBox)
  .to({alpha:1},100);

  stage.addChild(this.speechBox);
  stage.update();
};

// -----------------------
// Life/Magic Bar
// -----------------------
Monster.prototype.get_status_bar_config = function () {
  var status_bar_config = {
    // both
    height: 18,
    stroke: 5,
    max_width:170,
    // // life
    life_bg_darkred: createjs.Graphics.getRGB(110,8,8),
    life_bar_lightred: createjs.Graphics.getRGB(242,17,17),
    life_bar_x: this.x+55,
    life_bar_y: this.y+210
  };
  return status_bar_config;
}

Monster.prototype.show_status_bar_background = function () {
  var box_ui = new BoxUI();
  var config = this.get_status_bar_config();

  // show dark red layer
  var darkred = box_ui.draw_status_bar(
                  config.life_bar_x,
                  config.life_bar_y,
                  config.max_width,
                  config.height,
                  config.life_bg_darkred,
                  config.stroke);
  var s_darkred = new createjs.Shape(darkred);
  this.life_bar_background = s_darkred;

  stage.addChild(s_darkred);
  stage.update();
}

Monster.prototype.adjust_status_bar_val = function (bar_type, new_percentage) {
  var box_ui = new BoxUI();
  var config = this.get_status_bar_config();
  if(bar_type==='life'){
    if(this.lifebar){
      stage.removeChild(this.lifebar);
    }
    this.lifebar = box_ui.update_life_bar(this.life_percentage, new_percentage, config.life_bar_lightred, config.max_width);
    this.lifebar.x = config.life_bar_x;
    this.lifebar.y = config.life_bar_y;
    stage.addChild(this.lifebar);
    stage.update();
    this.life_percentage = new_percentage;
  }
}

// -----------------------
// Remove Monster
// -----------------------
Monster.prototype.remove_monster = function () {

  // remove life bar
  var tween = createjs.Tween.get(this.life_bar_background)
  .to({alpha:0},500);
  var tween = createjs.Tween.get(this.lifebar)
  .to({alpha:0},500);

  // remove monster from list
  var idx = _.indexOf(monster_list,this);
  monster_list.splice(idx, 1);

  // remove speech box
  var tween = createjs.Tween.get(this.speechBox)
  .to({alpha:0},500);
}
