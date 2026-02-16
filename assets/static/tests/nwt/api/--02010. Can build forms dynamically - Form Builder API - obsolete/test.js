tester.progressBar.total = 2;
await NwtTimer.timeout(500);
tester.progressBar.advance(1);
await NwtTimer.timeout(1000);


Test: {
  assertion(typeof Vue.options.components.MiComponente !== "undefined", "Componente «MiComponente» debería existir aquí");
}


await NwtTimer.timeout(500);
tester.progressBar.advance(1);
await NwtTimer.timeout(1000);