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
	AckTestJsOk(Packet* packet)
	{
		m_u64 = packet->ReadU64();
		m_i64 = packet->ReadI64();
	}


	U64 GetU64()
	{
		return m_u64;
	}

	I64 GetI64()
	{
		return m_i64;
	}

};

#endif
