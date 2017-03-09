
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
//WORKING UP TO THIS POINT-->

//identifyNodesNextToEntry(entryNode,wallNodes,queueForSearch,nodeArray);
   // eliminateDuplicates(queueForSearch);
//populateNodesNextToEntry(queueForSearch,wallNodes);
//identifyValidTiles(queueForSearch,entryNode,wallNodes);
    //eliminateDuplicates(queueForSearch);

//populateValidTiles(queueForSearch,entryNode,wallNodes);



//  newQueue = [];
//  for (h=0; h<queueForSearch.length; h++){
//     newQueue.push(h);}



//FUNCTIONS BELOW

//Function determines the orientation of the maze (Vertical or Horizontal)
function determineMazeOrientation(x){
    var Orientation = Math.floor(Math.random()*2);
    if (Orientation >= 1)
    { upAndDown = true;
       // alert('Its up and down');
    return upAndDown;}
    else
    { upAndDown = false;
      //  alert("Its side to side");
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
                wallNodes.push(isWall);}
                }}
    else{
        isWall = (Math.floor(Math.random()*(209-15+1)) + 15);
        for (i=0; i<nodeArray.length; i++){
                if (nodeArray[i].id == isWall){
                nodeArray[i].isAWall = true;
                wallNodes.push(isWall);}
        }}}
    return nodeArray};

//Function to populate Wall Tiles
function populateWallTiles(nodeArray){  
    //alert("In populate walls. " + nodeArray.length);  
    for (i=0; i<nodeArray.length; i++){
       if (nodeArray[i].isAWall == true){
            document.getElementById(nodeArray[i].id).style.backgroundColor = "black";}}
};

//Function to populate Entry Tile
function populateEntryTile(x){
    document.getElementById(x).style.backgroundColor = "cornflowerblue";
};

//Function to populate Exit Tile
function populateExitTile(x){
    document.getElementById(x).style.backgroundColor = "firebrick";
};

//Function to identify the Valid moves next to the starting node
function identifyNodesNextToEntry(entryNode,wallNodes,queueForSearch){
      for (i=0; i<allTiles.length; i++){
          for (k=0; k<wallNodes.length; k++){
         if (entryNode==i){
            if(i-15 != wallNodes[k]){
            queueForSearch.push(i-15);}
            if(i-1 != wallNodes[k] && entryNode != 210){
            queueForSearch.push(i-1);}
            if((i+1)%15 ==0 && i+15 != wallNodes[k]){
                queueForSearch.push(i+15);
            }
            if(i>=210){
                queueForSearch.push(i+1);
            }        
      }}};
       return queueForSearch;
     };

//Function to populate the Valild nodes next to Entry Node
function populateNodesNextToEntry(queueForSearch,wallNodes){
    var validNodes = [];
    validNodes = $(queueForSearch).not(wallNodes).get();
    queueForSearch = validNodes;
    for(i=0; i<validNodes.length; i++){
        
        document.getElementById(validNodes[i]).style.backgroundColor = "green";
    }
    return queueForSearch;
};
        
//Function will identify and Queue the nodes for searching
function identifyValidTiles(queueForSearch,entryNode,wallNodes){ 
    var validNodes = [];
    validNodes = $(queueForSearch).not(wallNodes).get();   
    queueForSearch = [];           
for (j=0; j<validNodes.length; j++){
            if(j-15 != wallNodes[k] && j-15 != entryNode){
            queueForSearch.push(j-15);}
            if(j-1 != wallNodes[k] && j-1 != entryNode){
            queueForSearch.push(j-1);}
            if((j+1)%15 ==0 && j+15 != entryNode){
                queueForSearch.push(j+15);}
            if(j+15 != wallNodes[k] && j+15 != entryNode){
                queueForSearch.push(j+1);}
}
return queueForSearch;
};


function populateValidTiles(queueForSearch,entryNode,wallNodes){   
    var validNodes = [];
    var newValidNodes = [];
    validNodes = $(queueForSearch).not(wallNodes).get();
    newValidNodes = $(validNodes).not(entryNode).get();
    queueForSearch = [];                 
    for(i=0; i<newValidNodes.length; i++){
        queueForSearch.push(newValidNodes[i])         
        document.getElementById(newValidNodes[i]).style.backgroundColor = "blue";
}
    return queueForSearch;
};

//Used to eliminate duplicates throughout the process
function eliminateDuplicates(queueForSearch) {
  var i,
      len=queueForSearch.length,
      out=[],
      obj={};

  for (i=0;i<len;i++) {
    obj[queueForSearch[i]]=0;
  }
  for (i in obj) {
    out.push(i);
  }
  queueForSearch = out;
  return queueForSearch;
};

//THIS CODE IS TO INITIATE A TIMER
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



  function Node(id,backgroundcolor,distance,visited,isAWall){
  this.id = id;
  this.backgroundcolor = backgroundcolor;
  this.distance = distance;
  this.visited = visited;
  this.isAWall = isAWall;

};

function assignNodeProperties(allTiles,nodeArray){
    var myNode = {};
    for(i=0; i<allTiles.length; i++){
        myNode = new Node(i,"empty",0,false,false);
            nodeArray.push(myNode);
        };
return nodeArray;
};




// function identifyNodesNextToEntry(entryNode,wallNodes,queueForSearch,nodeArray){
//       for (i=0; i<nodeArray.length; i++){
//           for (k=0; k<wallNodes.length; k++){
//          if (entryNode==i){
//             if(i-15 != wallNodes[k]){
//             queueForSearch.push(i-15);}
//             if(i-1 != wallNodes[k] && entryNode != 210){
//             queueForSearch.push(i-1);}
//             if((i+1)%15 ==0 && i+15 != wallNodes[k]){
//                 queueForSearch.push(i+15);
//             }
//             if(i>=210){
//                 queueForSearch.push(i+1);
//             }        
//           }}} return queueForSearch;}   
//         }};
      