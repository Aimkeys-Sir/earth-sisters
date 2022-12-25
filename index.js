const {parse} = require('csv-parse')
const fs = require('fs')

console.log(parse)
const habitablePlanets = []

function isHabitablePlanet(planet){
    return planet["soltype"] === 'Published Confirmed'
    && planet["pl_insol"] > 0.36
    && planet["pl_insol"] < 1.11
    && planet["pl_rade"] < 1.6
}

fs.createReadStream('./kepler_data.csv')
.pipe(parse({
    comment: '#',
    columns: true
}))
.on('data',data=>{
    if(isHabitablePlanet(data)){
        habitablePlanets.push(data)
    }
})
.on('error', err=>{
    console.log(err);
}) 
.on('end', ()=>{
    console.log(habitablePlanets.map(planet=> ({name: planet.pl_name, star: planet.hostname, solar_flux: planet.pl_insol})))
    console.log('processing complete');
})
