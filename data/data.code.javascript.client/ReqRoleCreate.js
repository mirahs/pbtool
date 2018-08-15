module.exports = ReqRoleCreate;

var Packet = require('../net/Packet');


function ReqRoleCreate() {
	// 玩家uid
	this._uid = 0;
	// 账号uuid
	this._uuid = 0;
	// 服务器id
	this._sid = 0;
	// 平台id
	this._cid = 0;
	// 操作系统
	this._os = "";
	// 版本号
	this._version = "";
	// 玩家昵称
	this._uname = "";
	// 来源
	this._source = "";
	// 子来源
	this._source_sub = "";
	// 登录时间
	this._login_time = 0;


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
		packet.Encode(1020);
		return packet;
	}
}

ReqRoleCreate.prototype = {
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

	set Uname(val) {
		this._uname = val;
	},
	get Uname() {
		return this._uname;
	},

	set Source(val) {
		this._source = val;
	},
	get Source() {
		return this._source;
	},

	set SourceSub(val) {
		this._source_sub = val;
	},
	get SourceSub() {
		return this._source_sub;
	},

	set LoginTime(val) {
		this._login_time = val;
	},
	get LoginTime() {
		return this._login_time;
	},
}
