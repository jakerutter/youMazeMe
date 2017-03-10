
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
populateEntryTile(entryNode,nodeArray);
populateExitTile(exitNode,nodeArray);
identifyNodesNextToEntry(entryNode,nodeArray);
var tID = setTimeout(populateNodesNextToEntry,2000,nodeArray);
identifyValidTiles2(nodeArray,exitNode);
var tID2 = setInterval(populateValidTiles2,3500,nodeArray,exitNode);
//The following are simply to check my algorithms. I need to figure out how to do this in 1 function ideally.
// identifyValidTiles3(nodeArray);
// var tID3 = setTimeout(populateValidTiles3,5000,nodeArray);
// identifyValidTiles4(nodeArray);
// var tID4 = setTimeout(populateValidTiles4,6500,nodeArray);
// identifyValidTiles5(nodeArray);
// var tID5 = setTimeout(populateValidTiles5,8000,nodeArray);
// identifyValidTiles6(nodeArray);
// var tID6 = setTimeout(populateValidTiles6,9500,nodeArray);
// identifyValidTiles7(nodeArray);
// var tID7 = setTimeout(populateValidTiles7,11000,nodeArray);
// identifyValidTiles8(nodeArray);
// var tID8 = setTimeout(populateValidTiles8,12500,nodeArray);




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
            nodeArray[i].backgroundcolor = nodeArray[i].backgroundcolor[nodeArray[i].distance];
            document.getElementById(nodeArray[i].id).style.backgroundColor = nodeArray[i].backgroundcolor;
        }}}  
};

       
// Function will identify and Queue the nodes for searching
function identifyValidTiles2(nodeArray,exitNode){
        var depth = 0;
        while(depth < 25){
            depth +=1;
        for (i=0; i<nodeArray.length; i++){
        if (nodeArray[i].visited == true && nodeArray[i].distance == depth){
            if (nodeArray[i].id == 0){
                if (nodeArray[i+1].isAWall == false && nodeArray[i+1].visited == false){
                    nodeArray[i+1].visited = true;
                    nodeArray[i+1].distance = nodeArray[i].distance +1;
                    nodeArray[i+1].backgroundcolor = nodeArray[i+1].backgroundcolor[nodeArray[i+1].distance];
                    nodeArray[i+1].path = nodeArray[i+1].path.concat(nodeArray[i].path);
                }
                if (nodeArray[i+15].isAWall == false && nodeArray[i+15].visited == false){
                    nodeArray[i+15].visited = true;
                    nodeArray[i+15].distance = nodeArray[i].distance +1;
                    nodeArray[i+15].backgroundcolor = nodeArray[i+15].backgroundcolor[nodeArray[i+15].distance];
                    nodeArray[i+15].path = nodeArray[i+15].path.concat(nodeArray[i].path);
                }
            }
            if (nodeArray[i].id > 0 && nodeArray[i].id < 14){
                if (nodeArray[i+1].isAWall == false && nodeArray[i+1].visited == false){
                    nodeArray[i+1].visited = true;
                    nodeArray[i+1].distance = nodeArray[i].distance +1;
                    nodeArray[i+1].backgroundcolor = nodeArray[i+1].backgroundcolor[nodeArray[i+1].distance];
                    nodeArray[i+1].path = nodeArray[i+1].path.concat(nodeArray[i].path);
                }
                  if (nodeArray[i+15].isAWall == false && nodeArray[i+15].visited == false){
                    nodeArray[i+15].visited = true;
                    nodeArray[i+15].distance = nodeArray[i].distance +1;
                    nodeArray[i+15].backgroundcolor = nodeArray[i+15].backgroundcolor[nodeArray[i+15].distance];
                    nodeArray[i+15].path = nodeArray[i+15].path.concat(nodeArray[i].path);
                }
                  if (nodeArray[i-1].isAWall == false && nodeArray[i-1].visited == false){
                    nodeArray[i-1].visited = true;
                    nodeArray[i-1].distance = nodeArray[i].distance +1;
                    nodeArray[i-1].backgroundcolor = nodeArray[i-1].backgroundcolor[nodeArray[i-1].distance];
                    nodeArray[i-1].path = nodeArray[i-1].path.concat(nodeArray[i].path);
                }
            }
            if (nodeArray[i].id == 14){
                 if (nodeArray[i+15].isAWall == false && nodeArray[i+15].visited == false){
                    nodeArray[i+15].visited = true;
                    nodeArray[i+15].distance = nodeArray[i].distance +1;
                    nodeArray[i+15].backgroundcolor = nodeArray[i+15].backgroundcolor[nodeArray[i+15].distance];
                    nodeArray[i+15].path = nodeArray[i+15].path.concat(nodeArray[i].path);
                }
                  if (nodeArray[i-1].isAWall == false && nodeArray[i-1].visited == false){
                    nodeArray[i-1].visited = true;
                    nodeArray[i-1].distance = nodeArray[i].distance +1;
                    nodeArray[i-1].backgroundcolor = nodeArray[i-1].backgroundcolor[nodeArray[i-1].distance];
                    nodeArray[i-1].path = nodeArray[i-1].path.concat(nodeArray[i].path);
                }
            }
            if (nodeArray[i].id > 0 && nodeArray[i].id < 210 && nodeArray[i].id %15 == 0){
                 if (nodeArray[i+1].isAWall == false && nodeArray[i+1].visited == false){
                    nodeArray[i+1].visited = true;
                    nodeArray[i+1].distance = nodeArray[i].distance +1;
                    nodeArray[i+1].backgroundcolor = nodeArray[i+1].backgroundcolor[nodeArray[i+1].distance];
                    nodeArray[i+1].path = nodeArray[i+1].path.concat(nodeArray[i].path);
                 }
                 if (nodeArray[i+15].isAWall == false && nodeArray[i+15].visited == false){
                    nodeArray[i+15].visited = true;
                    nodeArray[i+15].distance = nodeArray[i].distance +1;
                    nodeArray[i+15].backgroundcolor = nodeArray[i+15].backgroundcolor[nodeArray[i+15].distance];
                    nodeArray[i+15].path = nodeArray[i+15].path.concat(nodeArray[i].path);
                 }
                 if (nodeArray[i-15].isAWall == false && nodeArray[i-15].visited == false){
                    nodeArray[i-15].visited = true;
                    nodeArray[i-15].distance = nodeArray[i].distance +1;
                    nodeArray[i-15].backgroundcolor = nodeArray[i-15].backgroundcolor[nodeArray[i-15].distance];
                    nodeArray[i-15].path = nodeArray[i-15].path.concat(nodeArray[i].path);
                 }
            }
            if (nodeArray[i].id > 14 && nodeArray[i].id < 224 && (nodeArray[i].id+1) %15 == 0){
                 if (nodeArray[i+15].isAWall == false && nodeArray[i+15].visited == false){
                    nodeArray[i+15].visited = true;
                    nodeArray[i+15].distance = nodeArray[i].distance +1;
                    nodeArray[i+15].backgroundcolor = nodeArray[i+15].backgroundcolor[nodeArray[i+15].distance];
                    nodeArray[i+15].path = nodeArray[i+15].path.concat(nodeArray[i].path);
                 }
                 if (nodeArray[i-1].isAWall == false && nodeArray[i-1].visited == false){
                    nodeArray[i-1].visited = true;
                    nodeArray[i-1].distance = nodeArray[i].distance +1;
                    nodeArray[i-1].backgroundcolor = nodeArray[i-1].backgroundcolor[nodeArray[i-1].distance];
                    nodeArray[i-1].path = nodeArray[i-1].path.concat(nodeArray[i].path);
                 }
                 if (nodeArray[i-15].isAWall == false && nodeArray[i-15].visited == false){
                    nodeArray[i-15].visited = true;
                    nodeArray[i-15].distance = nodeArray[i].distance +1;
                    nodeArray[i-15].backgroundcolor = nodeArray[i-15].backgroundcolor[nodeArray[i-15].distance];
                    nodeArray[i-15].path = nodeArray[i-15].path.concat(nodeArray[i].path);
                 }
            }
            if (nodeArray[i].id == 210){
                 if (nodeArray[i+1].isAWall == false && nodeArray[i+1].visited == false){
                    nodeArray[i+1].visited = true;
                    nodeArray[i+1].distance = nodeArray[i].distance +1;
                    nodeArray[i+1].backgroundcolor = nodeArray[i+1].backgroundcolor[nodeArray[i+1].distance];                   
                    nodeArray[i+1].path = nodeArray[i+1].path.concat(nodeArray[i].path);
                 }
                 if (nodeArray[i-15].isAWall == false && nodeArray[i-15].visited == false){
                    nodeArray[i-15].visited = true;
                    nodeArray[i-15].distance = nodeArray[i].distance +1;
                    nodeArray[i-15].backgroundcolor = nodeArray[i-15].backgroundcolor[nodeArray[i-15].distance];
                    nodeArray[i-15].path = nodeArray[i-15].path.concat(nodeArray[i].path);
                 } 
            }
            if (nodeArray[i].id > 210 && nodeArray[i].id < 224){
                if (nodeArray[i+1].isAWall == false && nodeArray[i+1].visited == false){
                    nodeArray[i+1].visited = true;                
                    nodeArray[i+1].distance = nodeArray[i].distance +1;
                    nodeArray[i+1].backgroundcolor = nodeArray[i+1].backgroundcolor[nodeArray[i+1].distance];
                    nodeArray[i+1].path = nodeArray[i+1].path.concat(nodeArray[i].path);
                }
                  if (nodeArray[i-1].isAWall == false && nodeArray[i-1].visited == false){
                    nodeArray[i-1].visited = true;
                    nodeArray[i-1].distance = nodeArray[i].distance +1;
                    nodeArray[i-1].backgroundcolor = nodeArray[i-1].backgroundcolor[nodeArray[i-1].distance];
                    nodeArray[i-1].path = nodeArray[i-1].path.concat(nodeArray[i].path);
                }
                if (nodeArray[i-15].isAWall == false && nodeArray[i-15].visited == false){
                    nodeArray[i-15].visited = true;
                    nodeArray[i-15].distance = nodeArray[i].distance +1;
                    nodeArray[i-15].backgroundcolor = nodeArray[i-15].backgroundcolor[nodeArray[i-15].distance];
                    nodeArray[i-15].path = nodeArray[i-15].path.concat(nodeArray[i].path);
                }
            }
            if (nodeArray[i].id == 224){
                 if (nodeArray[i-1].isAWall == false && nodeArray[i-1].visited == false){
                    nodeArray[i-1].visited = true;
                    nodeArray[i-1].distance = nodeArray[i].distance +1;
                    nodeArray[i-1].backgroundcolor = nodeArray[i-1].backgroundcolor[nodeArray[i-1].distance];
                    nodeArray[i-1].path = nodeArray[i-1].path.concat(nodeArray[i].path);
                 }
                 if (nodeArray[i-15].isAWall == false && nodeArray[i-15].visited == false){
                    nodeArray[i-15].visited = true;
                    nodeArray[i-15].distance = nodeArray[i].distance +1;
                    nodeArray[i-15].backgroundcolor = nodeArray[i-15].backgroundcolor[nodeArray[i-15].distance];
                    nodeArray[i-15].path = nodeArray[i-15].path.concat(nodeArray[i].path);
                 } 
            }
                if (nodeArray[i].id > 14 && nodeArray[i].id < 210 && nodeArray[i].id %15 != 0 && (nodeArray[i].id+1)%15 != 0){
                    if (nodeArray[i+1].isAWall == false && nodeArray[i+1].visited == false){
                    nodeArray[i+1].visited = true;
                    nodeArray[i+1].distance = nodeArray[i].distance +1;
                    nodeArray[i+1].backgroundcolor = nodeArray[i+1].backgroundcolor[nodeArray[i+1].distance];
                    nodeArray[i+1].path = nodeArray[i+1].path.concat(nodeArray[i].path);
                }
                    if (nodeArray[i+15].isAWall == false && nodeArray[i+15].visited == false){
                    nodeArray[i+15].visited = true;
                    nodeArray[i+15].distance = nodeArray[i].distance +1;
                    nodeArray[i+15].backgroundcolor = nodeArray[i+15].backgroundcolor[nodeArray[i+15].distance];
                    nodeArray[i+15].path = nodeArray[i+15].path.concat(nodeArray[i].path);
                 }
                    if (nodeArray[i-1].isAWall == false && nodeArray[i-1].visited == false){
                    nodeArray[i-1].visited = true;
                    nodeArray[i-1].distance = nodeArray[i].distance +1;
                    nodeArray[i-1].backgroundcolor = nodeArray[i-1].backgroundcolor[nodeArray[i-1].distance];
                    nodeArray[i-1].path = nodeArray[i-1].path.concat(nodeArray[i].path);
                }
                    if (nodeArray[i-15].isAWall == false && nodeArray[i-15].visited == false){
                    nodeArray[i-15].visited = true;
                    nodeArray[i-15].distance = nodeArray[i].distance +1;
                    nodeArray[i-15].backgroundcolor = nodeArray[i-15].backgroundcolor[nodeArray[i-15].distance];
                    nodeArray[i-15].path = nodeArray[i-15].path.concat(nodeArray[i].path);
                 } 
                }
        } 
    }
} 
    return nodeArray;
};

