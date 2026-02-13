const events = NwtEventsManager.create();

const passes = [];

events.configure("loaded", {
  onlyOnce: true,
});

events.on("loaded", (event) => {
  passes.push("before");
});

events.dispatch("loaded", { moment: new Date() });

// Como está configurado con onlyOnce:true, aquí ya se lanza igualmente:
events.on("loaded", (event) => {
  passes.push("after:on");
});

// Como está configurado con onlyOnce:true, aquí ya se lanza igualmente:
events.once("loaded", (event) => {
  passes.push("after:once");
});

await NwtTimer.timeout(100);

assertion(passes.length === 3, "Parameter «passes.length» must be 3 here");
assertion(passes[0] === 'before', "Parameter «passes[0]» must be 'before' here");
assertion(passes[1] === 'after:on', "Parameter «passes[1]» must be 'after:on' here");
assertion(passes[2] === 'after:once', "Parameter «passes[2]» must be 'after:once' here");

tester.progressBar.advance(1);