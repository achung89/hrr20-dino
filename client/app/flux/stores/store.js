/**
 *      *** store.js ***
 *
 *      A superclass for other stores.
 *
 *      Each store has a `data` object which can be used for whatever.
 *      It also has an array called `collection` that is what the standard `get`, `add`, `update` and `remove`
 *      methods operate on by default.
 *
 *      To instantiate a subclass, call `super` in your store's constructor, passing in an object that contains
 *      a string for the key `storeName`.  It should correspond to your server API's endpoint.
 *
 */


import EventEmitter from 'events';
import Crud from '../../lib/crud';
import MockData from '../spec/fixtures/mock-data-index';
import _ from 'lodash';

const CHANGE_EVENT = 'change';

class Store extends EventEmitter {
  constructor(subClass) {
    super();
    this.db = new Crud();

    this.storeName = subClass.storeName;
    this.mock = false;

    this.data = {
      collection: []
    };
  }

  useMockData() {
    this.mock = true;
    this.data.collection = MockData[this.storeName];
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  get(params) {
    return new Promise((resolve, reject) => {
      if (this.mock) {
        resolve(this.data);
      } else {
        this.db.get(this.storeName, params)
          .then((data) => {
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      }
    });
  }

  _add(data) {
    if (this.mock) {
      this.data.collection.push(data);
      this.emitChange();
    } else {
      this.db.post(this.storeName, data)
        .then(() => {
          this.emitChange();
        });
    }
  }

  _update(id, data) {
    if (this.mock) {
      const index = _.findIndex(this.data.collection, { id: id });
      if (index !== -1) {
        _.assignIn(this.data.collection[index], data);
        this.emitChange();
      }
    } else {
      this.db.update(`${this.storeName}/${id}`, data)
        .then(() => {
          this.emitChange();
        });
    }
  }

  _remove(id) {
    if (this.mock) {
      const index = _.findIndex(this.data.collection, { id: id });
      if (index !== -1) {
        this.data.collection.splice(index, 1);
        this.emitChange();
      }
    } else {
      this.db.remove(`${this.storeName}/${id}`)
        .then(() => {
          this.emitChange();
        });
    }
  }
}

Store.dispatchToken = null;

export default Store;
