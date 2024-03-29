require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env['MONGO_URI'], { useNewUrlParser: true, useUnifiedTopology: true });

let Person;

const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: {type: String, required: true},
  age: Number,
  favoriteFoods: [String],
});

Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  let person = new Person({name: "Sonny Simms", age: 31, favoriteFoods: ['Fish', 'Oats', 'Vegetables', 'Soy Milk']});
  
  person.save((err, data) => {
    if (err) return console.error(err);
    done(null , data);
  });

};

let arrayOfPeople = [
  {name: "Frankie", age: 74, favoriteFoods: ["Del Taco"]},
  {name: "Sol", age: 76, favoriteFoods: ["roast chicken"]},
  {name: "Robert", age: 78, favoriteFoods: ["wine"]}
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if (err) return console.error(err);
    done(null , people);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  })
  
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, person) => {
    if (err) return console.error(err);
    
    person.favoriteFoods.push(foodToAdd);

    person.save((err, updatedPerson) => {
      if (err) return console.error(err);
      done(null, updatedPerson);
    })
    
  }) 
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {returnNewDocument: true}, (err, updateDocument) => {

    if (err) return console.error(err);
    done(null, updatedDocument);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  })
};
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.deleteMany({name: nameToRemove}, (err, data) => {
    if (err) return console.log(err);
    done(null, data);
  })

  
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  
  Person.find({favoriteFoods: foodToSearch})
    .sort({name: 1})
    .limit(2)
    .select({age: 0})
    .exec((err, data) => {
      if (err) return console.log(err);
      done(null, data);
    })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
