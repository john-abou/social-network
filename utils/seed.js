const connection = require("../../config/connection.js");
const { User, Thought } = require("../../models");
const{ getRandomArrItem, getRandomUserInfo, getRandomThoughtText, generateRandomUsers, generateRandomThoughts } = require("./data");


connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing courses
  await User.deleteMany({});

  // Drop existing students
  await Thought.deleteMany({});

  // Create new students and thoughts
  const users = generateRandomUsers(10);
  const thoughts = generateRandomThoughts(10);

  for (let i=0; i < thoughts.length; i++) {
    thoughts[i].username = users[i].username;
  }

  // Add students to the collection and await the results
  await User.collection.insertMany(students);

  // Add courses to the collection and await the results
  await Thought.collection.insertMany({thoughts});

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.table(thoughts)
  console.info('Seeding complete! 🌱');
  process.exit(0);
});