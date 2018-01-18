// function say(name = 'abc') {
// 	var name = name ? name : 'World';
// 	console.log('Hello, ' + name + '!');
// }

// say()
// say('mirahs')


var Packet = require('./Packet');
var ByteBuffer = require('bytebuffer');

var packet = new Packet();

packet.WriteUshort(10086);

// packet.WriteUint(1008611);
var b1 = new ByteBuffer(4);
b1.writeUint32(1008611);
b1.reset();
packet.WriteBuffer(b1);

packet.WriteString('你好啊');
packet.WriteFloat(1.1);
packet.WriteDouble(1.22);
packet.WriteUlong(4294967296666);
packet.WriteLong(4294967298888);

packet.Reset();

console.log('packet.ReadUshort(): ' + packet.ReadUshort());
console.log('packet.ReadUint(): ' + packet.ReadUint());
console.log('packet.ReadString(): ' + packet.ReadString());
console.log('packet.ReadFloat(): ' + packet.ReadFloat());
console.log('packet.ReadDouble(): ' + packet.ReadDouble());
console.log('packet.ReadUlong(): ' + packet.ReadUlong());
console.log('packet.ReadLong(): ' + packet.ReadLong());
