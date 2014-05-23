//-----------------------------------------------------------------------------
// Questions.js
//
// Manage our question list
//-----------------------------------------------------------------------------

// --------------------------
// Constructor
// --------------------------
var Questions = function (x,y) {
  this.x = x,
  this.y = y,

  this.current_question = '',
  this.current_question_text = '',

  this.question_list = [
    {
      'Question':"On 11th december 1936 the king ________d in favor of his brother, the Duke of York, who became George VI.",
      'Answer':'abdicate',
      'Options':['abdicate','aberration','abash','abhor']
    },
    {
      'Question':"We should all _____ the illegal importing of fish, as they pose a great risk of disease to our existing fish stocks.",
      'Answer':'abhor',
      'Options':['abdicate','aberration','abash','abhor']
    },
    {
      'Question':"Naturally, I was rather _____ed at the prospect of meeting a couple who have taken such an interest in me and the college.",
      'Answer':'abash',
      'Options':['abdicate','aberration','abash','abhor']
    },
    {
      'Question':"Far from being an __________, advancing technology today is more like the new normal.",
      'Answer':'aberration',
      'Options':['abate','abhor','aberration','abdicate']
    },
    {
      'Question':"The villagers would rather support the council's objective of delivering 500 affordable homes whilst minimizing effort on ultimately ________ schemes that might never be completed.",
      'Answer':'abortive',
      'Options':['abdicate','abortive','abhor','abstract']
    },
    {
      'Question':"This ________ beginner's guide to tic tac toe is designed so simple that even a caveman could use it.",
      'Answer':'absolute',
      'Options':['absolute','absolve','abysmal','aberration']
    },
    {
      'Question':"Mr. Jobling stood wringing his hands helplessly, his flaccid features expressive of ______ despair.",
      'Answer':'abject',
      'Options':['abject','abdicate','abate','abnegate']
    },
  ];

  this.render_next_question();
}

Questions.prototype.render_next_question = function () {
  var box_ui = new BoxUI();
  var next_q = this.question_list.pop();

  // dealing with question
  if (this.current_question){
    stage.removeChild(this.current_question);
  }
  this.current_question = box_ui.draw_question_box(global_width*0.28,global_height*0.042,next_q.Question);
  this.current_question_text = next_q;

  // dealing with options (handle monster dead)
  var idx = _.indexOf(next_q.Options, next_q.Answer);
  next_q.Options.splice(idx,1);
  var newlist = [next_q.Answer];
  for(var i=0;i<monster_list.length-1;i++){
      newlist.push(next_q.Options[i]);
  }
  newlist = _.shuffle(newlist);

  for(var i=0;i<monster_list.length;i++){
    monster_list[i].answer_box(newlist[i]);
  }

  // reset timer
  reset_timer();

}

Questions.prototype.did_user_get_it_right = function (targetM) {
  var select_w = targetM.speechWord;
  var answer_w = this.current_question_text.Answer;
  return (select_w===answer_w);
  // return true;
}
