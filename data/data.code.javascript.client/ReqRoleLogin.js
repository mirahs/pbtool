module.exports = ReqRoleLogin;

var Packet = require('../net/Packet');


var ReqRoleLogin = function() {
	this._uid = undefined;
	this._uuid = undefined;
	this._sid = undefined;
	this._cid = undefined;
	this._login_time = undefined;
	this._pwd = undefined;
	this._relink = undefined;
	this._debug = undefined;
	this._os = undefined;
	this._version = undefined;


	this.Encode() {
		var packet = new Packet();
		packet.WriteUint(this._uid);
		packet.WriteUint(this._uuid);
		packet.WriteUshort(this._sid);
		packet.WriteUshort(this._cid);
		packet.WriteUint(this._login_time);
		packet.WriteString(this._pwd);
		packet.WriteByte(this._relink);
		packet.WriteByte(this._debug);
		packet.WriteString(this._os);
		packet.WriteString(this._version);
		packet.Encode(Msg.REQ_ROLE_LOGIN);
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

	this.SetLoginTime(login_time) {
		this.login_time = login_time;
	}
	this.GetLoginTime() {
		return this.login_time;
	}

	this.SetPwd(pwd) {
		this.pwd = pwd;
	}
	this.GetPwd() {
		return this.pwd;
	}

	this.SetRelink(relink) {
		this.relink = relink;
	}
	this.GetRelink() {
		return this.relink;
	}

	this.SetDebug(debug) {
		this.debug = debug;
	}
	this.GetDebug() {
		return this.debug;
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
}
