import SocketIo from 'socket.io-client';

const namespace = '/indianadrones'; // change to an empty string to use the global namespace
let socket;

import SocketActions from '../actions/SocketActions';

class Socket {

  init(){
    console.log('initiating socket.io');
    socket = SocketIo.connect('http://' + document.domain + ':' + location.port + namespace);
    // the socket.io documentation recommends sending an explicit package upon connection
    // this is specially important when using the global namespace

    // event handler for server sent data
    // the data is displayed in the "Received" section of the page
    socket.on('indy response', function(msg) {
      console.log('Received #' + msg.count + ': ' + msg.data);
    });

    socket.on('drone status', function(msg) {
      SocketActions.receivedSocketData(msg);
    });

    // event handler for new connections
    socket.on('connect', function() {
      console.log('socket.io connected');
    });
  }

}

export default new Socket();
