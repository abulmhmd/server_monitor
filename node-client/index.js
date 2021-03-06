/**
 * node program to collect server performance
 * data and send that data using socket.io
 * - CPU Load
 * - Memory Usage
 *     - free
 *     - total
 * - OS
 * - Uptime
 */

const os = require("os");
const si = require('systeminformation');
const io = require("socket.io-client");
const socket = io("http://localhost:8181");


socket.on("connect", () => {
    const netT = os.networkInterfaces();
    let macA;
    for (let key in netT) {
        if (!netT[key][0].internal) {
            macA = netT[key][0].mac;
            break;
        }
    }

    socket.emit("clientAuth", "IHbjhkBbbbhHbJh");

    performanceData().then((allPerformanceData) => {
        allPerformanceData.macA = macA;
        socket.emit("initPerfData", allPerformanceData);
    });

    let perfDataInterval = setInterval(() => {
        performanceData().then((allPerformanceData) => {
            allPerformanceData.macA = macA;
            socket.emit("perfData", allPerformanceData);
        });
    }, 1000);

    socket.on("disconnect", () => {
        clearInterval(perfDataInterval);
    });
});

const cpus = os.cpus();


const performanceData = async() => {

    let kbToGb = 1024 * 1024 * 1024; // 1024^3 kilobytes = 1 Gigabyte

    // Returns file system stats
    let fsTotal = 0;
    let fsUsed = 0;
    let fsUsage = 0;

    await si.fsSize().then((data) => {
        data.forEach((disk) => {
            fsTotal += disk.size / kbToGb;
            fsUsed += disk.used / kbToGb;
        });

        fsUsage = +((100 * fsUsed) / fsTotal).toFixed(0);
        fsTotal = +fsTotal.toFixed(0);
        fsUsed = +fsUsed.toFixed(0);
    });
    const osType = os.type() === "Darwin" ? "Mac" : os.type();
    const uptime = os.uptime();
    const freeMem = os.freemem();
    const totalMem = os.totalmem();
    const Arch = os.arch();
    const usedMem = totalMem - freeMem;
    const memUsage = Math.floor((usedMem / totalMem) * 100) / 100;
    const cpuModel = cpus[0].model;
    const cpuSpeed = cpus[0].speed;
    const numCpus = cpus.length;
    const cpuLoad = await getCpuLoad();
    const isActive = true;
    return {
        freeMem,
        totalMem,
        memUsage,
        osType,
        uptime,
        cpuModel,
        cpuSpeed,
        numCpus,
        cpuLoad,
        usedMem,
        isActive,
        fsTotal,
        fsUsed,
        fsUsage,
        Arch,
    };

};

const cpuAverage = () => {
    const cpus = os.cpus();

    let idleMs = 0;
    let totalMs = 0;

    cpus.forEach((aCore) => {
        for (type in aCore.times) {
            totalMs += aCore.times[type];
        }
        idleMs += aCore.times.idle;
    });

    return {
        idle: idleMs / cpus.length,
        total: totalMs / cpus.length,
    };
};

const getCpuLoad = () => {
    return new Promise((resolve, reject) => {
        const start = cpuAverage();
        setTimeout(() => {
            const end = cpuAverage();
            const idleDifference = end.idle - start.idle;
            const totalDifference = end.total - start.total;
            const percentageCpu =
                100 - Math.floor((100 * idleDifference) / totalDifference);
            resolve(percentageCpu);
        }, 100);
    });
};