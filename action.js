//Colors the MAZEHOLE gray when it is hovered over.
$('.mazehole').hover(function () {
($('#htmlloc').html (this.id))},
function (){
    $('#htmlloc').html("");
    });

//Selects 2 Random numbers to create an EXIT for the maze on the perimeter.
var xint = 0;
var yint = 0;
var xGoalPos = Math.floor(Math.random() * (14 - 0 + 1)) + 0;
var yGoalPos = Math.floor(Math.random() * (14 - 0 + 1)) + 0;
 $('.GoalPositionX').hover(function (xint) {
     return xGoalPos;    
($('#xGoalPos').html (xGoalPos))},
function (){
    $('#xGoalPos').html(xGoalPos);
    });
 $('.GoalPositionX').hover(function (yint) {
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
//This will color the selected ID ^ a different color to mark it as the exit of the maze.

//$('#').html(function(xGoalPos,yGoalPos){ $("id-" + xGoalPos + "," + yGoalPos).css("background-color", "#FBB");
//});






//This can generate divs programatically
//for(i = 0, i < 15, i++)
//for(j = 0, j < 15, j++)
//divHtml = "<div id =' " + i + ',' + j + " '></div>'
//$('.masterDiv').append(
//divHtml)
