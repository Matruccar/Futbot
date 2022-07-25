const dgram = require("dgram");

class Server {
  socket = null;
  setup = null;
  loop = null;
  previousTime = null;

  constructor(setup, loop) {
    this.setup = setup;
    this.loop = loop;
  }

  processMessage(msg) {
    let snapshot = JSON.parse(msg);
    if (this.previousTime == null
        || snapshot.time < this.previousTime) {
      this.setup();
    }
    this.previousTime = snapshot.time;

    let response = this.loop(snapshot);
    return JSON.stringify(response);
  }

  start(port) {
    let socket = dgram.createSocket("udp4");
    socket.on("error", err => {
      socket.close();
      console.log(err);
    });
    socket.on("message", (msg, rinfo) => {
      let response = this.processMessage(msg);
      socket.send(response, rinfo.port, rinfo.address);
    });
    socket.bind(port, () => {
      console.log("Server listening on port " + port);
    });
    this.socket = socket;
  }
}

module.exports = Server;
