import importJob from "./importer.js";

const { myfn } = await importJob("./expression.js");

console.log(myfn());
