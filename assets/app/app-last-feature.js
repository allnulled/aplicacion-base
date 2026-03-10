Iniciar_test: {
  
  
  
  // const TEST_ID = "04220";
  const TEST_ID = "04235";

  Con_el_temporizador: {
    break Con_el_temporizador;
    await NwtDomAutomator.abrirTemporizador();
  }
  
  Con_el_form_maker: {
    // break Con_el_form_maker;
    await NwtDomAutomator.abrirTestsDeLaAplicacion();
    await NwtTimer.timeout(100);
    NwtDomAutomator.find(document.body, "*", `nwt » api » ${TEST_ID}. `)[0].parentElement.previousElementSibling.children[0].click();
    NwtDomAutomator.followTheRabbit();
  }
}