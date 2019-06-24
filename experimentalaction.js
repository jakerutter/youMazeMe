//https://github.com/jakerutter/youMazeMe

//Global Variables
var upAndDown = '';  
var wallNodes = [];
var nodeArray = [];
var nodesForEntryAndExit = [];
var entryNode;
var exitNode;
var colordepth;
var tID;
var timerId;
var allTiles = [];
var maxRow;
var maxColumn;
var isComplete;
var mazesWatchedCounter = 0;
var mazeStepsCounter = 0;
var mazeHasBegun = false;

// Colors the Node gray when it is hovered over.
$('.mazehole').hover(function() {
($('#htmlloc').html(this.id))},
function(){
    $('#htmlloc').html('');
});

//Run the Program based on User Selected Size
var rowsAndColumns = $("#numOfRows");
function startMaze() {
    document.getElementById('mazeExplanation').classList.add('hidden');

    if ($('#numOfRows').val() === 'Select'){return;}
    if (mazeHasBegun){
        reInitMaze();
        mazeHasBegun = false;
    }

    mazeHasBegun = true;
    if ($('#numOfRows').val() != 'Select') {
     mazesWatchedCounter += 1;
    TrackMazesWatched(mazesWatchedCounter);
    } else{ return;}

    if (isComplete) { 
        reInitMaze();
        mazeStepsCounter = 0;
        TrackMazeStepsToEntry(mazeStepsCounter);
    }
    var userChoice = $('#numOfRows').val();
   
    maxRow = Number(userChoice);
    maxColumn = Number(userChoice);
    Maze.gradient.setMaxDepth(maxRow + maxColumn);
    
    createDivs(maxRow);
    var htmlString = '.';
    $('.mazehole').each(function(){
    var isTileHtml = $(this).attr('id');
    $('#'+isTileHtml).html(htmlString);
    });

    prepMaze(nodeArray);
    //runMazePhase1(nodeArray);
    //runMazePhase2(nodeArray);
    
};


//FUNCTIONS BELOW

//Delete the divs from the previous maze and reset values
function reInitMaze() {
    document.getElementsByClassName('mazehole').remove();
    upAndDown = undefined;
    wallNodes.length = 0;
    nodeArray.length = 0;
    nodesForEntryAndExit.length = 0;
    entryNode = undefined;
    exitNode = undefined;
    colordepth = undefined;
    tID = undefined;
    clearInterval(timerId);
    // clearInterval(timerId2);
    timerId = undefined;
    timerId2 = undefined;
    allTiles.length = 0;
    maxRow = undefined;
    maxColumn = undefined;
    isComplete = undefined;
    userChoice = undefined;
    rowsAndColumns = undefined;
    i = undefined;
    index = undefined;
    x = undefined;
    isTile = undefined;
    Orientation = undefined;
    myNode = undefined;
    mazeStepsCounter = 0;
}

//Helper function for deleting elements by class name -- used by reInitMaze()
    NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}

//Creates the divs based on maxRow and maxColumn
function createDivs(maxRow) {
  var wrapperDiv = document.getElementById('mazeWrapper');
  var rowDiv;
	for (var i=0; i < maxRow; i++) {
	    var thisDiv = document.createElement('div');
        thisDiv.id = 'mazeRow-' + i;
        thisDiv.className = 'row';
  	    wrapperDiv.appendChild(thisDiv);
        for (var j=0; j < maxColumn; j++) {
            rowDiv = document.getElementById('mazeRow-' + i);
            var thisColumnDiv = document.createElement('div');
            thisColumnDiv.id = (i*maxRow)+j;
            thisColumnDiv.className = 'mazehole';
            rowDiv.appendChild(thisColumnDiv);
        }
    }
}

//Set up the maze Orientation and Walls
function prepMaze(nodeArray){
  var locked = true;
  assignAllNodeIdsToAllTilesArray();
  determineMazeOrientation();
  assignNodeProperties(allTiles,nodeArray);
  generateWallTiles(upAndDown,nodeArray,wallNodes);
  
  prepareWallsForPopulateOnTimer(wallNodes);
}

//CREATE LOCKING SEMAPHORE
function validatePrepComplete(busy) {

    if (!busy){
        runMazePhase1(nodeArray);
    } else {
        return;
    }
    
}

