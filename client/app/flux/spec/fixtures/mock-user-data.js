import uuid from 'node-uuid';

export default [
  {
    id: uuid.v4(),
    name: 'Frodo Baggins',
    password: '****',
    email: 'bagginzzz@hotmail.com',
    avatar: 'http://giphy.com/embed/b7yzh4kvd54pq',
    points: 410
  },
  {
    id: uuid.v4(),
    name: 'Sam Gamgee',
    password: '****',
    email: 'extreme_gardener_hbtn@yahoo.com',
    points: 350,
    avatar: 'http://giphy.com/embed/Ox8aVPqQNtVLi'
  },
  {
    id: uuid.v4(),
    name: 'Bilbo Baggins',
    password: '****',
    email: 'unclebilbs@aol.com',
    points: 12,
    avatar: 'http://giphy.com/embed/j4wqgdUZw1qjC'
  },
  {
    id: uuid.v4(),
    name: 'The Gaffer',
    password: '****',
    email: 'hobbiton4Lyfe@gmail.com',
    points: 10001,
    avatar: 'http://vignette2.wikia.nocookie.net/peter-jacksons-the-lord-of-the-rings-trilogy/images/3/38/Norman_Forsey_as_Gaffer_Gamgee_%28extended_edition%29.jpg'
  }
];
