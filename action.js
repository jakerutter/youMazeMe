//Colors the MAZEHOLE gray when it is hovered over.
$('.mazehole').hover(function () {
($('#htmlloc').html (this.id))},
function (){
    $('#htmlloc').html("");
    });

//Create a random number to determine if the maze will orient and constrain the Entry and Exit
//vertically or horizontally away from one another.
var upAndDown = true;

var Orientation = Math.floor(Math.random()*2);
if (Orientation >= 1)
    { upAndDown = true;}
else
    { upAndDown = false;}
//Selects 2 Random numbers to create and ENTRY & EXIT for the maze on the perimeter.
if (upAndDown)
    {
    var xGoalPos = Math.floor(Math.random() * (14 - 0 + 1)) + 0;
    var yGoalPos = Math.floor(Math.random());
        if (yGoalPos >=.5)
            {yGoalPos = 14;}
        else 
            {yGoalPos = 0;}
    var xEntryPos = Math.floor(Math.random() * (14 - 0 + 1)) + 0;
    var yEntryPos = Math.floor(Math.random() * (14 - 0 + 1)) + 0;
        if (yGoalPos == 14)
            {yEntryPos = 0;}
        else
            {yEntryPos = 14;}    
    }
else {
    var xGoalPos = Math.floor(Math.random());
        if (xGoalPos >=.5)
            {xGoalPos = 14;}
        else 
            {xGoalPos = 0;}
    var yGoalPos = Math.floor(Math.random() * (14 - 0 + 1)) + 0;
    var yEntryPos = Math.floor(Math.random() * (14 - 0 + 1)) + 0;
    var xEntryPos = Math.floor(Math.random() * (14 - 0 + 1)) + 0;
        if (xGoalPos == 14)
            {xEntryPos = 0;}
        else
            {xEntryPos = 14;}    
}
 $('.GoalPositionX').text(xGoalPos)
 $('.GoalPositionY').text(yGoalPos)
 $('.EntryPositionX').text(xEntryPos)
 $('.EntryPositionY').text(yEntryPos)
     
 //selects the random number and gets them into html grid-id format for comparisons.
var entryNum = (xEntryPos+","+yEntryPos);
var exitNum = (xGoalPos+","+yGoalPos);
//creates 20 Wall tiles.
var numberOfWalls = [];
var wallsMade = 0;
for (x=0; x<20; x++) {
    var wallTilex = Math.floor(Math.random() * (13 - 1 + 1)) + 1;
    var wallTiley = Math.floor(Math.random() * (13 - 1 + 1)) + 1;
    var isWall = (wallTilex+","+wallTiley);
    numberOfWalls.push(isWall)

};
//Colors the Entry square & Exit squares as well as the Wall squares.
$(".mazehole").each(function() {
     var isWallTile = $(this).attr('id');
    for (x=0; x<numberOfWalls.length; x++){
    if (isWallTile == numberOfWalls[x]){
    document.getElementById(numberOfWalls[x]).style.backgroundColor = "black";}}
   var isEntry = $(this).attr('id');
   if( isEntry == entryNum)
      document.getElementById(isEntry).style.backgroundColor = "cornflowerblue";
      var isExit = $(this).attr('id');
   if(isExit == exitNum)
        document.getElementById(isExit).style.backgroundColor = "firebrick";
    
});


//Going to begin the cost-assigning of potential moves here.








//This can generate divs programatically
//for(i = 0, i < 15, i++)
//for(j = 0, j < 15, j++)
//divHtml = "<div id =' " + i + ',' + j + " '></div>'
//$('.masterDiv').append(
//divHtml)
