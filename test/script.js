/**
 * Created by msi on 19/05/2017.
 */
class Disk {
    constructor(name) {
        this.name = name
    }
}

class Tower {
    constructor(nameTowers, nameDisks) {
        this.name = nameTowers
        this.disks = nameDisks
    }
}
//const Disk = require('./disk');
//const Tower = require('./tower');

//Tạo đĩa
let n = 3;

//Độ cao đĩa
const deept = 50;

let disk_arr = []
for (let i = 1; i <= n; i++) {
    disk_arr.push("disk" + i);
}

let nameTowers = ['TowerA', 'TowerB', 'TowerC']
let nameDisk2 = [];
let nameDisk3 = []
let nameDisks = disk_arr;
let tower1 = new Tower(nameTowers[0], nameDisks)
let tower2 = new Tower(nameTowers[1], nameDisk2)
let tower3 = new Tower(nameTowers[2], nameDisk3)

let disk_obj = [];//mảng chứa các đối tượng disk


class GameEngine {
    constructor() {
        this.data = []
        this.count = 0
    }

    move(totalDisks, towerA, towerB, towerC) {
        if (totalDisks > 0) {
            this.move(totalDisks - 1, towerA, towerC, towerB)
            console.log("Move " + nameDisks[n - 1] + " from " + towerA + " to " + towerC)
            this.data.push([nameDisks[totalDisks - 1], towerA, towerC])
            this.move(totalDisks - 1, towerB, towerA, towerC)
            this.count++
        }
        return this.data
    }
}

let result = new GameEngine()
let data = result.move(nameDisks.length, tower1.name, tower2.name, tower3.name)

/***
 * Hàm tính khoảng cách giữa các cọc
 * @param dis1
 * @param dis2
 * @returns {number}
 */
let get_distance = (dis1, dis2) => {
    if ((dis1 === "TowerA" && dis2 === "TowerB") || (dis1 === "TowerB" && dis2 === "TowerC")) {
        return 400;
    }
    else if ((dis1 === "TowerB" && dis2 === "TowerA") || (dis1 === "TowerC" && dis2 === "TowerB"))
        return -400;
    else if ((dis1 === "TowerA" && dis2 === "TowerC")) {
        return 800;
    }
    else return -800;
}

/***
 * Hàm tính số đĩa trên cọc
 * @param tower
 */
let get_disk = (tower) => {
    for (let i = 1; i <= 3; i++) {
        if (tower1.name === tower) {
            return tower1.disks.length;
        }
        else if (tower2.name === tower) {
            return tower2.disks.length;
        }
        else return tower3.disks.length;
    }
};

/***
 * Hàm lấy tên cọc
 * @param tower
 * @returns {*}
 */
let get_towerName = (tower) => {
    if (tower1.name === tower) {
        return tower1.disks;
    }
    else if (tower2.name === tower) {
        return tower2.disks;
    }
    else return tower3.disks;

}

/***
 * Hàm cập nhật số đĩa trên cọc
 * @param name
 * @param t1
 * @param t2
 */
let update_disk = (name, t1, t2) => {
    let temp1 = get_towerName(t1);
    let temp2 = get_towerName(t2);
    console.log(typeof(temp1));
    temp1.shift();
    temp2.unshift(name);
}

/***
 * Hàm lấy tọa độ x, y của đĩa
 * @param name
 * @returns {number|*}
 */
let get_x = (name) => {
    for (let i = 0; i < disk_obj.length; i++) {
        if (name === disk_obj[i].name_disk) {
            return disk_obj[i].x_;
        }
    }
}
let get_y = (name) => {
    for (let i = 0; i < disk_obj.length; i++) {
        if (name === disk_obj[i].name_disk) {
            return disk_obj[i].y_;
        }
    }
}
let get_docao = (name) => {
    for (let i = 0; i < disk_obj.length; i++) {
        if (name === disk_obj[i].name_disk) {
            return -disk_obj[i].height
        }
    }
}

