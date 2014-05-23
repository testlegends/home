// Timer Global Variable
timer_activate_flag = 1;
question_total_time = 20;
question_remain_time = 20;

// Timer Function
setInterval(timer, 1000);

// Deduct time by one sec
function timer(){

  // // Time run out

	// only deduct time if time flag is 1
	if (timer_activate_flag==1){
		// deduct time
		total_time = question_total_time;
		curr_time = question_remain_time;
		curr_time = curr_time -1;
		curr_time = Math.max(curr_time, 0);
		question_remain_time = curr_time;

		// New
		render_timer(curr_time,total_time)
	}
}


function stop_timer(){
	timer_activate_flag = 0;
}

function reset_timer(){
	question_remain_time = question_total_time;
	render_timer(question_remain_time,question_total_time);
	timer_activate_flag = 1;
}

// ------------------------------------

// Canvas Timer

// ------------------------------------
function render_timer(remain_seconds, total_seconds){

  // circle position
  var main_x = global_width*0.675;
  var main_y = global_height*0.03;
  var base_radius = 89;

  // group
  var group = new createjs.Container();

  // ----------------
  // Outter circle behind the clock
  // ----------------
  var g = new createjs.Graphics();
  g.setStrokeStyle(1);
  g.beginStroke(createjs.Graphics.getRGB(255,227,5));
  g.beginFill(createjs.Graphics.getRGB(255,227,5));
  g.drawCircle(0,0,base_radius*1.15);

  var s = new createjs.Shape(g);
  s.x = main_x+base_radius;
  s.y = main_y+base_radius;

  group.addChild(s);


  // ----------------
  // Inner circle for the clock
  // ----------------
	yellow_portion = Math.floor(parseFloat(remain_seconds)/parseFloat(total_seconds)*360);
	white_portion = Math.floor(parseFloat(total_seconds-remain_seconds)/parseFloat(total_seconds)*360);

	var data = [white_portion, yellow_portion];
	var colors = [createjs.Graphics.getRGB(255,227,5), createjs.Graphics.getRGB(255,255,255)];

	var g = new createjs.Graphics();

	for (var i = 0; i < data.length; i++) {
    	drawSegment(g, i, data, colors, main_x, main_y, base_radius);
	}
  var s = new createjs.Shape(g);
  s.x = main_x;
  s.y = main_y;
  group.addChild(s);


  // update countdown
  var text_size = String(base_radius*1.1)+'px';

  if(remain_seconds/10<1.0){
    var text = new createjs.Text(String(remain_seconds), text_size+"  Showcard Gothic", "#000000");
    text.x = main_x+base_radius*2*0.35;
    text.y = main_y+base_radius*2*0.7;
    text.textBaseline = "alphabetic";
    group.addChild(text);
  }else{
    var text = new createjs.Text(String(remain_seconds), text_size+"  Showcard Gothic", "#000000");
    text.x = main_x+base_radius*2*0.25;
    text.y = main_y+base_radius*2*0.7;
    text.textBaseline = "alphabetic";
    group.addChild(text);
  }


  stage.addChild(group);
  stage.update();

  // context.font="60px Showcard Gothic";
  //
	// if(remain_seconds/10<1.0){
	// 	context.fillText(String(remain_seconds),27,70);
	// }else{
	// 	context.fillText(String(remain_seconds),16,70);
	// }
}

function drawSegment(g, i, data, colors,x,y, base_radius) {

    var clock_width = base_radius;

    var centerX = Math.floor(clock_width);
    var centerY = Math.floor(clock_width);
    radius = Math.floor(clock_width);

    // angle hack -> used to start at 45 deg
    // now it starts at 0 deg
    start_angle_input = sumTo(data, i) - 90;
    if (start_angle_input<0){
    	start_angle_input = start_angle_input + 360;
    }


    var startingAngle = degreesToRadians(start_angle_input);
    var arcSize = degreesToRadians(data[i]);
    var endingAngle = startingAngle + arcSize;

    g.setStrokeStyle(1);
    g.beginFill(colors[i]);
    g.moveTo(centerX, centerY);
    g.arc(centerX, centerY, radius,startingAngle, endingAngle, false);
    g.closePath();

    // var s = new Shape(g);
    // s.x = x;
    // s.y = y;
    // stage.addChild(s);
    // stage.update();

}

function degreesToRadians(degrees) {
    return (degrees * Math.PI)/180;
}
function sumTo(a, i) {
    var sum = 0;
    for (var j = 0; j < i; j++) {
      sum += a[j];
    }
    return sum;
}
