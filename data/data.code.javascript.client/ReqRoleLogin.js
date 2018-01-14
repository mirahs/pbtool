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

	this.SetLoginTime(login_time) {
		this._login_time = login_time;
	}
	this.GetLoginTime() {
		return this._login_time;
	}

	this.SetPwd(pwd) {
		this._pwd = pwd;
	}
	this.GetPwd() {
		return this._pwd;
	}

	this.SetRelink(relink) {
		this._relink = relink;
	}
	this.GetRelink() {
		return this._relink;
	}

	this.SetDebug(debug) {
		this._debug = debug;
	}
	this.GetDebug() {
		return this._debug;
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
}
