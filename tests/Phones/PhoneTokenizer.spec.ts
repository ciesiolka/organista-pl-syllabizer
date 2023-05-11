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
      expect(token1.content).to.be.eq(vowel);
    });
  }

  const consonants = 'bcćdfghjklłmnpqrsśtvwxzźż'.split('');

  for (const consonant of consonants) {
    it(`Single consonant (${consonant})`, () => {
      const tokens = tokenizer.tokenize(consonant);
      expect(tokens).to.be.length(1);

      const token1 = tokens[0];
      expect(token1.type).to.be.eq('c');
      expect(token1.content).to.be.eq(consonant);
    });
  }

  const consonantDigraphs = 'ch,cz,dz,dź,dż,qu,rz,sz'.split(',');

  for (const digraph of consonantDigraphs) {
    it(`Digraphs (${digraph})`, () => {
      const tokens = tokenizer.tokenize(digraph);;
      expect(tokens).to.be.length(1);

      const token1 = tokens[0];
      expect(token1.type).to.be.eq('c');
      expect(token1.content).to.be.eq(digraph);
    });
  }

  const vowelDigraphs = 'au,eu'.split(',');

  for (const digraph of vowelDigraphs) {
    it(`Digraphs (${digraph})`, () => {
      const tokens = tokenizer.tokenize(digraph);
      expect(tokens).to.be.length(1);

      const token1 = tokens[0];
      expect(token1.type).to.be.eq('v');
      expect(token1.content).to.be.eq(digraph);
    });
  }

  const palatizatables = 'bcdfghkmnprstvwxz'.split('');

  for (const palatizatable of palatizatables) {
    it(`Palatizable with i followed by vowel (${palatizatable}ie)`, () => {
      const tokens = tokenizer.tokenize(palatizatable + 'ie');
      expect(tokens).to.be.length(2);

      const token1 = tokens[0];
      expect(token1.type).to.be.eq('c');
      expect(token1.content).to.be.eq(palatizatable + 'i');

      const token2 = tokens[1];
      expect(token2.type).to.be.eq('v');
      expect(token2.content).to.be.eq('e');
    });
  }

  const nonPallatizables = 'ćjlłńśźż'.split('');

  for (const nonPalatizable of nonPallatizables) {
    it(`Non-palatizable with i (${nonPalatizable}i)`, () => {
      const tokens = tokenizer.tokenize(nonPalatizable + 'i');
      expect(tokens).to.be.length(2);

      const token1 = tokens[0];
      expect(token1.type).to.be.eq('c');
      expect(token1.content).to.be.eq(nonPalatizable);

      const token2 = tokens[1];
      expect(token2.type).to.be.eq('v');
      expect(token2.content).to.be.eq('i');
    });
  }

  for (const nonPalatizable of nonPallatizables) {
    it(`Non-palatizable with i followed by vowel (${nonPalatizable}ie)`, () => {
      const tokens = tokenizer.tokenize(nonPalatizable + 'ie');
      expect(tokens).to.be.length(2);

      const token1 = tokens[0];
      expect(token1.type).to.be.eq('c');
      expect(token1.content).to.be.eq(nonPalatizable);

      const token2 = tokens[1];
      expect(token2.type).to.be.eq('v');
      expect(token2.content).to.be.eq('ie');
    });
  }
});