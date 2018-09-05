#ifndef _ACK_TEST_JS_OK_
#define _ACK_TEST_JS_OK_

#include <list>

#include <pb_type.hpp>
#include <Packet.hpp>

#include <Msg.hpp>



class AckTestJsOk
{
private:
	U64 m_u64;
	I64 m_i64;


public:
	Packet Encode()
	{
		Packet packet;
		packet.WriteU64(m_u64);
		packet.WriteI64(m_i64);
		packet.Encode(Msg::P_ACK_TEST_JS_OK);
		return packet;
	}


	void SetU64(U64 u64)
	{
		m_u64 = u64;
	}

	void SetI64(I64 i64)
	{
		m_i64 = i64;
	}

};

#endif
