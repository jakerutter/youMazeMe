
//Colors the Node gray when it is hovered over.
$('.mazehole').hover(function() {
($('#htmlloc').html(this.id))},
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
var finalPath = [];
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
populateEntryTile(entryNode,nodeArray);
populateExitTile(exitNode,nodeArray);
identifyNodesNextToEntry(entryNode,nodeArray);
var tID = setTimeout(populateNodesNextToEntry,500,nodeArray);
//clearTimeout(tID);
identifyValidTiles2(nodeArray,exitNode);

//Timer that delays the populating of nodes for the search
var myVar = setInterval(function(){populateValidTiles2(nodeArray,exitNode)}, 600);
     var colordepth = 2;
    function populateValidTiles2(nodeArray,exitNode){
        for (i=0; i<nodeArray.length; i++){
        if (nodeArray[i].visited == true){
            if(nodeArray[i].distance == colordepth && nodeArray[i].id != exitNode){ 
            document.getElementById(nodeArray[i].id).style.backgroundColor = nodeArray[i].backgroundcolor;
            }
        }
    }  
    colordepth += 1;
    return nodeArray;  
};
//clearInterval(myVar);
optimalPath(nodeArray,exitNode,finalPath);
//alert(finalPath.length);
// alert(finalPath);











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
            nodeArray[i].path.push(nodeArray[i].id);
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
            //nodeArray[i].backgroundcolor = nodeArray[i].backgroundcolor[nodeArray[i].distance];
            document.getElementById(exitNode).style.backgroundColor = "firebrick";
     }
    }
    return nodeArray;
};

