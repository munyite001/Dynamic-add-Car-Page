#!/usr/bin/env node

import fs from 'fs';

// Read and parse the JSON file
const data = fs.readFileSync('../../unique-makes-and-models.json', 'utf8');
const makesAndModels = JSON.parse(data);

// Count the number of models for each make and log the results
makesAndModels.forEach(makeAndModel => {
  const make = makeAndModel.make;
  const modelCount = makeAndModel.models.length;
  console.log(`${make}: ${modelCount} models`);
});

// Log the total number of makes
console.log("Total Makes: ", makesAndModels.length);
