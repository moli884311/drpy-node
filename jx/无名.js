const jx = {
    type: 1,
    ext: {
        flag: ['qq', '腾讯', 'qiyi', '爱奇艺', '奇艺', 'youku', '优酷', 'mgtv', '芒果']
    },
    header: {
        'User-Agent': MOBILE_UA
    }
};

async function lazy(input, params) {
    try {
        let jxUrl = 'http://api.ckflv.cn/?url=';
        let headers = {'Referer': jxUrl, 'User-Agent': MOBILE_UA};
        let html = await request(jxUrl + input, {headers});
        let realUrl = jsp.pjfh(html, '$..url');
        if (realUrl) {
            log('无名解析成功: ' + realUrl);
            return realUrl;
        }
    } catch (e) {
        log('无名解析失败: ' + e.message);
    }
    return input;
}
