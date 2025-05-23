/*
 * @Date: 2021-02-22 19:30:45
 * @LastEditors: lisonge
 * @Author: lisonge
 * @LastEditTime: 2021-08-19 15:19:47
 */

import { handler } from '../core';
import { aliyunReq2nodeReq, nodeResp2aliyunResp } from './transform';
import { AliyunRequest } from './types';

export const aliyunHandler = async (
    event: string,
) => {
    const aliyunReq = JSON.parse(event) as AliyunRequest;
    console.log(`receive event: ${event}`);
    let req = await aliyunReq2nodeReq(aliyunReq);
    console.log('raw_req', req.url);
    const resp = await handler(req);
    console.log('resp.status', resp.status);
    return await nodeResp2aliyunResp(resp);
};
