module.exports = {
	CLOSED: "CLOSED", // 已关闭
	LISTEN: "LISTEN", // 收听
	SYN_SENT: "SYN_SENT", // 同步已发送
	SYN_RCVD: "SYN_RCVD", // 同步收到
	ESTABLISHED: "ESTABLISHED", // 已建立连接
	FIN_WAIT_1: "FIN_WAIT_1", // 终止等待1
	CLOSING: "CLOSING", // 关闭中
	FIN_WAIT_2: "FIN_WAIT_2", // 终止等待2
	CLOSE_WAIT: "CLOSE_WAIT", // 关闭等待
	TIME_WAIT: "TIME_WAIT", // 时间等待
	LAST_ACK: "LAST_ACK", // 最后确认
};
