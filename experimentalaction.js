//Global Variables
var upAndDown = "";  
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

// Colors the Node gray when it is hovered over.
$('.mazehole').hover(function() {
($('#htmlloc').html(this.id))},
function(){
    $('#htmlloc').html("");
});


//Run the Program based on User Selected Size
var rowsAndColumns = $("#numOfRows");
rowsAndColumns.on("change", function (dropdown) {
    var userChoice = $("#numOfRows").val();
    // var userChoice = e.options[e.selectedIndex].text;
    maxRow = Number(userChoice);
    maxColumn = Number(userChoice);
    createDivs(maxRow);
    var htmlString = ".";
    $(".mazehole").each(function(){
    var isTileHtml = $(this).attr('id');
    $("#"+isTileHtml).html(htmlString);
    });
    prepMaze(nodeArray);
    runMazePhase1(nodeArray);
    runMazePhase2(nodeArray);
});






//FUNCTIONS BELOW
//Creates the divs based on maxRow and maxColumn
function createDivs(maxRow) {
  var wrapperDiv = document.getElementById("mazeWrapper");
  var rowDiv;
	for (var i=0; i < maxRow; i++) {
		var thisDiv = document.createElement("div");
    thisDiv.id = "mazeRow-" + i;
    thisDiv.className = "row";
  	wrapperDiv.appendChild(thisDiv);
  	for (var j=0; j < maxColumn; j++) {
    	rowDiv = document.getElementById("mazeRow-" + i);
			var thisColumnDiv = document.createElement("div");
      thisColumnDiv.id = (i*maxRow)+j;
      thisColumnDiv.className = "mazehole";
      rowDiv.appendChild(thisColumnDiv);
    }
  }
}
//Set up the maze Orientation and Walls
function prepMaze(nodeArray){
  assignAllNodeIdsToAllTilesArray();
  determineMazeOrientation(upAndDown);
  assignNodeProperties(allTiles,nodeArray);
  
  generateWallTiles(upAndDown,nodeArray,wallNodes);
  populateWallTiles(nodeArray);
  return nodeArray;
}
//Set up Entry and Exit and Populate them
function runMazePhase1(nodeArray){
createEntryAndExitNodes(upAndDown);
entryNode = nodesForEntryAndExit[0];
exitNode = nodesForEntryAndExit[1];
populateEntryTile(entryNode,nodeArray);
populateExitTile(exitNode,nodeArray);
return nodeArray;
};
//BFS Search and Populate Maze
function runMazePhase2(nodeArray){
identifyNodesNextToEntry(entryNode,nodeArray);
tID = setTimeout(populateNodesNextToEntry,50,nodeArray);
identifyValidTiles(nodeArray,exitNode);
colordepth = 2;
//Timer that delays the populating of nodes for the search
timerId = setInterval(function () { 
    populateValidTiles2(nodeArray, exitNode) 
}, 50);
return nodeArray;
};

