import axios from 'axios';
// import apiHost from './constant';
const methods = ['get', 'post', 'put', 'patch', 'del'];
const apiHost = 'localhost:2222'

export default class ApiHost {
  constructor(req) {
    methods.forEach(method => {
      this[method] = (path, { params, data, headers, files, fields, fallback } = {}, isExternal = true, typeForm = false) => new Promise((resolve, reject) => {
        let request;
        if (isExternal) {
          request = axios[method](`${apiHost}${path}`);
        } else {
          request = axios[method](path);
        }
        if (params) {
          request.query(params);
        }

        if (headers) {
          request.set(headers);
        }

        if (files) {
          files.forEach(file => request.attach(file.key, file.value));
        }

        if (fields) {
          fields.forEach(item => request.field(item.key, item.value));
        }

        if (data) {
          request.send(data);
        }

        if (typeForm) {
          request.type('form');
        }
        request.end((err, { body } = {}) => {
          if (err) {
            if (fallback) {
              fallback(err);
              reject(body || err);
            } else {
              reject(body || err);
            }
          } else { resolve(body); }
        });
      });
    });
  }
}
