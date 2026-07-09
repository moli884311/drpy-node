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
    let jxUrl = 'http://168.qxzm.cc/user/owe.php?app=10000&account=hjdhnx&password=hjdhnx&url=';
    try {
        let headers = {'Referer': jxUrl, 'User-Agent': PC_UA};
        let html = await request(jxUrl + input, {headers});
        let realUrl = jsp.pjfh(html, '$..url');
        if (realUrl) {
            log('168解析成功: ' + realUrl);
            return realUrl;
        }
    } catch (e) {
        log('168解析失败: ' + e.message);
    }
    return input;
}