// //assignes each mazehole id to var isTile and pushes them into allTile
function assignAllNodeIdsToAllTilesArray(){
  $(".mazehole").each(function() {
    var isTile = $(this).attr('id');
     allTiles.push(isTile);
    return allTiles;    
});
};
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
        var entryNode = Math.floor((Math.random() *((maxRow*maxRow-1)-(maxRow*maxRow-maxRow))) + (maxRow*maxRow-maxRow));
        var exitNode = Math.floor(Math.random()*(maxRow-0));  
    }
  else {
    while (entryNode <= 0 || entryNode == maxRow-1){
        var entryNode = (Math.floor(Math.random()*((maxRow-1)-0)))*maxRow-1;}
        var exitNode = (Math.floor(Math.random()*((maxRow-2)-0)))*maxRow;
};
  nodesForEntryAndExit.push(entryNode);
  nodesForEntryAndExit.push(exitNode);
  return (nodesForEntryAndExit);
};
//Function to generate Wall Tiles
function generateWallTiles(upAndDown,nodeArray,wallNodes){
    while (wallNodes.length<(maxRow*maxRow/3.4)){
    if (!upAndDown){
        isWall  = (Math.floor(Math.random()*((maxRow*maxRow-1)-0+1))+0);
        while ((isWall % maxRow == 0) || ((isWall-(maxRow-1))%maxRow == 0) || (isWall == maxRow-1)){
            isWall  = (Math.floor(Math.random()*((maxRow*maxRow-1)-0+1))+0);}
            for (i=0; i<nodeArray.length; i++){
                if (nodeArray[i].id == isWall){
                nodeArray[i].isAWall = true;
                nodeArray[i].backgroundcolor = "black";
                wallNodes.push(isWall);
            }
                }}
    else{
        isWall = (Math.floor(Math.random()*((maxRow*maxRow-(maxRow+1))-maxRow+1)) + maxRow);
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
function populateEntryTile(entryNode,nodeArray){
    for (i=0; i<nodeArray.length; i++){
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
    for(i=0; i<nodeArray.length; i++){
     if (nodeArray[i].id == exitNode){
            nodeArray[i].distance = 0;
            nodeArray[i].visited = false;
            document.getElementById(exitNode).style.backgroundColor = "firebrick";
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
            nodeArray[i].backgroundcolor = nodeArray[i].backgroundcolor[nodeArray[i].distance];
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
    nodeArray[newNode].backgroundcolor = nodeArray[newNode].backgroundcolor[nodeArray[newNode].distance];
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
var theOptimalPath = function() {
    var optimalPathArray = [];
    var index = exitNode; 
    while (index != entryNode) {
        var timerId2 = setInterval(function () { 
    populateTheOptimalPath(optimalPathArray) 
}, 100); 
    function populateTheOptimalPath(optimalPathArray) {
        if (index == entryNode){
        }
        else {
        optimalPathArray.push(nodeArray[index].pointer);
        nodeArray[index].backgroundcolor = "#FFFFFF";
        document.getElementById(nodeArray[index].id).style.backgroundColor = nodeArray[index].backgroundcolor;
        $('#'+nodeArray[index].id).html(nodeArray[index].distance);
        index = nodeArray[nodeArray[index].pointer].id;
        return index;
        }
   }

    return index;
    }
clearInterval(timerId2);
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
        "0": "green", "1": "#1e12bc", "2": "#1218bc", "3": "#1229bc", "4": "#123abc",
        "5": "#124ebc", "6": "#1262bc", "7":"#1275bc", "8": "#1286bc", "9":"#129abc", "10":"#12aebc",
        "11":"#12bcb7", "12":"#12bca3", "13":"#12bc8f", "14":"#12bc7b", "15":"#12bc6a",
        "16":"#12bc56", "17":"#12bc42", "18":"#12bc12", "19": "#12bc1b", "20": "#1ebc12", "21": "#32bc12", 
        "22":"#45bc12", "23": "#51bc12", "24": "#64bc12", "25":"#78bc12", "26":"#8fbc12", 
        "27":"#a0bc12", "28":"#b7bc12", "29":"#bcae12", "30":"#bc9a12", "31":"#bc8612", "32":"#bc7312", 
        "33":"#bc5f12", "34": "#bc5112", "35":"#bc4212", "36":"#bc3412", "37": "#c90c0c", "38":"#ea0404",
        "39":"#fc0505", "40": "#ef0000", "41":"#f90000", "42":"#ff0000", "43":"#e20b38", "44":"#e20b6f",
        "45":"#e20ba9", "46":"#d70b32", "47":"#a50be2", "48":"#850be2", "49":"#410be2", "50":"#1e12bc",
        "51":"#1218bc", "52":"#1229bc", "53":"#123abc", "54":"#124ebc", "55":"#1262bc", "56":"#1275bc",
        "57": "#1286bc", "58":"#129abc", "59":"#12aebc", "60":"#12bcb7", "61":"#12bca3", "62":"#12bc8f", 
        "63":"#12bc7b", "64":"#12bc6a",  "65":"#12bc56", "66":"#12bc42", "67":"#12bc12", "68": "#12bc1b", 
        "69": "#1ebc12", "70": "#32bc12", "71":"#45bc12", "72": "#51bc12", "73": "#64bc12", "74":"#78bc12",
        "75":"#8fbc12", "76":"#a0bc12", "77":"#b7bc12", "78":"#bcae12", "79":"#bc9a12", "80":"#bc8612", "81":"#bc7312",
        "82":"#bc5f12", "83": "#bc5112", "84":"#bc4212", "85":"#bc3412", "86": "#c90c0c", "87":"#ea0404",
        "88":"#fc0505", "89": "#ef0000", "90":"#f90000", "91":"#ff0000", "92":"#e20b38", "93":"#e20b6f",
        "94":"#e20ba9", "95":"#d70b32", "96":"#a50be2", "97":"#850be2", "98":"#410be2", "99":"#1e12bc",
    };
    // var path = [];
    for(i=0; i<allTiles.length; i++){
        myNode = new Node(i,backgroundcolor,0,false,false,-1);
            nodeArray.push(myNode);
        };
return nodeArray;
};





