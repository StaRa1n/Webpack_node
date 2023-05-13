const os = require("os");

//想要webpack打包资源,必须引入该资源
import count from "./js/count.js"
import sum from "./js/sum.js"
import './css/index.css'
import './css/iconfont.css'

const a = 3
console.log(count(1, 2));
console.log(sum(1, 2, 3, 4));
console.log(a);

const cpuLength = os.cpus().length
console.log(cpuLength);