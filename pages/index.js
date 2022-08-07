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
import { timeZones } from "../components/utils.js";
import { FixtureTable } from "../components/FixtureTable";

function sortDates(array, fixture, date) {
  var low = 0,
    high = array.length;

  while (low < high) {
    var mid = (low + high) >>> 1;
    var tempDate = new Date(array[mid].fixture.date);
    if (tempDate < date) low = mid + 1;
    else high = mid;
  }
  array.splice(low, 0, fixture);
}

export async function getServerSideProps({
  query: {
    startDate = today(),
    endDate = today().add({ weeks: 2 }),
    leagueArr = ["39"]
  }
}) {
  if (typeof leagueArr === "string") {
    leagueArr = leagueArr.split(",");
  }
  const league = "41";
  const season = "2022";
  const leagueName = "league-" + league;

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
        sortDates(footballData, rawData[i].dataSet[j], tempDate);
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

              <FixtureTable footballData={footballData}/>

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
