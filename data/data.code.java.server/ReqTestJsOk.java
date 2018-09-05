package protocol;


import network.Packet;
import network.PacketUtil;

import java.util.List;
import java.util.ArrayList;


public class ReqTestJsOk
{
	private long u64;
	private long i64;


	public ReqTestJsOk(Packet packet)
	{
		u64 = packet.readLong();
		i64 = packet.readLong();
	}



	public long getU64()
	{
		return this.u64;
	}

	public long getI64()
	{
		return this.i64;
	}

}
