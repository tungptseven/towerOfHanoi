/**
 * Created by msi on 10/05/2017.
 */
    //TODO: Hàm vẽ tháp ban đầu (dựa vào biến tower1)
    //TODO: Hàm lấy tọa độ (x,y) của đĩa
    //TODO: Hàm update các đĩa trong 3 c

const Disk = require('./disk');
const Tower = require('./tower');
//const algorithm = require('./algorithm');

let nameTowers = ['A', 'B', 'C']
let nameDisks = ['disk1', 'disk2', 'disk3']

let towerA = new Tower(nameTowers[0], nameDisks)
let towerB = new Tower(nameTowers[1], null)
let towerC = new Tower(nameTowers[2], null)

console.log(towerA)
class GameEngine {
    constructor() {
        this.data = []
        this.count = 0
    }

    /***
     * Hàm tạo mảng kết q
     * @param totalDisksuả
     * @param towerA
     * @param towerB
     * @param towerC
     * @returns {Array}
     */
    move(totalDisks, towerA, towerB, towerC) {
        if (totalDisks > 0) {
            this.move(totalDisks - 1, towerA, towerC, towerB)
            // console.log("Move " + nameDisks[n - 1] + " from " + a + " to " + c)
            this.data.push([nameDisks[totalDisks - 1], towerA, towerC])
            this.move(totalDisks - 1, towerB, towerA, towerC)
            this.count++
        }
        return this.data
    }

    getTotalDisk(){
        return nameDisks.length
    }

    draw(){}

}

let result = new GameEngine()
console.log(result.move(nameDisks.length, towerA.name, towerB.name, towerC.name));
console.log(result.getTotalDisk())
console.log('Total steps: ', result.count);

