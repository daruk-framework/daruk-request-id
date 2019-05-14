/**
 * @fileOverview fork 自 https://github.com/koa-modules/x-request-id
 * 主要是升级 uuid 包
 */
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
export declare function xRequestId(options: Options, app: any): (ctx: any, next: Function) => any;
