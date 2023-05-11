import { describe, it } from "mocha";
import { expect } from "chai";
import PhoneTokenizer from "../../src/Phones/PhoneTokenizer";

describe("Phone Tokenizer parses", () => {
  const tokenizer = new PhoneTokenizer();

  it("Empty string", () => {
    const word = '';
    const tokens = tokenizer.tokenize(word);
    expect(tokens).to.be.length(0);
  });

  const vowels = 'aąeęioóuy'.split('');

  for (const vowel of vowels) {
    it(`Single vowel (${vowel})`, () => {
      const tokens = tokenizer.tokenize(vowel);
      expect(tokens).to.be.length(1);

      const token1 = tokens[0];
      expect(token1.type).to.be.eq('v');
      expect(token1.content = vowel);
    });
  }

  const consonants = 'bcćdfghjklłmnpqrsśtvwxzźż'.split('');

  for (const consonant of consonants) {
    it(`Single consonant (${consonant})`, () => {
      const tokens = tokenizer.tokenize(consonant);
      expect(tokens).to.be.length(1);

      const token1 = tokens[0];
      expect(token1.type).to.be.eq('c');
      expect(token1.content = consonant);
    });
  }

  const consonantDigraphs = 'ch,cz,dz,dź,dż,qu,rz,sz'.split(',');

  for (const digraph of consonantDigraphs) {
    it(`Digraphs (${digraph})`, () => {
      const tokens = tokenizer.tokenize(digraph);;
      expect(tokens).to.be.length(1);

      const token1 = tokens[0];
      expect(token1.type).to.be.eq('c');
      expect(token1.content = digraph);
    });
  }

  const vowelDigraphs = 'au,eu'.split(',');

  for (const digraph of vowelDigraphs) {
    it(`Digraphs (${digraph})`, () => {
      const tokens = tokenizer.tokenize(digraph);;
      expect(tokens).to.be.length(1);

      const token1 = tokens[0];
      expect(token1.type).to.be.eq('v');
      expect(token1.content = digraph);
    });
  }
});