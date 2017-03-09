
//Colors the Node gray when it is hovered over.
$('.mazehole').hover(function() {
($('#htmlloc').html(this.title))},
function(){
    $('#htmlloc').html("");
    });

var allTiles = [];
$(".mazehole").each(function() {
    var isTile = $(this).attr('id');
     allTiles.push(isTile);
    return allTiles;    
});

var upAndDown = "";  
var wallNodes = [];

var nodeArray = [];
var queueForSearch = [];
var nodesForEntryAndExit = [];

//HEAVY REFACTORING REQUIRED
//make a variable to hold the distanceSearching and +1 each time the function runs.
//Use setInterval instead of SetTimeout to run the same function over and over until complete.
//Use an array of colors or a dictionary to provide the new color for each iteration of the function.


determineMazeOrientation(upAndDown);
assignNodeProperties(allTiles,nodeArray);
generateWallTiles(upAndDown,nodeArray,wallNodes);
populateWallTiles(nodeArray);
createEntryAndExitNodes(upAndDown);
var entryNode = nodesForEntryAndExit[0];
var exitNode = nodesForEntryAndExit[1];
$('.GoalPositionX').text(exitNode);
$('.GoalPositionY').text(exitNode);
$('.EntryPositionX').text(entryNode);
$('.EntryPositionY').text(entryNode);
populateEntryTile(entryNode);
populateExitTile(exitNode);
identifyNodesNextToEntry(entryNode,nodeArray);
var tID = setTimeout(populateNodesNextToEntry,2000,nodeArray);
identifyValidTiles2(nodeArray);
var tID2 = setTimeout(populateValidTiles2,3500,nodeArray);
//The following are simply to check my algorithms. I need to figure out how to do this in 1 function ideally.
identifyValidTiles3(nodeArray);
var tID3 = setTimeout(populateValidTiles3,5000,nodeArray);
identifyValidTiles4(nodeArray);
var tID4 = setTimeout(populateValidTiles4,6500,nodeArray);
identifyValidTiles5(nodeArray);
var tID5 = setTimeout(populateValidTiles5,8000,nodeArray);
identifyValidTiles6(nodeArray);
var tID3 = setTimeout(populateValidTiles6,9500,nodeArray);
identifyValidTiles7(nodeArray);
var tID4 = setTimeout(populateValidTiles7,11000,nodeArray);
identifyValidTiles8(nodeArray);
var tID5 = setTimeout(populateValidTiles8,12500,nodeArray);




//FUNCTIONS BELOW

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
    var entryNode = 0;
   if (x)
    {
        var entryNode = Math.floor((Math.random() *(225-210)) + 210);
        var exitNode = Math.floor(Math.random()*(15-0));  
    }
else {
    while (entryNode <= 0 || entryNode == 14){
        var entryNode = (Math.floor(Math.random()*(14-0)))*15-1;}
        var exitNode = (Math.floor(Math.random()*(13-0)))*15;
};
nodesForEntryAndExit.push(entryNode);
nodesForEntryAndExit.push(exitNode);
return (nodesForEntryAndExit);
};
//Function to generate Wall Tiles
function generateWallTiles(upAndDown,nodeArray,wallNodes){
    while (wallNodes.length<65){
    if (!upAndDown){
        isWall  = (Math.floor(Math.random()*(224-0+1))+0);
        while ((isWall %15 == 0) || ((isWall-14)%15 == 0) || (isWall == 14)){
            isWall  = (Math.floor(Math.random()*(224-0+1))+0);}
            for (i=0; i<nodeArray.length; i++){
                if (nodeArray[i].id == isWall){
                nodeArray[i].isAWall = true;
                nodeArray[i].backgroundcolor = "black";
                wallNodes.push(isWall);
            }
                }}
    else{
        isWall = (Math.floor(Math.random()*(209-15+1)) + 15);
        for (i=0; i<nodeArray.length; i++){
                if (nodeArray[i].id == isWall){
                nodeArray[i].isAWall = true;
                nodeArray[i].backgroundcolor = "black";
                wallNodes.push(isWall);
            }
        }}
    }
    return nodeArray
};

//Function to populate Wall Tiles
function populateWallTiles(nodeArray){ 
    for (i=0; i<nodeArray.length; i++){
       if (nodeArray[i].isAWall == true){
            document.getElementById(i).style.backgroundColor = nodeArray[i].backgroundcolor;}
        }
            return nodeArray;
};

//Function to populate Entry Tile
function populateEntryTile(x){
    document.getElementById(x).style.backgroundColor = "cornflowerblue";
};

//Function to populate Exit Tile
function populateExitTile(x){
    document.getElementById(x).style.backgroundColor = "firebrick";
};

//find nodes next to entry tile and set their Visited to True & distance to 1
function identifyNodesNextToEntry(entryNode,nodeArray){
      for (i=0; i<nodeArray.length; i++){
         if (nodeArray[i].id == entryNode){
            nodeArray[i].visited = true;
            nodeArray[i].distance = 0;
            nodeArray[i].backgroundcolor = "cornflowerblue";
        if (upAndDown){
                if (entryNode < 224){
                nodeArray[i+1].visited = true;
                nodeArray[i+1].distance = 1;
                nodeArray[i+1].path.push(nodeArray[i].id);}
                if (entryNode != 210){
                    nodeArray[i-1].visited = true;
                    nodeArray[i-1].distance = 1;
                    nodeArray[i-1].path.push(nodeArray[i].id);}     
                if(nodeArray[i-15].isAWall == false){
                    nodeArray[i-15].visited = true;
                    nodeArray[i-15].distance = 1;
                    nodeArray[i-15].path.push(nodeArray[i].id);}
                }
        else{
            nodeArray[i+15].visited = true;
            nodeArray[i+15].distance = 1;
            nodeArray[i+15].path.push(nodeArray[i].id);
            nodeArray[i-15].visited = true;
            nodeArray[i-15].distance = 1;
            nodeArray[i-15].path.push(nodeArray[i].id);
            if (nodeArray[i-1].isAWall == false){
                    nodeArray[i-1].visited = true;
                    nodeArray[i-1].distance = 1;
                    nodeArray[i-1].path.push(nodeArray[i].id);}      
           }}}
       return nodeArray;
     };

