import React from 'react';
import UserStore from '../../flux/stores/user-store';
import UserActions from '../../flux/actions/user-actions';
import uuid from 'node-uuid';

UserStore.useMockData();

export default class TestComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      currentUser: null
    };
  }

  componentDidMount() {
    this.getData.call(this);

    UserStore.addChangeListener(this.getData.bind(this));
  }

  render() {
    return (
      <div>
        <ul>
        {
          this.state.users.map((user) => {
            return (
              <li key={user.id}>
                <span onClick={this.remove.bind(null, user.id)}>
                  {user.name}
                </span>
                <span>
                  <button onClick={this.update.bind(null, user.id)}>Update</button>
                </span>
              </li>
            );
          })
        }
        </ul>
        <button onClick={this.add}>Add user</button>
      </div>
    );
  }

  getData() {
    UserStore
      .get()
      .then((data) => {
        this.setState({
          users: data.collection,
          currentUser: data.currentUser
        });
      });
  }

  add() {
    UserActions.add({
      id: uuid.v4(),
      name: 'Richard'
    });
  }

  remove(id) {
    UserActions.remove(id);
  }

  update(id) {
    UserActions.update({
      id: id,
      newData: {
        name: 'Dick'
      }
    });
  }
}