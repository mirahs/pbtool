class AudioMgr {
    // 音乐音量大小
    private static bgmVolume: number = 1
    // 音效音量大小
    private static sfxVolume: number = 1
    private static bgmAudioID: number = -1


    public static init(): void {
        var t = cc.sys.localStorage.getItem("bgmVolume");
        if (t != null) {
            this.bgmVolume = parseFloat(t);
        }

        var t = cc.sys.localStorage.getItem("sfxVolume");
        if (t != null) {
            this.sfxVolume = parseFloat(t);
        }

        cc.game.on(cc.game.EVENT_HIDE, function () {
            cc.log("cc.audioEngine.pauseAll");
            cc.audioEngine.pauseAll();
        });
        cc.game.on(cc.game.EVENT_SHOW, function () {
            cc.log("cc.audioEngine.resumeAll");
            cc.audioEngine.resumeAll();
        });
    }

    public static playBGM(url: string): void {
        var audioUrl = this.getUrl(url);
        cc.log(audioUrl);
        if (this.bgmAudioID >= 0) {
            cc.audioEngine.stop(this.bgmAudioID);
        }
        this.bgmAudioID = cc.audioEngine.play(audioUrl, true, this.bgmVolume);
    }

    public static playSFX(url: string, isAudioClip: boolean = false): void {
        if (this.sfxVolume > 0) {
            url = isAudioClip ? url : this.getUrl(url);
            var audioId = cc.audioEngine.play(url, false, this.sfxVolume);
            // 升级2.0.0
            /*
            if (isAudioClip) {
                cc.audioEngine.play(url, false, this.sfxVolume);
            } else {
                cc.loader.loadRes(this.getUrl(url), cc.AudioClip, function(err, clip) {
                    if (!err) {
                        cc.audioEngine.play(clip, false, this.sfxVolume);
                    } else {
                        cc.log('err:' + err);
                    }
                }.bind(this));
            }
            */
        }
    }

    public static setBGMVolume(v: number, force: boolean = false): void {
        // if (this.bgmAudioID >= 0) {
        //     if (v > 0) {
        //         cc.audioEngine.resume(this.bgmAudioID);
        //     } else {
        //         cc.audioEngine.pause(this.bgmAudioID);
        //     }
        //     //cc.audioEngine.setVolume(this.bgmAudioID, this.bgmVolume);
        // }
        if (this.bgmVolume != v || force) {
            cc.sys.localStorage.setItem("bgmVolume", v);
            this.bgmVolume = v;
            cc.audioEngine.setVolume(this.bgmAudioID, v);
        }
    }

    public static setSFXVolume(v: number): void {
        if (this.sfxVolume != v) {
            cc.sys.localStorage.setItem("sfxVolume", v);
            this.sfxVolume = v;
        }
    }

    public static pauseAll(): void {
        cc.audioEngine.pauseAll();
    }

    public static resumeAll(): void {
        cc.audioEngine.resumeAll();
    }


    private static getUrl(url: string): string {
        return cc.url.raw("resources/sounds/" + url);
        // 升级2.0.0
        // return "sounds/" + url;
    }
}
(<any>window).AudioMgr = AudioMgr
