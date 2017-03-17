
//Colors the Node gray when it is hovered over.
$('.mazehole').hover(function() {
($('#htmlloc').html(this.title))},
function(){
    $('#htmlloc').html("");
});
//assignes each mazehole id to var isTile and pushes them into allTile
var allTiles = [];
$(".mazehole").each(function() {
    var isTile = $(this).attr('id');
     allTiles.push(isTile);
    return allTiles;    
});

var htmlString = ".";
$(".mazehole").each(function(){
    var isTileHtml = $(this).attr('id');
    $("#"+isTileHtml).html(htmlString);
    
});

var upAndDown = "";  
var finalPath = [];
var wallNodes = [];
var nodeArray = [];
var queueForSearch = [];
var nodesForEntryAndExit = [];
//REFACTORING REQUIRED
determineMazeOrientation(upAndDown);
assignNodeProperties(allTiles,nodeArray);
generateWallTiles(upAndDown,nodeArray,wallNodes);
populateWallTiles(nodeArray);
createEntryAndExitNodes(upAndDown);
var entryNode = nodesForEntryAndExit[0];
var exitNode = nodesForEntryAndExit[1];
// $('.EntryPositionX').text(entryNode);
// $('.EntryPositionY').text(exitNode);
populateEntryTile(entryNode,nodeArray);
populateExitTile(exitNode,nodeArray);
identifyNodesNextToEntry(entryNode,nodeArray);
var tID = setTimeout(populateNodesNextToEntry,50,nodeArray);
//clearTimeout(tID);
identifyValidTiles(nodeArray,exitNode);

