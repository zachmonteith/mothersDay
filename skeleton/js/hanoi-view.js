var HanoiView = function (game, $el) {
  this.game = game;
  this.$el = $el;
  this.setupTowers();
};

HanoiView.prototype.setupTowers = function(){
  var $title = $("<h1>Happy Mother's Day!</h1>");
  var $directions = $("<h3> I have prepared for you a puzzle. Your goal is to move all the disks from the leftmost pile to any other pile, with these two rules: </h3>");
  var $rules = $("<h4> 1. You may only move the top disk on any pile. <br>2. You may not place a larger disk on top of a smaller disk.<br>First click the pile from which you are moving a disk, and then the pile to which you'd like to move it. Good luck!</h4>")
  var $resetButton = $('<form><input type=button value="Click Here to Reset Game" onClick="window.location.reload()"></form>')
  this.$el.append($title);
  this.$el.append($directions);
  this.$el.append($rules);
  this.$el.append($resetButton);
  for (var towerIdx = 0; towerIdx < 4; towerIdx++) {
    var $tower = $("<ul>").attr("id", towerIdx);
    for (var diskIdx = 0; diskIdx < 4; diskIdx++) {
      var $disk = $("<li>");
      $tower.append($disk);
    }
    this.$el.append($tower);
  }
  this.render();
  this.clickTower();
};

HanoiView.prototype.render = function() {
  var gameTowers = this.game.towers;
  for (var towerIdx = 0; towerIdx < 4; towerIdx++){
    var gameTower = gameTowers[towerIdx];
    var $htmlTower = $($("#" + towerIdx.toString()));
    for (var diskIdx = 0; diskIdx < 4; diskIdx++){
      if (gameTower[diskIdx] === undefined){
        $($htmlTower.children("li")[3 - diskIdx]).removeClass();
      } else {
        var $disk = $($htmlTower.children("li")[3 - diskIdx]);
        $disk.addClass("disk-" + gameTower[diskIdx]);
      }
    }
  }
  if(this.game.isWon()){
    var $body = $("body");
    var $h1 = $("h1");
    var $h3 = $("h3");
    $(".disk-1").text("H");
    $(".disk-2").text("AP");
    $(".disk-3").text("PY BIR");
    $(".disk-4").text("THDAY!!!");
    var $disk2
    $("h4").text("");
    $body.addClass("game-over");
    $body.css("background", "lightblue");
    $h1.text("Happy Birthday!!")
    $h3.text("Intelligent birthday mom always solves the puzzle!!!")
    this.$el.append($('<font size="30"><marquee scrollamount="20">You solved it!! High Five!!</font></marquee>'));
    this.$el.append($('<img src="https://s-media-cache-ak0.pinimg.com/736x/c0/14/23/c014230dec32c2eeb133b7b8da072317.jpg" width="240" height="240"><img src="http://soandthus.blogs.com/so_and_thus/images/happy_bear.jpg" width="240" height="240">'))
    $('ul').off("click");
  }
};

HanoiView.prototype.clickTower = function () {
  var moveArray = [];
  var that = this;
  $('ul').on("click", function(e) {
    var $firstTower = $(e.currentTarget);
    $firstTower.addClass("selected");
    moveArray.push($firstTower.attr("id"));
    if (moveArray.length > 1) {
      var boolean = that.game.move(moveArray[0], moveArray[1]);
      if(boolean === false){
        alert("Silly mommy, that's an invalid move! Try again");
      }
      moveArray = [];
      $("ul").removeClass();
    }
    that.render();
  });
};

module.exports = HanoiView;