//Popuate the nodes next to entry
     function populateNodesNextToEntry(nodeArray){
    for (var i=0; i<nodeArray.length; i++){
        if (nodeArray[i].visited == true){       
            if (nodeArray[i].distance == 1){    
            nodeArray[i].backgroundcolor = "green";
            document.getElementById(nodeArray[i].id).style.backgroundColor = nodeArray[i].backgroundcolor;
        }}}  
};


        
// Function will identify and Queue the nodes for searching
function identifyValidTiles2(nodeArray){
    for (i=0; i<nodeArray.length; i++){
        if (nodeArray[i].visited == true && nodeArray[i].distance == 1){
            if (nodeArray[i].id == 0){
                if (nodeArray[i+1].isAWall == false && nodeArray[i+1].visited == false){
                    nodeArray[i+1].visited = true;
                    nodeArray[i+1].backgroundcolor = "blue";
                    nodeArray[i+1].distance = nodeArray[i].distance +1;
                    nodeArray[i+1].path = nodeArray[i+1].path.concat(nodeArray[i].path);
                }
                if (nodeArray[i+15].isAWall == false && nodeArray[i+15].visited == false){
                    nodeArray[i+15].visited = true;
                    nodeArray[i+15].backgroundcolor = "blue";
                    nodeArray[i+15].distance = nodeArray[i].distance +1;
                    nodeArray[i+15].path = nodeArray[i+15].path.concat(nodeArray[i].path);
                }
            }
            if (nodeArray[i].id > 0 && nodeArray[i].id < 14){
                if (nodeArray[i+1].isAWall == false && nodeArray[i+1].visited == false){
                    nodeArray[i+1].visited = true;
                    nodeArray[i+1].backgroundcolor = "blue";
                    nodeArray[i+1].distance = nodeArray[i].distance +1;
                    nodeArray[i+1].path = nodeArray[i+1].path.concat(nodeArray[i].path);
                }
                  if (nodeArray[i+15].isAWall == false && nodeArray[i+15].visited == false){
                    nodeArray[i+15].visited = true;
                    nodeArray[i+15].backgroundcolor = "blue";
                    nodeArray[i+15].distance = nodeArray[i].distance +1;
                    nodeArray[i+15].path = nodeArray[i+15].path.concat(nodeArray[i].path);
                }
                  if (nodeArray[i-1].isAWall == false && nodeArray[i-1].visited == false){
                    nodeArray[i-1].visited = true;
                    nodeArray[i-1].backgroundcolor = "blue";
                    nodeArray[i-1].distance = nodeArray[i].distance +1;
                    nodeArray[i-1].path = nodeArray[i-1].path.concat(nodeArray[i].path);
                }
            }
            if (nodeArray[i].id == 14){
                 if (nodeArray[i+15].isAWall == false && nodeArray[i+15].visited == false){
                    nodeArray[i+15].visited = true;
                    nodeArray[i+15].backgroundcolor = "blue";
                    nodeArray[i+15].distance = nodeArray[i].distance +1;
                    nodeArray[i+15].path = nodeArray[i+15].path.concat(nodeArray[i].path);
                }
                  if (nodeArray[i-1].isAWall == false && nodeArray[i-1].visited == false){
                    nodeArray[i-1].visited = true;
                    nodeArray[i-1].backgroundcolor = "blue";
                    nodeArray[i-1].distance = nodeArray[i].distance +1;
                    nodeArray[i-1].path = nodeArray[i-1].path.concat(nodeArray[i].path);
                }
            }
            if (nodeArray[i].id > 0 && nodeArray[i].id < 210 && nodeArray[i].id %15 == 0){
                 if (nodeArray[i+1].isAWall == false && nodeArray[i+1].visited == false){
                    nodeArray[i+1].visited = true;
                    nodeArray[i+1].backgroundcolor = "blue";
                    nodeArray[i+1].distance = nodeArray[i].distance +1;
                    nodeArray[i+1].path = nodeArray[i+1].path.concat(nodeArray[i].path);
                 }
                 if (nodeArray[i+15].isAWall == false && nodeArray[i+15].visited == false){
                    nodeArray[i+15].visited = true;
                    nodeArray[i+15].backgroundcolor = "blue";
                    nodeArray[i+15].distance = nodeArray[i].distance +1;
                    nodeArray[i+15].path = nodeArray[i+15].path.concat(nodeArray[i].path);
                 }
                 if (nodeArray[i-15].isAWall == false && nodeArray[i-15].visited == false){
                    nodeArray[i-15].visited = true;
                    nodeArray[i-15].backgroundcolor = "blue";
                    nodeArray[i-15].distance = nodeArray[i].distance +1;
                    nodeArray[i-15].path = nodeArray[i-15].path.concat(nodeArray[i].path);
                 }
            }
            if (nodeArray[i].id > 14 && nodeArray[i].id < 224 && (nodeArray[i].id+1) %15 == 0){
                 if (nodeArray[i+15].isAWall == false && nodeArray[i+15].visited == false){
                    nodeArray[i+15].visited = true;
                    nodeArray[i+15].backgroundcolor = "blue";
                    nodeArray[i+15].distance = nodeArray[i].distance +1;
                    nodeArray[i+15].path = nodeArray[i+15].path.concat(nodeArray[i].path);
                 }
                 if (nodeArray[i-1].isAWall == false && nodeArray[i-1].visited == false){
                    nodeArray[i-1].visited = true;
                    nodeArray[i-1].backgroundcolor = "blue";
                    nodeArray[i-1].distance = nodeArray[i].distance +1;
                    nodeArray[i-1].path = nodeArray[i-1].path.concat(nodeArray[i].path);
                 }
                 if (nodeArray[i-15].isAWall == false && nodeArray[i-15].visited == false){
                    nodeArray[i-15].visited = true;
                    nodeArray[i-15].backgroundcolor = "blue";
                    nodeArray[i-15].distance = nodeArray[i].distance +1;
                    nodeArray[i-15].path = nodeArray[i-15].path.concat(nodeArray[i].path);
                 }
            }
            if (nodeArray[i].id == 210){
                 if (nodeArray[i+1].isAWall == false && nodeArray[i+1].visited == false){
                    nodeArray[i+1].visited = true;
                    nodeArray[i+1].backgroundcolor = "blue";
                    nodeArray[i+1].distance = nodeArray[i].distance +1;                   
                    nodeArray[i+1].path = nodeArray[i+1].path.concat(nodeArray[i].path);
                 }
                 if (nodeArray[i-15].isAWall == false && nodeArray[i-15].visited == false){
                    nodeArray[i-15].visited = true;
                    nodeArray[i-15].backgroundcolor = "blue";
                    nodeArray[i-15].distance = nodeArray[i].distance +1;
                    nodeArray[i-15].path = nodeArray[i-15].path.concat(nodeArray[i].path);
                 } 
            }
            if (nodeArray[i].id > 210 && nodeArray[i].id < 224){
                if (nodeArray[i+1].isAWall == false && nodeArray[i+1].visited == false){
                    nodeArray[i+1].visited = true;                
                    nodeArray[i+1].backgroundcolor = "blue";
                    nodeArray[i+1].distance = nodeArray[i].distance +1;
                    nodeArray[i+1].path = nodeArray[i+1].path.concat(nodeArray[i].path);
                }
                  if (nodeArray[i-1].isAWall == false && nodeArray[i-1].visited == false){
                    nodeArray[i-1].visited = true;
                    nodeArray[i-1].backgroundcolor = "blue";
                    nodeArray[i-1].distance = nodeArray[i].distance +1;
                    nodeArray[i-1].path = nodeArray[i-1].path.concat(nodeArray[i].path);
                }
                if (nodeArray[i-15].isAWall == false && nodeArray[i-15].visited == false){
                    nodeArray[i-15].visited = true;
                    nodeArray[i-15].backgroundcolor = "blue";
                    nodeArray[i-15].distance = nodeArray[i].distance +1;
                    nodeArray[i-15].path = nodeArray[i-15].path.concat(nodeArray[i].path);
                }
            }
            if (nodeArray[i].id == 224){
                 if (nodeArray[i-1].isAWall == false && nodeArray[i-1].visited == false){
                    nodeArray[i-1].visited = true;
                    nodeArray[i-1].backgroundcolor = "blue";
                    nodeArray[i-1].distance = nodeArray[i].distance +1;
                    nodeArray[i-1].path = nodeArray[i-1].path.concat(nodeArray[i].path);
                 }
                 if (nodeArray[i-15].isAWall == false && nodeArray[i-15].visited == false){
                    nodeArray[i-15].visited = true;
                    nodeArray[i-15].backgroundcolor = "blue";
                    nodeArray[i-15].distance = nodeArray[i].distance +1;
                    nodeArray[i-15].path = nodeArray[i-15].path.concat(nodeArray[i].path);
                 } 
            }
                if (nodeArray[i].id > 14 && nodeArray[i].id < 210 && nodeArray[i].id %15 != 0 && (nodeArray[i].id+1)%15 != 0){
                    if (nodeArray[i+1].isAWall == false && nodeArray[i+1].visited == false){
                    nodeArray[i+1].visited = true;
                    nodeArray[i+1].backgroundcolor = "blue";
                    nodeArray[i+1].distance = nodeArray[i].distance +1;
                    nodeArray[i+1].path = nodeArray[i+1].path.concat(nodeArray[i].path);
                }
                    if (nodeArray[i+15].isAWall == false && nodeArray[i+15].visited == false){
                    nodeArray[i+15].visited = true;
                    nodeArray[i+15].backgroundcolor = "blue";
                    nodeArray[i+15].distance = nodeArray[i].distance +1;
                    nodeArray[i+15].path = nodeArray[i+15].path.concat(nodeArray[i].path);
                 }
                    if (nodeArray[i-1].isAWall == false && nodeArray[i-1].visited == false){
                    nodeArray[i-1].visited = true;
                    nodeArray[i-1].backgroundcolor = "blue";
                    nodeArray[i-1].distance = nodeArray[i].distance +1;
                    nodeArray[i-1].path = nodeArray[i-1].path.concat(nodeArray[i].path);
                }
                    if (nodeArray[i-15].isAWall == false && nodeArray[i-15].visited == false){
                    nodeArray[i-15].visited = true;
                    nodeArray[i-15].backgroundcolor = "blue";
                    nodeArray[i-15].distance = nodeArray[i].distance +1;
                    nodeArray[i-15].path = nodeArray[i-15].path.concat(nodeArray[i].path);
                 } 
                }
        }
    }
    
    return nodeArray;
};

