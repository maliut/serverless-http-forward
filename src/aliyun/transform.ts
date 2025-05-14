/*
 * @Date: 2021-02-21 20:23:34
 * @LastEditors: lisonge
 * @Author: lisonge
 * @LastEditTime: 2021-08-19 15:31:52
 */

import { Headers, Request, Response } from 'node-fetch';
import { URL } from 'url';
import { AliyunRequest } from './types';

/**
 * aliyunReq2nodeReq
 * @param aliyunReq
 * @param useRealPath if true url.pathname=aliyunReq.url else url.pathname=aliyunReq.path
 * @returns
 */
export async function aliyunReq2nodeReq(
    aliyunReq: AliyunRequest,
    useRealPath = false
): Promise<Request> {
    const { requestContext, headers, queryParameters, body } = aliyunReq;
    const url = new URL(`http://127.0.0.1/`);
    url.protocol = headers['X-Forwarded-Proto'];
    url.host = requestContext.domainName;
    // url.pathname = aliyunReq.url;
    // `${}://${headers['host']}${aliyunReq.url}`
    for (const k in queryParameters) {
        url.searchParams.set(k, queryParameters[k]);
    }
    if (!useRealPath) {
        url.pathname = requestContext.http.path;
    }
    const h = new Headers(headers);
    ['Host'].forEach((v) => {
        h.delete(v);
    });
    const req = new Request(url, { headers: h, method: requestContext.http.method, body });
    return req;
}

export async function nodeResp2aliyunResp(
    resp: Response,
) {
    const headers = new Headers(resp.headers);
    [
        'connection',
        'content-encoding',
        'content-length',
        'date',
        'keep-alive',
        'transfer-encoding',
    ].forEach((v) => {
        headers.delete(v);
    });

    const aliyunHeaders: Record<string, string> = {}
    headers.forEach((value, name) => {
      aliyunHeaders[name] = value;
    });
    const body = await resp.text()
    const aliyunResp = {
      statusCode: resp.status,
      headers: aliyunHeaders,
      body
    }
    console.log('resp', JSON.stringify(aliyunResp))

    return aliyunResp
}
