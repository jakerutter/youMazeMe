
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
populateNodesNextToEntry(nodeArray);
identifyValidTiles(nodeArray);
populateValidTiles(nodeArray);



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
    //alert("In populate walls. " + nodeArray.length);  
    for (i=0; i<nodeArray.length; i++){
       if (nodeArray[i].isAWall == true){
            document.getElementById(i).style.backgroundColor = "black";}
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
         if (i == entryNode){
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
function identifyValidTiles(nodeArray){ 
    for (i=0; i<nodeArray.length; i++){
        if (nodeArray[i].visited == true && nodeArray[i].id != entryNode){
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
     function populateValidTiles(nodeArray){
    for (var i=0; i<nodeArray.length; i++){
        if (nodeArray[i].visited == true){       
            if (nodeArray[i].distance == 2){    
            document.getElementById(nodeArray[i].id).style.backgroundColor = nodeArray[i].backgroundcolor;
        }}}  
};









// function populateValidTiles(queueForSearch,entryNode,wallNodes){   
//     var validNodes = [];
//     var newValidNodes = [];
//     validNodes = $(queueForSearch).not(wallNodes).get();
//     newValidNodes = $(validNodes).not(entryNode).get();
//     queueForSearch = [];                 
//     for(i=0; i<newValidNodes.length; i++){
//         queueForSearch.push(newValidNodes[i])         
//         document.getElementById(newValidNodes[i]).style.backgroundColor = "blue";
// }
//     return queueForSearch;
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
//         x = 2;
//     } else {
//         color = "green";
//         x = 1;
//     }
//     document.body.style.background = color;
// }


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
    var path = [];
    for(i=0; i<allTiles.length; i++){
        myNode = new Node(i,"empty",0,false,false,path);
            nodeArray.push(myNode);
        };
return nodeArray;
};


//Inside of myNode can create an object that holds an array. This array can
//hold the position of the tile that initialized that one and will then provide
//a trail back to the entry node.


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