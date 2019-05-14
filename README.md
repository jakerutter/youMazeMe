# youMazeMe

### User Controlled Settings

Height & Width dimensions

Density of Walls

Speed of Search & Discovery

### Program Overview

Using the settings (or the default settings) the program generates a square grid of divs. Inside this grid are then placed randomly (with constraints) generated walls. 

The maze then selects an entrance (green) node and an exit (red) node. 

Using a Breadth First Search algorithm the program then identifies the exit node from the entry, coloring each node searched in an incremental fashion so that it is obvious which nodes are the same depth from entry. 

When the exit node is found the search ceases and the styling of divs stops. 

Finally, the optimal path from entry to exit is displated with a descending count of steps beginning at the exit and traversing back to the entry.

### Features RoadMap

Allow user to select the entry and exit node, and make the program solve and display the optimal route.

Allow the user to select between light & dark theme.

Refactor some of the core code to be more performant, modular.

Make the Entry and Exit node more obvious what they are.

When an unreachable maze is given and the search ends, display some information that states such.





		

