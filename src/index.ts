/**
 * @fileOverview fork 自 https://github.com/koa-modules/x-request-id
 * 主要是升级 uuid 包
 */

/*!
* x-request-id
* Copyright(c) 2015 Fangdun Cai
* MIT Licensed
*/

/**
 * Module dependences.
 */

import uuid from 'uuid/v4';

const HTTP_X_REQUEST_ID_HEADER = 'X-Request-Id';

/**
 * X-Request-Id:
 *
 * Generates a unique Request ID for every incoming HTTP request.
 * This unique ID is then passed to your application as an HTTP header called
 * `X-Request-Id`.
 *
 * @param {string} [key=HTTP_X_REQUEST_ID_HEADER]
 * @param {boolean} [noHyphen=false]
 * @param {boolean} [inject=false]
 * @api public
 */

export interface Options {
  key?: string;
  noHyphen?: boolean;
  inject?: boolean;
}

export function xRequestId (options: Options, app: any) {
  options = options || {};
  const key = options.key || HTTP_X_REQUEST_ID_HEADER;
  const noHyphen = !!options.noHyphen;
  const inject = !!options.inject;
  if (inject) {
    if (!app) throw new TypeError('`app` must be required!');
    Object.defineProperty(app.request, 'id', {
      get: function () {
        return this._id
      },
      set: function (id) {
        this._id = id
      }
    });
    Object.defineProperty(app.context, 'id', {
      get: function () {
        return this.request.id
      }
    })
  }
  /// 没法引用 Daruk 类型
  return (ctx: any, next: Function) => {
    var id = ctx.id || ctx.query[key] || ctx.get(key) || uuid();
    if (noHyphen) id = id.replace(/-/g, '');
    if (inject) ctx.request.id = id;
    ctx.set(key, id);
    return next()
  }
}
