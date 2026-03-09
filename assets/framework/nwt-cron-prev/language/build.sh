pegjs -o nwt-cron-parser.js --format globals --export-var NwtCronParser nwt-cron-parser.pegjs
node fix.js
node test.js