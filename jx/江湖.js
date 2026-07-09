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
        let jxUrl = 'http://211.99.99.236:4567/jhjson/ceshi.php?url=';
        let headers = {'User-Agent': PC_UA};
        let html = await request(jxUrl + input, {headers});
        try {
            let obj = JSON.parse(html);
            if (obj.url) return obj.url;
        } catch(e) {}
        let realUrl = jsp.pjfh(html, '$..url');
        if (realUrl) {
            log('江湖解析成功: ' + realUrl);
            return realUrl;
        }
    } catch (e) {
        log('江湖解析失败: ' + e.message);
    }
    return input;
}
