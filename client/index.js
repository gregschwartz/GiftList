const niceList = require('../utils/niceList.json');
const askServer = require('./askServer');

async function main() {
  const name = "Anna Stehr";

  const gift = await askServer(name);
  console.log({ gift });
}

main();
