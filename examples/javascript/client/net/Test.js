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
packet.WriteUlong(4294967296666);
packet.WriteLong(4294967298888);

//packet.OffsetReset();
var bf = packet.GetBuffer();
var packet2 = new Packet(bf);

console.log('packet.ReadUshort(): ' + packet2.ReadUshort());
console.log('packet.ReadUint(): ' + packet2.ReadUint());
console.log('packet.ReadString(): ' + packet2.ReadString());
console.log('packet.ReadFloat(): ' + packet2.ReadFloat());
console.log('packet.ReadDouble(): ' + packet2.ReadDouble());
console.log('packet.ReadUlong(): ' + packet2.ReadUlong());
console.log('packet.ReadLong(): ' + packet2.ReadLong());
