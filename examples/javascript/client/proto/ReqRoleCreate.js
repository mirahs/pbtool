module.exports = ReqRoleCreate;

var Packet = require('../net/Packet');


function ReqRoleCreate() {
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


	this.Encode = function() {
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

	this.SetUname = function(uname) {
		this._uname = uname;
	}
	this.GetUname= function() {
		return this._uname;
	}

	this.SetSource = function(source) {
		this._source = source;
	}
	this.GetSource= function() {
		return this._source;
	}

	this.SetSourceSub = function(source_sub) {
		this._source_sub = source_sub;
	}
	this.GetSourceSub= function() {
		return this._source_sub;
	}

	this.SetLoginTime = function(login_time) {
		this._login_time = login_time;
	}
	this.GetLoginTime= function() {
		return this._login_time;
	}
}