//Popuate the Distance == 2 nodes
     function populateValidTiles2(nodeArray){
    for (var i=0; i<nodeArray.length; i++){
        if (nodeArray[i].visited == true){       
            if (nodeArray[i].distance == 2){    
            document.getElementById(nodeArray[i].id).style.backgroundColor = nodeArray[i].backgroundcolor;
        }}}  
};


        
// Function will identify and Queue the nodes for searching
function identifyValidTiles3(nodeArray){
    for (i=0; i<nodeArray.length; i++){
        if (nodeArray[i].visited == true && nodeArray[i].distance == 2){
            if (nodeArray[i].id == 0){
                if (nodeArray[i+1].isAWall == false && nodeArray[i+1].visited == false){
                    nodeArray[i+1].visited = true;
                    nodeArray[i+1].backgroundcolor = "purple";
                    nodeArray[i+1].distance = nodeArray[i].distance +1;
                    nodeArray[i+1].path = nodeArray[i+1].path.concat(nodeArray[i].path);
                }
                if (nodeArray[i+15].isAWall == false && nodeArray[i+15].visited == false){
                    nodeArray[i+15].visited = true;
                    nodeArray[i+15].backgroundcolor = "purple";
                    nodeArray[i+15].distance = nodeArray[i].distance +1;
                    nodeArray[i+15].path = nodeArray[i+15].path.concat(nodeArray[i].path);
                }
            }
            if (nodeArray[i].id > 0 && nodeArray[i].id < 14){
                if (nodeArray[i+1].isAWall == false && nodeArray[i+1].visited == false){
                    nodeArray[i+1].visited = true;
                    nodeArray[i+1].backgroundcolor = "purple";
                    nodeArray[i+1].distance = nodeArray[i].distance +1;
                    nodeArray[i+1].path = nodeArray[i+1].path.concat(nodeArray[i].path);
                }
                  if (nodeArray[i+15].isAWall == false && nodeArray[i+15].visited == false){
                    nodeArray[i+15].visited = true;
                    nodeArray[i+15].backgroundcolor = "purple";
                    nodeArray[i+15].distance = nodeArray[i].distance +1;
                    nodeArray[i+15].path = nodeArray[i+15].path.concat(nodeArray[i].path);
                }
                  if (nodeArray[i-1].isAWall == false && nodeArray[i-1].visited == false){
                    nodeArray[i-1].visited = true;
                    nodeArray[i-1].backgroundcolor = "purple";
                    nodeArray[i-1].distance = nodeArray[i].distance +1;
                    nodeArray[i-1].path = nodeArray[i-1].path.concat(nodeArray[i].path);
                }
            }
            if (nodeArray[i].id == 14){
                 if (nodeArray[i+15].isAWall == false && nodeArray[i+15].visited == false){
                    nodeArray[i+15].visited = true;
                    nodeArray[i+15].backgroundcolor = "purple";
                    nodeArray[i+15].distance = nodeArray[i].distance +1;
                    nodeArray[i+15].path = nodeArray[i+15].path.concat(nodeArray[i].path);
                }
                  if (nodeArray[i-1].isAWall == false && nodeArray[i-1].visited == false){
                    nodeArray[i-1].visited = true;
                    nodeArray[i-1].backgroundcolor = "purple";
                    nodeArray[i-1].distance = nodeArray[i].distance +1;
                    nodeArray[i-1].path = nodeArray[i-1].path.concat(nodeArray[i].path);
                }
            }
            if (nodeArray[i].id > 0 && nodeArray[i].id < 210 && nodeArray[i].id %15 == 0){
                 if (nodeArray[i+1].isAWall == false && nodeArray[i+1].visited == false){
                    nodeArray[i+1].visited = true;
                    nodeArray[i+1].backgroundcolor = "purple";
                    nodeArray[i+1].distance = nodeArray[i].distance +1;
                    nodeArray[i+1].path = nodeArray[i+1].path.concat(nodeArray[i].path);
                 }
                 if (nodeArray[i+15].isAWall == false && nodeArray[i+15].visited == false){
                    nodeArray[i+15].visited = true;
                    nodeArray[i+15].backgroundcolor = "purple";
                    nodeArray[i+15].distance = nodeArray[i].distance +1;
                    nodeArray[i+15].path = nodeArray[i+15].path.concat(nodeArray[i].path);
                 }
                 if (nodeArray[i-15].isAWall == false && nodeArray[i-15].visited == false){
                    nodeArray[i-15].visited = true;
                    nodeArray[i-15].backgroundcolor = "purple";
                    nodeArray[i-15].distance = nodeArray[i].distance +1;
                    nodeArray[i-15].path = nodeArray[i-15].path.concat(nodeArray[i].path);
                 }
            }
            if (nodeArray[i].id > 14 && nodeArray[i].id < 224 && (nodeArray[i].id+1) %15 == 0){
                 if (nodeArray[i+15].isAWall == false && nodeArray[i+15].visited == false){
                    nodeArray[i+15].visited = true;
                    nodeArray[i+15].backgroundcolor = "purple";
                    nodeArray[i+15].distance = nodeArray[i].distance +1;
                    nodeArray[i+15].path = nodeArray[i+15].path.concat(nodeArray[i].path);
                 }
                 if (nodeArray[i-1].isAWall == false && nodeArray[i-1].visited == false){
                    nodeArray[i-1].visited = true;
                    nodeArray[i-1].backgroundcolor = "purple";
                    nodeArray[i-1].distance = nodeArray[i].distance +1;
                    nodeArray[i-1].path = nodeArray[i-1].path.concat(nodeArray[i].path);
                 }
                 if (nodeArray[i-15].isAWall == false && nodeArray[i-15].visited == false){
                    nodeArray[i-15].visited = true;
                    nodeArray[i-15].backgroundcolor = "purple";
                    nodeArray[i-15].distance = nodeArray[i].distance +1;
                    nodeArray[i-15].path = nodeArray[i-15].path.concat(nodeArray[i].path);
                 }
            }
            if (nodeArray[i].id == 210){
                 if (nodeArray[i+1].isAWall == false && nodeArray[i+1].visited == false){
                    nodeArray[i+1].visited = true;
                    nodeArray[i+1].backgroundcolor = "purple";
                    nodeArray[i+1].distance = nodeArray[i].distance +1;                   
                    nodeArray[i+1].path = nodeArray[i+1].path.concat(nodeArray[i].path);
                 }
                 if (nodeArray[i-15].isAWall == false && nodeArray[i-15].visited == false){
                    nodeArray[i-15].visited = true;
                    nodeArray[i-15].backgroundcolor = "purple";
                    nodeArray[i-15].distance = nodeArray[i].distance +1;
                    nodeArray[i-15].path = nodeArray[i-15].path.concat(nodeArray[i].path);
                 } 
            }
            if (nodeArray[i].id > 210 && nodeArray[i].id < 224){
                if (nodeArray[i+1].isAWall == false && nodeArray[i+1].visited == false){
                    nodeArray[i+1].visited = true;                
                    nodeArray[i+1].backgroundcolor = "purple";
                    nodeArray[i+1].distance = nodeArray[i].distance +1;
                    nodeArray[i+1].path = nodeArray[i+1].path.concat(nodeArray[i].path);
                }
                  if (nodeArray[i-1].isAWall == false && nodeArray[i-1].visited == false){
                    nodeArray[i-1].visited = true;
                    nodeArray[i-1].backgroundcolor = "purple";
                    nodeArray[i-1].distance = nodeArray[i].distance +1;
                    nodeArray[i-1].path = nodeArray[i-1].path.concat(nodeArray[i].path);
                }
                if (nodeArray[i-15].isAWall == false && nodeArray[i-15].visited == false){
                    nodeArray[i-15].visited = true;
                    nodeArray[i-15].backgroundcolor = "purple";
                    nodeArray[i-15].distance = nodeArray[i].distance +1;
                    nodeArray[i-15].path = nodeArray[i-15].path.concat(nodeArray[i].path);
                }
            }
            if (nodeArray[i].id == 224){
                 if (nodeArray[i-1].isAWall == false && nodeArray[i-1].visited == false){
                    nodeArray[i-1].visited = true;
                    nodeArray[i-1].backgroundcolor = "purple";
                    nodeArray[i-1].distance = nodeArray[i].distance +1;
                    nodeArray[i-1].path = nodeArray[i-1].path.concat(nodeArray[i].path);
                 }
                 if (nodeArray[i-15].isAWall == false && nodeArray[i-15].visited == false){
                    nodeArray[i-15].visited = true;
                    nodeArray[i-15].backgroundcolor = "purple";
                    nodeArray[i-15].distance = nodeArray[i].distance +1;
                    nodeArray[i-15].path = nodeArray[i-15].path.concat(nodeArray[i].path);
                 } 
            }
                if (nodeArray[i].id > 14 && nodeArray[i].id < 210 && nodeArray[i].id %15 != 0 && (nodeArray[i].id+1)%15 != 0){
                    if (nodeArray[i+1].isAWall == false && nodeArray[i+1].visited == false){
                    nodeArray[i+1].visited = true;
                    nodeArray[i+1].backgroundcolor = "purple";
                    nodeArray[i+1].distance = nodeArray[i].distance +1;
                    nodeArray[i+1].path = nodeArray[i+1].path.concat(nodeArray[i].path);
                }
                    if (nodeArray[i+15].isAWall == false && nodeArray[i+15].visited == false){
                    nodeArray[i+15].visited = true;
                    nodeArray[i+15].backgroundcolor = "purple";
                    nodeArray[i+15].distance = nodeArray[i].distance +1;
                    nodeArray[i+15].path = nodeArray[i+15].path.concat(nodeArray[i].path);
                 }
                    if (nodeArray[i-1].isAWall == false && nodeArray[i-1].visited == false){
                    nodeArray[i-1].visited = true;
                    nodeArray[i-1].backgroundcolor = "purple";
                    nodeArray[i-1].distance = nodeArray[i].distance +1;
                    nodeArray[i-1].path = nodeArray[i-1].path.concat(nodeArray[i].path);
                }
                    if (nodeArray[i-15].isAWall == false && nodeArray[i-15].visited == false){
                    nodeArray[i-15].visited = true;
                    nodeArray[i-15].backgroundcolor = "purple";
                    nodeArray[i-15].distance = nodeArray[i].distance +1;
                    nodeArray[i-15].path = nodeArray[i-15].path.concat(nodeArray[i].path);
                 } 
                }
        }
    }
    
    return nodeArray;
};

