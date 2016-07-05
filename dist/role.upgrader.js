 var roleUpgrader = {

   update: function(creep) {

      // Creep is going to carry resources
      if(creep.carry.energy == 0) {
        creep.moveTo(Game.spawns.Spawn1);
        Game.spawns.Spawn1.transferEnergy(creep);
      }else{
        if(creep.room.controller) {
          creep.moveTo(creep.room.controller);
          creep.upgradeController(creep.room.controller);
        }

      }

    }
  }
  module.exports = roleUpgrader;