//color the walls black one at a time, randomly
function prepareWallsForPopulateOnTimer(wallNodes) {
  var busy = true;
  var populateWallTimer = setInterval(function(){
    //let node = getValueFromArray(wallNodes);
    let wallCount = wallNodes.length -1;   
    
    if (wallCount <= 0){
        clearInterval(populateWallTimer);
        busy = false;
    }

    let node = wallNodes[0];
    populateWallTiles(node);
    removeItemFromArrayByValue(wallNodes, node);

  }, 50);

    var validateEndPrep = setInterval(function(){
      validatePrepComplete(busy);
      if(!busy) {
        clearInterval(validateEndPrep);
      }
    }, 200);
}

//Set up Entry and Exit and Populate them
function runMazePhase1(nodeArray) {
    //delay the creation and population of entry and exit by 2 seconds
    setTimeout(function(){
        createEntryAndExitNodes(upAndDown);
        entryNode = nodesForEntryAndExit[0];
        exitNode = nodesForEntryAndExit[1];
        populateEntryTile(entryNode, nodeArray);
        populateExitTile(exitNode, nodeArray);
    }, 2000);
    
  
    runMazePhase2(nodeArray);
};

//BFS Search and Populate Maze
function runMazePhase2(nodeArray) {
    //delate the maze search by 4 seconds
    setTimeout(function(){
        var searchSpeed = $('#searchSpeed').val();
        searchSpeed = Number(searchSpeed);
        identifyNodesNextToEntry(entryNode, nodeArray);
        tID = setTimeout(populateNodesNextToEntry, searchSpeed, nodeArray);
        identifyValidTiles(nodeArray, exitNode);
        colordepth = 2;
        //Timer that delays the populating of nodes for the search
        timerId = setInterval(function () {
            populateValidTiles2(nodeArray, exitNode)
        }, searchSpeed);

        return nodeArray;
    }, 4000);
    
};

// //assignes each mazehole id to var isTile and pushes them into allTile
function assignAllNodeIdsToAllTilesArray(){

  $('.mazehole').each(function() {
    var isTile = $(this).attr('id');
     allTiles.push(isTile);

    return allTiles;    
});
};

//Function determines the orientation of the maze (Vertical or Horizontal)
function determineMazeOrientation(){
    
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
     entryNode = 0;
   if (x)
    {
        entryNode = Math.floor((Math.random() *((maxRow*maxRow-1)-(maxRow*maxRow-maxRow))) + (maxRow*maxRow-maxRow));
        exitNode = Math.floor(Math.random()*(maxRow-0));  
    }
  else {
    while (entryNode <= 0 || entryNode == maxRow-1){
        entryNode = (Math.floor(Math.random()*((maxRow-1)-0)))*maxRow-1;}
        exitNode = (Math.floor(Math.random()*((maxRow-2)-0)))*maxRow;
};
  nodesForEntryAndExit.push(entryNode);
  nodesForEntryAndExit.push(exitNode);
  return (nodesForEntryAndExit);
};

//Function to generate Wall Tiles
function generateWallTiles(upAndDown,nodeArray,wallNodes){
    var wallDensity = $('#wallDensity').val();
    wallDensity = Number(wallDensity);
    while (wallNodes.length<(maxRow*maxRow*wallDensity)){
    if (!upAndDown){
        isWall  = (Math.floor(Math.random()*((maxRow*maxRow-1)-0+1))+0);
        while ((isWall % maxRow == 0) || ((isWall-(maxRow-1))%maxRow == 0) || (isWall == maxRow-1)){
            isWall  = (Math.floor(Math.random()*((maxRow*maxRow-1)-0+1))+0);}
            for (var i=0; i<nodeArray.length; i++){
                if (nodeArray[i].id == isWall){
                nodeArray[i].isAWall = true;
                nodeArray[i].backgroundcolor = 'black';
                wallNodes.push(isWall);
            }
                }}
    else{
        isWall = (Math.floor(Math.random()*((maxRow*maxRow-(maxRow+1))-maxRow+1)) + maxRow);
        for (var i=0; i<nodeArray.length; i++){
                if (nodeArray[i].id == isWall){
                nodeArray[i].isAWall = true;
                nodeArray[i].backgroundcolor = 'black';
                wallNodes.push(isWall);
            }
        }}
    }
    return nodeArray
};

//Function to populate Wall Tiles
function populateWallTiles(node){ 

    document.getElementById(node).style.backgroundColor = nodeArray[node].backgroundcolor;
    
}

