const TCPStateMachine = require("../src/index.js");

test("initial state", () => {
  const tcpStateMachine = new TCPStateMachine();
  expect(tcpStateMachine.state).toBe("CLOSED");
  const tcpStateMachine2 = new TCPStateMachine("LISTEN");
  expect(tcpStateMachine2.state).toBe("LISTEN");
});

test("invalid action", () => {
  const tcpStateMachine = new TCPStateMachine();
  function invalidNext() {
    tcpStateMachine.next({
      evt: "InvalidEvt",
      rcv: null,
      send: null,
    });
  }
  expect(invalidNext).toThrow(Error);
});

test("CLOSED => LISTEN => SYN_RCVD => ESTABLISHED", () => {
  const tcpStateMachine = new TCPStateMachine();
  tcpStateMachine.next({
    evt: "PassiveOpen",
    rcv: null,
    send: null,
  });
  expect(tcpStateMachine.state).toBe("LISTEN");
  tcpStateMachine.next({
    evt: null,
    rcv: "SYN",
    send: "SYN+ACK",
  });
  expect(tcpStateMachine.state).toBe("SYN_RCVD");
  tcpStateMachine.next({
    evt: null,
    rcv: "ACK",
    send: null,
  });
  expect(tcpStateMachine.state).toBe("ESTABLISHED");
});
