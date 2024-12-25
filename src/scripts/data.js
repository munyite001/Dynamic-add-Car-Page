#!/usr/bin/env node

import fs from 'fs';


// Read the data from the file
const data = JSON.parse(fs.readFileSync('./all-vehicles-model.json', 'utf8'));

// Create a map to store makes and their models
const makesAndModels = {};

data.forEach(item => {
    const make = item.make;
    const model = item.model;
  
    if (!makesAndModels[make]) {
      makesAndModels[make] = new Set(); // Use a Set to avoid duplicate models
    }
  
    makesAndModels[make].add(model);
  });
  
  // Convert the Set to an array and prepare the output format
  const result = Object.entries(makesAndModels).map(([make, modelsSet]) => ({
    make,
    models: Array.from(modelsSet)
  }));
  
  // Write the result to a JSON file
  fs.writeFileSync('unique-makes-and-models.json', JSON.stringify(result, null, 2));
  
  console.log('Unique makes and models have been written to unique-makes-and-models.json');
