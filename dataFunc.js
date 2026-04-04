import fs from "fs";
const dataFile = "./model/dataFile.csv"
var allData = [];

export function read() {
    if (allData.length === 0 && fs.existsSync(dataFile)) {
        const lines = fs.readFileSync(dataFile, "utf8", (err) => {
            if (err) throw err;
            console.log("reading data file successfully.")
        })

        let id = 0;
        data = [];
        lines.split("\n").forEach((line) => {
            const items = line.split(",");
            allData.add({
                id:id,
                name:items[0],
                password:items[1],
                message:items[2],
            });
            id++;
        })
    }
    console.log("allData.length=" + allData.length);
    return allData;
}

export function add(data) {
    const items = [data.name, data.password, data.message];
    const line = items.join() + "\n";

    fs.appendFile(dataFile, line, (err) => {
        if (err) throw err;
        console.log("saved:" + line);
    });
    
    allData.add({
        id:allData.length,
        name:items[0],
        password:items[1],
        message:items[2],
    });
}

export function update(id, data) {
    for (let i = 0; i < allData.length; i++) {
        if (allData[i].id === id) {
            if (allData[i].name !== data.name ||
                allData[i].password !== data.password) {
                return "invalid name or password"
            }
            allData[i].message = data.message
            break;
        }
    }
    saveAllData();
    return "";
}

export function deleteData(id, data) {
    let i = 0;
    for (; i < allData.length; i++) {
        if (allData[i].id === id) {
            if (allData[i].name !== data.name ||
                allData[i].password !== data.password) {
                return "invalid name or password"
            }
            break;
        }
    }
    allData = allData.slice(0, i) + allData.slice(i + 1);
    saveAllData();
    return "";
}

export function saveAllData() {
    let lines = "";
    allData.forEach((data) => {
        const items = [data.name, data.password, data.message];
        const line = items.join() + "\n";
        lines += line;
    });

    fs.writeFileSync(dataFile, lines, (err) => {
        if (err) throw err;
        console.log("saved all data.");
    });    
}