//Popuate the Distance == 3 nodes
     function populateValidTiles3(nodeArray){
    for (var i=0; i<nodeArray.length; i++){
        if (nodeArray[i].visited == true){       
            if (nodeArray[i].distance == 3){    
            document.getElementById(nodeArray[i].id).style.backgroundColor = nodeArray[i].backgroundcolor;
        }}}  
};
// Function will identify and Queue the nodes for searching
function identifyValidTiles4(nodeArray){
    for (i=0; i<nodeArray.length; i++){
        if (nodeArray[i].visited == true && nodeArray[i].distance == 3){
            if (nodeArray[i].id == 0){
                if (nodeArray[i+1].isAWall == false && nodeArray[i+1].visited == false){
                    nodeArray[i+1].visited = true;
                    nodeArray[i+1].backgroundcolor = "red";
                    nodeArray[i+1].distance = nodeArray[i].distance +1;
                    nodeArray[i+1].path = nodeArray[i+1].path.concat(nodeArray[i].path);
                }
                if (nodeArray[i+15].isAWall == false && nodeArray[i+15].visited == false){
                    nodeArray[i+15].visited = true;
                    nodeArray[i+15].backgroundcolor = "red";
                    nodeArray[i+15].distance = nodeArray[i].distance +1;
                    nodeArray[i+15].path = nodeArray[i+15].path.concat(nodeArray[i].path);
                }
            }
            if (nodeArray[i].id > 0 && nodeArray[i].id < 14){
                if (nodeArray[i+1].isAWall == false && nodeArray[i+1].visited == false){
                    nodeArray[i+1].visited = true;
                    nodeArray[i+1].backgroundcolor = "red";
                    nodeArray[i+1].distance = nodeArray[i].distance +1;
                    nodeArray[i+1].path = nodeArray[i+1].path.concat(nodeArray[i].path);
                }
                  if (nodeArray[i+15].isAWall == false && nodeArray[i+15].visited == false){
                    nodeArray[i+15].visited = true;
                    nodeArray[i+15].backgroundcolor = "red";
                    nodeArray[i+15].distance = nodeArray[i].distance +1;
                    nodeArray[i+15].path = nodeArray[i+15].path.concat(nodeArray[i].path);
                }
                  if (nodeArray[i-1].isAWall == false && nodeArray[i-1].visited == false){
                    nodeArray[i-1].visited = true;
                    nodeArray[i-1].backgroundcolor = "red";
                    nodeArray[i-1].distance = nodeArray[i].distance +1;
                    nodeArray[i-1].path = nodeArray[i-1].path.concat(nodeArray[i].path);
                }
            }
            if (nodeArray[i].id == 14){
                 if (nodeArray[i+15].isAWall == false && nodeArray[i+15].visited == false){
                    nodeArray[i+15].visited = true;
                    nodeArray[i+15].backgroundcolor = "red";
                    nodeArray[i+15].distance = nodeArray[i].distance +1;
                    nodeArray[i+15].path = nodeArray[i+15].path.concat(nodeArray[i].path);
                }
                  if (nodeArray[i-1].isAWall == false && nodeArray[i-1].visited == false){
                    nodeArray[i-1].visited = true;
                    nodeArray[i-1].backgroundcolor = "red";
                    nodeArray[i-1].distance = nodeArray[i].distance +1;
                    nodeArray[i-1].path = nodeArray[i-1].path.concat(nodeArray[i].path);
                }
            }
            if (nodeArray[i].id > 0 && nodeArray[i].id < 210 && nodeArray[i].id %15 == 0){
                 if (nodeArray[i+1].isAWall == false && nodeArray[i+1].visited == false){
                    nodeArray[i+1].visited = true;
                    nodeArray[i+1].backgroundcolor = "red";
                    nodeArray[i+1].distance = nodeArray[i].distance +1;
                    nodeArray[i+1].path = nodeArray[i+1].path.concat(nodeArray[i].path);
                 }
                 if (nodeArray[i+15].isAWall == false && nodeArray[i+15].visited == false){
                    nodeArray[i+15].visited = true;
                    nodeArray[i+15].backgroundcolor = "red";
                    nodeArray[i+15].distance = nodeArray[i].distance +1;
                    nodeArray[i+15].path = nodeArray[i+15].path.concat(nodeArray[i].path);
                 }
                 if (nodeArray[i-15].isAWall == false && nodeArray[i-15].visited == false){
                    nodeArray[i-15].visited = true;
                    nodeArray[i-15].backgroundcolor = "red";
                    nodeArray[i-15].distance = nodeArray[i].distance +1;
                    nodeArray[i-15].path = nodeArray[i-15].path.concat(nodeArray[i].path);
                 }
            }
            if (nodeArray[i].id > 14 && nodeArray[i].id < 224 && (nodeArray[i].id+1) %15 == 0){
                 if (nodeArray[i+15].isAWall == false && nodeArray[i+15].visited == false){
                    nodeArray[i+15].visited = true;
                    nodeArray[i+15].backgroundcolor = "red";
                    nodeArray[i+15].distance = nodeArray[i].distance +1;
                    nodeArray[i+15].path = nodeArray[i+15].path.concat(nodeArray[i].path);
                 }
                 if (nodeArray[i-1].isAWall == false && nodeArray[i-1].visited == false){
                    nodeArray[i-1].visited = true;
                    nodeArray[i-1].backgroundcolor = "red";
                    nodeArray[i-1].distance = nodeArray[i].distance +1;
                    nodeArray[i-1].path = nodeArray[i-1].path.concat(nodeArray[i].path);
                 }
                 if (nodeArray[i-15].isAWall == false && nodeArray[i-15].visited == false){
                    nodeArray[i-15].visited = true;
                    nodeArray[i-15].backgroundcolor = "red";
                    nodeArray[i-15].distance = nodeArray[i].distance +1;
                    nodeArray[i-15].path = nodeArray[i-15].path.concat(nodeArray[i].path);
                 }
            }
            if (nodeArray[i].id == 210){
                 if (nodeArray[i+1].isAWall == false && nodeArray[i+1].visited == false){
                    nodeArray[i+1].visited = true;
                    nodeArray[i+1].backgroundcolor = "red";
                    nodeArray[i+1].distance = nodeArray[i].distance +1;                   
                    nodeArray[i+1].path = nodeArray[i+1].path.concat(nodeArray[i].path);
                 }
                 if (nodeArray[i-15].isAWall == false && nodeArray[i-15].visited == false){
                    nodeArray[i-15].visited = true;
                    nodeArray[i-15].backgroundcolor = "red";
                    nodeArray[i-15].distance = nodeArray[i].distance +1;
                    nodeArray[i-15].path = nodeArray[i-15].path.concat(nodeArray[i].path);
                 } 
            }
            if (nodeArray[i].id > 210 && nodeArray[i].id < 224){
                if (nodeArray[i+1].isAWall == false && nodeArray[i+1].visited == false){
                    nodeArray[i+1].visited = true;                
                    nodeArray[i+1].backgroundcolor = "red";
                    nodeArray[i+1].distance = nodeArray[i].distance +1;
                    nodeArray[i+1].path = nodeArray[i+1].path.concat(nodeArray[i].path);
                }
                  if (nodeArray[i-1].isAWall == false && nodeArray[i-1].visited == false){
                    nodeArray[i-1].visited = true;
                    nodeArray[i-1].backgroundcolor = "red";
                    nodeArray[i-1].distance = nodeArray[i].distance +1;
                    nodeArray[i-1].path = nodeArray[i-1].path.concat(nodeArray[i].path);
                }
                if (nodeArray[i-15].isAWall == false && nodeArray[i-15].visited == false){
                    nodeArray[i-15].visited = true;
                    nodeArray[i-15].backgroundcolor = "red";
                    nodeArray[i-15].distance = nodeArray[i].distance +1;
                    nodeArray[i-15].path = nodeArray[i-15].path.concat(nodeArray[i].path);
                }
            }
            if (nodeArray[i].id == 224){
                 if (nodeArray[i-1].isAWall == false && nodeArray[i-1].visited == false){
                    nodeArray[i-1].visited = true;
                    nodeArray[i-1].backgroundcolor = "red";
                    nodeArray[i-1].distance = nodeArray[i].distance +1;
                    nodeArray[i-1].path = nodeArray[i-1].path.concat(nodeArray[i].path);
                 }
                 if (nodeArray[i-15].isAWall == false && nodeArray[i-15].visited == false){
                    nodeArray[i-15].visited = true;
                    nodeArray[i-15].backgroundcolor = "red";
                    nodeArray[i-15].distance = nodeArray[i].distance +1;
                    nodeArray[i-15].path = nodeArray[i-15].path.concat(nodeArray[i].path);
                 } 
            }
                if (nodeArray[i].id > 14 && nodeArray[i].id < 210 && nodeArray[i].id %15 != 0 && (nodeArray[i].id+1)%15 != 0){
                    if (nodeArray[i+1].isAWall == false && nodeArray[i+1].visited == false){
                    nodeArray[i+1].visited = true;
                    nodeArray[i+1].backgroundcolor = "red";
                    nodeArray[i+1].distance = nodeArray[i].distance +1;
                    nodeArray[i+1].path = nodeArray[i+1].path.concat(nodeArray[i].path);
                }
                    if (nodeArray[i+15].isAWall == false && nodeArray[i+15].visited == false){
                    nodeArray[i+15].visited = true;
                    nodeArray[i+15].backgroundcolor = "red";
                    nodeArray[i+15].distance = nodeArray[i].distance +1;
                    nodeArray[i+15].path = nodeArray[i+15].path.concat(nodeArray[i].path);
                 }
                    if (nodeArray[i-1].isAWall == false && nodeArray[i-1].visited == false){
                    nodeArray[i-1].visited = true;
                    nodeArray[i-1].backgroundcolor = "red";
                    nodeArray[i-1].distance = nodeArray[i].distance +1;
                    nodeArray[i-1].path = nodeArray[i-1].path.concat(nodeArray[i].path);
                }
                    if (nodeArray[i-15].isAWall == false && nodeArray[i-15].visited == false){
                    nodeArray[i-15].visited = true;
                    nodeArray[i-15].backgroundcolor = "red";
                    nodeArray[i-15].distance = nodeArray[i].distance +1;
                    nodeArray[i-15].path = nodeArray[i-15].path.concat(nodeArray[i].path);
                 } 
                }
        }
    }
    
    return nodeArray;
};

//Popuate the Distance == 4 nodes
     function populateValidTiles4(nodeArray){
    for (var i=0; i<nodeArray.length; i++){
        if (nodeArray[i].visited == true){       
            if (nodeArray[i].distance == 4){    
            document.getElementById(nodeArray[i].id).style.backgroundColor = nodeArray[i].backgroundcolor;
        }}}  
};

