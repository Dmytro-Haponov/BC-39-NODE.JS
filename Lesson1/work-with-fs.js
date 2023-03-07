//Callback style
/* const fs = require('fs');
const format = 'utf-8';

fs.readFile('text.txt', 'utf-8', (err, data) => {
  if (err) {
    console.log(err);
  }
  console.log(data);
}); */

//Promise style
/*const fs = require('fs').promises;
const { resolve } = require('node:path');
 fs.readFile('text.txt', 'utf-8')
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  }); */

//Async-await style
const fs = require('node:fs/promises');
const { resolve } = require('node:path');
const asyncStyleFunction = async () => {
  const filePath = resolve('./text.txt');
  const contents = await fs.readFile(filePath, { encoding: 'utf-8' });

  const newContent = `${contents} add new word`;

  await fs.writeFile(filePath, newContent, 'utf-8');
};

asyncStyleFunction();
