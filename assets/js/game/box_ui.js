function BoxUI() {

}

// ----------------------------
// Question Box Rendering - Used by Question Object
// ----------------------------
BoxUI.prototype.draw_question_box = function(x,y,txt_str){

  txt = new createjs.Text(txt_str, "40px Tw Cen MT", "#000000");

  // round rect box padding
  var x_axis_padding = 40;
  var y_axis_padding = 20;

  // round rect width
  // -- width is global
  var question_box_width = global_width*0.4+80;

  // calculate round box height
  var txt_width = txt.getMeasuredWidth();
  var num_of_lines_needed = Math.ceil(txt_width/(question_box_width - x_axis_padding*2));
  var txt_line_height = txt.getMeasuredLineHeight()+10;
  var txt_height = num_of_lines_needed*txt_line_height;
  txt.set({lineHeight:txt.getMeasuredLineHeight()+10});

  // get rendered round rect
  // -- +5 makes it look better
  var round_rect = this.draw_round_rect_box(question_box_width,txt_height + (y_axis_padding+5)*2);
  round_rect.alpha = 0.8;

  // start rendering text
  txt.x = x_axis_padding;
  txt.y = y_axis_padding;

  // text line width (max length of each line of text in box)
  txt.lineWidth = question_box_width - x_axis_padding*2-60;

  // group the round rect and text
  var group = new createjs.Container();
  group.addChild(round_rect);
  group.addChild(txt);

  // setup group location
  group.x = x;
  group.y = y;

  stage.addChild(group);
  stage.update();

  return group;
}


// ----------------------------
// Dialog Box Rendering - Used by Monster/Hero Object
// ----------------------------
BoxUI.prototype.draw_dialog_box = function(x,y,txt_str){

  var txt = new createjs.Text(txt_str, "bold 35px  Hannotate SC", "#0f40a3");
  var txt_line_height = txt.getMeasuredLineHeight()
  var txt_width = txt.getMeasuredWidth();

  var x_axis_padding = 20;
  var y_axis_padding = 15;

  txt.x = x + x_axis_padding;
  txt.y = y + y_axis_padding;

  var g = new createjs.Graphics();
  w = txt_width + x_axis_padding*2;
  h = txt_line_height + y_axis_padding*3;

  // round rect
  g.setStrokeStyle(0);
  g.beginStroke(createjs.Graphics.getRGB(255,255,255));
  g.beginFill(createjs.Graphics.getRGB(255,255,255));
  g.drawRoundRect(x,y,w,h,10);

  // little triangle
  g.setStrokeStyle(1);
  g.beginStroke(createjs.Graphics.getRGB(255,255,255));

  g.moveTo(x+13,y+h+16); //bottom point
  g.quadraticCurveTo(x+18,y+h+9,x+18,y+h); //left curve up

  g.lineTo(x+36,y+h) //horizontal top line

  //g.moveTo(x+25,y+h);
  g.quadraticCurveTo(x+28,y+h+16,x+13,y+h+16); //right curve down

  var s = new createjs.Shape(g);

  var group = new createjs.Container();
  group.addChild(s);
  group.addChild(txt);

  stage.addChild(group);
  stage.update();
  return group;
}

// ----------------------------
// Base Functions - Used by draw_dialog_box, draw_question_box
// ----------------------------
BoxUI.prototype.draw_round_rect_box = function(w,h){

  var g = new createjs.Graphics();

  // round rect
  g.setStrokeStyle(1);
  g.beginStroke(createjs.Graphics.getRGB(255,255,255));
  g.beginFill(createjs.Graphics.getRGB(255,255,255));

  // x,y,w,h,border-radius
  g.drawRoundRect(0,0,w,h,10);

  var s = new createjs.Shape(g);
  return s;
}

BoxUI.prototype.draw_a_dot = function(x,y){
  var g = new createjs.Graphics();
  g.setStrokeStyle(1); g.beginStroke(createjs.Graphics.getRGB(0,0,0));
  g.beginFill(createjs.Graphics.getRGB(255,0,0));
  g.drawCircle(0,0,10);
  var s = new createjs.Shape(g);
  s.x = x ; s.y = y;
  stage.addChild(s);
  stage.update();
}


// ----------------------------
// Draw Life/Magic Bar -- used by Monster/Hero Obj
// ----------------------------

BoxUI.prototype.update_life_bar = function(old_val, new_val, color, max_bar_width){

  if(old_val==0){
    old_val = 0.01;
  }

  var group = new createjs.Container();
  var scale_raitio = new_val/old_val;

  // draw actual red bar
  var redbar = this.draw_status_bar(0,0,max_bar_width*old_val,18,color, 0);
  var s_redbar = new createjs.Shape(redbar);
  createjs.Tween.get(s_redbar).to({scaleX:scale_raitio}, 1000);

  // draw thick outline on top
  var outline = this.draw_status_bar(0,0,max_bar_width,18,0, 5);
  var s_outline = new createjs.Shape(outline);

  group.addChild(s_redbar,s_outline);
  return group;
}

BoxUI.prototype.draw_status_bar = function(x,y,w,h, Fillcolor, stroke){
  var graphics = new createjs.Graphics();
  if(stroke!==0){
    graphics.setStrokeStyle(stroke);
    graphics.beginStroke(createjs.Graphics.getRGB(0,0,0));

  }
  if(Fillcolor!==0){
    graphics.beginFill(Fillcolor);
  }
  graphics.drawRoundRect(x,y,w,h,10); // x,y,w,h,border-radius
  return graphics;
}
