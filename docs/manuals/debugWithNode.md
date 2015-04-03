Debug With Node
===

This manual describes debugging nodejs applications by using the terminal / windows command line and google dev chrome tools.

1. run the node application by using:

  `nodemon --debug`

2. start the node-inspector in a seperate process, use:

  `node-inspector`

(For UNIX systems, you can start new node-inspector process for the background)

3. Call http://localhost:3000 for running the application

4. After that call the url which the node-inspector has listed in the command line window (for ex. http://localhost:8080/?debug=5858).

For further information, please go to:
https://github.com/node-inspector/node-inspector

### Some more information on processes:

To show all current node-inspector processes use:

  `pgrep -l node`

To kill a node-inspector process use:

  `kill -s 15 <NODE_PROCESSID>`

