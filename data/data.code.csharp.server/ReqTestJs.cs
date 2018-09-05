using System.Collections;
using System.Collections.Generic;


public class ReqTestJs
{
	private ulong _u64;
	private long _i64;


	public ReqTestJs(Packet packet)
	{
		this._u64 = packet.ReadUlong();
		this._i64 = packet.ReadLong();
	}


	public ulong u64
	{
		get { return this._u64; }
		set { this._u64 = value; }
	}

	public long i64
	{
		get { return this._i64; }
		set { this._i64 = value; }
	}

}
