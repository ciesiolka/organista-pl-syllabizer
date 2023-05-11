import PhoneToken from "./PhoneToken";

const vowels = 'aeiouyąęó'.split('');
const consonants = 'bcćdfghjklłmnńpqrsśtvwxzźż'.split('');

type State = {
  letters: string[];
  tokens: PhoneToken[];
  index: number;
};

class PhoneTokenizer {

  private isVowel(letter: string) {
    return vowels.includes(letter);
  }

  private isConsonant(letter: string) {
    return consonants.includes(letter);
  }

  public tokenize(word: string): PhoneToken[] {
    const s: State = {
      index: 0,
      letters: word.split(''),
      tokens: []
    };

    for (s.index = 0; s.index < s.letters.length; ++s.index) {
      const letter = s.letters[s.index];
      if (this.isVowel(letter)) {
        this.tokenizeVowel(s);
      } else if (this.isConsonant(letter)) {
        this.tokenizeConsonant(s);
      }
    }

    return s.tokens;
  }

  private tokenizeVowel(s: State) {
    s.tokens.push({ content: s.letters[s.index], type: 'v' });
  }

  private tokenizeConsonant(s: State) {
    s.tokens.push({ content: s.letters[s.index], type: 'v' });
  }
};

export default PhoneTokenizer;