class HttpMgr {
	public static Request(url: string, caller: any = null, callback: Function, args = null, isPost: boolean = false): void {
		const xhr: XMLHttpRequest = new XMLHttpRequest();
		xhr.timeout = 3000;
		xhr.ontimeout = (event) => {
			this.doCallback(caller, callback, '请求超时');
		}
		xhr.onreadystatechange = () => {
			if (xhr.readyState == 4) {
				if (xhr.status >= 200 && xhr.status < 400) {
					this.doCallback(caller, callback, false, xhr.responseText);
				} else {
					this.doCallback(caller, callback, '(error) readyState: ' + xhr.readyState + ' status: ' + xhr.status);
				}
			}
		}

		var httpParams = this.dict2HttpParams(args);

		if (!isPost) {
			url = httpParams == '' ? url : url + '?' + httpParams;
			xhr.open("GET", url, true);
			xhr.send();
		} else {
			xhr.open("POST", url, true);
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xhr.send(httpParams);
		}
	}


	private static doCallback(caller: any = null, callback: Function, errMsg, response = null): void {
		if (caller) {
			callback.apply(caller, [errMsg, response]);
		} else {
			callback(errMsg, response);
		}
	}

	private static dict2HttpParams(dict) {
		if (!dict) { return ''; }

		var content = '';
		for (var key in dict) {
			content += key + '=' + dict[key] + '&';
		}
		return content.substr(0, content.length - 1);
	}
}
(<any>window).HttpMgr = HttpMgr
