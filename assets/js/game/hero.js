function Hero(queue,x,y){
  this.queue = queue;
  var breath_config = this.generate_warrior([queue.getResult('warrior_breath')],x,y,2,0.05);
  var attack_config = this.generate_warrior([queue.getResult('warrior_attack')],x,y,4,0.2);
  var move_config = this.generate_warrior([queue.getResult('warrior_move')],x,y,2,0.05);
  var ouch_config = this.generate_warrior([queue.getResult('warrior_ouch')],x,y,2,0.05);
  var pre_attack_config = this.generate_warrior([queue.getResult('warrior_pre_attack')],x,y,3,0.15);
  var end_attack_config = this.generate_warrior([queue.getResult('warrior_end_attack')],x,y,3,0.15);


  this.breath_animation = this.init_bitmap_animation(breath_config);
  this.attack_animation = this.init_bitmap_animation(attack_config);
  this.move_animation = this.init_bitmap_animation(move_config);
  this.ouch_animation = this.init_bitmap_animation(ouch_config);
  this.pre_attack_animation = this.init_bitmap_animation(pre_attack_config);
  this.end_attack_animation = this.init_bitmap_animation(end_attack_config);


  // used for showing and hiding animation(not used anymore)
  this.animation_list = [  this.breath_animation,
                           this.attack_animation,
                           this.move_animation];

  this.x = x;
  this.y = y;
  this.frame_height = breath_config.frames.height;
  this.frame_width = breath_config.frames.width;

  // hero speech box
  this.dialog_box = '';
  // ------------------------
  // Status Bar Config
  // ------------------------
  this.magicbar = '';
  this.lifebar = '';
  this.show_status_bar_background()

  // character meta info
  this.life_percentage = 0;
  this.magic_percentage = 0;
  this.adjust_status_bar_val('life', 1.0);
  this.adjust_status_bar_val('magic', 1.0);

  // means sending hero scope to event listener
  this.attack_animation.addEventListener('animationend',this.return_to_original_pos.bind(this));
  this.pre_attack_animation.addEventListener('animationend',this.play_explode_attack_monster.bind(this));
  this.end_attack_animation.addEventListener('animationend',this.end_attack_response.bind(this));

  this.targetMonster = '';
}

// constructor
Hero.prototype.init_bitmap_animation = function (sprite_config) {

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

// -----------------------
// Animation Toggle
// -----------------------
Hero.prototype.show = function (selected_bitmap_animation) {
  stage.addChild(selected_bitmap_animation);
  stage.update();
}
Hero.prototype.hide = function (selected_bitmap_animation) {
  stage.removeChild(selected_bitmap_animation);
  stage.update();
}

// hero talk box
Hero.prototype.speak = function () {
  stage.removeChild(this.dialog_box);
  var box_ui = new BoxUI();
  var speechBox = box_ui.draw_dialog_box(this.x/2+320,this.y/2-40);
  this.dialog_box = speechBox;
  stage.addChild(speechBox);
  stage.update();
}

// -----------------------
// Life/Magic Bar
// -----------------------
Hero.prototype.get_status_bar_config = function () {
  var status_bar_config = {
    // both
    height: 18,
    stroke: 5,
    max_width:170,
    // // life
    life_bg_darkred: createjs.Graphics.getRGB(110,8,8),
    life_bar_lightred: createjs.Graphics.getRGB(242,17,17),
    life_bar_x: this.x + 170,
    life_bar_y: this.y + 450,
    // magic
    magic_bg_darkblue: createjs.Graphics.getRGB(9,98,102),
    magic_bar_lightblue: createjs.Graphics.getRGB(30,228,249),
    magic_bar_x: this.x + 170,
    magic_bar_y: this.y + 480
  };
  return status_bar_config;
}

Hero.prototype.show_status_bar_background = function () {
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

  // show dark blue layer
  var darkblue = box_ui.draw_status_bar(
                  config.magic_bar_x,
                  config.magic_bar_y,
                  config.max_width,
                  config.height,
                  config.magic_bg_darkblue,
                  config.stroke);
  var s_darkblue = new createjs.Shape(darkblue);
  stage.addChild(s_darkblue,s_darkred);
  stage.update();
}

Hero.prototype.adjust_status_bar_val = function (bar_type, new_percentage) {
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
  }else if(bar_type==='magic'){
    if(this.magicbar){
      stage.removeChild(this.lifebar);
    }
    this.magicbar = box_ui.update_life_bar(this.magic_percentage, new_percentage, config.magic_bar_lightblue, config.max_width);
    this.magicbar.x = config.magic_bar_x;
    this.magicbar.y = config.magic_bar_y;
    stage.addChild(this.magicbar);
    stage.update();
    this.magic_percentage = new_percentage;
  }
}



