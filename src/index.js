const debug = require("debug");
const transitions = require("./transitions.js");
const Status = require("./status.js");

const log = debug("*");

class TCPStateMachine {
  constructor(initialState) {
    this.state = initialState || Status.CLOSED;
  }

  next(action) {
    if (this.state === "TIME_WAIT") {
      log("***当前状态是TIME_WAIT***");
      return;
    }

    const actionStr = JSON.stringify(action);
    const trans = transitions.filter(
      (t) => JSON.stringify(t.action) === actionStr
    );

    if (!trans.length) {
      throw new Error("没有此动作");
    }

    const targetTrans = trans.find((t) => t.from === this.state);

    if (!targetTrans) {
      throw new Error(`当前状态: ${this.state} 无法触发此动作`);
    }

    log(`${this.state} => ${targetTrans.to}`);

    this.state = targetTrans.to;

    if (this.state === "TIME_WAIT") {
      log("2MSL后进入CLOSED状态");
    }
  }
}

module.exports = TCPStateMachine;
