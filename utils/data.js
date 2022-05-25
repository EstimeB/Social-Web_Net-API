const names = [
    'Rod',
    'Knee',
    'Hank',
    'Cheef',
    'Bridget',
    'Pat',
    'Karen',
    'Lee',
    'Lynne',
    'Gwafranca',
    'Lynne',
    'Gwistic',
];

const userThoughts = [
    'We eat pizza from the inside out.',
    'If you live to be 70 years old you will spend TEN YEARS of your life on Monday.',
    'Sometime in the future, someone will say your name for the last time.',
    'Deaf people probably don,t understand why farts are funny.',
    'The word ambiguous only has one meaning.',
    'Outer space isn,t empty, it literally contains everything there is.',
    'It,s not possible for Wolverine to get circumcised.',
    'When jogging, we put on special clothes so people don,t think we are running from or to something.',
    'How do vampires always look so neat and tidy if they can,t see themselves in the mirror?',
    'If you drop an Oreo you can still safely eat two thirds of it.',
    'There,s only one sunset, and it,s been going around the earth for billions of years.',
    'What does my mirror look like when I,m not looking at it?',
    'Your stomach thinks all potatoes are mashed.',
    'The Swiss must,ve been pretty confident in their chances of victory if they included a corkscrew on their army knife.',
    'If you did something "like a boss," you,d probably just pay someone else to do it.',
    'In order to fall asleep, you have to pretend to be asleep.',
    'Wrong is spelled wrong in the dictionary.',
    'Mothers only get a day, but sharks get a whole week.',
    'Can Chewbacca even say Chewbacca? Shouldn,t his name be something like Rawwwraaraar?',
    'Nothing is on fire, fire is on things.',
    'If the "Fresh Prince" had made that shot, there,d be no show.',
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

const users = [];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random full name
const getRandomName = () =>
  `${getRandomArrItem(names)} ${getRandomArrItem(names)}`;

// Function to generate random thoughts and reactions for the database.
const getRandomThoughts = (int) => {
  let results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      thoughText: getRandomArrItem(userThoughts),
      username: getRandomName(names),
      reactions: [...getThoughtReactions(3)],
    });
  }
  return results;
};

// Create the reactions that will be added to each thought
const getThoughtReactions = (int) => {
  if (int === 1) {
    return getRandomArrItem(possibleReactions);
  }
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      reactionBody: getRandomArrItem(possibleReactions),
      username: getRandomName(names),
    });
  }
  return results;
};

// Export the functions for use in seed.js
module.exports = { getRandomName, getRandomThoughts };
