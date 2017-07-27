var Maze = (function (maze, undefined) {
  // maze is the local scoped variable of Maze

  maze.upAndDown = "";  
  maze.wallNodes = [];
  maze.nodeArray = [];
  maze.nodesForEntryAndExit = [];
  maze.entryNode;
  maze.exitNode;
  maze.colordepth;
  maze.tID;
  maze.timerId;
  maze.allTiles = [];
  maze.maxRow = 10;
  maze.maxColumn = 10;
  maze.isComplete;

  maze.DOMBindings = function () {

  };

  // Singleton that allows a gradient field to be dynamically crated
  // Minimally Required: maxdepth, 2 colorStops
  maze.gradient = new function () {
    var _self = this;
    var RMask = 0xFF0000;
    var GMask = 0x00FF00;
    var BMask = 0x0000FF;

    this.colorStops = [];
    this.maxDepth;

    this.setMaxDepth = function (MaxDepth) {
      _self.maxDepth = MaxDepth;
    };
    this.addColorStop = function (rgbValue) {
      _self.colorStops.push(rgbValue);
    };
    this.addColorStops = function (rgbValues) {
      for (var i=0; i < rgbValues.length; i ++) {
        _self.colorStops.push(rgbValues[i]);
      }
    };

    // Gets color at specific depth: currentDepth
    // Allows for overflow and repeats the gradient if necessary
    this.getColorAt = function(currentDepth) {
      var ratio = ((currentDepth / _self.maxDepth) % 1);
      var step = (1 + Math.floor(ratio * (_self.colorStops.length - 1)));

      var RDiff = (RMask & (_self.colorStops[step])) - (RMask & (_self.colorStops[step - 1]));
      var GDiff = (GMask & (_self.colorStops[step])) - (GMask & (_self.colorStops[step - 1]));
      var BDiff = (BMask & (_self.colorStops[step])) - (BMask & (_self.colorStops[step - 1]));

      var stepFactor = (_self.colorStops.length - 1)*ratio - (step - 1);
      var colorRValue = Math.floor(RMask & (_self.colorStops[step - 1] + stepFactor * (RDiff)));
      var colorGValue = Math.floor(GMask & (_self.colorStops[step - 1] + stepFactor * (GDiff)));
      var colorBValue = Math.floor(BMask & (_self.colorStops[step - 1] + stepFactor * (BDiff)));

      return colorRValue + colorGValue + colorBValue;
    };
  };

  maze.getBackgroundColor = function (currentDepth) {
    var colorValue = maze.gradient.getColorAt(currentDepth);
    return "#" + colorValue.toString(16).padStart(6, "0");
  };

  maze.onLoad = function () {
    maze.gradient.addColorStops( [0x0000FF, 0x00FFFF, 0x00FF00, 0xFF0000, 0x0000FF] );
    maze.gradient.setMaxDepth(maze.maxRow + maze.maxColumn);
  }; 

  return maze;
}) (Maze || {});

window.addEventListener('DOMContentLoaded', Maze.onLoad, false);	