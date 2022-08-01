import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import fetch from "node-fetch";
import {
  SSRProvider,
  Provider,
  defaultTheme,
  Grid,
  View,
  repeat
} from "@adobe/react-spectrum";
import { today } from "@internationalized/date";
import clientPromise from "../mongodb";
import { OptionsPicker } from "../components/OptionsPicker";

function sortDates(array, fixture, date) {
  var low = 0,
      high = array.length;

  while (low < high) {
      var mid = (low + high) >>> 1;
      var tempDate = new Date(array[mid].fixture.date);
      if (tempDate < date) low = mid + 1;
      else high = mid;
  }
  array.splice(low, 0, fixture)
}

export async function getServerSideProps({
  query: {
    startDate = today(),
    endDate = today().add({ weeks: 20 }),
    leagueArr = ["39"]
  }
}) {
  if (typeof leagueArr === "string") {
    leagueArr = leagueArr.split(",");
  }
  const league = "41";
  const season = "2022";
  const leagueName = "league-" + league;

  const url =
    "https://api-football-v1.p.rapidapi.com/v3/fixtures?league=" +
    league +
    "&season=" +
    season;

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.API_FOOTBALL_KEY,
      "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com"
    }
  };

  const client = await clientPromise;
  const db = client.db("football_advisor");
  const coll = await db.collection("fixtures");

  if ((await coll.find({ leagueName: leagueName }).count()) === 0) {
    await fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        console.log("Updating Database...");
        console.log(json);
        const record = {
          leagueName: leagueName,
          dataSet: json.response
        };
        async function insert() {
          if ((await coll.find({ leagueName: leagueName }).count()) === 0) {
            await coll.insert(record);
          }
        }
        insert();
        console.log("Updated.");
      })
      .catch((err) => console.error("error:" + err));
  }

  const rawData = await db
    .collection("fixtures")
    .find({ leagueId: { $in: leagueArr } })
    .toArray();

  let footballData = [];
  let leagueStartDate = new Date(startDate);
  let leagueEndDate = new Date(endDate);
  for (let i = 0; i < rawData.length; i++) {
    for (let j = 0; j < rawData[i].dataSet.length; j++) {
      let tempDate = new Date(rawData[i].dataSet[j].fixture.date);
      if (
        tempDate.getTime() >= leagueStartDate.getTime() &&
        tempDate.getTime() <= leagueEndDate.getTime()
      )
        sortDates(footballData, rawData[i].dataSet[j], tempDate)
    }
  }

  return {
    props: {
      footballData
    }
  };
}

export default function Home({ footballData }) {
  return (
    <SSRProvider>
      <Provider theme={defaultTheme}>
        <div className={styles.container}>
          <Head>
            <title>Football Advisor</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <main className={styles.main}>
            <h1 className={styles.title}>Welcome to Football Advisor</h1>

            <div className={styles.pickerGrid}>
              <OptionsPicker />

              {footballData.map((myItem) => (
                // eslint-disable-next-line react/jsx-key
                <div className={styles.fixture}>
                  <Grid
                    areas={[
                      "homeLogo homeTeam versus awayTeam awayLogo fixtureDate venueName leagueName"
                    ]}
                    columns={[
                      "0.5fr", // home team logo
                      "1fr", // home team name
                      "0.1fr", // vs
                      "1fr", // away team name
                      "0.5fr", // away team logo
                      "1fr", // fixture date and time
                      "1fr", // venue name
                      "1fr" // league name
                    ]}
                    rows={repeat("auto")}
                    gap="size-100"
                  >
                    <View gridArea="homeLogo">
                      <Image
                        src={myItem.teams.home.logo}
                        layout="fixed"
                        height="100"
                        width="100"
                        alt="Home team logo"
                      />
                    </View>

                    <View gridArea="homeTeam">
                      <h3>
                        {myItem.teams.home.name} {myItem.score.fulltime.home}
                      </h3>
                    </View>

                    <View gridArea="versus">
                      <h3>vs</h3>
                    </View>

                    <View gridArea="awayTeam">
                      <h3>
                        {myItem.score.fulltime.away} {myItem.teams.away.name}
                      </h3>
                    </View>

                    <View gridArea="awayLogo">
                      <Image
                        src={myItem.teams.away.logo}
                        layout="fixed"
                        height="100"
                        width="100"
                        alt="away team logo"
                      />
                    </View>

                    <View gridArea="fixtureDate">
                      {new Date(myItem.fixture.date).toLocaleString('en-GB', { timeZone: 'UTC' })}
                      <br />
                      <br />
                      {myItem.league.round}
                    </View>

                    <View gridArea="venueName">
                      <h3>{myItem.fixture.venue.name}</h3>
                      {myItem.fixture.venue.city}
                    </View>

                    <View gridArea="leagueName">
                      <Image
                        src={myItem.league.logo}
                        layout="fixed"
                        height="50"
                        width="50"
                        alt="league logo"
                      />
                      <br />
                      {myItem.league.name} ({myItem.league.country})
                    </View>
                  </Grid>
                </div>
              ))}
            </div>
          </main>

          <footer className={styles.footer}>
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Powered by{" "}
              <span className={styles.logo}>
                <Image
                  src="/vercel.svg"
                  alt="Vercel Logo"
                  width={72}
                  height={16}
                />
              </span>
            </a>
          </footer>
        </div>
      </Provider>
    </SSRProvider>
  );
}
