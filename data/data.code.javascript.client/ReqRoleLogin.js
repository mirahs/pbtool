module.exports = ReqRoleLogin;

var Packet = require('../net/Packet');


function ReqRoleLogin() {
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


	this.Encode = function() {
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


	this.SetUid = function(uid) {
		this._uid = uid;
	}
	this.GetUid= function() {
		return this._uid;
	}

	this.SetUuid = function(uuid) {
		this._uuid = uuid;
	}
	this.GetUuid= function() {
		return this._uuid;
	}

	this.SetSid = function(sid) {
		this._sid = sid;
	}
	this.GetSid= function() {
		return this._sid;
	}

	this.SetCid = function(cid) {
		this._cid = cid;
	}
	this.GetCid= function() {
		return this._cid;
	}

	this.SetLoginTime = function(login_time) {
		this._login_time = login_time;
	}
	this.GetLoginTime= function() {
		return this._login_time;
	}

	this.SetPwd = function(pwd) {
		this._pwd = pwd;
	}
	this.GetPwd= function() {
		return this._pwd;
	}

	this.SetRelink = function(relink) {
		this._relink = relink;
	}
	this.GetRelink= function() {
		return this._relink;
	}

	this.SetDebug = function(debug) {
		this._debug = debug;
	}
	this.GetDebug= function() {
		return this._debug;
	}

	this.SetOs = function(os) {
		this._os = os;
	}
	this.GetOs= function() {
		return this._os;
	}

	this.SetVersion = function(version) {
		this._version = version;
	}
	this.GetVersion= function() {
		return this._version;
	}
}
