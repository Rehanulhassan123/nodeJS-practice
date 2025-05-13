const eventEmitter = require("events");

const customEvents = new eventEmitter();

customEvents.on("response", () => {
  console.log("hello i am listening");
});

customEvents.emit("response");
