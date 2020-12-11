import config from '../config';

const { API_ROOT_URL } = config;

const headers = {
  'Accept': 'application/json',
  'Accept-Charset': 'utf-8',
  'Content-type': 'application/json',
};

function formatUri(uri) {
  if (new RegExp('^http|https').test(uri)) {
    return `${uri}`;
  }
  return `${API_ROOT_URL}${uri}`;
}

const fetching = async (uriInput = '', method = 'GET', body = {}) => {
  const uri = formatUri(uriInput);
  const jsonBody = JSON.stringify(body);

  const data = {
    url: uri,
    method,
    headers,
    data: jsonBody,
    dataType: 'json',
  };
  if (method === 'GET') delete data.data;
  const fetchAPI = new Promise((resolve, reject) => {

    my.request({
      ...data,
      success: function (resp) {
        if (resp.status == 200) {
          resolve(resp.data);
          return
        }

        reject(resp);
      },
      fail: function (resp) {
        reject(resp);
      }
    })
  })

  return Promise.race([
    fetchAPI,
    new Promise((resolve, reject) => {
      setTimeout(reject, 10000);
    }),
  ]);
};

const GET = (uri, body) => fetching(uri, 'GET', body);
const POST = (uri, body) => fetching(uri, 'POST', body);
const PUT = (uri, body) => fetching(uri, 'PUT', body);
const DELETE = (uri, body) => fetching(uri, 'DELETE', body);

export default {
  GET,
  POST,
  PUT,
  DELETE,
};