//Function to populate Entry Tile
function populateEntryTile(entryNode,nodeArray){
    for (var i=0; i<nodeArray.length; i++){
        if (nodeArray[i].id == entryNode){
            nodeArray[i].distance = 0;
            nodeArray[i].visited = true;
            nodeArray[i].backgroundcolor = nodeArray[i].backgroundcolor[nodeArray[i].distance];
            document.getElementById(entryNode).style.backgroundColor = nodeArray[i].backgroundcolor;
        }
    }
    return nodeArray; 
};

//Function to populate Exit Tile
function populateExitTile(exitNode,nodeArray){
    for(var i=0; i<nodeArray.length; i++){
     if (nodeArray[i].id == exitNode){
            nodeArray[i].distance = 0;
            nodeArray[i].visited = false;
            document.getElementById(exitNode).style.backgroundColor = 'firebrick';
     }
    }
    return nodeArray;
};

//find nodes next to entry tile and set their Visited to True & distance to 1
function identifyNodesNextToEntry(entryNode, nodeArray) {
    var i = entryNode;
    // i.pointer = -2;
    if (upAndDown) {
        if (entryNode < (maxRow*maxRow-1) && nodeArray[i + 1].visited == false) {
            progressMazeFirstMove(nodeArray,nodeArray[i].id, nodeArray[i+1].id);
        }
        if (entryNode != (maxRow*maxRow-maxRow) && nodeArray[i - 1].visited == false) {
            progressMazeFirstMove(nodeArray,nodeArray[i].id, nodeArray[i-1].id);
        }
        if (nodeArray[i - maxRow].isAWall == false) {
            progressMazeFirstMove(nodeArray,nodeArray[i].id, nodeArray[i-maxRow].id);
        }
    }
    else {
        if (nodeArray[i + maxRow].visited == false) {
            progressMazeFirstMove(nodeArray,nodeArray[i].id, nodeArray[i+maxRow].id);
        }
        if (nodeArray[i - maxRow].visited == false) {
            progressMazeFirstMove(nodeArray,nodeArray[i].id, nodeArray[i-maxRow].id);
        }
        if (nodeArray[i - 1].isAWall == false) {
            progressMazeFirstMove(nodeArray,nodeArray[i].id, nodeArray[i-1].id);
        }
    }
    return nodeArray;
};

