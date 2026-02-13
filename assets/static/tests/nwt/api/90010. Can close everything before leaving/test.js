tester.progressBar.total = 10;

for(let index=0; index<10; index++) {
  tester.progressBar.advance(1);
  assertion(true, `Closing everything [${index+1}/10]`);
  await NwtTimer.timeout(200);
}