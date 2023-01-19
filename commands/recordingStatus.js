const commandList = require("./commandList.js");

module.exports = {
  object: function() { 
    return {
      get: "RTMS",
      set: "",
      cmd: "recordingStatus",
      data: {},
      close() {
        this.data = {};
      },
      initializeData(data, flag, commands) {
        var command = {"payload":{"data":{}}};
        this.processData(data, flag, command, commands);
      },
      processData(data, flag, command, commands) {
        command.payload.cmd = this.cmd;
        command.payload.data.status = data[4] === 0x52 ? 'recording' : 'not recording';
  
        this.data = command.payload.data;
        return true;
      },
      sendData(command, commands) {
        var msg = {
          "direction": "node",
          "command": {
            "payload": {
              "cmd": this.cmd,
              "data": this.data
            }
          }
        }
        
        return msg;
      },
      //What todo once we are connected
      afterInit() {
        return {
          "cmd": this.cmd,
          "data": this.data
        }
      }
    }
  }
}
