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

// // LISTEN => SYN_SENT
// tcpStateMachine.next({
//   evt: null,
//   rcv: null,
//   send: "SYN",
// });

// // SYN_SENT => ESTABLISHED
// tcpStateMachine.next({
//   evt: null,
//   rcv: "SYN+ACK",
//   send: "ACK",
// });

// // ESTABLISHED => FIN_WAIT_1
// tcpStateMachine.next({
//   evt: "Close",
//   rcv: null,
//   send: "FIN",
// });

// // FIN_WAIT_1 => FIN_WAIT_2
// tcpStateMachine.next({
//   evt: null,
//   rcv: "ACK",
//   send: null,
// });

// // FIN_WAIT_2 => TIME_WAIT
// tcpStateMachine.next({
//   evt: null,
//   rcv: "FIN",
//   send: "ACK",
// });
