package com.data {
	public class AckTestPhpOk {
		private var _u64: Number;
		private var _strxx: String;
		private var _msg_req: MsgTestPhp;
		private var msg_opt_flag: uint = 0;
		private var _msg_opt: MsgTestPhp;
		private var _msg_rep: Array = [];


		public function AckTestPhpOk(packet: Packet = null) {
			if (packet) {
				this._u64 = packet.ReadUlong();
				this._strxx = packet.ReadString();
				this._msg_req = new MsgTestPhp(packet);
				this. msg_opt_flag = packet.ReadByte();
				if (this.msg_opt_flag == 1)
				{
					this._msg_opt = new MsgTestPhp(packet);
				}
				this._msg_rep = [];
				var msg_rep_count: int = packet.ReadUshort();
				for (var i: int = 0; i < msg_rep_count; i++)
				{
					this._msg_rep.push(new MsgTestPhp(packet));
				}
			}
		}


		public function get u64(): Number { return this._u64; }
		public function set u64(value: Number): void { this._u64 = value; }
		public function get strxx(): String { return this._strxx; }
		public function set strxx(value: String): void { this._strxx = value; }
		public function get msg_req(): MsgTestPhp { return this._msg_req; }
		public function set msg_req(value: MsgTestPhp): void { this._msg_req = value; }
		public function get msg_opt(): MsgTestPhp { return this._msg_opt; }
		public function set msg_opt(value: MsgTestPhp): void { this.msg_opt_flag = 1; this._msg_opt = value; }
		public function get msg_rep(): Array {return this._msg_rep; }
		public function set msg_rep(value: Array): void { this._msg_rep = value; }
	}
}
