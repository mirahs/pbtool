(function () {
    'use strict';

    var Scene = Laya.Scene;
    var REG = Laya.ClassUtils.regClass;
    var ui;
    (function (ui) {
        var test;
        (function (test) {
            class TestSceneUI extends Scene {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.loadScene("test/TestScene");
                }
            }
            test.TestSceneUI = TestSceneUI;
            REG("ui.test.TestSceneUI", TestSceneUI);
        })(test = ui.test || (ui.test = {}));
    })(ui || (ui = {}));

    class GameControl extends Laya.Script {
        constructor() {
            super();
            this.createBoxInterval = 1000;
            this._time = 0;
            this._started = false;
        }
        onEnable() {
            this._time = Date.now();
            this._gameBox = this.owner.getChildByName("gameBox");
        }
        onUpdate() {
            let now = Date.now();
            if (now - this._time > this.createBoxInterval && this._started) {
                this._time = now;
                this.createBox();
            }
        }
        createBox() {
            let box = Laya.Pool.getItemByCreateFun("dropBox", this.dropBox.create, this.dropBox);
            box.pos(Math.random() * (Laya.stage.width - 100), -100);
            this._gameBox.addChild(box);
        }
        onStageClick(e) {
            e.stopPropagation();
            let flyer = Laya.Pool.getItemByCreateFun("bullet", this.bullet.create, this.bullet);
            flyer.pos(Laya.stage.mouseX, Laya.stage.mouseY);
            this._gameBox.addChild(flyer);
        }
        startGame() {
            if (!this._started) {
                this._started = true;
                this.enabled = true;
            }
        }
        stopGame() {
            this._started = false;
            this.enabled = false;
            this.createBoxInterval = 1000;
            this._gameBox.removeChildren();
        }
    }

    class GameUI extends ui.test.TestSceneUI {
        constructor() {
            super();
            GameUI.instance = this;
            Laya.MouseManager.multiTouchEnabled = false;
        }
        onEnable() {
            this._control = this.getComponent(GameControl);
            this.tipLbll.on(Laya.Event.CLICK, this, this.onTipClick);
        }
        onTipClick(e) {
            this.tipLbll.visible = false;
            this._score = 0;
            this.scoreLbl.text = "";
            this._control.startGame();
        }
        addScore(value = 1) {
            this._score += value;
            this.scoreLbl.changeText("分数：" + this._score);
            if (this._control.createBoxInterval > 600 && this._score % 20 == 0)
                this._control.createBoxInterval -= 20;
        }
        stopGame() {
            this.tipLbll.visible = true;
            this.tipLbll.text = "游戏结束了，点击屏幕重新开始";
            this._control.stopGame();
        }
    }

    class Bullet extends Laya.Script {
        constructor() { super(); }
        onEnable() {
            var rig = this.owner.getComponent(Laya.RigidBody);
            rig.setVelocity({ x: 0, y: -10 });
        }
        onTriggerEnter(other, self, contact) {
            this.owner.removeSelf();
        }
        onUpdate() {
            if (this.owner.y < -10) {
                this.owner.removeSelf();
            }
        }
        onDisable() {
            Laya.Pool.recover("bullet", this.owner);
        }
    }

    class DropBox extends Laya.Script {
        constructor() {
            super();
            this.level = 1;
        }
        onEnable() {
            this._rig = this.owner.getComponent(Laya.RigidBody);
            this.level = Math.round(Math.random() * 5) + 1;
            this._text = this.owner.getChildByName("levelTxt");
            this._text.text = this.level + "";
        }
        onUpdate() {
            this.owner.rotation++;
        }
        onTriggerEnter(other, self, contact) {
            var owner = this.owner;
            if (other.label === "buttle") {
                if (this.level > 1) {
                    this.level--;
                    this._text.changeText(this.level + "");
                    owner.getComponent(Laya.RigidBody).setVelocity({ x: 0, y: -10 });
                    Laya.SoundManager.playSound("sound/hit.wav");
                }
                else {
                    if (owner.parent) {
                        let effect = Laya.Pool.getItemByCreateFun("effect", this.createEffect, this);
                        effect.pos(owner.x, owner.y);
                        owner.parent.addChild(effect);
                        effect.play(0, true);
                        owner.removeSelf();
                        Laya.SoundManager.playSound("sound/destroy.wav");
                    }
                }
                GameUI.instance.addScore(1);
            }
            else if (other.label === "ground") {
                owner.removeSelf();
                GameUI.instance.stopGame();
            }
        }
        createEffect() {
            let ani = new Laya.Animation();
            ani.loadAnimation("test/TestAni.ani");
            ani.on(Laya.Event.COMPLETE, null, recover);
            function recover() {
                ani.removeSelf();
                Laya.Pool.recover("effect", ani);
            }
            return ani;
        }
        onDisable() {
            Laya.Pool.recover("dropBox", this.owner);
        }
    }

    class GameConfig {
        constructor() {
        }
        static init() {
            var reg = Laya.ClassUtils.regClass;
            reg("script/GameUI.ts", GameUI);
            reg("script/GameControl.ts", GameControl);
            reg("script/Bullet.ts", Bullet);
            reg("script/DropBox.ts", DropBox);
        }
    }
    GameConfig.width = 640;
    GameConfig.height = 1136;
    GameConfig.scaleMode = "fixedwidth";
    GameConfig.screenMode = "none";
    GameConfig.alignV = "top";
    GameConfig.alignH = "left";
    GameConfig.startScene = "test/TestScene.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;
    GameConfig.init();

    class EventMgr {
        constructor() {
            this._handlers = {};
        }
        static get inst() { return this._inst || (this._inst = new EventMgr()); }
        on(eventId, method, caller) {
            if (this._handlers[eventId]) {
                const handlers = this._handlers[eventId];
                const handler = { method: method, caller: caller };
                handlers.push(handler);
            }
            else {
                const handlers = [];
                const handler = { method: method, caller: caller };
                handlers.push(handler);
                this._handlers[eventId] = handlers;
            }
        }
        off(eventId, method, caller) {
            if (!this._handlers[eventId]) {
                console.error('off eventId:' + eventId + ' 没有注册');
                return;
            }
            const handlers = this._handlers[eventId];
            for (let i = handlers.length - 1; i >= 0; i--) {
                let handler = handlers[i];
                if (handler.method == method && handler.caller == caller) {
                    handlers.splice(i, 1);
                }
            }
        }
        clear(caller) {
            if (!caller) {
                this._handlers = {};
                return;
            }
            for (let eventId in this._handlers) {
                const handlers = this._handlers[eventId];
                for (let i = handlers.length - 1; i >= 0; i--) {
                    let handler = handlers[i];
                    if (handler.caller == caller) {
                        handlers.splice(i, 1);
                        break;
                    }
                }
            }
        }
        fire(eventId, data) {
            if (!this._handlers[eventId]) {
                console.error('fire eventId:' + eventId + ' 没有注册');
                return;
            }
            const handlers = this._handlers[eventId];
            for (let j = 0; j < handlers.length; j++) {
                const handler = handlers[j];
                handler.method.apply(handler.caller, [eventId, data]);
            }
        }
    }
    EventMgr._inst = null;

    class Packet {
        constructor(buffer) {
            this.packetId = 0;
            this._byte = new Laya.Byte(buffer);
            this._byte.pos = 0;
            this._byte.endian = Laya.Byte.BIG_ENDIAN;
        }
        Encode(packetId) {
            this.packetId = packetId;
            var all = new Laya.Byte(4 + this._byte.length);
            all.endian = Laya.Byte.BIG_ENDIAN;
            all.writeUint16(this._byte.length + 2);
            all.writeUint16(packetId);
            all.writeArrayBuffer(this._byte.buffer);
            this._byte = all;
        }
        Buffer() {
            return this._byte.buffer;
        }
        GetBuffer() {
            return this._byte;
        }
        WriteBuffer(v) {
            this._byte.writeArrayBuffer(v.buffer, 0);
        }
        Reset() {
            this._byte.pos = 0;
        }
        WriteByte(v) {
            this._byte.writeByte(v);
        }
        WriteSbyte(v) {
            this._byte.writeUint8(v);
        }
        WriteUshort(v) {
            this._byte.writeUint16(v);
        }
        WriteShort(v) {
            this._byte.writeInt16(v);
        }
        WriteUint(v) {
            this._byte.writeUint32(v);
        }
        WriteInt(v) {
            this._byte.writeInt32(v);
        }
        WriteUlong(v) {
            const zeros = "00000000";
            var str = v.toString(16);
            str = zeros.substr(0, 16 - str.length) + str;
            this.WriteUint(parseInt(str.substr(0, 8), 16));
            this.WriteUint(parseInt(str.substr(8, 8), 16));
        }
        WriteLong(v) {
            const zeros = "00000000";
            var str = v.toString(16);
            str = zeros.substr(0, 16 - str.length) + str;
            this.WriteInt(parseInt(str.substr(0, 8), 16));
            this.WriteInt(parseInt(str.substr(8, 8), 16));
        }
        WriteFloat(v) {
            this._byte.writeFloat32(v);
        }
        WriteDouble(v) {
            this._byte.writeFloat64(v);
        }
        WriteString(v) {
            this._byte.writeUTFString(v);
        }
        ReadByte() {
            return this._byte.getUint8();
        }
        ReadSbyte() {
            return this._byte.getByte();
        }
        ReadUshort() {
            return this._byte.getUint16();
        }
        ReadShort() {
            return this._byte.getInt16();
        }
        ReadUint() {
            return this._byte.getUint32();
        }
        ReadInt() {
            return this._byte.getInt32();
        }
        ReadUlong() {
            const zeros = "00000000";
            var s = this.ReadUint().toString(16);
            var str = zeros.substr(0, 8 - s.length) + s;
            s = this.ReadUint().toString(16);
            str += zeros.substr(0, 8 - s.length) + s;
            return Number(parseInt(str, 16).toString());
        }
        ReadLong() {
            const zeros = "00000000";
            var s = this.ReadInt().toString(16);
            var str = zeros.substr(0, 8 - s.length) + s;
            s = this.ReadInt().toString(16);
            str += zeros.substr(0, 8 - s.length) + s;
            return Number(parseInt(str, 16).toString());
        }
        ReadFloat() {
            return this._byte.getFloat32();
        }
        ReadDouble() {
            return this._byte.getFloat64();
        }
        ReadString() {
            return this._byte.getUTFString();
        }
    }

    class NetMgr {
        constructor() {
            this._host = '';
            this._port = 0;
            this._socket = null;
            this._handlers = {};
        }
        static get inst() { return this._inst || (this._inst = new NetMgr()); }
        on(packetId, method, caller) {
            if (this._handlers[packetId]) {
                const handlers = this._handlers[packetId];
                const handler = { method: method, caller: caller };
                handlers.push(handler);
            }
            else {
                const handlers = [];
                const handler = { method: method, caller: caller };
                handlers.push(handler);
                this._handlers[packetId] = handlers;
            }
        }
        off(packetId, method, caller) {
            if (!this._handlers[packetId]) {
                console.error('off packetId[' + packetId + ']没有注册');
                return;
            }
            const handlers = this._handlers[packetId];
            for (let i = handlers.length - 1; i >= 0; i--) {
                let handler = handlers[i];
                if (handler.method == method && handler.caller == caller) {
                    handlers.splice(i, 1);
                }
            }
        }
        clear(caller) {
            if (!caller) {
                this._handlers = {};
                return;
            }
            for (let packetId in this._handlers) {
                const handlers = this._handlers[packetId];
                for (let i = handlers.length - 1; i >= 0; i--) {
                    let handler = handlers[i];
                    if (handler.caller == caller) {
                        handlers.splice(i, 1);
                        break;
                    }
                }
            }
        }
        connect(host, port) {
            this._host = host;
            this._port = port;
            this._socket = new WebSocket("ws://" + this._host + ":" + this._port + '/websocket');
            this._socket.binaryType = "arraybuffer";
            this._socket.onopen = (ev) => { this.openHandler(ev); };
            this._socket.onclose = (ev) => { this.closeHandler(ev); };
            this._socket.onmessage = (ev) => { this.receiveHandler(ev); };
            this._socket.onerror = (ev) => { this.errorHandler(ev); };
        }
        disConnect() {
            if (this._socket != null && this._socket.readyState != WebSocket.CLOSING) {
                this._socket.close();
            }
        }
        send(packet) {
            if (!this.isConnect) {
                console.error('网络没链接或断开');
                return;
            }
            const bf = packet.Buffer();
            this._socket.send(bf);
        }
        get isConnect() {
            return this._socket != null && this._socket.readyState == WebSocket.OPEN;
        }
        openHandler(ev = null) {
            console.log('网络链接成功');
            EventMgr.inst.fire(NetMgr.event.NetConnectSuccess);
        }
        receiveHandler(evt = null) {
            this.processRecive(evt.data);
        }
        closeHandler(ev = null) {
            console.log('网络链接关闭');
            EventMgr.inst.fire(NetMgr.event.NetDisconnect);
        }
        errorHandler(ev) {
            console.log('网络错误 ev.message:', ev.message);
            EventMgr.inst.fire(NetMgr.event.NetError);
        }
        processRecive(data) {
            let _byte = new Laya.Byte(data);
            _byte.endian = Laya.Byte.BIG_ENDIAN;
            _byte.pos = 0;
            while (_byte.length > 2) {
                const bodyLen = _byte.getUint16();
                if (_byte.length >= 2 + bodyLen) {
                    const bodyBuffer = new Laya.Byte();
                    bodyBuffer.endian = Laya.Byte.BIG_ENDIAN;
                    bodyBuffer.writeArrayBuffer(_byte.buffer, 2, bodyLen);
                    bodyBuffer.pos = 0;
                    const _byteNew = new Laya.Byte();
                    _byteNew.endian = Laya.Byte.BIG_ENDIAN;
                    _byteNew.writeArrayBuffer(_byte.buffer, 2 + bodyLen);
                    _byteNew.pos = 0;
                    _byte = _byteNew;
                    this.dispatch(bodyBuffer);
                }
                else {
                    console.error("processRecive 错误 _byte.length：%d,bodyLen:%d", _byte.length, bodyLen);
                    break;
                }
            }
        }
        dispatch(_bodyByte = null) {
            const packetId = _bodyByte.getUint16();
            if (!this._handlers[packetId]) {
                console.error('dispatch packetId:' + packetId + ' 没有注册');
                return;
            }
            const packetBuffer = _bodyByte.buffer.slice(2);
            const handlers = this._handlers[packetId];
            for (let i = 0; i < handlers.length; i++) {
                const packet = new Packet(packetBuffer);
                const handler = handlers[i];
                handler.method.apply(handler.caller, [packetId, packet]);
            }
        }
    }
    NetMgr._inst = null;
    NetMgr.event = {
        NetConnectSuccess: 1,
        NetConnectFaild: 2,
        NetDisconnect: 3,
        NetReconnect: 4,
        NetError: 5,
    };

    class AckTestXX {
        constructor(packet) {
            this._repeat_id_u8 = [];
            this.optional_id_u8_flag = 0;
            if (packet) {
                this._id_u8 = packet.ReadByte();
                this._id_u16 = packet.ReadUshort();
                this._id_u32 = packet.ReadUint();
                this._repeat_id_u8 = [];
                let repeat_id_u8_count = packet.ReadUshort();
                for (var i = 0; i < repeat_id_u8_count; i++) {
                    this._repeat_id_u8.push(packet.ReadByte());
                }
                this.optional_id_u8_flag = packet.ReadByte();
                if (this.optional_id_u8_flag == 1) {
                    this._optional_id_u8 = packet.ReadByte();
                }
            }
        }
        get id_u8() { return this._id_u8; }
        set id_u8(value) { this._id_u8 = value; }
        get id_u16() { return this._id_u16; }
        set id_u16(value) { this._id_u16 = value; }
        get id_u32() { return this._id_u32; }
        set id_u32(value) { this._id_u32 = value; }
        get repeat_id_u8() { return this._repeat_id_u8; }
        set repeat_id_u8(value) { this._repeat_id_u8 = value; }
        get optional_id_u8() { return this._optional_id_u8; }
        set optional_id_u8(value) { this.optional_id_u8_flag = 1; this._optional_id_u8 = value; }
    }

    class MsgRoleBase {
        constructor(packet) {
            if (packet) {
                this._uid = packet.ReadUint();
                this._uname = packet.ReadString();
            }
        }
        Encode() {
            let packet = new Packet();
            packet.WriteUint(this._uid);
            packet.WriteString(this._uname);
            return packet;
        }
        GetBuffer() {
            return this.Encode().GetBuffer();
        }
        get uid() { return this._uid; }
        set uid(value) { this._uid = value; }
        get uname() { return this._uname; }
        set uname(value) { this._uname = value; }
    }

    class AckTestSendOk {
        constructor(packet) {
            this._id_f32 = [];
            this.id_op_u8_flag = 0;
            this.op_role_base_flag = 0;
            if (packet) {
                this._id_u8 = packet.ReadByte();
                this._role_base = new MsgRoleBase(packet);
                this._id_f32 = [];
                let id_f32_count = packet.ReadUshort();
                for (var i = 0; i < id_f32_count; i++) {
                    this._id_f32.push(packet.ReadFloat());
                }
                this.id_op_u8_flag = packet.ReadByte();
                if (this.id_op_u8_flag == 1) {
                    this._id_op_u8 = packet.ReadByte();
                }
                this.op_role_base_flag = packet.ReadByte();
                if (this.op_role_base_flag == 1) {
                    this._op_role_base = new MsgRoleBase(packet);
                }
            }
        }
        get id_u8() { return this._id_u8; }
        set id_u8(value) { this._id_u8 = value; }
        get role_base() { return this._role_base; }
        set role_base(value) { this._role_base = value; }
        get id_f32() { return this._id_f32; }
        set id_f32(value) { this._id_f32 = value; }
        get id_op_u8() { return this._id_op_u8; }
        set id_op_u8(value) { this.id_op_u8_flag = 1; this._id_op_u8 = value; }
        get op_role_base() { return this._op_role_base; }
        set op_role_base(value) { this.op_role_base_flag = 1; this._op_role_base = value; }
    }

    class AckTestJsOk {
        constructor(packet) {
            if (packet) {
                this._u64 = packet.ReadUlong();
                this._i64 = packet.ReadLong();
            }
        }
        get u64() { return this._u64; }
        set u64(value) { this._u64 = value; }
        get i64() { return this._i64; }
        set i64(value) { this._i64 = value; }
    }

    class ReqTestXX {
        constructor() {
            this._repeat_id_u8 = [];
            this.optional_id_u8_flag = 0;
        }
        Encode() {
            let packet = new Packet();
            packet.WriteByte(this._id_u8);
            packet.WriteUshort(this._id_u16);
            packet.WriteUint(this._id_u32);
            let repeat_id_u8_count = this._repeat_id_u8.length;
            packet.WriteUshort(repeat_id_u8_count);
            for (var i = 0; i < repeat_id_u8_count; i++) {
                let xxx = this._repeat_id_u8[i];
                packet.WriteByte(xxx);
            }
            packet.WriteByte(this.optional_id_u8_flag);
            if (this.optional_id_u8_flag == 1) {
                packet.WriteByte(this._optional_id_u8);
            }
            packet.Encode(40040);
            return packet;
        }
        get id_u8() { return this._id_u8; }
        set id_u8(value) { this._id_u8 = value; }
        get id_u16() { return this._id_u16; }
        set id_u16(value) { this._id_u16 = value; }
        get id_u32() { return this._id_u32; }
        set id_u32(value) { this._id_u32 = value; }
        get repeat_id_u8() { return this._repeat_id_u8; }
        set repeat_id_u8(value) { this._repeat_id_u8 = value; }
        get optional_id_u8() { return this._optional_id_u8; }
        set optional_id_u8(value) { this.optional_id_u8_flag = 1; this._optional_id_u8 = value; }
    }

    class ReqTestSend {
        constructor() {
            this._id_f32 = [];
            this.id_op_u8_flag = 0;
            this.op_role_base_flag = 0;
        }
        Encode() {
            let packet = new Packet();
            packet.WriteByte(this._id_u8);
            packet.WriteBuffer(this._role_base.GetBuffer());
            let id_f32_count = this._id_f32.length;
            packet.WriteUshort(id_f32_count);
            for (var i = 0; i < id_f32_count; i++) {
                let xxx = this._id_f32[i];
                packet.WriteFloat(xxx);
            }
            packet.WriteByte(this.id_op_u8_flag);
            if (this.id_op_u8_flag == 1) {
                packet.WriteByte(this._id_op_u8);
            }
            packet.WriteByte(this.op_role_base_flag);
            if (this.op_role_base_flag == 1) {
                packet.WriteBuffer(this._op_role_base.GetBuffer());
            }
            packet.Encode(40010);
            return packet;
        }
        get id_u8() { return this._id_u8; }
        set id_u8(value) { this._id_u8 = value; }
        get role_base() { return this._role_base; }
        set role_base(value) { this._role_base = value; }
        get id_f32() { return this._id_f32; }
        set id_f32(value) { this._id_f32 = value; }
        get id_op_u8() { return this._id_op_u8; }
        set id_op_u8(value) { this.id_op_u8_flag = 1; this._id_op_u8 = value; }
        get op_role_base() { return this._op_role_base; }
        set op_role_base(value) { this.op_role_base_flag = 1; this._op_role_base = value; }
    }

    class ReqTestJs {
        Encode() {
            let packet = new Packet();
            packet.WriteUlong(this._u64);
            packet.WriteLong(this._i64);
            packet.Encode(40080);
            return packet;
        }
        get u64() { return this._u64; }
        set u64(value) { this._u64 = value; }
        get i64() { return this._i64; }
        set i64(value) { this._i64 = value; }
    }

    class Main {
        constructor() {
            if (window["Laya3D"])
                Laya3D.init(GameConfig.width, GameConfig.height);
            else
                Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
            Laya["Physics"] && Laya["Physics"].enable();
            Laya["DebugPanel"] && Laya["DebugPanel"].enable();
            Laya.stage.scaleMode = GameConfig.scaleMode;
            Laya.stage.screenMode = GameConfig.screenMode;
            Laya.stage.alignV = GameConfig.alignV;
            Laya.stage.alignH = GameConfig.alignH;
            Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;
            if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true")
                Laya.enableDebugPanel();
            if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"])
                Laya["PhysicsDebugDraw"].enable();
            if (GameConfig.stat)
                Laya.Stat.show();
            Laya.alertGlobalError(true);
            Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
        }
        onVersionLoaded() {
            Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
        }
        onConfigLoaded() {
            GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
            this.test();
        }
        test() {
            EventMgr.inst.on(NetMgr.event.NetConnectSuccess, this.handleEvent, this);
            NetMgr.inst.on(40050, this.onAckTestXX, this);
            NetMgr.inst.on(40020, this.onAckTestSendOk, this);
            NetMgr.inst.on(40090, this.onAckTestJsOk, this);
            NetMgr.inst.connect('127.0.0.1', 8080);
        }
        handleEvent(eventId, data) {
            console.log('eventId:', eventId);
            switch (eventId) {
                case NetMgr.event.NetConnectSuccess:
                    let reqTestXX = new ReqTestXX();
                    reqTestXX.id_u8 = 111;
                    reqTestXX.id_u16 = 11111;
                    reqTestXX.id_u32 = 1111111;
                    reqTestXX.optional_id_u8 = 222;
                    reqTestXX.repeat_id_u8 = [1, 2, 3, 4, 5];
                    NetMgr.inst.send(reqTestXX.Encode());
                    const roleBase = new MsgRoleBase();
                    roleBase.uid = 110;
                    roleBase.uname = 'mirahs 你好';
                    const reqTestSend = new ReqTestSend();
                    reqTestSend.id_u8 = 111;
                    reqTestSend.role_base = roleBase;
                    reqTestSend.id_f32 = [11.12, 12.23, 13.45];
                    reqTestSend.id_op_u8 = 123;
                    reqTestSend.op_role_base = roleBase;
                    NetMgr.inst.send(reqTestSend.Encode());
                    const reqTestJs = new ReqTestJs();
                    reqTestJs.u64 = 429496729610086;
                    reqTestJs.i64 = -429496729612233;
                    NetMgr.inst.send(reqTestJs.Encode());
                    break;
                default:
                    break;
            }
        }
        onAckTestXX(packetId, packet) {
            console.log('packetId:' + packetId);
            const ackTestXX = new AckTestXX(packet);
            console.log('ackTestXX:', ackTestXX);
        }
        onAckTestSendOk(packetId, packet) {
            console.log('packetId:' + packetId);
            const ackTestSendOk = new AckTestSendOk(packet);
            console.log('ackTestSendOk:', ackTestSendOk);
        }
        onAckTestJsOk(packetId, packet) {
            console.log('packetId:' + packetId);
            const ackTestJsOk = new AckTestJsOk(packet);
            console.log('ackTestJsOk:', ackTestJsOk);
        }
    }
    new Main();

}());
