#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "data.json");

function loadData() {
  if (!fs.existsSync(DATA_FILE)) {
    return { lastDir: null, logs: [] };
  }
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
}

// function saveData(data) {
//   fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
// }
function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

function track() {
  const currentDir = process.cwd();
  const now = new Date().toISOString();

  const data = loadData();

  if (data.lastDir !== currentDir) {
    data.logs.push({
      from: data.lastDir,
      to: currentDir,
      time: now
    });
    data.lastDir = currentDir;
    saveData(data);
    console.log("Context switch detected:", currentDir);
  } else {
    console.log("No context switch (same directory)");
  }
}

track();
