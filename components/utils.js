export function findFixtureRange(array, date) {
  var low = 0,
    high = array.dataSet.length;

  while (low < high) {
    var mid = (low + high) >>> 1;
    var tempDate = new Date(array.dataSet[mid].fixture.date);
    if (tempDate < date) low = mid + 1;
    else high = mid;
  }
  return low;
}

export function sortByDates(fixtureArray, fixture, venueArray) {
  var low = 0,
    high = fixtureArray.length,
    date = new Date(fixture.fixture.date);

  while (low < high) {
    var mid = (low + high) >>> 1;
    var tempDate = new Date(fixtureArray[mid].fixture.date);
    if (tempDate < date) low = mid + 1;
    else high = mid;
  }
  fixtureArray.splice(low, 0, fixture);
  venueArray.splice(low, 0, fixture.fixture.venue.id);
}

export const timeZones = {
  England: "Europe/London",
  France: "Europe/Paris",
  Italy: "Europe/Rome",
  Spain: "Europe/Madrid",
  Portugal: "Europe/Lisbon",
  Germany: "Europe/Berlin",
  Belgium: "Europe/Brussels",
  Netherlands: "Europe/Amsterdam"
};


export const leagueOptions = [
  { label: "Premier League (England)", value: "39" },
  { label: "Bundesliga (Germany)", value: "78" },
  { label: "Ligue 1 (France)", value: "61" },
  { label: "Serie A (Italy)", value: "135" },
/*
  { label: "La Liga (Spain)", value: "140" },
  { label: "Bundesliga (Austria)", value: "218" },
  { label: "Jupiler Pro League (Belgium)", value: "144" },
  { label: "Challenger Pro League (Belgium)", value: "145" },
  { label: "First League (Bulgaria)", value: "172" },
  { label: "HNL (Croatia)", value: "210" },
  { label: "Czech Liga (Czech-Republic)", value: "345" },
  { label: "Superliga (Denmark)", value: "119" },
  { label: "Championship (England)", value: "40" },
  { label: "League One (England)", value: "41" },
  { label: "League Two (England)", value: "42" },
  { label: "Meistriliiga (Estonia)", value: "329" },
  { label: "Veikkausliiga (Finland)", value: "244" },
  { label: "Ligue 2 (France)", value: "62" },
  { label: "National 1 (France)", value: "63" },
  { label: "2. Bundesliga (Germany)", value: "79" },
  { label: "3. Liga (Germany)", value: "80" },
  { label: "Super League 1 (Greece)", value: "197" },
  { label: "NB I (Hungary)", value: "271" },
  { label: "Serie B (Italy)", value: "136" },
  { label: "Virsliga (Latvia)", value: "365" },
  { label: "A Lyga (Lithuania)", value: "362" },
  { label: "National Division (Luxembourg)", value: "261" },
  { label: "Eredivisie (Netherlands)", value: "88" },
  { label: "Eerste Divisie (Netherlands)", value: "89" },
  { label: "Eliteserien (Norway)", value: "103" },
  { label: "Ekstraklasa (Poland)", value: "106" },
  { label: "Primeira Liga (Portugal)", value: "94" },
  { label: "Segunda Liga (Portugal)", value: "95" },
  { label: "Taça de Portugal (Portugal)", value: "96" },
  { label: "Liga I (Romania)", value: "283" },
  { label: "Premiership (Scotland)", value: "179" },
  { label: "Championship (Scotland)", value: "180" },
  { label: "Super Liga (Slovakia)", value: "332" },
  { label: "1. SNL (Slovenia)", value: "373" },
  { label: "Segunda División (Spain)", value: "141" },
  { label: "Allsvenskan (Sweden)", value: "113" },
  { label: "Super League (Switzerland)", value: "207" },
  { label: "Süper Lig (Turkey)", value: "203" },
  { label: "Premier League (Wales)", value: "110" }
  */
];
