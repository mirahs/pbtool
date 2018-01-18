var ByteBuffer = require('bytebuffer');
var Packet = require('./Packet');


var buffer = new ByteBuffer();

// 模拟websocket收包
function onMessage(data) {
	// 新收的包加进去
	//buffer.append(data);//这是ArrayBuffer，正式用的
	buffer.append(data.slice(0, data.offset));//这里的data是ByteBuffer，测试用的
	// 是否有2个字节的长度 while处理粘包
	while (buffer.offset >= 2) {
		// 包体长度
		var bodyLen = buffer.readUint16(0);
		// 至少有1个完整包
		if (buffer.offset >= (2 + bodyLen)) {
			// 从第3个字节开始读取2个字节的协议号
			var packetId = buffer.readUint16(2);
			// 包体位置从第5个字节开始 长度是包体长度减2
			var packetBuffer = buffer.slice(4, bodyLen - 2);
			var packet = new Packet(packetBuffer);
			var oldoffset = buffer.offset;
			// 减去当前包后的包体
			buffer = buffer.slice(2 + bodyLen, buffer.offset);
			// 减去当前包长度后的偏移
			buffer.offset = oldoffset - (2 + bodyLen);
			// 派发协议
			dispatch(packetId, packet);
		}
	}
}


function dispatch(packetId, packet) {
	console.log('packetId: ' + packetId);
	console.log('packet.ReadUint(): ' + packet.ReadUint());
	console.log();
}


function Test() {
	console.log('测试收包粘包');
	var buff = new Buffer(8);
	buff[0] = 0;
	buff[1] = 6;
	buff[2] = 3;
	buff[3] = 242;
	buff[4] = 90;
	buff[5] = 96;
	buff[6] = 158;
	buff[7] = 60;
	var bf = new ByteBuffer();
	bf.append(buff);
	bf.append(buff);
	bf.append(buff);
	onMessage(bf);
}


Test();
Test();
