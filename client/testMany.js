const niceList = require('../utils/niceList.json');
const askServer = require('./askServer');

async function testMany(number) {
  console.log("tests", number*2);
  for(var i=0; i<number; i++) {
    var ok = true;
    const randomName = niceList[Math.floor(Math.random() * niceList.length)];

    const respYes = await askServer(randomName);
    if (respYes != 'You got a toy robot!') {
      console.log("test failed with ", randomName, "showing as not on list");
      console.log(respYes);
      ok = false;
    } else { process.stdout.write("."); }

    const respNo = await askServer(randomName + "s");
    if (respNo != 'You are not on the list :(') {
      console.log("test failed with ", randomName +"s", "showing as on list");
      ok = false;
    } else { process.stdout.write("."); }
  }

  process.stdout.write("\n");
  console.log("pass?", ok);
}

testMany(50);