/***
 * Hàm tính tọa độ mới cho đĩa
 * @param name
 * @param dis
 */
let set_x = (name, dis) => {
    for (let i = 0; i < disk_obj.length; i++) {
        if (name === disk_obj[i].name_disk) {
            disk_obj[i].x_ += dis;
        }
    }
}

let set_y = (name, dis) => {
    for (let i = 0; i < disk_obj.length; i++) {
        if (name === disk_obj[i].name_disk) {
            disk_obj[i].y_ += dis;
        }
    }
}
const div = d3.select("body").append("div").style("text-align", "center")
const svg = div.append("svg").attr("width", 1200).attr("height", 600)


/***
 * Hàm vẽ đĩa
 * @param sum_disk
 */
let draw = (sum_disk) => {
    for (let i = 1; i <= sum_disk; i++) {
        let obj = {
            name_disk: '',
            x_: 0,
            y_: 0,
            height: 1
        }
        const s = svg
            .append("rect")
            .attr("width", i * deept)
            .attr("height", deept)
            .attr("x", (n - i) * 25 + 100)
            .attr("y", i * deept + 2 * deept)
            .attr("stroke-width", 3)
            .attr("stroke", "yellow")
            .attr("fill", "blue")
            .classed("disk" + i, true)
            .classed("color", true);
        //Tao đối tượng đĩa
        obj.name_disk = "disk" + i;
        obj.x_ = 0;
        obj.y_ = i * deept;
        obj.height = i * deept + 70;
        disk_obj.push(obj)

        if (i == 1) {
            const fly = svg
                .append('circle')
                .attr('r', 10)
                .attr("cx", (n - i) * 25 + 100)
                .attr("cy", i * deept + 2 * deept)
                .attr('class', 'fly')

        }

    }
}
draw(n);


//---------------- Animation cho dia---------------------
const next = () => {
    for (let i = 0; i < data.length; i++) {
        let x = get_distance(data[i][1], data[i][2])     //Khoang cach dich chuyen giua cac coc
        let begin_y = get_y(data[i][0])                  //lay toa do hien thoi cua dia duoc chon
        let begin_x = get_x(data[i][0]);                      //lay toa do x cua dia hien tai
        let hoz = begin_x + x;
        let height = get_docao(data[i][0])      //gan do cao cua moi dia di len khoi coc
        let count_disk = get_disk(data[i][2])             //Dem so luong dia cua coc đích
        let new_y = n * deept - (count_disk * deept) - begin_y;     // Tọa độ y của đĩa được chọn với 50 là chiều cao của mỗi đĩa
        update_disk(data[i][0], data[i][1], data[i][2])        //cap nhap lai so dia cua moi coc
        /*d3.selectAll('.' + data[i][0])
            .transition()
            .delay(i * 4200)
            .duration(700)
            .attr("transform", 'translate(' + begin_x + ',' + height + ')')
            .transition()
            .attr("transform", 'translate(' + hoz + ',' + height + ')')
            .transition()
            .attr('transform', 'translate(' + hoz + ',' + new_y + ')')*/


        d3.selectAll('.fly')
            /*.transition()
            .duration(700)
            .attr('transform', 'translate(800,0)')
            .transition()
            .duration(700)
            .attr('transform', 'translate(-800,0')*/
            .transition()
            .delay(i * 4200)
            .duration(700)
            .attr("transform", 'translate(' + begin_x + ',' + height + ')')
            .transition()
            .attr("transform", 'translate(' + hoz + ',' + height + ')')
            .transition()
            .attr('transform', 'translate(' + hoz + ',' + new_y + ')')
            .transition()
            .attr('transform', 'translate(' + hoz + ',' + height + ')')
            .transition()
            .attr('transform', 'translate(' + begin_x + ',' + height + ')')
            .transition()
            .attr('transform', 'translare(' + begin_x + ',' + begin_y + ')')

        set_x(data[i][0], x)                          //cap nhat toa độ x cho đĩa
        //set_y(data[i][0], y)
    }
}