function identifyValidTiles5(nodeArray){
    for (i=0; i<nodeArray.length; i++){
        if (nodeArray[i].visited == true && nodeArray[i].distance == 4){
            if (nodeArray[i].id == 0){
                if (nodeArray[i+1].isAWall == false && nodeArray[i+1].visited == false){
                    nodeArray[i+1].visited = true;
                    nodeArray[i+1].backgroundcolor = "orange";
                    nodeArray[i+1].distance = nodeArray[i].distance +1;
                    nodeArray[i+1].path = nodeArray[i+1].path.concat(nodeArray[i].path);
                }
                if (nodeArray[i+15].isAWall == false && nodeArray[i+15].visited == false){
                    nodeArray[i+15].visited = true;
                    nodeArray[i+15].backgroundcolor = "orange";
                    nodeArray[i+15].distance = nodeArray[i].distance +1;
                    nodeArray[i+15].path = nodeArray[i+15].path.concat(nodeArray[i].path);
                }
            }
            if (nodeArray[i].id > 0 && nodeArray[i].id < 14){
                if (nodeArray[i+1].isAWall == false && nodeArray[i+1].visited == false){
                    nodeArray[i+1].visited = true;
                    nodeArray[i+1].backgroundcolor = "orange";
                    nodeArray[i+1].distance = nodeArray[i].distance +1;
                    nodeArray[i+1].path = nodeArray[i+1].path.concat(nodeArray[i].path);
                }
                  if (nodeArray[i+15].isAWall == false && nodeArray[i+15].visited == false){
                    nodeArray[i+15].visited = true;
                    nodeArray[i+15].backgroundcolor = "orange";
                    nodeArray[i+15].distance = nodeArray[i].distance +1;
                    nodeArray[i+15].path = nodeArray[i+15].path.concat(nodeArray[i].path);
                }
                  if (nodeArray[i-1].isAWall == false && nodeArray[i-1].visited == false){
                    nodeArray[i-1].visited = true;
                    nodeArray[i-1].backgroundcolor = "orange";
                    nodeArray[i-1].distance = nodeArray[i].distance +1;
                    nodeArray[i-1].path = nodeArray[i-1].path.concat(nodeArray[i].path);
                }
            }
            if (nodeArray[i].id == 14){
                 if (nodeArray[i+15].isAWall == false && nodeArray[i+15].visited == false){
                    nodeArray[i+15].visited = true;
                    nodeArray[i+15].backgroundcolor = "orange";
                    nodeArray[i+15].distance = nodeArray[i].distance +1;
                    nodeArray[i+15].path = nodeArray[i+15].path.concat(nodeArray[i].path);
                }
                  if (nodeArray[i-1].isAWall == false && nodeArray[i-1].visited == false){
                    nodeArray[i-1].visited = true;
                    nodeArray[i-1].backgroundcolor = "orange";
                    nodeArray[i-1].distance = nodeArray[i].distance +1;
                    nodeArray[i-1].path = nodeArray[i-1].path.concat(nodeArray[i].path);
                }
            }
            if (nodeArray[i].id > 0 && nodeArray[i].id < 210 && nodeArray[i].id %15 == 0){
                 if (nodeArray[i+1].isAWall == false && nodeArray[i+1].visited == false){
                    nodeArray[i+1].visited = true;
                    nodeArray[i+1].backgroundcolor = "orange";
                    nodeArray[i+1].distance = nodeArray[i].distance +1;
                    nodeArray[i+1].path = nodeArray[i+1].path.concat(nodeArray[i].path);
                 }
                 if (nodeArray[i+15].isAWall == false && nodeArray[i+15].visited == false){
                    nodeArray[i+15].visited = true;
                    nodeArray[i+15].backgroundcolor = "orange";
                    nodeArray[i+15].distance = nodeArray[i].distance +1;
                    nodeArray[i+15].path = nodeArray[i+15].path.concat(nodeArray[i].path);
                 }
                 if (nodeArray[i-15].isAWall == false && nodeArray[i-15].visited == false){
                    nodeArray[i-15].visited = true;
                    nodeArray[i-15].backgroundcolor = "orange";
                    nodeArray[i-15].distance = nodeArray[i].distance +1;
                    nodeArray[i-15].path = nodeArray[i-15].path.concat(nodeArray[i].path);
                 }
            }
            if (nodeArray[i].id > 14 && nodeArray[i].id < 224 && (nodeArray[i].id+1) %15 == 0){
                 if (nodeArray[i+15].isAWall == false && nodeArray[i+15].visited == false){
                    nodeArray[i+15].visited = true;
                    nodeArray[i+15].backgroundcolor = "orange";
                    nodeArray[i+15].distance = nodeArray[i].distance +1;
                    nodeArray[i+15].path = nodeArray[i+15].path.concat(nodeArray[i].path);
                 }
                 if (nodeArray[i-1].isAWall == false && nodeArray[i-1].visited == false){
                    nodeArray[i-1].visited = true;
                    nodeArray[i-1].backgroundcolor = "orange";
                    nodeArray[i-1].distance = nodeArray[i].distance +1;
                    nodeArray[i-1].path = nodeArray[i-1].path.concat(nodeArray[i].path);
                 }
                 if (nodeArray[i-15].isAWall == false && nodeArray[i-15].visited == false){
                    nodeArray[i-15].visited = true;
                    nodeArray[i-15].backgroundcolor = "orange";
                    nodeArray[i-15].distance = nodeArray[i].distance +1;
                    nodeArray[i-15].path = nodeArray[i-15].path.concat(nodeArray[i].path);
                 }
            }
            if (nodeArray[i].id == 210){
                 if (nodeArray[i+1].isAWall == false && nodeArray[i+1].visited == false){
                    nodeArray[i+1].visited = true;
                    nodeArray[i+1].backgroundcolor = "orange";
                    nodeArray[i+1].distance = nodeArray[i].distance +1;                   
                    nodeArray[i+1].path = nodeArray[i+1].path.concat(nodeArray[i].path);
                 }
                 if (nodeArray[i-15].isAWall == false && nodeArray[i-15].visited == false){
                    nodeArray[i-15].visited = true;
                    nodeArray[i-15].backgroundcolor = "orange";
                    nodeArray[i-15].distance = nodeArray[i].distance +1;
                    nodeArray[i-15].path = nodeArray[i-15].path.concat(nodeArray[i].path);
                 } 
            }
            if (nodeArray[i].id > 210 && nodeArray[i].id < 224){
                if (nodeArray[i+1].isAWall == false && nodeArray[i+1].visited == false){
                    nodeArray[i+1].visited = true;                
                    nodeArray[i+1].backgroundcolor = "orange";
                    nodeArray[i+1].distance = nodeArray[i].distance +1;
                    nodeArray[i+1].path = nodeArray[i+1].path.concat(nodeArray[i].path);
                }
                  if (nodeArray[i-1].isAWall == false && nodeArray[i-1].visited == false){
                    nodeArray[i-1].visited = true;
                    nodeArray[i-1].backgroundcolor = "orange";
                    nodeArray[i-1].distance = nodeArray[i].distance +1;
                    nodeArray[i-1].path = nodeArray[i-1].path.concat(nodeArray[i].path);
                }
                if (nodeArray[i-15].isAWall == false && nodeArray[i-15].visited == false){
                    nodeArray[i-15].visited = true;
                    nodeArray[i-15].backgroundcolor = "orange";
                    nodeArray[i-15].distance = nodeArray[i].distance +1;
                    nodeArray[i-15].path = nodeArray[i-15].path.concat(nodeArray[i].path);
                }
            }
            if (nodeArray[i].id == 224){
                 if (nodeArray[i-1].isAWall == false && nodeArray[i-1].visited == false){
                    nodeArray[i-1].visited = true;
                    nodeArray[i-1].backgroundcolor = "orange";
                    nodeArray[i-1].distance = nodeArray[i].distance +1;
                    nodeArray[i-1].path = nodeArray[i-1].path.concat(nodeArray[i].path);
                 }
                 if (nodeArray[i-15].isAWall == false && nodeArray[i-15].visited == false){
                    nodeArray[i-15].visited = true;
                    nodeArray[i-15].backgroundcolor = "orange";
                    nodeArray[i-15].distance = nodeArray[i].distance +1;
                    nodeArray[i-15].path = nodeArray[i-15].path.concat(nodeArray[i].path);
                 } 
            }
                if (nodeArray[i].id > 14 && nodeArray[i].id < 210 && nodeArray[i].id %15 != 0 && (nodeArray[i].id+1)%15 != 0){
                    if (nodeArray[i+1].isAWall == false && nodeArray[i+1].visited == false){
                    nodeArray[i+1].visited = true;
                    nodeArray[i+1].backgroundcolor = "orange";
                    nodeArray[i+1].distance = nodeArray[i].distance +1;
                    nodeArray[i+1].path = nodeArray[i+1].path.concat(nodeArray[i].path);
                }
                    if (nodeArray[i+15].isAWall == false && nodeArray[i+15].visited == false){
                    nodeArray[i+15].visited = true;
                    nodeArray[i+15].backgroundcolor = "orange";
                    nodeArray[i+15].distance = nodeArray[i].distance +1;
                    nodeArray[i+15].path = nodeArray[i+15].path.concat(nodeArray[i].path);
                 }
                    if (nodeArray[i-1].isAWall == false && nodeArray[i-1].visited == false){
                    nodeArray[i-1].visited = true;
                    nodeArray[i-1].backgroundcolor = "orange";
                    nodeArray[i-1].distance = nodeArray[i].distance +1;
                    nodeArray[i-1].path = nodeArray[i-1].path.concat(nodeArray[i].path);
                }
                    if (nodeArray[i-15].isAWall == false && nodeArray[i-15].visited == false){
                    nodeArray[i-15].visited = true;
                    nodeArray[i-15].backgroundcolor = "orange";
                    nodeArray[i-15].distance = nodeArray[i].distance +1;
                    nodeArray[i-15].path = nodeArray[i-15].path.concat(nodeArray[i].path);
                 } 
                }
        }
    }
    
    return nodeArray;
};

//Popuate the Distance == 5 nodes
     function populateValidTiles5(nodeArray){
    for (var i=0; i<nodeArray.length; i++){
        if (nodeArray[i].visited == true){       
            if (nodeArray[i].distance == 5){    
            document.getElementById(nodeArray[i].id).style.backgroundColor = nodeArray[i].backgroundcolor;
        }}}  
};

