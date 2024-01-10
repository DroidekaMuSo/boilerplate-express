const mongoose = require("mongoose")
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL, {
  useUnifiedTopology:true,
  useNewUrlParser: true
})

const personSchema = new mongoose.Schema({
  name:String,
  age:Number,
  favoriteFoods:[{
    type:String
  }]
})

let Person = mongoose.model("Person",personSchema)


const createAndSavePerson = (done) => {
  const person1 = new Person({
    name:"Diego",
    age:25,
    favoriteFoods:["BBQ","Sushi"]
    })

    person1.save((err,data)=>{
      if(err) return console.error(err)

      done(null, data);
    })
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople,(err,people)=>{
    if(err) return console.error(err)

    done(null,people)
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({name:personName},(err,data)=>{
    if (err) return console.error(err)

    done(null,data)
  })

};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods:food},(err,data)=>{
    if (err) return console.error(err)

    done(null,data)
  })
};

const findPersonById = (personId, done) => {
  Person.findById({_id:personId}, (err,data)=>{
    if(err) return console.error(err)

    done(null,data)
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  const person1 = Person.findById({_id:personId},(err,person)=>{
    if(err) return console.error(err)

    person.favoriteFoods.push(foodToAdd)
    person.save((err,updatedPerson)=>{
      if(err) return console.error(err)

      done(null,updatedPerson)
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name:personName},{age:ageToSet},{new:true},(err,person)=>{
    if(err) return console.log(err)

    done(null,person)
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove({_id:personId},(err,data)=>{
    if(err) return console.error(err)

    done(null,data)
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({name:nameToRemove},(err,data)=>{
    if(err) return console.error(err)

    done(null,data)
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({favoriteFoods:foodToSearch}).sort('name').limit(2).select('-age').exec((err,people)=>{
    if(err) return console.error(err)

    done(null,people)
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
