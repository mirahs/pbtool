package protocol;


import network.Packet;
import network.PacketUtil;

import java.util.List;
import java.util.ArrayList;


public class AckTestJsOk
{
	private long u64;
	private long i64;


	public byte[] encode()
	{
		Packet packet = new Packet();
		packet.writeLong(u64);
		packet.writeLong(i64);
		return packet.encode((short)Msg.P_ACK_TEST_JS_OK);
	}



	public void setU64(long u64)
	{
		this.u64 = u64;
	}

	public void setI64(long i64)
	{
		this.i64 = i64;
	}

}
