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
    {thoughText:'We eat pizza from the inside out.', username:'Rod'},
    {thoughText:'If you live to be 70 years old you will spend TEN YEARS of your life on Monday.', username:'Knee'},
    {thoughText:'Sometime in the future, someone will say your name for the last time.', username:'Hank'},
    {thoughText:'Deaf people probably don,t understand why farts are funny.', username:'Cheef'},
    {thoughText:'The word ambiguous only has one meaning.', username:'Bridget'},
    {thoughText:'Outer space isn,t empty, it literally contains everything there is.', username:'Pat'},
    {thoughText:'It,s not possible for Wolverine to get circumcised.', username:'Karen'},
    {thoughText:'When jogging, we put on special clothes so people don,t think we are running from or to something.', username:'Lee'},
    {thoughText:'How do vampires always look so neat and tidy if they can,t see themselves in the mirror?', username:'Lynne'},
    {thoughText:'If you drop an Oreo you can still safely eat two thirds of it.', username:'Gwafranca'},
    {thoughText:'There,s only one sunset, and it,s been going around the earth for billions of years.', username:'Gwistic'},
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
    results.push({
      thoughText: userThoughts[i].thoughText,
      username: userThoughts[i].username,
      reactions: {
        reactionBody:possibleReactions[randomNum],
        username: names[randomName].username,
      }
    });
  }
  return results;
};


const thoughtR = getRandomThoughts()

// // Create the reactions that will be added to each thought
// const getThoughtReactions = (int) => {
//   if (int === 1) {
//     return getRandomArrItem(possibleReactions);
//   }
//   const results = [];
//   for (let i = 0; i < int; i++) {
//     results.push({
//       reactionBody: getRandomArrItem(possibleReactions),
//       username: getRandomName(names),
//     });
//   }
//   return results;
// };



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

