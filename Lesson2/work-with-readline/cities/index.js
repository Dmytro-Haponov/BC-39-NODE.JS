const fs = require('node:fs/promises');
const path = require('node:path');

const citiesListPath = path.join(__dirname, 'cities.txt');
const setledCitiesListPath = path.join(__dirname, 'inputed-cities.txt');

require('colors');

const flags = {
  cities: 0,
  setledCities: 1
};

const checkWord = async (word, flag) => {
  let pathParam = flag === 0 ? citiesListPath : setledCitiesListPath;

  try {
    const data = await fs.readFile(pathParam, 'utf-8');
    return data.split('\n').indexOf(word);
  } catch (error) {
    return null;
  }
};

const createFile = async (answer) => {
  try {
    const city = await checkWord(answer, flags.cities);
    if (city === -1) {
      return false;
    } else {
      await fs.writeFile(setledCitiesListPath, answer + '\n');
      return true;
    }
  } catch (error) {
    return null;
  }
};

const compareTwoWords = async (city) => {
  try {
    const cities = await fs.readFile(setledCitiesListPath, 'utf-8');
    const citiesList = cities.split('\n');

    const getLastLetter = citiesList[citiesList.length - 2];

    if (city.charAt(0).toLowerCase() !== getLastLetter.slice(-1)) {
      return `Last letter and first letter should be equal`.gray;
    } else {
      await fs.appendFile(setledCitiesListPath, city + '\n');
      return `A new city was successfully added`.bgRed;
    }
  } catch (error) {
    return null;
  }
};

const checkLastLetter = async (word) => {
  try {
    const city = await checkWord(word, flags.cities);
    if (city === -1) {
      return `Sorry but you settled wrong city - ${word}, please try again`.red;
    } else {
      const data = await checkWord(word, flags.setledCities);

      if (data !== -1) {
        return `Sorry but you have already this city - ${word}, please input another city`.yellow;
      }

      return compareTwoWords(word);
    }
  } catch (error) {
    return null;
  }
};

async function deleteFile() {
  await fs.unlink(setledCitiesListPath);
}

module.exports = {
  createFile,
  checkLastLetter,
  deleteFile
};
