


$('.mazehole').hover(function () {
($('#htmlloc').html (this.id))},
function (){
    $('#htmlloc').html("");
    });

var xGoalPos = Math.floor(Math.random() * (14 - 0 + 1)) + 0;
var yGoalPos = Math.floor(Math.random() * (14 - 0 + 1)) + 0;
 $('.GoalPositionX').hover(function () {    
($('#xGoalPos').html (xGoalPos))},
function (){
    $('#xGoalPos').html(xGoalPos);
    });
 $('.GoalPositionY').hover(function () {    
($('#yGoalPos').html (yGoalPos))},
function (){
    $('#yGoalPos').html(yGoalPos);
    });      

    
