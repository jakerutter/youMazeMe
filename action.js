


$('.mazehole').hover(function () {
($('#htmlloc').html (this.id))},
function (){
    $('#htmlloc').html("");
    });

   
 $('.GoalPositionX').hover(function () {
  var xGoalPos = Math.floor(Math.random() * (14 - 0 + 1)) + 0;    
($('#xGoalPos').html (xGoalPos))},
function (){
    $('#xGoalPos').html("");
    });   

    
