/*
wsServer.on('request', function(request) {
  if (!originIsAllowed(request.origin)) {
    request.reject();
    log("Connection from " + request.origin + " rejected.");
    return;
  }

  // Accept the request and get a connection.

  var connection = request.accept(null, request.origin);

  log("Connection accepted from " + connection.remoteAddress + ".");
  connectionArray.push(connection);

  connection.clientID = nextID;
  nextID++;

  var msg = {
    id: connection.clientID
  };
  connection.sendUTF(JSON.stringify(["id",msg]));

  connection.on('message', function(message) {
    if (message.type === 'utf8') {
      log("Received Message: " + message.utf8Data);
      // Process incoming data.
      let rawMsg=message.utf8Data;
      var event=null;
      var msg=null;
      if(rawMsg.substring(0,2) === "42"){
        let t=rawMsg.substring(2);
        t=JSON.parse(t);
        event=t[0];
        msg=t[1];
      }else return;
      
      var connect = getConnectionForID(msg.id);

      switch(event) {
        // Public, textual message
        case "message":
          msg.text = msg.content.replace(/(<([^>]+)>)/ig, "");
          break;
        // Username change
        case "username":
          var nameChanged = false;
          var origName = msg.name;

          while (!isUsernameUnique(msg.name)) {
            msg.name = origName + appendToMakeUnique;
            appendToMakeUnique++;
            nameChanged = true;
          }

          // If the name had to be changed, we send a "rejectusername"
          // message back to the user so they know their name has been
          // altered by the server.
          if (nameChanged) {
            var changeMsg = {
              id: msg.id,
              type: "rejectusername",
              name: msg.name
            };
            connect.sendUTF(JSON.stringify(["rejectusername",changeMsg]));
          }

          connect.name = msg.name;
          sendUserListToAll();
          sendToClients = false;  // We already sent the proper responses
          break;
        case "test":
            console.log("msg",msg);
            break;
      }

      if (sendToClients) {
        for (var i=0; i<connectionArray.length; i++) {
            connectionArray[i].sendUTF(["message",msgString]);
        }
      }
    }
  });

  connection.on('close', function(reason, description) {
    // First, remove the connection from the list of connections.
    connectionArray = connectionArray.filter(function(el, idx, ar) {
      return el.connected;
    });

    // Now send the updated user list. Again, please don't do this in a
    // real application. Your users won't like you very much.
    sendUserListToAll();

    // Build and output log output for close information.

    var logMessage = "Connection closed: " + connection.remoteAddress + " (" +
                     reason;
    if (description !== null && description.length !== 0) {
      logMessage += ": " + description;
    }
    logMessage += ")";
    log(logMessage);
  });
});
*/