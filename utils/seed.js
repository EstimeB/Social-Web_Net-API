const connection = require('../config/connection');
const { User, Thought } = require('../models');

const names = [
    {username:'Rod',email:"rod@gmail.com"},
    {username:'Knee', email:'knee@gmail.com'},
    {username:'Hank', email:'hank.com'},
    {username:'Cheef', email: 'cheef@gmail.com'},
    {username:'Bridget', email: 'bridget@gmail.com'},
    {username:'Pat', email:'pat@gmail.com'},
    {username:'Karen', email:'karen@gmail.com'},
    {username:'Lee', email:'lee@gmail.com'},
    {username:'Lynne', email:'lynne@gmail.com'},
    {username:'Gwafranca', email:'gwafranca@gmail.com'},
    {username:'Gwistic', email:'gwistic@gmail.com'},
];

const userThoughts = [
    {thoughtText:'We eat pizza from the inside out.', username:'Rod'},
    {thoughtText:'If you live to be 70 years old you will spend TEN YEARS of your life on Monday.', username:'Knee'},
    {thoughtText:'Sometime in the future, someone will say your name for the last time.', username:'Hank'},
    {thoughtText:'Deaf people probably don,t understand why farts are funny.', username:'Cheef'},
    {thoughtText:'The word ambiguous only has one meaning.', username:'Bridget'},
    {thoughtText:'Outer space isn,t empty, it literally contains everything there is.', username:'Pat'},
    {thoughtText:'It,s not possible for Wolverine to get circumcised.', username:'Karen'},
    {thoughtText:'When jogging, we put on special clothes so people don,t think we are running from or to something.', username:'Lee'},
    {thoughtText:'How do vampires always look so neat and tidy if they can,t see themselves in the mirror?', username:'Lynne'},
    {thoughtText:'If you drop an Oreo you can still safely eat two thirds of it.', username:'Gwafranca'},
    {thoughtText:'There,s only one sunset, and it,s been going around the earth for billions of years.', username:'Gwistic'},
];

const possibleReactions = [
    'Absolutely',
    'Admiration, to admire',
    'Authoritative, authority',
    'Facts, factual',
    'Faith, faithful',
    'Fool-proof, sure-fire',
    'Guaranteed',
    'Proven',
    'Reliable, reliability',
    'Research-backed',
    'Saint',
    'Scientific, science',
    'Trustworthy',
];

// Function to generate random thoughts and reactions for the database.
const getRandomThoughts = () => {
  let results = [];
  for (let i = 0; i < userThoughts.length; i++) {
    let randomNum = Math.floor(Math.random() * possibleReactions.length)
    let randomName = Math.floor(Math.random() * names.length)
    let randomFriend = Math.floor(Math.random() * names.length)

    results.push({
      thoughtText: userThoughts[i].thoughtText,
      username: userThoughts[i].username,
      friends: names[randomFriend].username,
      reactions: {
        reactionBody:possibleReactions[randomNum],
        username: names[randomName].username,
      }
    });
  }
  return results;
};


const thoughtR = getRandomThoughts()



connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  await Thought.deleteMany({});
  await User.deleteMany({});

  

  await User.collection.insertMany(names);
  await Thought.collection.insertMany(thoughtR);

  // loop through the saved applications, for each application we need to generate a application response and insert the application responses
  console.table(names);
  console.table(thoughtR);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});

