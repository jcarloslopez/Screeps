var roleFixer = {

 update: function(creep) {

  if(creep.carry.energy == 0) {
    creep.memory.working = false;

    // Check if energy is greater than a third of max energy,
    // If is not, dont take energy from structures
    total_energy = total_energy_capacity = 0;
    var wharehouses = creep.room.find(FIND_STRUCTURES, {
      filter: (structure) => {
        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == StructureContainer);
      }
    });

    // Accum current energy and total 
    for (i = 0; i < wharehouses.length; ++i) {
      total_energy += wharehouses[i].energy;
      total_energy_capacity += wharehouses[i].energyCapacity;
    }
    
    //console.log(total_energy + "/" + total_energy_capacity)
    if(total_energy >= (total_energy_capacity / 1.5)){
        //console.log(total_energy + "/" + (total_energy_capacity / 1.5))
        if(Game.spawns.Spawn1.transferEnergy(creep) == ERR_NOT_IN_RANGE){
          creep.moveTo(Game.spawns.Spawn1);    
        }
      }

    }else{
      creep.memory.working = true;
    }

  // Build
  if(creep.memory.working){
    var targets = creep.room.find(FIND_STRUCTURES, {
      filter: object => object.hits < object.hitsMax
    });

    targets.sort((a,b) => a.hits - b.hits);

    if(targets.length > 0) {
      if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(targets[0]);    
      }
    }
  }


}

}

module.exports = roleFixer;