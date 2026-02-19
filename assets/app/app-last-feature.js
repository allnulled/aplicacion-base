Iniciar_test: {
  
  
  
  const TEST_ID = "04220";


  
  
  await NwtDomAutomator.abrirTestsDeLaAplicacion();
  await NwtTimer.timeout(100);
  NwtDomAutomator.find(document.body, "*", `nwt » api » ${TEST_ID}. `)[0].parentElement.previousElementSibling.children[0].click();
}