function identifyValidTiles6(nodeArray){
    for (i=0; i<nodeArray.length; i++){
        if (nodeArray[i].visited == true && nodeArray[i].distance == 5){
            if (nodeArray[i].id == 0){
                if (nodeArray[i+1].isAWall == false && nodeArray[i+1].visited == false){
                    nodeArray[i+1].visited = true;
                    nodeArray[i+1].backgroundcolor = "peru";
                    nodeArray[i+1].distance = nodeArray[i].distance +1;
                    nodeArray[i+1].path = nodeArray[i+1].path.concat(nodeArray[i].path);
                }
                if (nodeArray[i+15].isAWall == false && nodeArray[i+15].visited == false){
                    nodeArray[i+15].visited = true;
                    nodeArray[i+15].backgroundcolor = "peru";
                    nodeArray[i+15].distance = nodeArray[i].distance +1;
                    nodeArray[i+15].path = nodeArray[i+15].path.concat(nodeArray[i].path);
                }
            }
            if (nodeArray[i].id > 0 && nodeArray[i].id < 14){
                if (nodeArray[i+1].isAWall == false && nodeArray[i+1].visited == false){
                    nodeArray[i+1].visited = true;
                    nodeArray[i+1].backgroundcolor = "peru";
                    nodeArray[i+1].distance = nodeArray[i].distance +1;
                    nodeArray[i+1].path = nodeArray[i+1].path.concat(nodeArray[i].path);
                }
                  if (nodeArray[i+15].isAWall == false && nodeArray[i+15].visited == false){
                    nodeArray[i+15].visited = true;
                    nodeArray[i+15].backgroundcolor = "peru";
                    nodeArray[i+15].distance = nodeArray[i].distance +1;
                    nodeArray[i+15].path = nodeArray[i+15].path.concat(nodeArray[i].path);
                }
                  if (nodeArray[i-1].isAWall == false && nodeArray[i-1].visited == false){
                    nodeArray[i-1].visited = true;
                    nodeArray[i-1].backgroundcolor = "peru";
                    nodeArray[i-1].distance = nodeArray[i].distance +1;
                    nodeArray[i-1].path = nodeArray[i-1].path.concat(nodeArray[i].path);
                }
            }
            if (nodeArray[i].id == 14){
                 if (nodeArray[i+15].isAWall == false && nodeArray[i+15].visited == false){
                    nodeArray[i+15].visited = true;
                    nodeArray[i+15].backgroundcolor = "peru";
                    nodeArray[i+15].distance = nodeArray[i].distance +1;
                    nodeArray[i+15].path = nodeArray[i+15].path.concat(nodeArray[i].path);
                }
                  if (nodeArray[i-1].isAWall == false && nodeArray[i-1].visited == false){
                    nodeArray[i-1].visited = true;
                    nodeArray[i-1].backgroundcolor = "peru";
                    nodeArray[i-1].distance = nodeArray[i].distance +1;
                    nodeArray[i-1].path = nodeArray[i-1].path.concat(nodeArray[i].path);
                }
            }
            if (nodeArray[i].id > 0 && nodeArray[i].id < 210 && nodeArray[i].id %15 == 0){
                 if (nodeArray[i+1].isAWall == false && nodeArray[i+1].visited == false){
                    nodeArray[i+1].visited = true;
                    nodeArray[i+1].backgroundcolor = "peru";
                    nodeArray[i+1].distance = nodeArray[i].distance +1;
                    nodeArray[i+1].path = nodeArray[i+1].path.concat(nodeArray[i].path);
                 }
                 if (nodeArray[i+15].isAWall == false && nodeArray[i+15].visited == false){
                    nodeArray[i+15].visited = true;
                    nodeArray[i+15].backgroundcolor = "peru";
                    nodeArray[i+15].distance = nodeArray[i].distance +1;
                    nodeArray[i+15].path = nodeArray[i+15].path.concat(nodeArray[i].path);
                 }
                 if (nodeArray[i-15].isAWall == false && nodeArray[i-15].visited == false){
                    nodeArray[i-15].visited = true;
                    nodeArray[i-15].backgroundcolor = "peru";
                    nodeArray[i-15].distance = nodeArray[i].distance +1;
                    nodeArray[i-15].path = nodeArray[i-15].path.concat(nodeArray[i].path);
                 }
            }
            if (nodeArray[i].id > 14 && nodeArray[i].id < 224 && (nodeArray[i].id+1) %15 == 0){
                 if (nodeArray[i+15].isAWall == false && nodeArray[i+15].visited == false){
                    nodeArray[i+15].visited = true;
                    nodeArray[i+15].backgroundcolor = "peru";
                    nodeArray[i+15].distance = nodeArray[i].distance +1;
                    nodeArray[i+15].path = nodeArray[i+15].path.concat(nodeArray[i].path);
                 }
                 if (nodeArray[i-1].isAWall == false && nodeArray[i-1].visited == false){
                    nodeArray[i-1].visited = true;
                    nodeArray[i-1].backgroundcolor = "peru";
                    nodeArray[i-1].distance = nodeArray[i].distance +1;
                    nodeArray[i-1].path = nodeArray[i-1].path.concat(nodeArray[i].path);
                 }
                 if (nodeArray[i-15].isAWall == false && nodeArray[i-15].visited == false){
                    nodeArray[i-15].visited = true;
                    nodeArray[i-15].backgroundcolor = "peru";
                    nodeArray[i-15].distance = nodeArray[i].distance +1;
                    nodeArray[i-15].path = nodeArray[i-15].path.concat(nodeArray[i].path);
                 }
            }
            if (nodeArray[i].id == 210){
                 if (nodeArray[i+1].isAWall == false && nodeArray[i+1].visited == false){
                    nodeArray[i+1].visited = true;
                    nodeArray[i+1].backgroundcolor = "peru";
                    nodeArray[i+1].distance = nodeArray[i].distance +1;                   
                    nodeArray[i+1].path = nodeArray[i+1].path.concat(nodeArray[i].path);
                 }
                 if (nodeArray[i-15].isAWall == false && nodeArray[i-15].visited == false){
                    nodeArray[i-15].visited = true;
                    nodeArray[i-15].backgroundcolor = "peru";
                    nodeArray[i-15].distance = nodeArray[i].distance +1;
                    nodeArray[i-15].path = nodeArray[i-15].path.concat(nodeArray[i].path);
                 } 
            }
            if (nodeArray[i].id > 210 && nodeArray[i].id < 224){
                if (nodeArray[i+1].isAWall == false && nodeArray[i+1].visited == false){
                    nodeArray[i+1].visited = true;                
                    nodeArray[i+1].backgroundcolor = "peru";
                    nodeArray[i+1].distance = nodeArray[i].distance +1;
                    nodeArray[i+1].path = nodeArray[i+1].path.concat(nodeArray[i].path);
                }
                  if (nodeArray[i-1].isAWall == false && nodeArray[i-1].visited == false){
                    nodeArray[i-1].visited = true;
                    nodeArray[i-1].backgroundcolor = "peru";
                    nodeArray[i-1].distance = nodeArray[i].distance +1;
                    nodeArray[i-1].path = nodeArray[i-1].path.concat(nodeArray[i].path);
                }
                if (nodeArray[i-15].isAWall == false && nodeArray[i-15].visited == false){
                    nodeArray[i-15].visited = true;
                    nodeArray[i-15].backgroundcolor = "peru";
                    nodeArray[i-15].distance = nodeArray[i].distance +1;
                    nodeArray[i-15].path = nodeArray[i-15].path.concat(nodeArray[i].path);
                }
            }
            if (nodeArray[i].id == 224){
                 if (nodeArray[i-1].isAWall == false && nodeArray[i-1].visited == false){
                    nodeArray[i-1].visited = true;
                    nodeArray[i-1].backgroundcolor = "orange";
                    nodeArray[i-1].distance = nodeArray[i].distance +1;
                    nodeArray[i-1].path = nodeArray[i-1].path.concat(nodeArray[i].path);
                 }
                 if (nodeArray[i-15].isAWall == false && nodeArray[i-15].visited == false){
                    nodeArray[i-15].visited = true;
                    nodeArray[i-15].backgroundcolor = "peru";
                    nodeArray[i-15].distance = nodeArray[i].distance +1;
                    nodeArray[i-15].path = nodeArray[i-15].path.concat(nodeArray[i].path);
                 } 
            }
                if (nodeArray[i].id > 14 && nodeArray[i].id < 210 && nodeArray[i].id %15 != 0 && (nodeArray[i].id+1)%15 != 0){
                    if (nodeArray[i+1].isAWall == false && nodeArray[i+1].visited == false){
                    nodeArray[i+1].visited = true;
                    nodeArray[i+1].backgroundcolor = "peru";
                    nodeArray[i+1].distance = nodeArray[i].distance +1;
                    nodeArray[i+1].path = nodeArray[i+1].path.concat(nodeArray[i].path);
                }
                    if (nodeArray[i+15].isAWall == false && nodeArray[i+15].visited == false){
                    nodeArray[i+15].visited = true;
                    nodeArray[i+15].backgroundcolor = "peru";
                    nodeArray[i+15].distance = nodeArray[i].distance +1;
                    nodeArray[i+15].path = nodeArray[i+15].path.concat(nodeArray[i].path);
                 }
                    if (nodeArray[i-1].isAWall == false && nodeArray[i-1].visited == false){
                    nodeArray[i-1].visited = true;
                    nodeArray[i-1].backgroundcolor = "peru";
                    nodeArray[i-1].distance = nodeArray[i].distance +1;
                    nodeArray[i-1].path = nodeArray[i-1].path.concat(nodeArray[i].path);
                }
                    if (nodeArray[i-15].isAWall == false && nodeArray[i-15].visited == false){
                    nodeArray[i-15].visited = true;
                    nodeArray[i-15].backgroundcolor = "peru";
                    nodeArray[i-15].distance = nodeArray[i].distance +1;
                    nodeArray[i-15].path = nodeArray[i-15].path.concat(nodeArray[i].path);
                 } 
                }
        }
    }
    
    return nodeArray;
};

//Popuate the Distance == 6 nodes
     function populateValidTiles6(nodeArray){
    for (var i=0; i<nodeArray.length; i++){
        if (nodeArray[i].visited == true){       
            if (nodeArray[i].distance == 6){    
            document.getElementById(nodeArray[i].id).style.backgroundColor = nodeArray[i].backgroundcolor;
        }}}  
};

