export default [
  {
    id: 1234,
    name: 'Programming',
    description: 'Become a better programmer',
    tasks: [],
    repeat: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: false,
      sunday: false
    },
    start_time: {
      hour: 22,
      minute: 30
    },
    end_time: {
      hour: 23,
      minute: 30
    },
    history: [
      {
        rating: 8,
        timestamp: '2016-12-10T23:30:00+00:00',
        positive: 'Getting better with git.',
        negative: 'Keyword this woes',
        plan: 'practice using the keyword this in the console'
      },
      {
        timestamp: '2016-12-09T23:30:00+00:00',
        rating: 4,
        positive: 'I did not freak out',
        negative: 'I am bad at linux',
        plan: 'take a community college course on linux fundamentals'
      },
      {
        rating: 9,
        timestamp: '2016-12-08T23:30:00+00:00',
        positive: 'Feeling more comfortable with higher order functions',
        negative: 'ES6 intimidates me',
        plan: 'try rewriting hello world in ES6'
      }
    ]
  },
  {
    id: 5678,
    name: 'Personal',
    description: 'Become a better person',
    repeat: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: false,
      sunday: false
    },
    start_time: {
      hour: 16,
      minute: 0,
    },
    end_time: {
      hour: 18,
      minute: 30
    },
    history: [
      {
        rating: 4,
        timestamp: '2016-12-10T18:30:00+00:00',
        positive: 'Helped a dog cross the street',
        negative: 'It ran off',
        plan: 'practice being patient'
      },
      {
        timestamp: '2016-12-09T18:30:00+00:00',
        rating: 6,
        positive: 'Stayed positive',
        negative: 'Doubted my resolve',
        plan: 'Do some daily affirmations'
      },
      {
        rating: 5,
        timestamp: '2016-12-08T18:30:00+00:00',
        positive: 'Felt pretty good about my progress',
        negative: 'Anger issues still abound',
        plan: 'Take more relaxing baths'
      }
    ]
  },
  {
    id: 8765,
    name: 'Learn to fly a plane'
  },
  {
    id: 4321,
    name: 'Joust'
  }
];
