class BowlingGame {
  constructor() {
      this.framesScores = [];
      this.finalScore = 0;
      this.throws = [];
  }

  tiros() {// get the 2 throws for frame
      const firstThrow = this.getScore(0, 10);
      this.throws.push(firstThrow);


      const maxSecondThrow = 10 - firstThrow;
      const secondThrow = this.getScore(0, maxSecondThrow);
      this.throws.push(secondThrow);

  }

  calculatePunctuation() {
      let punctuation = 0;
      let numThrow = 0;

      for (let frame = 1; frame <= 10; frame++) {
          if (this.strike(numThrow)) { //strike
              if (this.throws[numThrow + 1] === 0) {
                  punctuation += 10 + this.throws[numThrow + 2] + this.throws[numThrow + 3];
                  numThrow++;
              } else {
                  punctuation += 10 + this.throws[numThrow + 1] + this.throws[numThrow + 2];
                  numThrow++;
              }


          } else if (this.spare(numThrow)) {//spare
              punctuation += 10 + this.throws[numThrow + 2];
              numThrow += 2;
          } else { //normal
              punctuation += this.throws[numThrow] + this.throws[numThrow + 1];
              numThrow += 2;
          }

          this.framesScores.push({
              frame: frame - 1,
              punctuation
          });
      }

      if ( //For the extra frame and score
          numThrow === 18 &&
          (this.throws[18] === 10 || (this.throws[18] + this.throws[19]) === 10)
      ) {
          const extraScore = this.getScore(0, 10);
          console.log('EXTRA SCORE:'+extraScore);
          punctuation += extraScore;
          this.framesScores[9].punctuation += extraScore;


      }
      if ( //For the extra frame and score
      numThrow === 19 &&
      this.throws[19] === 10
  ) {
      const extraScore = this.getScore(0, 10);
      console.log('EXTRA SCORE:'+extraScore);
      punctuation += extraScore;
      this.framesScores[9].punctuation += extraScore;


  }



      this.finalScore = punctuation;
  }

  strike(numThrow) { //condition to be a strike
      return this.throws[numThrow] === 10;
  }

  spare(numThrow) {//condition to be a spare
      return this.throws[numThrow] + this.throws[numThrow + 1] === 10;
  }

  getScore(min, max) { //get a random score 0-10
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

const test = new BowlingGame();
for (let frame = 0; frame < 20; frame++) { //get the 20 scores
  test.tiros();
}

test.calculatePunctuation();

const tableData = test.framesScores.map((frame, index) => ({ //generate the table
  Frame: index + 1,
  'Throw 1': test.throws[index * 2],
  'Throw 2': test.throws[index * 2 + 1],
  Punctuation: frame.punctuation,
}));


console.table(tableData); //print the table

console.log(`Puntuación total: ${test.finalScore}`); //final score