//Popuate the Distance == 2 nodes
     function populateValidTiles2(nodeArray,exitNode){
         var colordepth = 1;
        while(colordepth < 25){
            colordepth = colordepth+1;
        for (i=0; i<nodeArray.length; i++){
        if (nodeArray[i].visited == true){
            alert(nodeArray[i].id + " visited in populate function");
            if(nodeArray[i].distance == colordepth){ 
                alert(nodeArray[i].distance + " distance equals colordepth");
            //nodeArray[i].backgroundcolor = nodeArray[i].backgroundcolor[nodeArray[i].distance];
            document.getElementById(nodeArray[i].id).style.backgroundColor = nodeArray[i].backgroundcolor;
 
        }}
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

function assignNodeProperties(allTiles,nodeArray){
    var myNode = {};
    var backgroundcolor = {
        "0": "green", "1": "cornflowerblue", "2": "mediumblue", "3": "darkslateblue", "4": "purple",
        "5": "indigo", "6": "violet", "7":"salmon", "8":"orange", "9":"orangered", "10":"darkred",
        "11":"saddlebrown", "12":"olive", "13":"olivedrab", "14":"forestgreen", "15":"yellowgreen",
        "16":"greenyellow", "17":"goldenrod", "18":"gold", "19":"yellow", "20": "lavender", "21": "silver",
        "22": "gray", "23": "darkgray", "24": "cadetblue", "25":"royalblue"
    };
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
