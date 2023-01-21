const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  // TODO: how do we prove to the server we're on the nice list? 

  const name = "Anna Stehr";
  const gift = await askServer(name);
  console.log({ gift });
}

async function askServer(name) {
  const merkleTree = new MerkleTree(niceList);
  const index = niceList.findIndex(n => n === name);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    name: name,
    proof: merkleTree.getProof(index)
  });

  return gift;
}

async function testMany() {
  for(var i=0; i<10; i++) {
    var ok = true;
    const randomName = niceList[Math.floor(Math.random() * niceList.length)];

    const respYes = await askServer(randomName);
    if (respYes != 'You got a toy robot!') {
      console.log("test failed with ", randomName, "showing as not on list");
      console.log(respYes);
      ok = false;
    }

    const respNo = await askServer(randomName + "s");
    if (respNo != 'You are not on the list :(') {
      console.log("test failed with ", randomName +"s", "showing as on list");
      ok = false;
    }
  }

  console.log("test pass?", ok);
}

main();
// testMany();