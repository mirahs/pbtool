#ifndef _REQ_TEST_JS_
#define _REQ_TEST_JS_

#include <list>

#include <pb_type.hpp>
#include <Packet.hpp>

#include <Msg.hpp>



class ReqTestJs
{
private:
	U64 m_u64;
	I64 m_i64;


public:
	ReqTestJs(Packet* packet)
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