//Timer that delays the populating of nodes for the search
var timerId = setInterval(function () { 
    populateValidTiles2(nodeArray, exitNode) 
}, 50);
var colordepth = 2;
function populateValidTiles2(nodeArray, exitNode) {
    for (i = 0; i < nodeArray.length; i++) {
        if (nodeArray[i].visited == true) {
            if (nodeArray[i].distance == colordepth && nodeArray[i].id != exitNode) {
                document.getElementById(nodeArray[i].id).style.backgroundColor = nodeArray[i].backgroundcolor;
            }
        }
    }
    colordepth += 1;
    if (colordepth >=50) {
        clearInterval(timerId);
        theOptimalPath();
    }
    return nodeArray;
};






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
    if (upAndDown) {
        if (entryNode < 224 && nodeArray[i + 1].visited == false) {
            progressMazeFirstMove(nodeArray,nodeArray[i].id, nodeArray[i+1].id);
        }
        if (entryNode != 210 && nodeArray[i - 1].visited == false) {
            progressMazeFirstMove(nodeArray,nodeArray[i].id, nodeArray[i-1].id);
        }
        if (nodeArray[i - 15].isAWall == false) {
            progressMazeFirstMove(nodeArray,nodeArray[i].id, nodeArray[i-15].id);
        }
    }
    else {
        if (nodeArray[i + 15].visited == false) {
            progressMazeFirstMove(nodeArray,nodeArray[i].id, nodeArray[i+15].id);
        }
        if (nodeArray[i - 15].visited == false) {
            progressMazeFirstMove(nodeArray,nodeArray[i].id, nodeArray[i-15].id);
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

       
// Function will identify and Queue the nodes for searching
function identifyValidTiles(nodeArray,exitNode){
        var depth = 0;
        while(depth < 50){
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
                if (nodeArray[i+15].isAWall == false && nodeArray[i+15].visited == false){
                    progressMaze(nodeArray,nodeArray[i].id,nodeArray[i+15].id);     
                }
            }
            if (nodeArray[i].id > 0 && nodeArray[i].id < 14){
                if (nodeArray[i+1].isAWall == false && nodeArray[i+1].visited == false){
                    progressMaze(nodeArray,nodeArray[i].id,nodeArray[i+1].id); 
                }
                  if (nodeArray[i+15].isAWall == false && nodeArray[i+15].visited == false){
                    progressMaze(nodeArray,nodeArray[i].id,nodeArray[i+15].id);  
                }
                  if (nodeArray[i-1].isAWall == false && nodeArray[i-1].visited == false){
                    progressMaze(nodeArray,nodeArray[i].id,nodeArray[i-1].id);
                }
            }
            if (nodeArray[i].id == 14){
                 if (nodeArray[i+15].isAWall == false && nodeArray[i+15].visited == false){
                    progressMaze(nodeArray,nodeArray[i].id,nodeArray[i+15].id);      
                }
                  if (nodeArray[i-1].isAWall == false && nodeArray[i-1].visited == false){
                       progressMaze(nodeArray,nodeArray[i].id,nodeArray[i-1].id);                   
                }
            }
            if (nodeArray[i].id > 0 && nodeArray[i].id < 210 && nodeArray[i].id %15 == 0){
                 if (nodeArray[i+1].isAWall == false && nodeArray[i+1].visited == false){
                    progressMaze(nodeArray,nodeArray[i].id,nodeArray[i+1].id);  
                 }
                 if (nodeArray[i+15].isAWall == false && nodeArray[i+15].visited == false){
                    progressMaze(nodeArray,nodeArray[i].id,nodeArray[i+15].id);                     
                 }
                 if (nodeArray[i-15].isAWall == false && nodeArray[i-15].visited == false){
                    progressMaze(nodeArray,nodeArray[i].id,nodeArray[i-15].id);              
                 }
            }
            if (nodeArray[i].id > 14 && nodeArray[i].id < 224 && (nodeArray[i].id+1) %15 == 0){
                 if (nodeArray[i+15].isAWall == false && nodeArray[i+15].visited == false){
                    progressMaze(nodeArray,nodeArray[i].id,nodeArray[i+15].id);
                 }
                 if (nodeArray[i-1].isAWall == false && nodeArray[i-1].visited == false){
                    progressMaze(nodeArray,nodeArray[i].id,nodeArray[i-1].id); 
                 }
                 if (nodeArray[i-15].isAWall == false && nodeArray[i-15].visited == false){
                    progressMaze(nodeArray,nodeArray[i].id,nodeArray[i-15].id); 
                 }
            }
            if (nodeArray[i].id == 210){
                 if (nodeArray[i+1].isAWall == false && nodeArray[i+1].visited == false){
                    progressMaze(nodeArray,nodeArray[i].id,nodeArray[i+1].id);
                 }
                 if (nodeArray[i-15].isAWall == false && nodeArray[i-15].visited == false){
                    progressMaze(nodeArray,nodeArray[i].id,nodeArray[i-15].id);  
                 } 
            }
            if (nodeArray[i].id > 210 && nodeArray[i].id < 224){
                if (nodeArray[i+1].isAWall == false && nodeArray[i+1].visited == false){
                    progressMaze(nodeArray,nodeArray[i].id,nodeArray[i+1].id);
                }
                  if (nodeArray[i-1].isAWall == false && nodeArray[i-1].visited == false){
                    progressMaze(nodeArray,nodeArray[i].id,nodeArray[i-1].id);
                }
                if (nodeArray[i-15].isAWall == false && nodeArray[i-15].visited == false){
                    progressMaze(nodeArray,nodeArray[i].id,nodeArray[i-15].id);
                }
            }
            if (nodeArray[i].id == 224){
                 if (nodeArray[i-1].isAWall == false && nodeArray[i-1].visited == false){
                    progressMaze(nodeArray,nodeArray[i].id,nodeArray[i-1].id);
                 }
                 if (nodeArray[i-15].isAWall == false && nodeArray[i-15].visited == false){
                    progressMaze(nodeArray,nodeArray[i].id,nodeArray[i-15].id);
                 } 
            }
                if (nodeArray[i].id > 14 && nodeArray[i].id < 210 && nodeArray[i].id %15 != 0 && (nodeArray[i].id+1)%15 != 0){
                    if (nodeArray[i+1].isAWall == false && nodeArray[i+1].visited == false){
                    progressMaze(nodeArray,nodeArray[i].id,nodeArray[i+1].id);
                }
                    if (nodeArray[i+15].isAWall == false && nodeArray[i+15].visited == false){
                    progressMaze(nodeArray,nodeArray[i].id,nodeArray[i+15].id);
                 }
                    if (nodeArray[i-1].isAWall == false && nodeArray[i-1].visited == false){
                    progressMaze(nodeArray,nodeArray[i].id,nodeArray[i-1].id);              
                }
                    if (nodeArray[i-15].isAWall == false && nodeArray[i-15].visited == false){
                    progressMaze(nodeArray,nodeArray[i].id,nodeArray[i-15].id);
                    } 
                }
        } 
    }
} 
    return nodeArray;
};
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
        "39":"#fc0505", "40": "#ef0000", "41":"#f90000", "42":"#ff0000", "43":"#e20b38", "44":"#e20b6f", "45":"#e20ba9"
    };
    var path = [];
    for(i=0; i<allTiles.length; i++){
        myNode = new Node(i,backgroundcolor,0,false,false,-1);
            nodeArray.push(myNode);
        };
return nodeArray;
};


function progressMaze(nodeArray,oldNode,newNode){
    nodeArray[newNode].visited = true;
    nodeArray[newNode].distance = nodeArray[oldNode].distance +1;
    nodeArray[newNode].backgroundcolor = nodeArray[newNode].backgroundcolor[nodeArray[newNode].distance];
    nodeArray[newNode].pointer = nodeArray[oldNode].id;
        return nodeArray;
}

function progressMazeFirstMove(nodeArray,oldNode,newNode){
    nodeArray[newNode].visited = true;
    nodeArray[newNode].distance = 1;
    nodeArray[newNode].pointer = nodeArray[oldNode].id;
    return nodeArray;
}
//works in opposite direction desired
//retrieve optimal node that reaches the exit and color that path, show distance
var theOptimalPath = function() {
    var optimalPathArray = [];
    var index = exitNode;
    while (index != entryNode) {
        var timerId2 = setInterval(function () { 
    populateTheOptimalPath(optimalPathArray) 
}, 100);
    function populateTheOptimalPath(optimalPathArray) {
        optimalPathArray.push(nodeArray[index].pointer);
        nodeArray[index].backgroundcolor = "#FF0000";
        document.getElementById(nodeArray[index].id).style.backgroundColor = nodeArray[index].backgroundcolor;
        ($('#'+nodeArray[index].id).html(nodeArray[index].distance));
        index = nodeArray[nodeArray[index].pointer].id;  
    }
     return index;
}
clearInterval(timerId2);
}