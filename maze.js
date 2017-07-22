var Maze = (function (maze, undefined) {
  // maze is the locall scoped variable of Maze

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

  maze.pad = function (num, padSize) {
    return ("0" + num).slice(-padSize);
  }

  maze.gradient = new function () {
    var _self = this;
    var RMask = 0xFF0000;
    var GMask = 0x00FF00;
    var BMask = 0x0000FF;

    this.startColor = 0x0000FF;
    this.stopColors = [];
    this.maxDepth;

    this.setColorStart = function (rgbValue) {
      _self.startColor = rgbValue;
    }
    this.setMaxDepth = function (MaxDepth) {
      _self.maxDepth = MaxDepth;
    }
    this.addColorStop = function (rgbValue) {
      _self.stopColors.push(rgbValue);
    }
    this.getColorAt = function(currentDepth) {
      var RDiff = (RMask & (_self.stopColors[0])) - (RMask & (_self.startColor));
      var GDiff = (GMask & (_self.stopColors[0])) - (GMask & (_self.startColor));
      var BDiff = (BMask & (_self.stopColors[0])) - (BMask & (_self.startColor));

      var colorRValue = Math.round(RMask & (_self.startColor + (currentDepth / _self.maxDepth) * (RDiff)));
      var colorGValue = Math.round(GMask & (_self.startColor + (currentDepth / _self.maxDepth) * (GDiff)));
      var colorBValue = Math.round(BMask & (_self.startColor + (currentDepth / _self.maxDepth) * (BDiff)));

      return colorRValue + colorGValue + colorBValue;
    }
  };
  maze.gradient.setColorStart(0x0000FF);
  maze.gradient.addColorStop(0xFF0000);
  maze.gradient.setMaxDepth(Math.round(Math.sqrt(maze.maxRow*maze.maxRow * maze.maxColumn*maze.maxColumn))/4);

  maze.getBackgroundColor = function (currentDepth) {
    var colorValue = maze.gradient.getColorAt(currentDepth);
    return "#" + colorValue.toString(16).padStart(6, "0");
  };

  maze.onLoad = function () {
    
  }; 

  return maze;
}) (Maze || {});

window.addEventListener('DOMContentLoaded', Maze.onLoad, false);	