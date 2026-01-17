const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "data.json");

function loadDataSafe() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      return { lastDir: null, logs: [] };
    }

    const raw = fs.readFileSync(DATA_FILE, "utf-8").trim();

    if (!raw) {
      return { lastDir: null, logs: [] };
    }

    return JSON.parse(raw);
  } catch (err) {
    console.error("Corrupted data file. Resetting tracking data.");
    return { lastDir: null, logs: [] };
  }
}

const data = loadDataSafe();

if (!data.logs.length) {
  console.log("No context switch data available yet.");
  process.exit(0);
}

const stats = {};

data.logs.forEach(log => {
  if (log.to) {
    stats[log.to] = (stats[log.to] || 0) + 1;
  }
});

console.log("\nContext Switch Report\n");

Object.entries(stats)
  .sort((a, b) => b[1] - a[1])
  .forEach(([dir, count]) => {
    console.log(`${dir}`);
    console.log(`Switches: ${count}\n`);
  });

console.log(`Total switches recorded: ${data.logs.length}`);
