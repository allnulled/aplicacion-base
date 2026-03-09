const example1 = `

2026-2029,2030-2034 {
  1-3,6-9,12 {
    1-15,21,27 {
      00-08=Dormir
      08-08:30=Desayunar
      09,10,11,12=Recordatorio 1
    }
  }
}
7-15=tomar el sol
7=estar preparado para tomar el sol
2026,2027 {
  1/1-31/12 {
    0-8=task
  }
}
2028/*/*{
  1-12=task
}
  
`;

const example2 = `

2026/10-12,2027/0-3 {
  0-15 {
    8-9 {
      0-20=calentamiento
      20-40=entreno
      40-60=estiramiento
    }
  }
}

`;

debugg(NwtCronMachine.compile(`

2026 {
  10-12 {
    15-30 {
      8-9 {
        00-20=calentamiento
        20-40=entreno
        40-60=estiramiento
      }
    }
  }
}

`));
