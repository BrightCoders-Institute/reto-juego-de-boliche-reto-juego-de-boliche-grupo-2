class bowlingGame {
  constructor() {
    this.framesScores=[];
    this.finalScore = 0;
    this.throws = [];

  }

  tiros() {
    const firstThrow=this.getScore(0,10);
    this.throws.push(firstThrow);
    console.log(firstThrow);
    const maxSecondThrow = 10-firstThrow;

    const secondThrow = this.getScore(0,maxSecondThrow);
    this.throws.push(secondThrow)
    console.log(secondThrow)

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
     // this.framesScores.push(punctuation);

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


for (let frame = 0; frame < 10; frame++) {
  console.log(`Frame N. `+frame)
  test.tiros();
  // console.log(`You Score:`+test.firstThrow+secondThrow)

}

test.calculatePunctuation();


console.log(`Puntuación total: ${test.finalScore}`);
