const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');
require('colors');

const { createFile, checkLastLetter, deleteFile } = require('./cities/index');

const rl = readline.createInterface({ input, output, prompt: 'Input city: '.green });

rl.prompt();

let startedGame = false;

const setupFile = async (answer) => {
  if (!startedGame) {
    const status = await createFile(answer);
    if (status) {
      console.log(`City was added: ${answer}`.green);
      startedGame = true;
    } else {
      console.log(`Sorry but you settled wrong city - ${answer}, please try again`.red);
    }
  }
};

const continueGame = async (answer) => {
  const data = await checkLastLetter(answer);
  console.log(data);
};

rl.on('line', async (answer) => {
  if (!startedGame) {
    await setupFile(answer);
  } else if (startedGame) {
    await continueGame(answer);
  }

  rl.prompt();

  rl.on('SIGINT', () => {
    rl.question('Are you sure you want to exit? ', async (answer) => {
      if (answer === 'yes') {
        await deleteFile();
        rl.close();
      }
      rl.prompt();
    });
  });
});