// -----------------------
// Animation Config
// -----------------------
Hero.prototype.generate_warrior = function (_img,_x,_y, _total_frames, speed){
    var template_config = {
      images: _img,
      frames: {width:1000, height:944},
      animations: {breath:[0,_total_frames-1]},
      animation_move:'breath',
      x:_x,
      y:_y,
      scaleX:0.5,
      scaleY:0.5,
      speed:speed
    };
    return template_config;
}

// -----------------------
// Hero Animation
// -----------------------

// helper function used by move_and_swing_swords
Hero.prototype.set_target_monster = function (target_monster){
  this.targetMonster = target_monster;
}

Hero.prototype.move_and_swing_swords = function (){

  // Monster we are attacking
  // (this) is pointing to a monster object

  var targetM = this;
  hero.set_target_monster(this);

  // disable all monster hover
  targetM.set_monster_hoverbility(false);

  // -- show hero move
  hero.hide(hero.breath_animation);
  hero.show(hero.move_animation);

  // -- move hero to monster
  createjs.Tween.get(hero.move_animation).to({x:targetM.x-400}, 300);
  createjs.Tween.get(hero.move_animation).to({y:targetM.y-230}, 300).call(function(){

    // -- hide monster select animation
    targetM.hide(targetM.select_animation);

    var isAnswerCorrect = question_manager.did_user_get_it_right(targetM);

    if(isAnswerCorrect){
      // monster get attacked
      targetM.show(targetM.pre_ouch_animation);
      targetM.pre_ouch_animation.gotoAndPlay('breath');

      // Play hero swing soward animation
      hero.pre_attack_animation.x = targetM.x-400;
      hero.pre_attack_animation.y = targetM.y-230;
      hero.hide(hero.move_animation);
      hero.show(hero.pre_attack_animation);
      hero.pre_attack_animation.gotoAndPlay('breath');

    }else{
      // monster dodge
      targetM.show(targetM.dodge_animation);
      targetM.dodge_animation.gotoAndPlay('breath');

      // Play hero swing soward animation
      hero.attack_animation.x = targetM.x-400;
      hero.attack_animation.y = targetM.y-230;
      hero.hide(hero.move_animation);
      hero.show(hero.attack_animation);
      hero.attack_animation.gotoAndPlay('breath');
    }
  })
}

Hero.prototype.return_to_original_pos = function(){
  // stop hero attack after 1 iteration
  hero.attack_animation.gotoAndStop(0);
  var targetM = this.targetMonster;

  // show hero move
  hero.hide(hero.attack_animation);
  hero.show(hero.move_animation);

  // hero start moving back to original location
  createjs.Tween.get(hero.move_animation).to({x:hero.x}, 300);
  createjs.Tween.get(hero.move_animation).to({y:hero.y}, 300);
}

