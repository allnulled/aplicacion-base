return {
  onReport: function() {
    trace("NwtService.for(nwt/local.cron.service).onReport");
    if(NwtCronManager.global.isRunning()) {
      return {
        isStarted: true,
        updatedAt: NwtTimer.fromDateToString(),
        owner: "nwt/local.cron.service",
      };
    } else {
      return {
        isStarted: false,
        updatedAt: NwtTimer.fromDateToString(),
        owner: "nwt/local.cron.service",
      };
    }
  },
  onStart: function() {
    trace("NwtService.for(nwt/local.cron.service).onStart");

  },
  onStop: function() {
    trace("NwtService.for(nwt/local.cron.service).onStop");

  }
};