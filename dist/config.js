/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('config');
 * mod.thing == 'a thing'; // true
 */

var config = {
    total_harvesters: 0,

    total_miners: 3,
    total_carriers: 3, // Same as miners to help them
    
    total_builders: 2,
};

module.exports = config;