Hero.prototype.hit_by_monster = function(){

  // hide hero move
  hero.hide(hero.move_animation);
  hero.show(hero.ouch_animation);


  // putting hero ouch under monster jump
  stage.addChildAt(hero.ouch_animation, stage.getChildIndex(parent.jump_animation));

  // play hero get hit
  hero.ouch_animation.gotoAndStop(1);
  var hit_red = new createjs.Bitmap(queue.getResult('hit_red').src);
  hit_red.x = hero.breath_animation.x+242;
  hit_red.y = hero.breath_animation.y+215;
  hit_red.scaleX = 0.1;
  hit_red.scaleY = 0.1;
  hit_red.alpha = 1;
  var tween = createjs.Tween.get(hit_red)
  .to({scaleX:1.0,scaleY:1.0,x:hero.breath_animation.x+50,y:hero.breath_animation.y+50}, 100)
  .to({alpha:0},200);

  var hit_white = new createjs.Bitmap(queue.getResult('hit_white').src);
  hit_white.x = hero.breath_animation.x+242;
  hit_white.y = hero.breath_animation.y+215;
  hit_white.scaleX = 0.1;
  hit_white.scaleY = 0.1;
  hit_white.alpha = 1;

  var tween = createjs.Tween.get(hit_white)
  .to({scaleX:1.0,scaleY:1.0,x:hero.breath_animation.x+50,y:hero.breath_animation.y+55}, 100)
  .to({alpha:0},200)
  .call(function(){
    hero.ouch_animation.gotoAndStop(1);
    hero.hide(hero.ouch_animation);
    hero.show(hero.breath_animation);

    // hero life dec
    var new_life_percent = hero.life_percentage - 0.25;
    hero.adjust_status_bar_val('life', new_life_percent);
  });



  // putting hit_white under monster_jump
  stage.addChildAt(hit_white, stage.getChildIndex(hero.targetMonster.jump_animation));
  // putting hit_red on top of everyone
  stage.addChild(hit_red);
  stage.update();

  // var box_ui = new BoxUI();
  // box_ui.draw_a_dot(hero.breath_animation.x+265,hero.breath_animation.y+230,255,0,0);
}

Hero.prototype.play_explode_attack_monster = function(){

  // add in hit animation
  var hit_red = new createjs.Bitmap(queue.getResult('hit_red').src);
  hit_red.x = hero.pre_attack_animation.x+390;
  hit_red.y = hero.pre_attack_animation.y+290;
  hit_red.scaleX = 0.1;
  hit_red.scaleY = 0.1;
  hit_red.rotation = -110;
  hit_red.alpha = 1;
  stage.addChild(hit_red);

  var tween = createjs.Tween.get(hit_red)
  .to({scaleX:0.8,scaleY:0.8,x:hero.pre_attack_animation.x+425,y:hero.pre_attack_animation.y+490}, 150)
  .to({alpha:0},200);

  var hit_white = new createjs.Bitmap(queue.getResult('hit_white').src);
  hit_white.x = hero.pre_attack_animation.x+390;
  hit_white.y = hero.pre_attack_animation.y+290;
  hit_white.scaleX = 0.1;
  hit_white.scaleY = 0.1;
  hit_white.alpha = 1;
  hit_white.rotation = -110;
  var tween = createjs.Tween.get(hit_white)
  .to({scaleX:0.8,scaleY:0.8,x:hero.pre_attack_animation.x+425,y:hero.pre_attack_animation.y+490}, 150)
  .to({alpha:0},200);

  stage.addChildAt(hit_white, stage.getChildIndex(hero.pre_attack_animation));
  hero.pre_attack_animation.gotoAndStop(2);
  hero.hide(hero.pre_attack_animation);

  hero.end_attack_animation.x = hero.pre_attack_animation.x;
  hero.end_attack_animation.y = hero.pre_attack_animation.y;
  hero.end_attack_animation.gotoAndPlay('breath');
  hero.show(hero.end_attack_animation);
}

Hero.prototype.end_attack_response = function(){
  hero.end_attack_animation.gotoAndStop(2);
}
