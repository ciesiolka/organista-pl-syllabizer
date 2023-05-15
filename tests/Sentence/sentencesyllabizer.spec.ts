import { describe, it } from "mocha";
import { expect } from "chai";
import SentenceSyllabizer from "../../src/Sentences/SentenceSyllabizer";

describe("Sentence syllabizer syllabizes", () => {
  const ss = new SentenceSyllabizer();

  it("empty string", () => {
    const word = '';
    const syllables = ss.syllabize(word);
    expect(syllables).to.be.empty;
  })

  it("ab", () => {
    const word = 'ab';
    const syllables = ss.syllabize(word)
    expect(syllables).to.be.length(1);
    const syllable1 = syllables[0];
    expect(syllable1.type).to.be.eq('alone');
    expect(syllable1.content).to.be.eq("ab");
  })

  it("abba", () => {
    const word = 'abba';
    const syllables = ss.syllabize(word)
    expect(syllables).to.be.length(2);

    const syllable1 = syllables[0];
    expect(syllable1.type).to.be.eq('start');
    expect(syllable1.content).to.be.eq("ab");

    const syllable2 = syllables[1];
    expect(syllable2.type).to.be.eq('end');
    expect(syllable2.content).to.be.eq("ba");
  })

  it("telefon", () => {
    const word = 'telefon';
    const syllables = ss.syllabize(word)
    expect(syllables).to.be.length(3);

    const syllable1 = syllables[0];
    expect(syllable1.type).to.be.eq('start');
    expect(syllable1.content).to.be.eq("te");

    const syllable2 = syllables[1];
    expect(syllable2.type).to.be.eq('middle');
    expect(syllable2.content).to.be.eq("le");

    const syllable3 = syllables[2];
    expect(syllable3.type).to.be.eq('end');
    expect(syllable3.content).to.be.eq("fon");
  })

  it("pontyfikał", () => {
    const word = 'pontyfikał';
    const syllables = ss.syllabize(word)
    expect(syllables).to.be.length(4);

    const syllable1 = syllables[0];
    expect(syllable1.type).to.be.eq('start');
    expect(syllable1.content).to.be.eq("pon");

    const syllable2 = syllables[1];
    expect(syllable2.type).to.be.eq('middle');
    expect(syllable2.content).to.be.eq("ty");

    const syllable3 = syllables[2];
    expect(syllable3.type).to.be.eq('middle');
    expect(syllable3.content).to.be.eq("fi");

    const syllable4 = syllables[3];
    expect(syllable4.type).to.be.eq('end');
    expect(syllable4.content).to.be.eq("kał");
  })

  it("k’niemu", () => {
    const word = 'k’niemu';
    const syllables = ss.syllabize(word)
    expect(syllables).to.be.length(2);

    const syllable1 = syllables[0];
    expect(syllable1.type).to.be.eq('start');
    expect(syllable1.content).to.be.eq("k’nie");

    const syllable2 = syllables[1];
    expect(syllable2.type).to.be.eq('end');
    expect(syllable2.content).to.be.eq("mu");
  })

  it("„ona”", () => {
    const word = '„ona”';
    const syllables = ss.syllabize(word)
    expect(syllables).to.be.length(2);

    const syllable1 = syllables[0];
    expect(syllable1.type).to.be.eq('start');
    expect(syllable1.content).to.be.eq("„o");

    const syllable2 = syllables[1];
    expect(syllable2.type).to.be.eq('end');
    expect(syllable2.content).to.be.eq("na”");
  })

  it("ona..", () => {
    const word = 'ona..';
    const syllables = ss.syllabize(word)
    expect(syllables).to.be.length(2);

    const syllable1 = syllables[0];
    expect(syllable1.type).to.be.eq('start');
    expect(syllable1.content).to.be.eq("o");

    const syllable2 = syllables[1];
    expect(syllable2.type).to.be.eq('end');
    expect(syllable2.content).to.be.eq("na..");
  })

  it("a ja", () => {
    const word = 'a ja';
    const syllables = ss.syllabize(word)
    expect(syllables).to.be.length(2);

    const syllable1 = syllables[0];
    expect(syllable1.type).to.be.eq('alone');
    expect(syllable1.content).to.be.eq("a");

    const syllable2 = syllables[1];
    expect(syllable2.type).to.be.eq('alone');
    expect(syllable2.content).to.be.eq("ja");
  })

  it("a jaki", () => {
    const word = 'a jaki';
    const syllables = ss.syllabize(word)
    console.log(JSON.stringify(syllables));
    expect(syllables).to.be.length(3);

    const syllable1 = syllables[0];
    expect(syllable1.type).to.be.eq('alone');
    expect(syllable1.content).to.be.eq("a");

    const syllable2 = syllables[1];
    expect(syllable2.type).to.be.eq('start');
    expect(syllable2.content).to.be.eq("ja");

    const syllable3 = syllables[2];
    expect(syllable3.type).to.be.eq('end');
    expect(syllable3.content).to.be.eq("ki");
  })
});