function identifyValidTiles7(nodeArray){
    for (i=0; i<nodeArray.length; i++){
        if (nodeArray[i].visited == true && nodeArray[i].distance == 6){
            if (nodeArray[i].id == 0){
                if (nodeArray[i+1].isAWall == false && nodeArray[i+1].visited == false){
                    nodeArray[i+1].visited = true;
                    nodeArray[i+1].backgroundcolor = "olive";
                    nodeArray[i+1].distance = nodeArray[i].distance +1;
                    nodeArray[i+1].path = nodeArray[i+1].path.concat(nodeArray[i].path);
                }
                if (nodeArray[i+15].isAWall == false && nodeArray[i+15].visited == false){
                    nodeArray[i+15].visited = true;
                    nodeArray[i+15].backgroundcolor = "olive";
                    nodeArray[i+15].distance = nodeArray[i].distance +1;
                    nodeArray[i+15].path = nodeArray[i+15].path.concat(nodeArray[i].path);
                }
            }
            if (nodeArray[i].id > 0 && nodeArray[i].id < 14){
                if (nodeArray[i+1].isAWall == false && nodeArray[i+1].visited == false){
                    nodeArray[i+1].visited = true;
                    nodeArray[i+1].backgroundcolor = "olive";
                    nodeArray[i+1].distance = nodeArray[i].distance +1;
                    nodeArray[i+1].path = nodeArray[i+1].path.concat(nodeArray[i].path);
                }
                  if (nodeArray[i+15].isAWall == false && nodeArray[i+15].visited == false){
                    nodeArray[i+15].visited = true;
                    nodeArray[i+15].backgroundcolor = "olive";
                    nodeArray[i+15].distance = nodeArray[i].distance +1;
                    nodeArray[i+15].path = nodeArray[i+15].path.concat(nodeArray[i].path);
                }
                  if (nodeArray[i-1].isAWall == false && nodeArray[i-1].visited == false){
                    nodeArray[i-1].visited = true;
                    nodeArray[i-1].backgroundcolor = "olive";
                    nodeArray[i-1].distance = nodeArray[i].distance +1;
                    nodeArray[i-1].path = nodeArray[i-1].path.concat(nodeArray[i].path);
                }
            }
            if (nodeArray[i].id == 14){
                 if (nodeArray[i+15].isAWall == false && nodeArray[i+15].visited == false){
                    nodeArray[i+15].visited = true;
                    nodeArray[i+15].backgroundcolor = "olive";
                    nodeArray[i+15].distance = nodeArray[i].distance +1;
                    nodeArray[i+15].path = nodeArray[i+15].path.concat(nodeArray[i].path);
                }
                  if (nodeArray[i-1].isAWall == false && nodeArray[i-1].visited == false){
                    nodeArray[i-1].visited = true;
                    nodeArray[i-1].backgroundcolor = "olive";
                    nodeArray[i-1].distance = nodeArray[i].distance +1;
                    nodeArray[i-1].path = nodeArray[i-1].path.concat(nodeArray[i].path);
                }
            }
            if (nodeArray[i].id > 0 && nodeArray[i].id < 210 && nodeArray[i].id %15 == 0){
                 if (nodeArray[i+1].isAWall == false && nodeArray[i+1].visited == false){
                    nodeArray[i+1].visited = true;
                    nodeArray[i+1].backgroundcolor = "olive";
                    nodeArray[i+1].distance = nodeArray[i].distance +1;
                    nodeArray[i+1].path = nodeArray[i+1].path.concat(nodeArray[i].path);
                 }
                 if (nodeArray[i+15].isAWall == false && nodeArray[i+15].visited == false){
                    nodeArray[i+15].visited = true;
                    nodeArray[i+15].backgroundcolor = "olive";
                    nodeArray[i+15].distance = nodeArray[i].distance +1;
                    nodeArray[i+15].path = nodeArray[i+15].path.concat(nodeArray[i].path);
                 }
                 if (nodeArray[i-15].isAWall == false && nodeArray[i-15].visited == false){
                    nodeArray[i-15].visited = true;
                    nodeArray[i-15].backgroundcolor = "olive";
                    nodeArray[i-15].distance = nodeArray[i].distance +1;
                    nodeArray[i-15].path = nodeArray[i-15].path.concat(nodeArray[i].path);
                 }
            }
            if (nodeArray[i].id > 14 && nodeArray[i].id < 224 && (nodeArray[i].id+1) %15 == 0){
                 if (nodeArray[i+15].isAWall == false && nodeArray[i+15].visited == false){
                    nodeArray[i+15].visited = true;
                    nodeArray[i+15].backgroundcolor = "olive";
                    nodeArray[i+15].distance = nodeArray[i].distance +1;
                    nodeArray[i+15].path = nodeArray[i+15].path.concat(nodeArray[i].path);
                 }
                 if (nodeArray[i-1].isAWall == false && nodeArray[i-1].visited == false){
                    nodeArray[i-1].visited = true;
                    nodeArray[i-1].backgroundcolor = "olive";
                    nodeArray[i-1].distance = nodeArray[i].distance +1;
                    nodeArray[i-1].path = nodeArray[i-1].path.concat(nodeArray[i].path);
                 }
                 if (nodeArray[i-15].isAWall == false && nodeArray[i-15].visited == false){
                    nodeArray[i-15].visited = true;
                    nodeArray[i-15].backgroundcolor = "olive";
                    nodeArray[i-15].distance = nodeArray[i].distance +1;
                    nodeArray[i-15].path = nodeArray[i-15].path.concat(nodeArray[i].path);
                 }
            }
            if (nodeArray[i].id == 210){
                 if (nodeArray[i+1].isAWall == false && nodeArray[i+1].visited == false){
                    nodeArray[i+1].visited = true;
                    nodeArray[i+1].backgroundcolor = "olive";
                    nodeArray[i+1].distance = nodeArray[i].distance +1;                   
                    nodeArray[i+1].path = nodeArray[i+1].path.concat(nodeArray[i].path);
                 }
                 if (nodeArray[i-15].isAWall == false && nodeArray[i-15].visited == false){
                    nodeArray[i-15].visited = true;
                    nodeArray[i-15].backgroundcolor = "olive";
                    nodeArray[i-15].distance = nodeArray[i].distance +1;
                    nodeArray[i-15].path = nodeArray[i-15].path.concat(nodeArray[i].path);
                 } 
            }
            if (nodeArray[i].id > 210 && nodeArray[i].id < 224){
                if (nodeArray[i+1].isAWall == false && nodeArray[i+1].visited == false){
                    nodeArray[i+1].visited = true;                
                    nodeArray[i+1].backgroundcolor = "olive";
                    nodeArray[i+1].distance = nodeArray[i].distance +1;
                    nodeArray[i+1].path = nodeArray[i+1].path.concat(nodeArray[i].path);
                }
                  if (nodeArray[i-1].isAWall == false && nodeArray[i-1].visited == false){
                    nodeArray[i-1].visited = true;
                    nodeArray[i-1].backgroundcolor = "olive";
                    nodeArray[i-1].distance = nodeArray[i].distance +1;
                    nodeArray[i-1].path = nodeArray[i-1].path.concat(nodeArray[i].path);
                }
                if (nodeArray[i-15].isAWall == false && nodeArray[i-15].visited == false){
                    nodeArray[i-15].visited = true;
                    nodeArray[i-15].backgroundcolor = "olive";
                    nodeArray[i-15].distance = nodeArray[i].distance +1;
                    nodeArray[i-15].path = nodeArray[i-15].path.concat(nodeArray[i].path);
                }
            }
            if (nodeArray[i].id == 224){
                 if (nodeArray[i-1].isAWall == false && nodeArray[i-1].visited == false){
                    nodeArray[i-1].visited = true;
                    nodeArray[i-1].backgroundcolor = "olive";
                    nodeArray[i-1].distance = nodeArray[i].distance +1;
                    nodeArray[i-1].path = nodeArray[i-1].path.concat(nodeArray[i].path);
                 }
                 if (nodeArray[i-15].isAWall == false && nodeArray[i-15].visited == false){
                    nodeArray[i-15].visited = true;
                    nodeArray[i-15].backgroundcolor = "olive";
                    nodeArray[i-15].distance = nodeArray[i].distance +1;
                    nodeArray[i-15].path = nodeArray[i-15].path.concat(nodeArray[i].path);
                 } 
            }
                if (nodeArray[i].id > 14 && nodeArray[i].id < 210 && nodeArray[i].id %15 != 0 && (nodeArray[i].id+1)%15 != 0){
                    if (nodeArray[i+1].isAWall == false && nodeArray[i+1].visited == false){
                    nodeArray[i+1].visited = true;
                    nodeArray[i+1].backgroundcolor = "olive";
                    nodeArray[i+1].distance = nodeArray[i].distance +1;
                    nodeArray[i+1].path = nodeArray[i+1].path.concat(nodeArray[i].path);
                }
                    if (nodeArray[i+15].isAWall == false && nodeArray[i+15].visited == false){
                    nodeArray[i+15].visited = true;
                    nodeArray[i+15].backgroundcolor = "olive";
                    nodeArray[i+15].distance = nodeArray[i].distance +1;
                    nodeArray[i+15].path = nodeArray[i+15].path.concat(nodeArray[i].path);
                 }
                    if (nodeArray[i-1].isAWall == false && nodeArray[i-1].visited == false){
                    nodeArray[i-1].visited = true;
                    nodeArray[i-1].backgroundcolor = "olive";
                    nodeArray[i-1].distance = nodeArray[i].distance +1;
                    nodeArray[i-1].path = nodeArray[i-1].path.concat(nodeArray[i].path);
                }
                    if (nodeArray[i-15].isAWall == false && nodeArray[i-15].visited == false){
                    nodeArray[i-15].visited = true;
                    nodeArray[i-15].backgroundcolor = "olive";
                    nodeArray[i-15].distance = nodeArray[i].distance +1;
                    nodeArray[i-15].path = nodeArray[i-15].path.concat(nodeArray[i].path);
                 } 
                }
        }
    }
    
    return nodeArray;
};

//Popuate the Distance == 7 nodes
     function populateValidTiles7(nodeArray){
    for (var i=0; i<nodeArray.length; i++){
        if (nodeArray[i].visited == true){       
            if (nodeArray[i].distance == 7){    
            document.getElementById(nodeArray[i].id).style.backgroundColor = nodeArray[i].backgroundcolor;
        }}}  
};

