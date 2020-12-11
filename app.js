import parse from 'url-parse';
import http from './utils/http';
import { API_KEY } from './config';

App({
  onLaunch(options) {
    // 第一次打开
    // options.query == {number:1}
    console.info('App onLaunch');
  },
  onShow(options) {
    // 从后台被 scheme 重新打开
    // options.query == {number:1}
  },
  async fetchAPI(method = 'GET', uri = '', body = {}) {
    let url = parse(uri);

    url.set(
      'query',
      url.query.length > 0
        ? `${url.query}&api_key=${API_KEY}`
        : `?api_key=${API_KEY}`
    );
    uri = url.href;

    switch (method) {
      case 'GET':
        return await http.GET(uri, body);
      case 'POST':
        return await http.POST(uri, body);
      case 'PUT':
        return await http.PUT(uri, body);
      case 'DELETE':
        return await http.DELETE(uri, body);
    }
    return null
  },
});
