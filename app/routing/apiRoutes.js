// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friends = require("../data/friends");



// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });



  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function(req, res) {
    console.log(req.body.scores);
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body parsing middleware
   // Receive user details (name, photo, scores)
   var user = req.body;
   
    // parseInt for scores
    for(var i = 0; i < user.scores.length; i++) {
      user.scores[i] = parseInt(user.scores[i]);
    }

    // default friend match is the first friend but result will be whoever has the minimum difference in scores
    var bestFriendIndex = 0;
    var minimumDifference = 40;
    
        // in this for-loop, start off with a zero difference and compare the user and the ith friend scores, one set at a time
    //  whatever the difference is, add to the total difference
    for(var i = 0; i < friends.length; i++) {
      var totalDifference = 0;
      for(var j = 0; j < friends[i].scores.length; j++) {
        var difference = Math.abs(user.scores[j] - friends[i].scores[j]);
        totalDifference += difference;
      }

            // if there is a new minimum, change the best friend index and set the new minimum for next iteration comparisons
            if(totalDifference < minimumDifference) {
              bestFriendIndex = i;
              minimumDifference = totalDifference;
            }
          }

              // after finding match, add user to friend array
    friends.push(user);

    // send back to browser the best friend match
    res.json(friends[bestFriendIndex]);
  
  
  
    // friends.push(req.body);
    //   res.json(friends);

  });
};
