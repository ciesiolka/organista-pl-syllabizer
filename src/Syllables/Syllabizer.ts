import PhoneToken from "../Phones/PhoneToken";
import ConsonantPairs from "./ConsonantPairs";

type State = {
  syllables: PhoneToken[][];
  syllableBuffer: PhoneToken[];
  hadVowel: boolean;
  sameSyllable: boolean;
  index: number;
};

class Syllabizer {
  private resetState(state: State) {
    state.sameSyllable = true;
    state.hadVowel = false;
    state.syllableBuffer = [];
  }

  public syllabizePhones(phones: PhoneToken[]): PhoneToken[][] {
    const state: State = {
      syllables: [],
      syllableBuffer: [],
      sameSyllable: true,
      hadVowel: false,
      index: 0
    };

    this.handleSpecialCases(phones, state);

    for (; state.index < phones.length; ++state.index) {
      const currPhone = phones[state.index];
      if (currPhone.type === 'v') {
        this.handleVowel(state);
      } else {
        this.handleConsonant(phones, state);
      }

      if (state.sameSyllable) {
        state.syllableBuffer.push(currPhone);
      } else {
        state.syllables.push(state.syllableBuffer);
        this.resetState(state);
        state.syllableBuffer.push(currPhone);
      }
    }

    if (this.lastSylhasVowel(state)) {
      state.syllables.push(state.syllableBuffer);
    } else {
      state.syllables[state.syllables.length - 1] = state.syllables[state.syllables.length - 1].concat(state.syllableBuffer);
    }

    return state.syllables;
  }


  private lastSylhasVowel(state: State) {
    return state.syllableBuffer.find(token => token.type === 'v') !== undefined;
  }


  private phonesEq(letters: string[], phones: PhoneToken[], state: State) {
    for (let i = 0; i < letters.length; ++i) {
      if (letters[i] === letters[i].toUpperCase()) {
        if (phones[i + state.index]?.type !== (letters[i] === 'V' ? 'v' : 'c')) {
          return false;
        }
      } else {
        if (phones[i + state.index]?.content !== letters[i]) {
          return false;
        }
      }
    }
    return true;
  }


  private handleSpecialCases(phones: PhoneToken[], state: State) {
    if (this.phonesEq(['n', 'au', 'C', 'V'], phones, state)) {
      state.syllables.push([phones[0], { content: phones[1].content.charAt(0), type: 'v' }], [{ content: phones[1].content.charAt(1), type: 'v' }]);
      state.index = 2;
    } else if (this.phonesEq(['n', 'au', 'C'], phones, state)) {
      state.syllables.push([phones[0], { content: phones[1].content.charAt(0), type: 'v' }], [{ content: phones[1].content.charAt(1), type: 'v' }, phones[2]]);
      state.index = 3;
    } else if (this.phonesEq(['o', 's'], phones, state) || this.phonesEq(['o', 'sz'], phones, state)) {
      state.syllables.push([phones[0]]);
      state.index = 1;
    }
  }


  private handleVowel(state: State) {
    if (state.hadVowel) {
      state.sameSyllable = false;
    } else {
      state.hadVowel = true;
    }
  }


  private handleConsonant(phones: PhoneToken[], state: State) {
    if (!state.hadVowel) {
      return;
    }
    const prevPrevPhone = phones.at(state.index - 2);
    const prevPhone = phones.at(state.index - 1);
    const currPhone = phones[state.index];
    const nextPhone = phones.at(state.index + 1);
    const nextNextPhone = phones.at(state.index + 2);

    if (prevPhone?.content === currPhone.content) {
      state.sameSyllable = false;
    } else if (prevPhone?.type === 'v' && nextPhone?.type === 'v') {
      state.sameSyllable = false;
    } else if (prevPhone?.type === 'v' && nextPhone?.content === 'j' && nextNextPhone?.type === 'v') {
      state.sameSyllable = false;
    } else if (prevPhone?.type === 'c' && !(`${prevPhone.content}${currPhone.content.replace('i', '')}`.toLowerCase() in ConsonantPairs)) {
      state.sameSyllable = false;
    } else if (prevPhone?.type === 'c' && nextPhone?.type === 'c' && !(`${prevPhone.content}${currPhone.content}${nextPhone.content.replace('i', '')}`.toLowerCase() in ConsonantPairs)) {
      state.sameSyllable = false;
    } else if (prevPhone?.type === 'c' && nextPhone?.type === 'v') {
      state.sameSyllable = false;
    }

  }
}

export default Syllabizer;