import { describe, it } from "mocha";
import { expect } from "chai";
import PhoneTokenizer from "../../src/Phones/PhoneTokenizer";
import PhoneToken from "../../src/Phones/PhoneToken";

const vowels = 'aąeęioóuy'.split('');
const consonants = 'bcćdfghjklłmnpqrsśtvwxzźż'.split('');
const consonantDigraphs = 'ch,cz,dz,dź,dż,qu,rz,sz'.split(',');
const palatizatables = 'bcdfghjkmnprstvwxz'.split('');
const nonPallatizables = 'ćlłńśźż'.split('');


describe("Phone Tokenizer parses simple examples", () => {
  const tokenizer = new PhoneTokenizer();

  it("Empty string", () => {
    const word = '';
    const tokens = tokenizer.tokenize(word);
    expect(tokens).to.be.length(0);
  });


  for (const vowel of vowels) {
    it(`Single vowel (${vowel})`, () => {
      const tokens = tokenizer.tokenize(vowel);
      expect(tokens).to.be.length(1);

      const token1 = tokens[0];
      expect(token1.type).to.be.eq('v');
      expect(token1.content).to.be.eq(vowel);
    });
  }


  for (const consonant of consonants) {
    it(`Single consonant (${consonant})`, () => {
      const tokens = tokenizer.tokenize(consonant);
      expect(tokens).to.be.length(1);

      const token1 = tokens[0];
      expect(token1.type).to.be.eq('c');
      expect(token1.content).to.be.eq(consonant);
    });
  }


  for (const digraph of consonantDigraphs) {
    it(`Digraphs (${digraph})`, () => {
      const tokens = tokenizer.tokenize(digraph);;
      expect(tokens).to.be.length(1);

      const token1 = tokens[0];
      expect(token1.type).to.be.eq('c');
      expect(token1.content).to.be.eq(digraph);
    });
  }


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

  for (const palatizatable of palatizatables) {
    it(`Palatizable with j followed by vowel (${palatizatable}je)`, () => {
      const tokens = tokenizer.tokenize(palatizatable + 'je');
      expect(tokens).to.be.length(2);

      const token1 = tokens[0];
      expect(token1.type).to.be.eq('c');
      expect(token1.content).to.be.eq(palatizatable + 'j');

      const token2 = tokens[1];
      expect(token2.type).to.be.eq('v');
      expect(token2.content).to.be.eq('e');
    });
  }



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

describe("Phone Tokenizer parses simple UPPERCASE examples", () => {
  const tokenizer = new PhoneTokenizer();

  for (const vowel of vowels.map(e => e.toUpperCase())) {
    it(`Single vowel (${vowel})`, () => {
      const tokens = tokenizer.tokenize(vowel);
      expect(tokens).to.be.length(1);

      const token1 = tokens[0];
      expect(token1.type).to.be.eq('v');
      expect(token1.content).to.be.eq(vowel);
    });
  }


  for (const consonant of consonants.map(e => e.toUpperCase())) {
    it(`Single consonant (${consonant})`, () => {
      const tokens = tokenizer.tokenize(consonant);
      expect(tokens).to.be.length(1);

      const token1 = tokens[0];
      expect(token1.type).to.be.eq('c');
      expect(token1.content).to.be.eq(consonant);
    });
  }


  for (const digraph of consonantDigraphs.map(e => e.toUpperCase())) {
    it(`Digraphs (${digraph})`, () => {
      const tokens = tokenizer.tokenize(digraph);;
      expect(tokens).to.be.length(1);

      const token1 = tokens[0];
      expect(token1.type).to.be.eq('c');
      expect(token1.content).to.be.eq(digraph);
    });
  }

  for (const palatizatable of palatizatables.map(e => e.toUpperCase())) {
    it(`Palatizable with i followed by vowel (${palatizatable}IE)`, () => {
      const tokens = tokenizer.tokenize(palatizatable + 'IE');
      expect(tokens).to.be.length(2);

      const token1 = tokens[0];
      expect(token1.type).to.be.eq('c');
      expect(token1.content).to.be.eq(palatizatable + 'I');

      const token2 = tokens[1];
      expect(token2.type).to.be.eq('v');
      expect(token2.content).to.be.eq('E');
    });
  }

  for (const palatizatable of palatizatables.map(e => e.toUpperCase())) {
    it(`Palatizable with j followed by vowel (${palatizatable}JE)`, () => {
      const tokens = tokenizer.tokenize(palatizatable + 'JE');
      expect(tokens).to.be.length(2);

      const token1 = tokens[0];
      expect(token1.type).to.be.eq('c');
      expect(token1.content).to.be.eq(palatizatable + 'J');

      const token2 = tokens[1];
      expect(token2.type).to.be.eq('v');
      expect(token2.content).to.be.eq('E');
    });
  }


  for (const nonPalatizable of nonPallatizables.map(e => e.toUpperCase())) {
    it(`Non-palatizable with I (${nonPalatizable}I)`, () => {
      const tokens = tokenizer.tokenize(nonPalatizable + 'I');
      expect(tokens).to.be.length(2);

      const token1 = tokens[0];
      expect(token1.type).to.be.eq('c');
      expect(token1.content).to.be.eq(nonPalatizable);

      const token2 = tokens[1];
      expect(token2.type).to.be.eq('v');
      expect(token2.content).to.be.eq('I');
    });
  }

  for (const nonPalatizable of nonPallatizables.map(e => e.toUpperCase())) {
    it(`Non-palatizable with i followed by vowel (${nonPalatizable}IE)`, () => {
      const tokens = tokenizer.tokenize(nonPalatizable + 'IE');
      expect(tokens).to.be.length(2);

      const token1 = tokens[0];
      expect(token1.type).to.be.eq('c');
      expect(token1.content).to.be.eq(nonPalatizable);

      const token2 = tokens[1];
      expect(token2.type).to.be.eq('v');
      expect(token2.content).to.be.eq('IE');
    });
  }
});

describe("Phone Tokenizer parses complex examples", () => {
  const tokenizer = new PhoneTokenizer();

  it("krzyż", () => {
    const word = "krzyż";
    const tokens = tokenizer.tokenize(word);

    expect(tokens).to.be.length(4);

    expect(tokens).to.be.deep.eq([
      { content: 'k', type: 'c' },
      { content: 'rz', type: 'c' },
      { content: 'y', type: 'v' },
      { content: 'ż', type: 'c' },
    ] as PhoneToken[]);
  });

  it("poszczególni", () => {
    const word = "poszczególni";
    const tokens = tokenizer.tokenize(word);

    expect(tokens).to.be.length(10);

    expect(tokens).to.be.deep.eq([
      { content: 'p', type: 'c' },
      { content: 'o', type: 'v' },
      { content: 'sz', type: 'c' },
      { content: 'cz', type: 'c' },
      { content: 'e', type: 'v' },
      { content: 'g', type: 'c' },
      { content: 'ó', type: 'v' },
      { content: 'l', type: 'c' },
      { content: 'n', type: 'c' },
      { content: 'i', type: 'v' },
    ] as PhoneToken[]);
  });

  it("pieniądz", () => {
    const word = "pieniądz";
    const tokens = tokenizer.tokenize(word);

    expect(tokens).to.be.length(5);

    expect(tokens).to.be.deep.eq([
      { content: 'pi', type: 'c' },
      { content: 'e', type: 'v' },
      { content: 'ni', type: 'c' },
      { content: 'ą', type: 'v' },
      { content: 'dz', type: 'c' },
    ] as PhoneToken[]);
  });

  it("dzięki", () => {
    const word = "dzięki";
    const tokens = tokenizer.tokenize(word);

    expect(tokens).to.be.length(4);

    expect(tokens).to.be.deep.eq([
      { content: 'dzi', type: 'c' },
      { content: 'ę', type: 'v' },
      { content: 'k', type: 'c' },
      { content: 'i', type: 'v' },
    ] as PhoneToken[]);
  });

  it("dziś", () => {
    const word = "dziś";
    const tokens = tokenizer.tokenize(word);

    expect(tokens).to.be.length(3);

    expect(tokens).to.be.deep.eq([
      { content: 'dz', type: 'c' },
      { content: 'i', type: 'v' },
      { content: 'ś', type: 'c' },
    ] as PhoneToken[]);
  });
});