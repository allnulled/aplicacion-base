return {
  onReport: function() {
    trace("NwtService.for(nwt/os.mysql.service).onReport");
    if(NwtMysql.utils.isRunning()) {
      return {
        isStarted: true,
        updatedAt: NwtTimer.fromDateToString(),
        owner: "nwt/os.mysql.service",
      };
    } else {
      return {
        isStarted: false,
        updatedAt: NwtTimer.fromDateToString(),
        owner: "nwt/os.mysql.service",
      };
    }
  },
  onStart: function() {
    trace("NwtService.for(nwt/os.mysql.service).onStart");

  },
  onStop: function() {
    trace("NwtService.for(nwt/os.mysql.service).onStop");

  }
};