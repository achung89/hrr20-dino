/**
 *    crud
 *
 *    communicates with the server using Axios
 *    this class is implemented as a singleton
 */

let instance = null;

import Axios from 'axios';
import config from '../config/config.js';

export default class Crud {
  constructor() {
    if (!instance) {
      instance = this;
    }

    this.axios = Axios.create({
      baseURL: config.baseURL
    });

    this.currentUser = {
      id: 0
    };

    return instance;
  }

  setCurrentUser(user) {
    this.currentUser = user;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  get(endpoint, params = {}) {
    return new Promise((resolve, reject) => {
      const id = params.id !== undefined ? params.id : '';
      this.axios.get(`/${endpoint}/${this.currentUser.id}/${id}`, {
        params: params
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  post(endpoint, data) {
    return new Promise((resolve, reject) => {
      this.axios.post(`/${endpoint}/${this.currentUser.id}`, data)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  update(endpoint, id, data) {
    return new Promise((resolve, reject) => {
      this.axios.put(`/${endpoint}/${this.currentUser.id}/${id}`, data)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  remove(endpoint, id) {
    return new Promise((resolve, reject) => {
      this.axios.delete(`/${endpoint}/${this.currentUser.id}`, id)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}