function identifyValidTiles8(nodeArray){
    for (i=0; i<nodeArray.length; i++){
        if (nodeArray[i].visited == true && nodeArray[i].distance == 7){
            if (nodeArray[i].id == 0){
                if (nodeArray[i+1].isAWall == false && nodeArray[i+1].visited == false){
                    nodeArray[i+1].visited = true;
                    nodeArray[i+1].backgroundcolor = "darkgreen";
                    nodeArray[i+1].distance = nodeArray[i].distance +1;
                    nodeArray[i+1].path = nodeArray[i+1].path.concat(nodeArray[i].path);
                }
                if (nodeArray[i+15].isAWall == false && nodeArray[i+15].visited == false){
                    nodeArray[i+15].visited = true;
                    nodeArray[i+15].backgroundcolor = "darkgreen";
                    nodeArray[i+15].distance = nodeArray[i].distance +1;
                    nodeArray[i+15].path = nodeArray[i+15].path.concat(nodeArray[i].path);
                }
            }
            if (nodeArray[i].id > 0 && nodeArray[i].id < 14){
                if (nodeArray[i+1].isAWall == false && nodeArray[i+1].visited == false){
                    nodeArray[i+1].visited = true;
                    nodeArray[i+1].backgroundcolor = "darkgreen";
                    nodeArray[i+1].distance = nodeArray[i].distance +1;
                    nodeArray[i+1].path = nodeArray[i+1].path.concat(nodeArray[i].path);
                }
                  if (nodeArray[i+15].isAWall == false && nodeArray[i+15].visited == false){
                    nodeArray[i+15].visited = true;
                    nodeArray[i+15].backgroundcolor = "darkgreen";
                    nodeArray[i+15].distance = nodeArray[i].distance +1;
                    nodeArray[i+15].path = nodeArray[i+15].path.concat(nodeArray[i].path);
                }
                  if (nodeArray[i-1].isAWall == false && nodeArray[i-1].visited == false){
                    nodeArray[i-1].visited = true;
                    nodeArray[i-1].backgroundcolor = "darkgreen";
                    nodeArray[i-1].distance = nodeArray[i].distance +1;
                    nodeArray[i-1].path = nodeArray[i-1].path.concat(nodeArray[i].path);
                }
            }
            if (nodeArray[i].id == 14){
                 if (nodeArray[i+15].isAWall == false && nodeArray[i+15].visited == false){
                    nodeArray[i+15].visited = true;
                    nodeArray[i+15].backgroundcolor = "darkgreen";
                    nodeArray[i+15].distance = nodeArray[i].distance +1;
                    nodeArray[i+15].path = nodeArray[i+15].path.concat(nodeArray[i].path);
                }
                  if (nodeArray[i-1].isAWall == false && nodeArray[i-1].visited == false){
                    nodeArray[i-1].visited = true;
                    nodeArray[i-1].backgroundcolor = "darkgreen";
                    nodeArray[i-1].distance = nodeArray[i].distance +1;
                    nodeArray[i-1].path = nodeArray[i-1].path.concat(nodeArray[i].path);
                }
            }
            if (nodeArray[i].id > 0 && nodeArray[i].id < 210 && nodeArray[i].id %15 == 0){
                 if (nodeArray[i+1].isAWall == false && nodeArray[i+1].visited == false){
                    nodeArray[i+1].visited = true;
                    nodeArray[i+1].backgroundcolor = "darkgreen";
                    nodeArray[i+1].distance = nodeArray[i].distance +1;
                    nodeArray[i+1].path = nodeArray[i+1].path.concat(nodeArray[i].path);
                 }
                 if (nodeArray[i+15].isAWall == false && nodeArray[i+15].visited == false){
                    nodeArray[i+15].visited = true;
                    nodeArray[i+15].backgroundcolor = "darkgreen";
                    nodeArray[i+15].distance = nodeArray[i].distance +1;
                    nodeArray[i+15].path = nodeArray[i+15].path.concat(nodeArray[i].path);
                 }
                 if (nodeArray[i-15].isAWall == false && nodeArray[i-15].visited == false){
                    nodeArray[i-15].visited = true;
                    nodeArray[i-15].backgroundcolor = "darkgreen";
                    nodeArray[i-15].distance = nodeArray[i].distance +1;
                    nodeArray[i-15].path = nodeArray[i-15].path.concat(nodeArray[i].path);
                 }
            }
            if (nodeArray[i].id > 14 && nodeArray[i].id < 224 && (nodeArray[i].id+1) %15 == 0){
                 if (nodeArray[i+15].isAWall == false && nodeArray[i+15].visited == false){
                    nodeArray[i+15].visited = true;
                    nodeArray[i+15].backgroundcolor = "darkgreen";
                    nodeArray[i+15].distance = nodeArray[i].distance +1;
                    nodeArray[i+15].path = nodeArray[i+15].path.concat(nodeArray[i].path);
                 }
                 if (nodeArray[i-1].isAWall == false && nodeArray[i-1].visited == false){
                    nodeArray[i-1].visited = true;
                    nodeArray[i-1].backgroundcolor = "darkgreen";
                    nodeArray[i-1].distance = nodeArray[i].distance +1;
                    nodeArray[i-1].path = nodeArray[i-1].path.concat(nodeArray[i].path);
                 }
                 if (nodeArray[i-15].isAWall == false && nodeArray[i-15].visited == false){
                    nodeArray[i-15].visited = true;
                    nodeArray[i-15].backgroundcolor = "darkgreen";
                    nodeArray[i-15].distance = nodeArray[i].distance +1;
                    nodeArray[i-15].path = nodeArray[i-15].path.concat(nodeArray[i].path);
                 }
            }
            if (nodeArray[i].id == 210){
                 if (nodeArray[i+1].isAWall == false && nodeArray[i+1].visited == false){
                    nodeArray[i+1].visited = true;
                    nodeArray[i+1].backgroundcolor = "darkgreen";
                    nodeArray[i+1].distance = nodeArray[i].distance +1;                   
                    nodeArray[i+1].path = nodeArray[i+1].path.concat(nodeArray[i].path);
                 }
                 if (nodeArray[i-15].isAWall == false && nodeArray[i-15].visited == false){
                    nodeArray[i-15].visited = true;
                    nodeArray[i-15].backgroundcolor = "darkgreen";
                    nodeArray[i-15].distance = nodeArray[i].distance +1;
                    nodeArray[i-15].path = nodeArray[i-15].path.concat(nodeArray[i].path);
                 } 
            }
            if (nodeArray[i].id > 210 && nodeArray[i].id < 224){
                if (nodeArray[i+1].isAWall == false && nodeArray[i+1].visited == false){
                    nodeArray[i+1].visited = true;                
                    nodeArray[i+1].backgroundcolor = "darkgreen";
                    nodeArray[i+1].distance = nodeArray[i].distance +1;
                    nodeArray[i+1].path = nodeArray[i+1].path.concat(nodeArray[i].path);
                }
                  if (nodeArray[i-1].isAWall == false && nodeArray[i-1].visited == false){
                    nodeArray[i-1].visited = true;
                    nodeArray[i-1].backgroundcolor = "darkgreen";
                    nodeArray[i-1].distance = nodeArray[i].distance +1;
                    nodeArray[i-1].path = nodeArray[i-1].path.concat(nodeArray[i].path);
                }
                if (nodeArray[i-15].isAWall == false && nodeArray[i-15].visited == false){
                    nodeArray[i-15].visited = true;
                    nodeArray[i-15].backgroundcolor = "darkgreen";
                    nodeArray[i-15].distance = nodeArray[i].distance +1;
                    nodeArray[i-15].path = nodeArray[i-15].path.concat(nodeArray[i].path);
                }
            }
            if (nodeArray[i].id == 224){
                 if (nodeArray[i-1].isAWall == false && nodeArray[i-1].visited == false){
                    nodeArray[i-1].visited = true;
                    nodeArray[i-1].backgroundcolor = "darkgreen";
                    nodeArray[i-1].distance = nodeArray[i].distance +1;
                    nodeArray[i-1].path = nodeArray[i-1].path.concat(nodeArray[i].path);
                 }
                 if (nodeArray[i-15].isAWall == false && nodeArray[i-15].visited == false){
                    nodeArray[i-15].visited = true;
                    nodeArray[i-15].backgroundcolor = "darkgreen";
                    nodeArray[i-15].distance = nodeArray[i].distance +1;
                    nodeArray[i-15].path = nodeArray[i-15].path.concat(nodeArray[i].path);
                 } 
            }
                if (nodeArray[i].id > 14 && nodeArray[i].id < 210 && nodeArray[i].id %15 != 0 && (nodeArray[i].id+1)%15 != 0){
                    if (nodeArray[i+1].isAWall == false && nodeArray[i+1].visited == false){
                    nodeArray[i+1].visited = true;
                    nodeArray[i+1].backgroundcolor = "darkgreen";
                    nodeArray[i+1].distance = nodeArray[i].distance +1;
                    nodeArray[i+1].path = nodeArray[i+1].path.concat(nodeArray[i].path);
                }
                    if (nodeArray[i+15].isAWall == false && nodeArray[i+15].visited == false){
                    nodeArray[i+15].visited = true;
                    nodeArray[i+15].backgroundcolor = "darkgreen";
                    nodeArray[i+15].distance = nodeArray[i].distance +1;
                    nodeArray[i+15].path = nodeArray[i+15].path.concat(nodeArray[i].path);
                 }
                    if (nodeArray[i-1].isAWall == false && nodeArray[i-1].visited == false){
                    nodeArray[i-1].visited = true;
                    nodeArray[i-1].backgroundcolor = "darkgreen";
                    nodeArray[i-1].distance = nodeArray[i].distance +1;
                    nodeArray[i-1].path = nodeArray[i-1].path.concat(nodeArray[i].path);
                }
                    if (nodeArray[i-15].isAWall == false && nodeArray[i-15].visited == false){
                    nodeArray[i-15].visited = true;
                    nodeArray[i-15].backgroundcolor = "darkgreen";
                    nodeArray[i-15].distance = nodeArray[i].distance +1;
                    nodeArray[i-15].path = nodeArray[i-15].path.concat(nodeArray[i].path);
                 } 
                }
        }
    }
    
    return nodeArray;
};

//Popuate the Distance == 8 nodes
     function populateValidTiles8(nodeArray){
    for (var i=0; i<nodeArray.length; i++){
        if (nodeArray[i].visited == true){       
            if (nodeArray[i].distance == 8){    
            document.getElementById(nodeArray[i].id).style.backgroundColor = nodeArray[i].backgroundcolor;
        }}}  
};



// var queue = [];
// queue.push(2);         // queue is now [2]
// queue.push(5);         // queue is now [2, 5]
// var i = queue.shift(); // queue is now [5]
// alert(i);              // displays 2



  function Node(id,backgroundcolor,distance,visited,isAWall,path){
  this.id = id;
  this.backgroundcolor = backgroundcolor;
  this.distance = distance;
  this.visited = visited;
  this.isAWall = isAWall;
  this.path = path;
};

function assignNodeProperties(allTiles,nodeArray){
    var myNode = {};
    var backgroundcolor = "empty";
    var path = [];
    for(i=0; i<allTiles.length; i++){
        myNode = new Node(i,backgroundcolor,0,false,false,path);
            nodeArray.push(myNode);
        };
return nodeArray;
};




//Used to eliminate duplicates throughout the process
// function eliminateDuplicates(queueForSearch) {
//   var i,
//       len=queueForSearch.length,
//       out=[],
//       obj={};
//   for (i=0;i<len;i++) {
//     obj[queueForSearch[i]]=0;
//   }
//   for (i in obj) {
//     out.push(i);
//   }
//   queueForSearch = out;
//   return queueForSearch;
// };


// //THIS CODE IS TO INITIATE A TIMER
// var x;
// function changeColors(){
//     x = 1;
//     setInterval(change, 1000);
// }
// function change() {
//     if (x === 1) {
//         color = "red";
//         x + 1;
//     } else {
//         color = "green";
//         x = 1;
//     }
//     document.body.style.background = color;
// }
