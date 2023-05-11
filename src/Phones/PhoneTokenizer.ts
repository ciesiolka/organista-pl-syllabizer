import PhoneToken from "./PhoneToken";

const vowels = 'aeiouyąęó'.split('');
const consonants = 'bcćdfghjklłmnńpqrsśtvwxzźż'.split('');
const digraphs = {
  'a': ['u'],
  'e': ['u'],
  'c': 'hz'.split(''),
  'd': 'zźż'.split(''),
  'q': ['u'],
  'r': ['z'],
  's': ['z'],
}

type State = {
  letters: string[];
  tokens: PhoneToken[];
  index: number;
};

class PhoneTokenizer {

  private isVowel(letter: string) {
    return vowels.includes(letter.toLowerCase());
  }

  private isConsonant(letter: string) {
    return consonants.includes(letter.toLowerCase());
  }

  private startsDigraph(letter: string) {
    return letter.toLowerCase() in digraphs;
  }

  private isDigraph(begin: string, end: string | undefined) {
    if (end === undefined) {
      return false;
    }
    const beginLastLetter = begin.slice(-1).toLowerCase();
    if (beginLastLetter in digraphs) {
      return digraphs[beginLastLetter as keyof typeof digraphs].includes(end.toLowerCase());
    }
    return false;
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
    const letter = s.letters[s.index];
    const token: PhoneToken = { content: letter, type: 'v' };

    s.tokens.push(token);
  }

  private tokenizeConsonant(s: State) {
    const letter = s.letters[s.index];
    const nextLetter = s.letters.at(s.index + 1);
    const token: PhoneToken = { content: letter, type: 'c' };

    if (this.isDigraph(letter, nextLetter)) {
      token.content += nextLetter;
      s.index++;
    }

    s.tokens.push(token);
  }
};

export default PhoneTokenizer;