import { describe, it } from "mocha";
import { expect } from "chai";
import { readFileSync } from 'fs';
import Syllabizer from "../../src/Syllables/Syllabizer";
import PhoneTokenizer from "../../src/Phones/PhoneTokenizer";
import PhoneToken from "../../src/Phones/PhoneToken";


const okWordsPath = __dirname + '/.ok_words.txt';
const toFixPath = __dirname + '/.to_fix.txt';

const phonesToSyllabizedString = (phonesSyllables: PhoneToken[][]): string => {
  return phonesSyllables.map(syllable => syllable.map(phone => phone.content).join('')).join('-');
};

describe("Syllabizes word", () => {
  const tokenizer = new PhoneTokenizer();
  const syllabizer = new Syllabizer();

  // Regression tests
  const okwords = readFileSync(okWordsPath).toString().split("\n");
  for (const word of okwords) {
    if (word === '') {
      continue;
    }
    it(word, () => {
      const wordWithoutHyphenPoints = word.replace(/\./g, '');
      const phones = tokenizer.tokenize(wordWithoutHyphenPoints);
      const syllables = syllabizer.syllabizePhones(phones);
      const syllablesStr = phonesToSyllabizedString(syllables);
      expect(syllablesStr).to.be.eq(word.replace(/\./g, '-'));
    });
  }

  // Words which are to be tested should be put in this file
  const tofix = readFileSync(toFixPath).toString().split("\n");
  for (const word of tofix) {
    if (word === '') {
      continue;
    }
    it.only(word, () => {
      const wordWithoutHyphenPoints = word.replace(/\./g, '');
      const phones = tokenizer.tokenize(wordWithoutHyphenPoints);
      const syllables = syllabizer.syllabizePhones(phones);
      const syllablesStr = phonesToSyllabizedString(syllables);
      expect(syllablesStr).to.be.eq(word.replace(/\./g, '-'));
    });
  }
});