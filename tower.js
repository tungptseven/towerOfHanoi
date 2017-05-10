/**
 * Created by msi on 10/05/2017.
 */
const disk = require('./disk');
class Tower {
    constructor (name, disk){
        this.name = name;
        this.disk = [disk]
    }
}
let d1 = new disk(7)
console.log(d1);
t1 = new Tower('A',d1.diameter)

console.log(t1);