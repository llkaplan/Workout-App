const mongoose = require("mongoose");
const express = require("express");
const logger = require("morgan");
const path = require("path");
const Workout = require("./models/index.js");
const app = express();

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutdb", { useNewUrlParser: true });

app.use(logger("dev"));
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/", ({ body }, res) => {
  const workout = new Workout(body);
  workout.coolifier();
  workout.makeCool();

  Workout.create(workout)
    .then(dbUser => {
      res.json(dbUser);
  
    })
    .catch(err => {
      res.json(err);
    });
});

app.post("/", ({body}, res) => {
  db.workout.create(body)
    .then(({_id}) => db.Workout.findOneAndUpdate({}, { $push: { workout: _id } }, { new: true }))
    .then(dbWorkouts => {
      res.json(dbWorkouts);
    })
    .catch(err => {
      res.json(err);
    });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});

