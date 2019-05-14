"use strict";
/**
 * @fileOverview fork 自 https://github.com/koa-modules/x-request-id
 * 主要是升级 uuid 包
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*!
* x-request-id
* Copyright(c) 2015 Fangdun Cai
* MIT Licensed
*/
/**
 * Module dependences.
 */
var v4_1 = __importDefault(require("uuid/v4"));
var HTTP_X_REQUEST_ID_HEADER = 'X-Request-Id';
function xRequestId(options, app) {
    options = options || {};
    var key = options.key || HTTP_X_REQUEST_ID_HEADER;
    var noHyphen = !!options.noHyphen;
    var inject = !!options.inject;
    if (inject) {
        if (!app)
            throw new TypeError('`app` must be required!');
        Object.defineProperty(app.request, 'id', {
            get: function () {
                return this._id;
            },
            set: function (id) {
                this._id = id;
            }
        });
        Object.defineProperty(app.context, 'id', {
            get: function () {
                return this.request.id;
            }
        });
    }
    /// 没法引用 Daruk 类型
    return function (ctx, next) {
        var id = ctx.id || ctx.query[key] || ctx.get(key) || v4_1.default();
        if (noHyphen)
            id = id.replace(/-/g, '');
        if (inject)
            ctx.request.id = id;
        ctx.set(key, id);
        return next();
    };
}
exports.xRequestId = xRequestId;
