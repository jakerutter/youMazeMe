
//Colors the Node gray when it is hovered over.
$('.mazehole').hover(function () {
($('#htmlloc').html (this.id))},
function (){
    $('#htmlloc').html("");
    });

var upAndDown = "";
//Determines Maze Orientation to Vertical or Horizontal
determineMazeOrientation(upAndDown);
//Selects 2 Random numbers to create and ENTRY & EXIT for the maze on the perimeter.
var entryAndExitNodes = createEntryAndExitNodes(upAndDown);
var xEntryPos = entryAndExitNodes[0];
var yEntryPos = entryAndExitNodes[1];
var xGoalPos = entryAndExitNodes[2];
var yGoalPos = entryAndExitNodes[3];
 $('.GoalPositionX').text(xGoalPos)
 $('.GoalPositionY').text(yGoalPos)
 $('.EntryPositionX').text(xEntryPos)
 $('.EntryPositionY').text(yEntryPos)
     
 //selects the random number and gets them into html grid-id format for comparisons.
var entryNum = (xEntryPos+","+yEntryPos);
var exitNum = (xGoalPos+","+yGoalPos);
var currentPosX = xEntryPos;
var currentPosY = yEntryPos;
//Generate Wall Tiles
var wallNodes = [];
for (x=0; x<30; x++) {
    if (upAndDown){
     var wallTilex = Math.floor(Math.random() * (14 - 0 + 1)) + 0;
        var wallTiley = Math.floor(Math.random() * (13 - 1 + 1)) + 1;
        var isWall = (wallTilex+","+wallTiley);
        wallNodes.push(isWall)}
    else{
        var wallTilex = Math.floor(Math.random() * (13 - 1 + 1)) + 1;
        var wallTiley = Math.floor(Math.random() * (14 - 0 + 1)) + 0;
        var isWall = (wallTilex+","+wallTiley);
        wallNodes.push(isWall)}
    };

var isValidMove = true;
var isNextTo = 0;
var allTiles = [];
var queueForSearch = [];
//Create a test to determine if the tile is next to the current position.


$(".mazehole").each(function() {
    var isTile = $(this).attr('id');
     allTiles.push(isTile);    
});

generateWallTiles(allTiles,wallNodes);
populateEntryTile(allTiles,entryNum);
populateExitTile(allTiles,exitNum);
nextToCurrent(allTiles,currentPosX,currentPosY);








//Function determines the orientation of the maze (Vertical or Horizontal)
function determineMazeOrientation(x){
    var Orientation = Math.floor(Math.random()*2);
    if (Orientation >= 1)
    { upAndDown = true;
    return upAndDown;}
    else
    { upAndDown = false;
    return upAndDown;}
};
//Function to Create the Location for Entry & Exit nodes
function createEntryAndExitNodes(x){
    if (x)
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
return [xEntryPos,yEntryPos,xGoalPos,yGoalPos];

};


//Function to create Wall Tiles
function generateWallTiles(x,y){    
    for (i=0; i<x.length; i++){
    for (j=0; j<y.length; j++){
       if (y[j] == x[i]){
    document.getElementById(x[i]).style.backgroundColor = "black";}}}
};
//Function to populate Entry Tile
function populateEntryTile(x,y){
    for (i=0; i<x.length; i++){
    if(y == x[i]){
    var startLocationForQueue = x;
    document.getElementById(x[i]).style.backgroundColor = "cornflowerblue";}}
};
//Function to populate Exit Tile
function populateExitTile(x,y){
    for (i=0; i<x.length; i++){
     if(y == x[i]){
    var endOfQueue = x;
    document.getElementById(x[i]).style.backgroundColor = "firebrick";}}
};
//Function to check and populate the valid moves next to the starting node
function nextToCurrent(x,currentPosX,currentPosY){
      for (i=0; i<x.length; i++){
         if (((currentPosX-1) +","+ currentPosY == x[i]) || ((currentPosX+1) +","+ currentPosY == x[i]) || (currentPosX +","+ (currentPosY-1) == x[i])||(currentPosX +","+ (currentPosY+1) == x[i])){
            isNextTo = true;
            queueForSearch.push(x[i]);
            document.getElementById(x[i]).style.backgroundColor = "green";}}
     };

//Unused, just for checking length of arrays.
function reportLength(x){
      if (x === undefined){
          x = 0;
      }
      else{
          alert(x.length);}
     };