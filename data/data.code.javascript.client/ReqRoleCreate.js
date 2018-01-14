module.exports = ReqRoleCreate;

var Packet = require('../net/Packet');


var ReqRoleCreate = function() {
	this._uid = undefined;
	this._uuid = undefined;
	this._sid = undefined;
	this._cid = undefined;
	this._os = undefined;
	this._version = undefined;
	this._uname = undefined;
	this._source = undefined;
	this._source_sub = undefined;
	this._login_time = undefined;


	this.Encode() {
		var packet = new Packet();
		packet.WriteUint(this._uid);
		packet.WriteUint(this._uuid);
		packet.WriteUshort(this._sid);
		packet.WriteUshort(this._cid);
		packet.WriteString(this._os);
		packet.WriteString(this._version);
		packet.WriteString(this._uname);
		packet.WriteString(this._source);
		packet.WriteString(this._source_sub);
		packet.WriteUint(this._login_time);
		packet.Encode(Msg.REQ_ROLE_CREATE);
		return packet;
	}


	this.SetUid(uid) {
		this.uid = uid;
	}
	this.GetUid() {
		return this.uid;
	}

	this.SetUuid(uuid) {
		this.uuid = uuid;
	}
	this.GetUuid() {
		return this.uuid;
	}

	this.SetSid(sid) {
		this.sid = sid;
	}
	this.GetSid() {
		return this.sid;
	}

	this.SetCid(cid) {
		this.cid = cid;
	}
	this.GetCid() {
		return this.cid;
	}

	this.SetOs(os) {
		this.os = os;
	}
	this.GetOs() {
		return this.os;
	}

	this.SetVersion(version) {
		this.version = version;
	}
	this.GetVersion() {
		return this.version;
	}

	this.SetUname(uname) {
		this.uname = uname;
	}
	this.GetUname() {
		return this.uname;
	}

	this.SetSource(source) {
		this.source = source;
	}
	this.GetSource() {
		return this.source;
	}

	this.SetSourceSub(source_sub) {
		this.source_sub = source_sub;
	}
	this.GetSourceSub() {
		return this.source_sub;
	}

	this.SetLoginTime(login_time) {
		this.login_time = login_time;
	}
	this.GetLoginTime() {
		return this.login_time;
	}
}
