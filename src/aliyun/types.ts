/*
 * @Date: 2021-02-21 19:52:00
 * @LastEditors: lisonge
 * @Author: lisonge
 * @LastEditTime: 2021-08-19 15:32:45
 */

/**
 * @see <https://help.aliyun.com/zh/functioncompute/fc-3-0/user-guide/http-trigger-invoking-function?spm=a2c4g.11186623.help-menu-2508973.d_2_8_9_2.2fdd4280ZjygdG&scm=20140722.H_2545977._.OR_help-T_cn~zh-V_1>
 */
export type AliyunRequest = {
    headers: { [key: string]: string } & {
        Host: string;
        'X-Forwarded-Proto': 'https' | 'http';
    };
    queryParameters: { [key: string]: string };
    body: string;
    requestContext: {
      domainName: string;
      http: {
        method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'PATCH';
        /**
         * /函数接收路径
         */
        path: string;
      }
    }
};
