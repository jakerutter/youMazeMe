//# youMazeMe
//Will Create a vertical or horizontal Maze.
-I make use of an array of objects whose properties include things like:
	1. id
	2. backgroundcolor {object}
	3. visited (boolean)
	4. distance (number)
	5. isAWall (boolean)
	
		//generates walls - populates them black
		
		Populates an entry and exit on opposite facing walls.
		Uses a BFS search algorithm to locate the exitNode.
			Populates the maze a color gradient that represents distance from EntryNode.
		Returns the optimal path once the exitNode has been reached.
			Displays the numerical 	distance from EntryNode for each node in the optimal path.
			
		

