import fs from "fs";
const dataFile = "./model/dataFile.csv"
var allData = [];

export function read(forced = false) {
    if (fs.existsSync(dataFile)) {
        if (allData.length === 0 || forced) {
            const lines = fs.readFileSync(dataFile, "utf8");
            console.log("reading data file successfully.")

            let id = 0;
            let data = [];
            allData = [];
            lines.split("\n").forEach((line) => {
                if (line) {
                    const items = line.split(",");
                    allData.push({
                        id:id,
                        name:items[0],
                        password:items[1],
                        message:items[2],
                    });
                    id++;
                }

            })
        }
    }
    // console.log("allData.length=" + allData.length);
    return allData;
}

export function add(data) {
    const items = [data.name, data.password, data.message];
    const line = items.join() + "\n";

    fs.appendFileSync(dataFile, line);
    console.log("saved:" + line);
    // console.log(JSON.stringify(allData[allData.length - 1]));
    let newId = (allData.length===0) ? 0 : allData[allData.length - 1].id + 1;

    allData.push({
        id:newId,
        name:items[0],
        password:items[1],
        message:items[2],
    });
}

export function update(id, data) {
    for (let i = 0; i < allData.length; i++) {
        if (allData[i].id == id) {
            if (!authenticate(allData[i], data)) {
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
        if (allData[i].id == id) {
            if (!authenticate(allData[i], data)) {
                return "invalid name or password"
            }
            break;
        }
    }
    allData.splice(i, 1);
    saveAllData();
    return "";
}

function authenticate(in1, in2) {
    return (in1.name === in2.name && in1.password === in2.password);
}

export function saveAllData() {
    let lines = "";
    allData.forEach((data) => {
        const items = [data.name, data.password, data.message];
        const line = items.join() + "\n";
        lines += line;
    });
    // console.log(lines);
    fs.writeFileSync(dataFile, lines);
    console.log("saved all data.");
}