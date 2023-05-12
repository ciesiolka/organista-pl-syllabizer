import { describe, it } from "mocha";
import { expect } from "chai";
import { readFileSync } from 'fs';
import Syllabizer from "../../src/Syllables/Syllabizer";
import PhoneTokenizer from "../../src/Phones/PhoneTokenizer";
import PhoneToken from "../../src/Phones/PhoneToken";


const syllabizedWordsPath = __dirname + '/syllabizedWords.txt';

const phonesToSyllabizedString = (phonesSyllables: PhoneToken[][]): string => {
  return phonesSyllables.map(syllable => syllable.map(phone => phone.content).join('')).join('-');
};

describe("Syllabizes word", () => {
  const words = readFileSync(syllabizedWordsPath).toString().split("\n");
  const tokenizer = new PhoneTokenizer();
  const syllabizer = new Syllabizer();

  for (const word of words) {
    it(word, () => {
      const wordWithoutHyphenPoints = word.replace(/\./g, '');
      const phones = tokenizer.tokenize(wordWithoutHyphenPoints);
      const syllables = syllabizer.syllabizePhones(phones);
      const syllablesStr = phonesToSyllabizedString(syllables);
      expect(syllablesStr).to.be.eq(word.replace(/\./g, '-'));
    });
  }
});