//Popuate the nodes next to entry
function populateNodesNextToEntry(nodeArray){
    for (var i=0; i<nodeArray.length; i++){
        if (nodeArray[i].visited == true){       
            if (nodeArray[i].distance == 1){    
            //IN TESTING
            nodeArray[i].backgroundcolor = nodeArray[i].backgroundcolor[nodeArray[i].distance];
            //nodeArray[i].backgroundcolor = Maze.getBackgroundColor(nodeArray[i].distance);
            document.getElementById(nodeArray[i].id).style.backgroundColor = nodeArray[i].backgroundcolor;
            }
        }
    }
    return nodeArray;  
};

       
// Function will identify and Queue the nodes for searching and stops when depth exceeds variable below.
function identifyValidTiles(nodeArray,exitNode){
        var depth = 0;
        index = exitNode;
        while(nodeArray[index].visited == false){
            depth +=1;
        for (i=0; i<nodeArray.length; i++){
        if (nodeArray[i].visited == true && nodeArray[i].distance == depth){
            if (nodeArray[i].id == exitNode){
                nodeArray[i].visited = true;
            }
            if (nodeArray[i].id == 0){
                if (nodeArray[i+1].isAWall == false && nodeArray[i+1].visited == false){
                    progressMaze(nodeArray,nodeArray[i].id,nodeArray[i+1].id);      
                }
                if (nodeArray[i+maxRow].isAWall == false && nodeArray[i+maxRow].visited == false){
                    progressMaze(nodeArray,nodeArray[i].id,nodeArray[i+maxRow].id);     
                }
            }
            if (nodeArray[i].id > 0 && nodeArray[i].id < maxRow-1){
                if (nodeArray[i+1].isAWall == false && nodeArray[i+1].visited == false){
                    progressMaze(nodeArray,nodeArray[i].id,nodeArray[i+1].id); 
                }
                  if (nodeArray[i+maxRow].isAWall == false && nodeArray[i+maxRow].visited == false){
                    progressMaze(nodeArray,nodeArray[i].id,nodeArray[i+maxRow].id);  
                }
                  if (nodeArray[i-1].isAWall == false && nodeArray[i-1].visited == false){
                    progressMaze(nodeArray,nodeArray[i].id,nodeArray[i-1].id);
                }
            }
            if (nodeArray[i].id == maxRow-1){
                 if (nodeArray[i+maxRow].isAWall == false && nodeArray[i+maxRow].visited == false){
                    progressMaze(nodeArray,nodeArray[i].id,nodeArray[i+maxRow].id);      
                }
                  if (nodeArray[i-1].isAWall == false && nodeArray[i-1].visited == false){
                       progressMaze(nodeArray,nodeArray[i].id,nodeArray[i-1].id);                   
                }
            }
            if (nodeArray[i].id > 0 && nodeArray[i].id < (maxRow*maxRow-maxRow) && nodeArray[i].id %maxRow == 0){
                 if (nodeArray[i+1].isAWall == false && nodeArray[i+1].visited == false){
                    progressMaze(nodeArray,nodeArray[i].id,nodeArray[i+1].id);  
                 }
                 if (nodeArray[i+maxRow].isAWall == false && nodeArray[i+maxRow].visited == false){
                    progressMaze(nodeArray,nodeArray[i].id,nodeArray[i+maxRow].id);                     
                 }
                 if (nodeArray[i-maxRow].isAWall == false && nodeArray[i-maxRow].visited == false){
                    progressMaze(nodeArray,nodeArray[i].id,nodeArray[i-maxRow].id);              
                 }
            }
            if (nodeArray[i].id > maxRow-1 && nodeArray[i].id < (maxRow*maxRow-1) && (nodeArray[i].id+1) %maxRow == 0){
                 if (nodeArray[i+maxRow].isAWall == false && nodeArray[i+maxRow].visited == false){
                    progressMaze(nodeArray,nodeArray[i].id,nodeArray[i+maxRow].id);
                 }
                 if (nodeArray[i-1].isAWall == false && nodeArray[i-1].visited == false){
                    progressMaze(nodeArray,nodeArray[i].id,nodeArray[i-1].id); 
                 }
                 if (nodeArray[i-maxRow].isAWall == false && nodeArray[i-maxRow].visited == false){
                    progressMaze(nodeArray,nodeArray[i].id,nodeArray[i-maxRow].id); 
                 }
            }
            if (nodeArray[i].id == maxRow*maxRow-maxRow){
                 if (nodeArray[i+1].isAWall == false && nodeArray[i+1].visited == false){
                    progressMaze(nodeArray,nodeArray[i].id,nodeArray[i+1].id);
                 }
                 if (nodeArray[i-maxRow].isAWall == false && nodeArray[i-maxRow].visited == false){
                    progressMaze(nodeArray,nodeArray[i].id,nodeArray[i-maxRow].id);  
                 } 
            }
            if (nodeArray[i].id > maxRow*maxRow-maxRow && nodeArray[i].id < maxRow*maxRow-1){
                if (nodeArray[i+1].isAWall == false && nodeArray[i+1].visited == false){
                    progressMaze(nodeArray,nodeArray[i].id,nodeArray[i+1].id);
                }
                  if (nodeArray[i-1].isAWall == false && nodeArray[i-1].visited == false){
                    progressMaze(nodeArray,nodeArray[i].id,nodeArray[i-1].id);
                }
                if (nodeArray[i-maxRow].isAWall == false && nodeArray[i-maxRow].visited == false){
                    progressMaze(nodeArray,nodeArray[i].id,nodeArray[i-maxRow].id);
                }
            }
            if (nodeArray[i].id == maxRow*maxRow-1){
                 if (nodeArray[i-1].isAWall == false && nodeArray[i-1].visited == false){
                    progressMaze(nodeArray,nodeArray[i].id,nodeArray[i-1].id);
                 }
                 if (nodeArray[i-maxRow].isAWall == false && nodeArray[i-maxRow].visited == false){
                    progressMaze(nodeArray,nodeArray[i].id,nodeArray[i-maxRow].id);
                 } 
            }
                if (nodeArray[i].id >maxRow-1 && nodeArray[i].id <maxRow*maxRow-maxRow && nodeArray[i].id %maxRow != 0 && (nodeArray[i].id+1)%maxRow != 0){
                    if (nodeArray[i+1].isAWall == false && nodeArray[i+1].visited == false){
                    progressMaze(nodeArray,nodeArray[i].id,nodeArray[i+1].id);
                }
                    if (nodeArray[i+maxRow].isAWall == false && nodeArray[i+maxRow].visited == false){
                    progressMaze(nodeArray,nodeArray[i].id,nodeArray[i+maxRow].id);
                 }
                    if (nodeArray[i-1].isAWall == false && nodeArray[i-1].visited == false){
                    progressMaze(nodeArray,nodeArray[i].id,nodeArray[i-1].id);              
                }
                    if (nodeArray[i-maxRow].isAWall == false && nodeArray[i-maxRow].visited == false){
                    progressMaze(nodeArray,nodeArray[i].id,nodeArray[i-maxRow].id);
                    } 
                }
        } 
    }
} 
    return nodeArray;
};

