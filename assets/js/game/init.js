var stage;
var contentManager;
var hero;
var monster_list = [];
var question_manager;

function preload() {
  // init canvas
  canvas = document.getElementById('EpicGame');
  // init stage
  stage = new createjs.Stage(canvas);

  stage.enableMouseOver();

  // monster circular path config
  createjs.MotionGuidePlugin.install(createjs.Tween);

  // load queue
  contentManager = new ContentManager(stage,PositionAssets);

  // init ticker
  // createjs.Ticker.setFPS(30);
  // createjs.Ticker.addEventListener('tick',stage);
  createjs.Ticker.setFPS(60);
  createjs.Ticker.addEventListener("tick", function (e) {
    if (!e.paused) {
       stage.update();
    }
  });
}

function PositionAssets(){

  // background
  queue = contentManager.queue;

  // var background = new createjs.Bitmap(queue.getResult('mockup_hit').src);
  var background = new createjs.Bitmap(queue.getResult('background_official').src);

  //stage.addChild(background);
  //stage.update();

  // hero
  hero = new Hero(queue,global_width*0.2,global_height*0.27);
  hero.show(hero.breath_animation);


  // monster
  var monster_1 = new Monster(1,queue,global_width*0.55,global_height*0.28);
  monster_1.show(monster_1.breath_animation);

  var monster_2 = new Monster(2,queue,global_width*0.67, global_height*0.38);
  monster_2.show(monster_2.breath_animation);

  var monster_3 = new Monster(3,queue,global_width*0.715, global_height*0.58);
  monster_3.show(monster_3.breath_animation);

  var monster_4 = new Monster(4,queue,global_width*0.555, global_height*0.635);
  monster_4.show(monster_4.breath_animation);

  monster_list = [monster_1,monster_2,monster_3,monster_4];

  // question
  question_manager = new Questions(global_width*0.28, global_height*0.042);
}


// Sample Code
// var image = new Image();
// image.src = 'assets/monster-breath.png';
// var image = queue.getResult('monster_breath');
//
// var ss = new createjs.SpriteSheet({
// 	  images:[image],
// 	  //images:['assets/monster-breath.png'],
// 	  frames: {width:200, height:147},
// 	  animations:{blink:[0,1]}
// });
// var star = new createjs.Sprite(ss);
// star.spriteSheet.getAnimation('blink').speed = 0.01;
// star.gotoAndPlay('blink');
// star.x = 100;
// star.y = 100;
// stage.addChild(star);
//
// stage.update()

// var breath_config = config.generate_warrior(["/images/hubert/Warrior-breath.png"],x,y,2);
// var attack_config = config.generate_warrior(["/images/hubert/Warrior-attack.png"],x,y,4);
// var move_config = config.generate_warrior(["/images/hubert/Warrior-move.png"],x,y,2);
// hero_1 = new Hero(breath_config,attack_config,move_config);
// hero_1.show(hero_1.breath_animation);
// hacklifebar = Dbox.draw_life_bar(x+88,y+226);
