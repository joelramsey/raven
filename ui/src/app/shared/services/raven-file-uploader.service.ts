import { FileUploader, ParsedResponseHeaders } from 'ng2-file-upload/ng2-file-upload';

export class RavenFileUploader extends FileUploader {

  protected _xhrTransport(item:any):any {
    let xhr = item._xhr = new XMLHttpRequest();
    let sendable:any;
    this._onBeforeUploadFormItem(item);
    // todo
    /*item.formData.map(obj => {
     obj.map((value, key) => {
     form.append(key, value);
     });
     });*/
    if (typeof item._file.size !== 'number') {
      throw new TypeError('The file specified is no longer valid');
    }
    if (!this.options.disableMultipart) {
      sendable = new FormData();
      this._onBuildFormItemForm(item, sendable);

      sendable.append('item[name]', item.file.name);
      sendable.append('item[description]', '');
      sendable.append('item[document_data][]', item._file, item.file.name);
    } else {
      sendable = item._file;
    }

    xhr.upload.onprogress = (event:any) => {
      let progress = Math.round(event.lengthComputable ? event.loaded * 100 / event.total : 0);
      this._onUploadProgressItem(item, progress);
    };
    xhr.onload = () => {
      let headers = this._parseUploadResponseHeaders(xhr.getAllResponseHeaders());
      let response = this._transformUploadResponse(xhr.response, headers);
      let gist = this._isXHRSuccessCode(xhr.status) ? 'Success' : 'Error';
      let method = '_on' + gist + 'Item';
      (this as any)[method](item, response, xhr.status, headers);
      this._onCompleteItem(item, response, xhr.status, headers);
    };
    xhr.onerror = () => {
      let headers = this._parseUploadResponseHeaders(xhr.getAllResponseHeaders());
      let response = this._transformUploadResponse(xhr.response, headers);
      this._onErrorItem(item, response, xhr.status, headers);
      this._onCompleteItem(item, response, xhr.status, headers);
    };
    xhr.onabort = () => {
      let headers = this._parseUploadResponseHeaders(xhr.getAllResponseHeaders());
      let response = this._transformUploadResponse(xhr.response, headers);
      this._onCancelUploadItem(item, response, xhr.status, headers);
      this._onCompleteItem(item, response, xhr.status, headers);
    };
    xhr.open(item.method, item.url, true);
    xhr.withCredentials = item.withCredentials;
    // todo
    /*item.headers.map((value, name) => {
     xhr.setRequestHeader(name, value);
     });*/
    if (this.options.headers) {
      for (let header of this.options.headers) {
        xhr.setRequestHeader(header.name, header.value);
      }
    }
    if (this.authToken) {
      xhr.setRequestHeader(this.authTokenHeader, this.authToken);
    }
    xhr.send(sendable);
    this._doRender();
  }

  private _onBeforeUploadFormItem(item:any):void {
    item._onBeforeUpload();
    this.onBeforeUploadItem(item);
  }

  private _onBuildFormItemForm(item:any, form:any):void {
    item._onBuildForm(form);
    this.onBuildItemForm(item, form);
  }

  /* tslint:enable */
  private _parseUploadResponseHeaders(headers:string):ParsedResponseHeaders {
    let parsed:any = {};
    let key:any;
    let val:any;
    let i:any;
    if (!headers) {
      return parsed;
    }
    headers.split('\n').map((line:any) => {
      i = line.indexOf(':');
      key = line.slice(0, i).trim().toLowerCase();
      val = line.slice(i + 1).trim();
      if (key) {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    });
    return parsed;
  }

  private _doRender():any {
    return void 0;
    // todo: ?
  }

  /* tslint:disable */
  private _transformUploadResponse(response:string, headers:ParsedResponseHeaders):string {
    // todo: ?
    /*var headersGetter = this._headersGetter(headers);
     forEach($http.defaults.transformResponse, (transformFn) => {
     response = transformFn(response, headersGetter);
     });*/
    return response;
  }

  private _onUploadProgressItem(item:any, progress:any):void {
    let total = this._getTotalUploadProgress(progress);
    this.progress = total;
    item._onProgress(progress);
    this.onProgressItem(item, progress);
    this.onProgressAll(total);
    this._doRender();
  }

  private _getTotalUploadProgress(value:number = 0):number {
    if (this.options.removeAfterUpload) {
      return value;
    }
    let notUploaded = this.getNotUploadedItems().length;
    let uploaded = notUploaded ? this.queue.length - notUploaded : this.queue.length;
    let ratio = 100 / this.queue.length;
    let current = value * ratio / 100;
    return Math.round(uploaded * ratio + current);
  }

  private _isXHRSuccessCode(status:number):boolean {
    return (status >= 200 && status < 300) || status === 304;
  }

  /* tslint:enable */
  private _onCancelUploadItem(item:any, response:string, status:number, headers:ParsedResponseHeaders):void {
    item._onCancel(response, status, headers);
    this.onCancelItem(item, response, status, headers);
  }
}