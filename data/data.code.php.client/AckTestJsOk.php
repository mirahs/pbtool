<?php
namespace protocol;

use network\Packet;


class AckTestJsOk
{
	private $u64 = 0;
	private $i64 = 0;


	public function __construct(&$packet)
	{
		$this->decode($packet);
	}

	public function decode(&$packet)
	{
		$this->u64 = $packet->readU64();
		$this->i64 = $packet->readI64();
	}


	public function getU64()
	{
		return $this->u64;
	}

	public function getI64()
	{
		return $this->i64;
	}

}
