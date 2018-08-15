module.exports = ReqRoleLogin;

var Packet = require('../net/Packet');


function ReqRoleLogin() {
	// 玩家uid
	this._uid = 0;
	// 账号uuid
	this._uuid = 0;
	// 服务器id
	this._sid = 0;
	// 平台id
	this._cid = 0;
	// 登录时间
	this._login_time = 0;
	// 校验码
	this._pwd = "";
	// 是否重连
	this._relink = 0;
	// 是否调试
	this._debug = 0;
	// 操作系统
	this._os = "";
	// 版本号
	this._version = "";


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
		packet.Encode(1010);
		return packet;
	}
}

ReqRoleLogin.prototype = {
	set Uid(val) {
		this._uid = val;
	},
	get Uid() {
		return this._uid;
	},

	set Uuid(val) {
		this._uuid = val;
	},
	get Uuid() {
		return this._uuid;
	},

	set Sid(val) {
		this._sid = val;
	},
	get Sid() {
		return this._sid;
	},

	set Cid(val) {
		this._cid = val;
	},
	get Cid() {
		return this._cid;
	},

	set LoginTime(val) {
		this._login_time = val;
	},
	get LoginTime() {
		return this._login_time;
	},

	set Pwd(val) {
		this._pwd = val;
	},
	get Pwd() {
		return this._pwd;
	},

	set Relink(val) {
		this._relink = val;
	},
	get Relink() {
		return this._relink;
	},

	set Debug(val) {
		this._debug = val;
	},
	get Debug() {
		return this._debug;
	},

	set Os(val) {
		this._os = val;
	},
	get Os() {
		return this._os;
	},

	set Version(val) {
		this._version = val;
	},
	get Version() {
		return this._version;
	},
}
