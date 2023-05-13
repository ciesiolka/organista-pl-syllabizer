import type SyllableToken from "./SyllableToken";
import PhoneTokenizer from "../Phones/PhoneTokenizer";
import Syllabizer from "../Syllables/Syllabizer";
import PhoneToken from "../Phones/PhoneToken";

class SentenceSyllabizer {
  private _phonetokenizer: PhoneTokenizer;
  private _syllabizer: Syllabizer;

  public constructor() {
    this._phonetokenizer = new PhoneTokenizer;
    this._syllabizer = new Syllabizer
  }
  
  public syllabize(sentence: string): SyllableToken[] {
    const tokens: SyllableToken[] = [];
    const words: string[] = sentence.split(/\s+|\n+/);
    for (const word of words) {
      tokens.push(...this.syllabizeWord(word));
    }
    return tokens;
  }

  private syllabizeWord(word: string): SyllableToken[] {
    const tokens: SyllableToken[] = []
    const wordElements = word.match(/\p{L}+|[^\p{L}\s]+/gui) ?? [];
    for (const element of wordElements) {
      const wordTokens: SyllableToken[] = [];
      if (element.match(/\p{L}+/ui)) {
        const phones = this._phonetokenizer.tokenize(element);
        const syllables = this._syllabizer.syllabizePhones(phones);
        wordTokens.push(...this.syllablesToTokens(syllables));
      } else {
        // it's punctuation
      }
      tokens.push(...wordTokens);
    }
    return tokens;
  }

  private syllablesToTokens(phonesGroups: PhoneToken[][]): SyllableToken[] {
    if (phonesGroups.length === 1) {
      return [{type: "alone", content: phonesGroups[0].reduce<string>((acc, curr) => acc + curr.content, '')}]
    }
    const output: SyllableToken[] = [];
    for (const phoneSyllable of phonesGroups) {
      output.push({type: 'middle', content: phoneSyllable.reduce<string>((acc, curr) => acc + curr.content, '')})
    }
    output[0].type = 'start';
    output[output.length - 1].type = 'end';
    return output;
  }
}

export default SentenceSyllabizer;