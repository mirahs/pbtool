<?php
namespace protocol;

use network\Packet;


class AckTestJsOk
{
	private $u64 = 0;
	private $i64 = 0;


	public function encode()
	{
		$packet = new Packet();
		$packet->writeU64($this->u64);
		$packet->writeI64($this->i64);
		return $packet->encode(Msg::$P_ACK_TEST_JS_OK);
	}


	public function setU64($u64)
	{
		$this->u64 = $u64;
	}

	public function setI64($i64)
	{
		$this->i64 = $i64;
	}

}
