
$('.mazehole').hover(function () {
($('#htmlloc').html (this.id))},
function (){
    $('#htmlloc').html("");
    });
var xint = 0;
var yint = 0;
var xGoalPos = Math.floor(Math.random() * (14 - 0 + 1)) + 0;
var yGoalPos = Math.floor(Math.random() * (14 - 0 + 1)) + 0;
 $('.GoalPositionX').hover(function () {
     return xGoalPos;    
($('#xGoalPos').html (xGoalPos))},
function (xint){
    $('#xGoalPos').html(xGoalPos);
    });
 $('.GoalPositionY').hover(function () {
     if (yGoalPos >= 6){
         yGoalPos = 14
         return yGoalPos;
     } 
     else {
     (yGoalPos = 0)
     return yGoalPos;
     ;}
($('#yGoalPos').html (yGoalPos))},
function (yint){
    $('#yGoalPos').html(yGoalPos);
    });      


