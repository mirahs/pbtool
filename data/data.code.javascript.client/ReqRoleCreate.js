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
		this._uid = uid;
	}
	this.GetUid() {
		return this._uid;
	}

	this.SetUuid(uuid) {
		this._uuid = uuid;
	}
	this.GetUuid() {
		return this._uuid;
	}

	this.SetSid(sid) {
		this._sid = sid;
	}
	this.GetSid() {
		return this._sid;
	}

	this.SetCid(cid) {
		this._cid = cid;
	}
	this.GetCid() {
		return this._cid;
	}

	this.SetOs(os) {
		this._os = os;
	}
	this.GetOs() {
		return this._os;
	}

	this.SetVersion(version) {
		this._version = version;
	}
	this.GetVersion() {
		return this._version;
	}

	this.SetUname(uname) {
		this._uname = uname;
	}
	this.GetUname() {
		return this._uname;
	}

	this.SetSource(source) {
		this._source = source;
	}
	this.GetSource() {
		return this._source;
	}

	this.SetSourceSub(source_sub) {
		this._source_sub = source_sub;
	}
	this.GetSourceSub() {
		return this._source_sub;
	}

	this.SetLoginTime(login_time) {
		this._login_time = login_time;
	}
	this.GetLoginTime() {
		return this._login_time;
	}
}
