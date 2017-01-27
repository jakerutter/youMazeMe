//Colors the MAZEHOLE gray when it is hovered over.
$('.mazehole').hover(function () {
($('#htmlloc').html (this.id))},
function (){
    $('#htmlloc').html("");
    });

//Selects 2 Random numbers to create and ENTRY & EXIT for the maze on the perimeter.

var xGoalPos = Math.floor(Math.random() * (14 - 0 + 1)) + 0;
var yGoalPos = Math.floor(Math.random() * (14 - 0 + 1)) + 0;
var xEntryPos = Math.floor(Math.random() * (14 - 0 + 1)) + 0;
var yEntryPos = Math.floor(Math.random() * (14 - 0 + 1)) + 0;
 $('.GoalPositionX').text(xGoalPos)
 $('.GoalPositionY').text(yGoalPos)
 $('.EntryPositionX').text(xEntryPos)
 $('.EntryPositionY').text(yEntryPos)
     
 //selects the random number and gets them into html id format for comparisons.
var entryNum = (xEntryPos+","+yEntryPos);
var exitNum = (xGoalPos+","+yGoalPos);
var entryID = ("#"+entryNum);
var exitID = ("#"+exitNum);

$(".mazehole").each(function() {
   var isEntry = $(this).attr('id');
   if( isEntry == entryID || isEntry == entryNum)
      document.getElementById(isEntry).style.backgroundColor = "lightblue";

});


//This can generate divs programatically
//for(i = 0, i < 15, i++)
//for(j = 0, j < 15, j++)
//divHtml = "<div id =' " + i + ',' + j + " '></div>'
//$('.masterDiv').append(
//divHtml)
