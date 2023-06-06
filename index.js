class bowlingGame {
  constructor() {
    this.finalScore = 0;
    this.throws = [];

  }

  tiros() {
    const tiro = this.getScore(0, 10);
    this.throws.push(tiro);
    //save scores to a matrix
  }

  calculatePunctuation() {
    let punctuation = 0;
    let numThrow = 0;

    for (let frame=0; frame < 10; frame++) {

      if (this.strike(numThrow)) { // in case it is a strike
        punctuation += 10 + this.throws[numThrow + 1] + this.throws[numThrow + 2];
        numThrow++;
      } else if (this.spare(numThrow)) { // in case it is a spare
        punctuation += 10 + this.throws[numThrow + 1];
        numThrow += 2;
      } else { // in case is none of the above( a normal score)
        punctuation += this.throws[numThrow] + this.throws[numThrow + 1];
        numThrow += 2;

      }

    }

    this.finalScore = punctuation;

  }

  strike(numThrow) { //condition to get a strike
    if (this.throws[numThrow] === 10) {
      return true;
    }
  }

  spare(numThrow) { //condition to get a spare
    if (this.throws[numThrow] + this.throws[numThrow + 1] === 10) {
      return true;
    }
  }
  getScore(min, max) { // get a random score from 0 to 10
    return Math.floor(Math.random() * (max - min + 1)) + min;

  }
}


const test = new bowlingGame();


for (let tira = 0; tira < 20; tira++) {
  test.tiros();
}

test.calculatePunctuation()


console.log(`Puntuación total: ${test.finalScore}`);
