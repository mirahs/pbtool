// function say(name = 'abc') {
// 	var name = name ? name : 'World';
// 	console.log('Hello, ' + name + '!');
// }

// say()
// say('mirahs')


var Packet = require('./Packet');

var packet = new Packet();

packet.WriteUshort(10086);

packet.WriteUint(1008611);
// var b1 = new Buffer(4);
// b1.writeUInt32BE(1008611);
// packet.WriteBuffer(b1);

packet.WriteString('你好啊');
packet.WriteFloat(1.1);
packet.WriteDouble(1.22);


packet.OffsetReset();

console.log('packet.ReadUshort(): ' + packet.ReadUshort());
console.log('packet.ReadUint(): ' + packet.ReadUint());
console.log('packet.ReadString(): ' + packet.ReadString());
console.log('packet.ReadFloat(): ' + packet.ReadFloat());
console.log('packet.ReadDouble(): ' + packet.ReadDouble());
