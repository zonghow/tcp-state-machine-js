const Status = require("./status.js");

module.exports = [
	// FROM CLOSED
	{
		// 被动打开，等待客户的连接请求
		from: Status.CLOSED,
		action: {
			evt: "PassiveOpen",
			rcv: null,
			send: null,
		},
		to: Status.LISTEN,
	},
	{
		// 主动打开，发送连接信号报文
		from: Status.CLOSED,
		action: {
			evt: "ActiveOpen",
			rcv: null,
			send: "SYN",
		},
		to: Status.SYN_SENT,
	},
	// FROM LISTEN
	{
		// 在收听状态下发送SYN信号报文，将进入SYN_SENT状态
		from: Status.LISTEN,
		action: {
			evt: null,
			rcv: null,
			send: "SYN",
		},
		to: Status.SYN_SENT,
	},
	{
		// 收听状态收到SYN信号报文并回复SYN和ACK，进入同步收到状态
		from: Status.LISTEN,
		action: {
			evt: null,
			rcv: "SYN",
			send: "SYN+ACK",
		},
		to: Status.SYN_RCVD,
	},
	// FROM SYN_RCVD(同步收到)
	{
		// 收到ACK信号报文，进入已建立连接状态
		from: Status.SYN_RCVD,
		action: {
			evt: null,
			rcv: "ACK",
			send: null,
		},
		to: Status.ESTABLISHED,
	},
	{
		// 主动关闭并发送FIN信号报文，进入终止等待1状态
		from: Status.SYN_RCVD,
		action: {
			evt: "Close",
			rcv: null,
			send: "FIN",
		},
		to: Status.FIN_WAIT_1,
	},
	//  FROM SYN_SENT
	{
		// 主动关闭
		from: Status.SYN_SENT,
		action: {
			evt: "Close",
			rcv: null,
			send: null,
		},
		name: "Close:0/0",
		to: Status.CLOSED,
	},
	{
		// 收到SYN+ACK，发送ACK，进入已连接状态
		from: Status.SYN_SENT,
		action: {
			evt: null,
			rcv: "SYN+ACK",
			send: "ACK",
		},
		to: Status.ESTABLISHED,
	},
	{
		// 收到SYN，发送SYN+ACK，进入同步收到状态
		from: Status.SYN_SENT,
		action: {
			evt: null,
			rcv: "SYN",
			send: "SYN+ACK",
		},
		to: Status.SYN_RCVD,
	},
	// FROM  ESTABLISHED
	{
		// 已连接状态下主动关闭 ，发送FIN信号报文，进入终止等待1
		from: Status.ESTABLISHED,
		action: {
			evt: "Close",
			rcv: null,
			send: "FIN",
		},
		to: Status.FIN_WAIT_1,
	},
	{
		// 已连接状态下，收到FIN信号报文，回复ACK确认，进入关闭等待状态
		from: Status.ESTABLISHED,
		action: {
			evt: null,
			rcv: "FIN",
			send: "ACK",
		},
		to: Status.CLOSE_WAIT,
	},
	// FROM FIN_WAIT_1
	{
		// 在终止等待1状态收到ACK确认信号报文，进入终止等待2状态
		from: Status.FIN_WAIT_1,
		action: {
			evt: null,
			rcv: "ACK",
			send: null,
		},
		to: Status.FIN_WAIT_2,
	},
	{
		// 收到FIN信号，回复ACK，进入Closing状态
		from: Status.FIN_WAIT_1,
		action: {
			evt: null,
			rcv: "FIN",
			send: "ACK",
		},
		to: Status.CLOSING,
	},
	// FROM FIN_WAIT_2
	{
		// 收到FIN，发出ACK，进入时间等待状态
		from: Status.FIN_WAIT_2,
		action: {
			evt: null,
			rcv: "FIN",
			send: "ACK",
		},
		to: Status.TIME_WAIT,
	},
	// FROM CLOSING
	{
		// 收到ACK确认，进入时间等待状态
		from: Status.CLOSING,
		action: {
			evt: null,
			rcv: "ACK",
			send: null,
		},
		to: Status.TIME_WAIT,
	},
	// FROM TIME_WAIT
	{
		// 在时间等待状态下超过2MSL时间后关闭连接
		from: Status.TIME_WAIT,
		action: {
			evt: "2MSL",
			rcv: null,
			send: null,
		},
		to: Status.CLOSED,
	},
	// FROM CLOSE_WAIT
	{
		// 关闭等待状态下，当没有要发送的数据时，关闭连接，发送FIN信号报文，进入最后确认状态
		from: Status.CLOSE_WAIT,
		action: {
			evt: "Close",
			rcv: null,
			send: "FIN",
		},
		to: Status.LAST_ACK,
	},
	// FROM LAST_ACK
	{
		from: Status.LAST_ACK,
		action: {
			evt: null,
			rcv: "ACK",
			send: null,
		},
		to: Status.CLOSED,
	},
];
