interface Options {
  key?: string;
  noHyphen?: boolean;
  inject?: boolean;
}

declare function xRequestId (options: Options, app: any): Function

export {
  xRequestId
}
