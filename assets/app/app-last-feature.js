const TEST_ID = "04015";

Iniciar_test: {
  await NwtDomAutomator.abrirTestsDeLaAplicacion();
  await NwtTimer.timeout(100);
  NwtDomAutomator.find(document.body, "*", `nwt » api » ${TEST_ID}. `)[0].parentElement.previousElementSibling.children[0].click();
}