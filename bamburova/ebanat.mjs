import fs from "fs"

const inputFile = "сливы.bin" // исходный файл  
const chunkSize = 100 * 1024 * 1024 / 2 // 100 мб  
let index = 0  

const stream = fs.createReadStream(inputFile, { highWaterMark: chunkSize })  

stream.on("data", (chunk) => {
    const partFile = `data/part${index}.bin`
    fs.writeFileSync(partFile, chunk)
    console.log(`сохранен ${partFile}`)
    index++
})

stream.on("end", () => console.log("всё порублено, удачи"))
stream.on("error", (err) => console.error("что-то сломалось:", err))