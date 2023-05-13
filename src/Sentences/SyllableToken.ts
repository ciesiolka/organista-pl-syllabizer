type SyllableToken = {
  content: string,
  type: 'start' | 'middle' | 'end' | 'alone' | 'midPunct'
}

export default SyllableToken;