//find nodes next to entry tile and set their Visited to True & distance to 1
function identifyNodesNextToEntry(entryNode,nodeArray){
      for (i=0; i<nodeArray.length; i++){
         if (nodeArray[i].id == entryNode){
            //nodeArray[i].visited = true;
            //nodeArray[i].distance = 0;
            //nodeArray[i].backgroundcolor = nodeArray[i].backgroundcolor[nodeArray[i].distance];
        if (upAndDown){
                if (entryNode < 224){
                nodeArray[i+1].visited = true;
                nodeArray[i+1].distance = 1;
                nodeArray[i+1].path = nodeArray[i].path;
                nodeArray[i+1].path.push(nodeArray[i+1].id);
                //Array.prototype.push.apply(nodeArray[i].path,nodeArray[i+1].path);
                 //alert(nodeArray[i+1].path);
              
                }
                if (entryNode != 210){
                    nodeArray[i-1].visited = true;
                    nodeArray[i-1].distance = 1;
                    nodeArray[i-1].path = nodeArray[i].path;
                    nodeArray[i-1].path.push(nodeArray[i-1].id);
                    //Array.prototype.push.apply(nodeArray[i].path,nodeArray[i-1].path);    
                }     
                if(nodeArray[i-15].isAWall == false){
                    nodeArray[i-15].visited = true;
                    nodeArray[i-15].distance = 1;
                    nodeArray[i-15].path = nodeArray[i].path;
                    nodeArray[i-15].path.push(nodeArray[i-15].id);
                    //Array.prototype.push.apply(nodeArray[i].path,nodeArray[i-15].path);
            }
                }
        else{
            nodeArray[i+15].visited = true;
            nodeArray[i+15].distance = 1;
            nodeArray[i+15].path.push(nodeArray[i].id);
            nodeArray[i-15].visited = true;
            nodeArray[i-15].distance = 1;
            nodeArray[i-15].path = nodeArray[i].path;
            nodeArray[i-15].path.push(nodeArray[i-15].id);
            //Array.prototype.push.apply(nodeArray[i].path,nodeArray[i-15].path);
            // alert(nodeArray[i-15].path);
            if (nodeArray[i-1].isAWall == false){
                    nodeArray[i-1].visited = true;
                    nodeArray[i-1].distance = 1;
                    nodeArray[i-1].path = nodeArray[i].path;
                    nodeArray[i-1].path.push(nodeArray[i-1].id);
                    //Array.prototype.push.apply(nodeArray[i].path,nodeArray[i-1].path);
            }      
           }}}
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
function identifyValidTiles2(nodeArray,exitNode){
        var depth = 0;
        while(depth < 38){
            depth +=1;
        for (i=0; i<nodeArray.length; i++){
        if (nodeArray[i].visited == true && nodeArray[i].distance == depth){
            if (nodeArray[i].id == exitNode){
                nodeArray[i].visited = true;
                nodeArray[i].path.push(nodeArray[i].id);
                // Array.prototype.push.apply(nodeArray[i].path)
            }
            if (nodeArray[i].id == 0){
                if (nodeArray[i+1].isAWall == false && nodeArray[i+1].visited == false){
                    nodeArray[i+1].visited = true;
                    nodeArray[i+1].distance = nodeArray[i].distance +1;
                    nodeArray[i+1].backgroundcolor = nodeArray[i+1].backgroundcolor[nodeArray[i+1].distance];
                    nodeArray[i+1].path = nodeArray[i].path;
                    nodeArray[i+1].path.push(nodeArray[i+1].id);
                    //Array.prototype.push.apply(nodeArray[i].path,nodeArray[i+1].path);
                    //alert(nodeArray[i+1].path);
                }
                if (nodeArray[i+15].isAWall == false && nodeArray[i+15].visited == false){
                    nodeArray[i+15].visited = true;
                    nodeArray[i+15].distance = nodeArray[i].distance +1;
                    nodeArray[i+15].backgroundcolor = nodeArray[i+15].backgroundcolor[nodeArray[i+15].distance];
                    nodeArray[i+15].path = nodeArray[i].path;
                    nodeArray[i+15].path.push(nodeArray[i+15].id);
                    //Array.prototype.push.apply(nodeArray[i].path,nodeArray[i+15].path);
                }
            }
            if (nodeArray[i].id > 0 && nodeArray[i].id < 14){
                if (nodeArray[i+1].isAWall == false && nodeArray[i+1].visited == false){
                    nodeArray[i+1].visited = true;
                    nodeArray[i+1].distance = nodeArray[i].distance +1;
                    nodeArray[i+1].backgroundcolor = nodeArray[i+1].backgroundcolor[nodeArray[i+1].distance];
                    nodeArray[i+1].path = nodeArray[i].path;
                    nodeArray[i+1].path.push(nodeArray[i+1].id);
                    //Array.prototype.push.apply(nodeArray[i].path,nodeArray[i+1].path);
                }
                  if (nodeArray[i+15].isAWall == false && nodeArray[i+15].visited == false){
                    nodeArray[i+15].visited = true;
                    nodeArray[i+15].distance = nodeArray[i].distance +1;
                    nodeArray[i+15].backgroundcolor = nodeArray[i+15].backgroundcolor[nodeArray[i+15].distance];
                    nodeArray[i+15].path = nodeArray[i].path;
                    nodeArray[i+15].path.push(nodeArray[i+15].id);
                    //Array.prototype.push.apply(nodeArray[i].path,nodeArray[i+15].path);
                }
                  if (nodeArray[i-1].isAWall == false && nodeArray[i-1].visited == false){
                    nodeArray[i-1].visited = true;
                    nodeArray[i-1].distance = nodeArray[i].distance +1;
                    nodeArray[i-1].backgroundcolor = nodeArray[i-1].backgroundcolor[nodeArray[i-1].distance];
                    nodeArray[i-1].path = nodeArray[i].path;
                    nodeArray[i-1].path.push(nodeArray[i-1].id);
                    //Array.prototype.push.apply(nodeArray[i].path,nodeArray[i-1].path);
                }
            }
            if (nodeArray[i].id == 14){
                 if (nodeArray[i+15].isAWall == false && nodeArray[i+15].visited == false){
                    nodeArray[i+15].visited = true;
                    nodeArray[i+15].distance = nodeArray[i].distance +1;
                    nodeArray[i+15].backgroundcolor = nodeArray[i+15].backgroundcolor[nodeArray[i+15].distance];
                    nodeArray[i+15].path = nodeArray[i].path;
                    nodeArray[i+15].path.push(nodeArray[i+15].id);
                    //Array.prototype.push.apply(nodeArray[i].path,nodeArray[i+15].path);
                }
                  if (nodeArray[i-1].isAWall == false && nodeArray[i-1].visited == false){
                    nodeArray[i-1].visited = true;
                    nodeArray[i-1].distance = nodeArray[i].distance +1;
                    nodeArray[i-1].backgroundcolor = nodeArray[i-1].backgroundcolor[nodeArray[i-1].distance];
                    nodeArray[i-1].path = nodeArray[i].path;
                    nodeArray[i-1].path.push(nodeArray[i-1].id);
                    //Array.prototype.push.apply(nodeArray[i].path,nodeArray[i-1].path);
                }
            }
            if (nodeArray[i].id > 0 && nodeArray[i].id < 210 && nodeArray[i].id %15 == 0){
                 if (nodeArray[i+1].isAWall == false && nodeArray[i+1].visited == false){
                    nodeArray[i+1].visited = true;
                    nodeArray[i+1].distance = nodeArray[i].distance +1;
                    nodeArray[i+1].backgroundcolor = nodeArray[i+1].backgroundcolor[nodeArray[i+1].distance];
                    nodeArray[i+1].path = nodeArray[i].path;
                    nodeArray[i+1].path.push(nodeArray[i+1].id);
                    //Array.prototype.push.apply(nodeArray[i].path,nodeArray[i+1].path);
                 }
                 if (nodeArray[i+15].isAWall == false && nodeArray[i+15].visited == false){
                    nodeArray[i+15].visited = true;
                    nodeArray[i+15].distance = nodeArray[i].distance +1;
                    nodeArray[i+15].backgroundcolor = nodeArray[i+15].backgroundcolor[nodeArray[i+15].distance];
                    nodeArray[i+15].path = nodeArray[i].path;
                    nodeArray[i+15].path.push(nodeArray[i+15].id);
                    //Array.prototype.push.apply(nodeArray[i].path,nodeArray[i+15].path);
                 }
                 if (nodeArray[i-15].isAWall == false && nodeArray[i-15].visited == false){
                    nodeArray[i-15].visited = true;
                    nodeArray[i-15].distance = nodeArray[i].distance +1;
                    nodeArray[i-15].backgroundcolor = nodeArray[i-15].backgroundcolor[nodeArray[i-15].distance];
                    nodeArray[i-15].path = nodeArray[i].path;
                    nodeArray[i-15].path.push(nodeArray[i-15].id);
                    //Array.prototype.push.apply(nodeArray[i].path,nodeArray[i-15].path);
                 }
            }
            if (nodeArray[i].id > 14 && nodeArray[i].id < 224 && (nodeArray[i].id+1) %15 == 0){
                 if (nodeArray[i+15].isAWall == false && nodeArray[i+15].visited == false){
                    nodeArray[i+15].visited = true;
                    nodeArray[i+15].distance = nodeArray[i].distance +1;
                    nodeArray[i+15].backgroundcolor = nodeArray[i+15].backgroundcolor[nodeArray[i+15].distance];
                    nodeArray[i+15].path = nodeArray[i].path;
                    nodeArray[i+15].path.push(nodeArray[i+15].id);
                    //Array.prototype.push.apply(nodeArray[i].path,nodeArray[i+15].path);
                 }
                 if (nodeArray[i-1].isAWall == false && nodeArray[i-1].visited == false){
                    nodeArray[i-1].visited = true;
                    nodeArray[i-1].distance = nodeArray[i].distance +1;
                    nodeArray[i-1].backgroundcolor = nodeArray[i-1].backgroundcolor[nodeArray[i-1].distance];
                    nodeArray[i-1].path = nodeArray[i].path;
                    nodeArray[i-1].path.push(nodeArray[i-1].id);
                    //Array.prototype.push.apply(nodeArray[i].path,nodeArray[i-1].path);
                 }
                 if (nodeArray[i-15].isAWall == false && nodeArray[i-15].visited == false){
                    nodeArray[i-15].visited = true;
                    nodeArray[i-15].distance = nodeArray[i].distance +1;
                    nodeArray[i-15].backgroundcolor = nodeArray[i-15].backgroundcolor[nodeArray[i-15].distance];
                    nodeArray[i-15].path = nodeArray[i].path;
                    nodeArray[i-15].path.push(nodeArray[i-15].id);
                   // Array.prototype.push.apply(nodeArray[i].path,nodeArray[i-15].path);
                 }
            }
            if (nodeArray[i].id == 210){
                 if (nodeArray[i+1].isAWall == false && nodeArray[i+1].visited == false){
                    nodeArray[i+1].visited = true;
                    nodeArray[i+1].distance = nodeArray[i].distance +1;
                    nodeArray[i+1].backgroundcolor = nodeArray[i+1].backgroundcolor[nodeArray[i+1].distance];
                    nodeArray[i+1].path = nodeArray[i].path;                   
                    nodeArray[i+1].path.push(nodeArray[i+1].id);
                    //Array.prototype.push.apply(nodeArray[i].path,nodeArray[i+1].path);
                 }
                 if (nodeArray[i-15].isAWall == false && nodeArray[i-15].visited == false){
                    nodeArray[i-15].visited = true;
                    nodeArray[i-15].distance = nodeArray[i].distance +1;
                    nodeArray[i-15].backgroundcolor = nodeArray[i-15].backgroundcolor[nodeArray[i-15].distance];
                    nodeArray[i-15].path = nodeArray[i].path;
                    nodeArray[i-15].path.push(nodeArray[i-15].id);
                    //Array.prototype.push.apply(nodeArray[i].path,nodeArray[i-15].path);
                 } 
            }
            if (nodeArray[i].id > 210 && nodeArray[i].id < 224){
                if (nodeArray[i+1].isAWall == false && nodeArray[i+1].visited == false){
                    nodeArray[i+1].visited = true;                
                    nodeArray[i+1].distance = nodeArray[i].distance +1;
                    nodeArray[i+1].backgroundcolor = nodeArray[i+1].backgroundcolor[nodeArray[i+1].distance];
                    nodeArray[i+1].path = nodeArray[i].path;
                    nodeArray[i+1].path.push(nodeArray[i+1].id);
                    //Array.prototype.push.apply(nodeArray[i].path,nodeArray[i+1].path);
                }
                  if (nodeArray[i-1].isAWall == false && nodeArray[i-1].visited == false){
                    nodeArray[i-1].visited = true;
                    nodeArray[i-1].distance = nodeArray[i].distance +1;
                    nodeArray[i-1].backgroundcolor = nodeArray[i-1].backgroundcolor[nodeArray[i-1].distance];
                    nodeArray[i-1].path = nodeArray[i].path;
                    nodeArray[i-1].path.push(nodeArray[i-1].id);
                    //Array.prototype.push.apply(nodeArray[i].path,nodeArray[i-1].path);
                }
                if (nodeArray[i-15].isAWall == false && nodeArray[i-15].visited == false){
                    nodeArray[i-15].visited = true;
                    nodeArray[i-15].distance = nodeArray[i].distance +1;
                    nodeArray[i-15].backgroundcolor = nodeArray[i-15].backgroundcolor[nodeArray[i-15].distance];
                    nodeArray[i-15].path = nodeArray[i].path;
                    nodeArray[i-15].path.push(nodeArray[i-15].id);
                    //Array.prototype.push.apply(nodeArray[i].path,nodeArray[i-15].path);
                }
            }
            if (nodeArray[i].id == 224){
                 if (nodeArray[i-1].isAWall == false && nodeArray[i-1].visited == false){
                    nodeArray[i-1].visited = true;
                    nodeArray[i-1].distance = nodeArray[i].distance +1;
                    nodeArray[i-1].backgroundcolor = nodeArray[i-1].backgroundcolor[nodeArray[i-1].distance];
                    nodeArray[i-1].path = nodeArray[i].path;
                    nodeArray[i-1].path.push(nodeArray[i-1].id);
                    //Array.prototype.push.apply(nodeArray[i].path,nodeArray[i-1].path);
                 }
                 if (nodeArray[i-15].isAWall == false && nodeArray[i-15].visited == false){
                    nodeArray[i-15].visited = true;
                    nodeArray[i-15].distance = nodeArray[i].distance +1;
                    nodeArray[i-15].backgroundcolor = nodeArray[i-15].backgroundcolor[nodeArray[i-15].distance];
                    nodeArray[i-15].path = nodeArray[i].path;
                    nodeArray[i-15].path.push(nodeArray[i-15].id);
                    //Array.prototype.push.apply(nodeArray[i].path,nodeArray[i-15].path);
                 } 
            }
                if (nodeArray[i].id > 14 && nodeArray[i].id < 210 && nodeArray[i].id %15 != 0 && (nodeArray[i].id+1)%15 != 0){
                    if (nodeArray[i+1].isAWall == false && nodeArray[i+1].visited == false){
                    nodeArray[i+1].visited = true;
                    nodeArray[i+1].distance = nodeArray[i].distance +1;
                    nodeArray[i+1].backgroundcolor = nodeArray[i+1].backgroundcolor[nodeArray[i+1].distance];
                    nodeArray[i+1].path = nodeArray[i].path;
                    nodeArray[i+1].path.push(nodeArray[i+1].id);
                    //Array.prototype.push.apply(nodeArray[i].path,nodeArray[i+1].path);
                }
                    if (nodeArray[i+15].isAWall == false && nodeArray[i+15].visited == false){
                    nodeArray[i+15].visited = true;
                    nodeArray[i+15].distance = nodeArray[i].distance +1;
                    nodeArray[i+15].backgroundcolor = nodeArray[i+15].backgroundcolor[nodeArray[i+15].distance];
                    nodeArray[i+15].path = nodeArray[i].path;
                    nodeArray[i+15].path.push(nodeArray[i+15].id);
                    //Array.prototype.push.apply(nodeArray[i].path,nodeArray[i+15].path);
                 }
                    if (nodeArray[i-1].isAWall == false && nodeArray[i-1].visited == false){
                    nodeArray[i-1].visited = true;
                    nodeArray[i-1].distance = nodeArray[i].distance +1;
                    nodeArray[i-1].backgroundcolor = nodeArray[i-1].backgroundcolor[nodeArray[i-1].distance];
                    nodeArray[i-1].path = nodeArray[i].path;
                    nodeArray[i-1].path.push(nodeArray[i-1].id);
                    //Array.prototype.push.apply(nodeArray[i].path,nodeArray[i-1].path);
                }
                    if (nodeArray[i-15].isAWall == false && nodeArray[i-15].visited == false){
                    nodeArray[i-15].visited = true;
                    nodeArray[i-15].distance = nodeArray[i].distance +1;
                    nodeArray[i-15].backgroundcolor = nodeArray[i-15].backgroundcolor[nodeArray[i-15].distance];
                    nodeArray[i-15].path = nodeArray[i].path;
                    nodeArray[i-15].path.push(nodeArray[i-15].id);
                    //Array.prototype.push.apply(nodeArray[i].path,nodeArray[i-15].path);
                 } 
                }
        } 
    }
} 
    return nodeArray;
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
        "39":"#fc0505", "40": "purple", "41":"purple", "42":"purple", "43": "purple", "44":"purple",
    };
    var path = [];
    for(i=0; i<allTiles.length; i++){
        myNode = new Node(i,backgroundcolor,0,false,false,path);
            nodeArray.push(myNode);
        };
return nodeArray;
};

//display the optimum path to the exit
function optimalPath(nodeArray,exitNode,finalPath){
    for(i=0; i<nodeArray.length; i++){
        if (nodeArray[i].id == exitNode){
           for(x=0; x<nodeArray[i].path.length; x++){
               finalPath.push(nodeArray[i].path[x]);
           }
        }
    }
    return finalPath;
};

// function eliminateDuplicates(finalPath) {
//   var i,
//       len=finalPath.length,
//       out=[],
//       obj={};
//   for (i=0;i<len;i++) {
//     obj[finalPath[i]]=0;
//   }
//   for (i in obj) {
//     out.push(i);
//   }
//  finalPath = out;
//  alert(finalPath.length);
//   return finalPath;
// };