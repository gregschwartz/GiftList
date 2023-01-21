const axios = require('axios');
const MerkleTree = require('../utils/MerkleTree');
const niceList = require('../utils/niceList.json');

const serverUrl = 'http://localhost:1225';

async function askServer(name) {
  const merkleTree = new MerkleTree(niceList);
  const index = niceList.findIndex(n => n === name);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    name: name,
    proof: merkleTree.getProof(index)
  });

  return gift;
}

module.exports = askServer;