//Progress maze
function progressMazeFirstMove(nodeArray,oldNode,newNode){
    nodeArray[newNode].visited = true;
    nodeArray[newNode].distance = 1;
    nodeArray[newNode].pointer = nodeArray[oldNode].id;
    return nodeArray;
}

function progressMaze(nodeArray,oldNode,newNode){
    nodeArray[newNode].visited = true;
    nodeArray[newNode].distance = nodeArray[oldNode].distance +1;
    // nodeArray[newNode].backgroundcolor = nodeArray[newNode].backgroundcolor[nodeArray[newNode].distance];
    nodeArray[newNode].backgroundcolor = Maze.getBackgroundColor(nodeArray[newNode].distance);
    nodeArray[newNode].pointer = nodeArray[oldNode].id;
        return nodeArray;
}

//Populate valid tiles beyond the first set of tiles
function populateValidTiles2(nodeArray, exitNode) {
    for (i = 0; i < nodeArray.length; i++) {
        if (nodeArray[i].visited == true) {
            if (nodeArray[i].distance == colordepth && nodeArray[i].id != exitNode) {
                document.getElementById(nodeArray[i].id).style.backgroundColor = nodeArray[i].backgroundcolor;
            }
        }
    }
    colordepth += 1;
    if (colordepth == maxRow*3) {
        clearInterval(timerId);
        theOptimalPath();
    }
    return nodeArray;
};

//retrieve optimal node that reaches the exit and color that path, show distance
function theOptimalPath() {
    var searchSpeed = $('#searchSpeed').val();
    searchSpeed = Number(searchSpeed);
    var optimalPathArray = [];
    optimalPathArray.length = 0;
    var index = exitNode; 
    while (index != entryNode) {
         timerId2 = setInterval(function () { 
    populateTheOptimalPath(optimalPathArray) 
}, searchSpeed); 
    mazeStepsCounter = nodeArray[index].distance;
    TrackMazeStepsToEntry(mazeStepsCounter);
    mazeHasBegun = false;
    isComplete = true;
    return index;
    }
clearInterval(timerId2);
}

//Populate optimal path
function populateTheOptimalPath(optimalPathArray) {
        if (index == entryNode){
        }
        else {
        optimalPathArray.push(nodeArray[index].pointer);
        nodeArray[index].backgroundcolor = '#FFFFFF';
        document.getElementById(nodeArray[index].id).style.backgroundColor = nodeArray[index].backgroundcolor;
        $('#'+nodeArray[index].id).html(nodeArray[index].distance);
        index = nodeArray[nodeArray[index].pointer].id;
        return index;
        }
   }

//Define Nodes
  function Node(id,backgroundcolor,distance,visited,isAWall,pointer){
  this.id = id;
  this.backgroundcolor = backgroundcolor;
  this.distance = distance;
  this.visited = visited;
  this.isAWall = isAWall;
  this.pointer = pointer;
};

//Set all nodes with their initial values  
function assignNodeProperties(allTiles,nodeArray){
    var myNode = {};
    var backgroundcolor = {
        '0': 'green', '1': '#1e12bc'
    };
  
    for(i=0; i<allTiles.length; i++){
        myNode = new Node(i,backgroundcolor,0,false,false,-1);
            nodeArray.push(myNode);
        };
return nodeArray;
};


//Adding Stat Tracking Functionality below// 

//How many times the Maze is ran
function TrackMazesWatched(mazesWatchedCounter){
var span = document.getElementById('mazesWatched');
while(span.firstChild) {
    span.removeChild(span.firstChild);
}
span.appendChild(document.createTextNode(mazesWatchedCounter.toString()) );

}

//How many steps it took the maze to reach Entry Node
function TrackMazeStepsToEntry(mazeStepsCounter){
var span = document.getElementById('stepsToEntry');
while(span.firstChild) {
    span.removeChild(span.firstChild);
}
span.appendChild(document.createTextNode(mazeStepsCounter.toString()) );

}