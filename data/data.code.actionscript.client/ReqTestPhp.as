package proto {
	public class ReqTestPhp {
		private _u64: Number;
		private _strxx: String;
		private _msg_req: MsgTestPhp;
		private msg_opt_flag: Number = 0;
		private _msg_opt: MsgTestPhp;
		private _msg_rep: Array = [];


		public function Encode(): Packet {
			var packet: Packet = new Packet();
			packet.WriteUlong(this._u64);
			packet.WriteString(this._strxx);
			packet.WriteBuffer(this._msg_req.GetBuffer());
			packet.WriteByte(this.msg_opt_flag);
			if (this.msg_opt_flag == 1)
			{
				packet.WriteBuffer(this._msg_opt.GetBuffer());
			}
			var msg_rep_count: Number = this._msg_rep.length;
			packet.WriteUshort(msg_rep_count);
			for (var i: Number = 0; i < msg_rep_count; i++)
			{
				var xxx: MsgTestPhp = this._msg_rep[i];
				packet.WriteBuffer(xxx.GetBuffer());
			}
			packet.Encode(40060);
			return packet;
		}


		public function get u64(): Number { return this._u64; }
		public function set u64(value: Number) { this._u64 = value; }
		public function get strxx(): String { return this._strxx; }
		public function set strxx(value: String) { this._strxx = value; }
		public function get msg_req(): MsgTestPhp { return this._msg_req; }
		public function set msg_req(value: MsgTestPhp) { this._msg_req = value; }
		public function get msg_opt(): MsgTestPhp { return this._msg_opt; }
		public function set msg_opt(value: MsgTestPhp) { this.msg_opt_flag = 1; this._msg_opt = value; }
		public function get msg_rep(): Array {return this._msg_rep; }
		public function set msg_rep(value: Array) { this._msg_rep = value; }
	}
}
