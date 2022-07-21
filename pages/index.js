import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react';
import fs from 'fs';
import fetch from 'node-fetch';
import path from 'path';
import { 
  SSRProvider, 
  DateRangePicker, 
  Provider, 
  defaultTheme, 
  useDateFormatter, 
  Button } from '@adobe/react-spectrum';
import { today } from '@internationalized/date';
import { useRouter } from 'next/router';

export async function getServerSideProps({ query: {startDate = today(), endDate = today().add({ weeks: 1 })} }) {
  const league = '39';
  const season = '2022';
  const dataFolderName = 'data';
  const dataFileName = './' + dataFolderName + '/data--league-' + league + '--season-' + season + '--from-' + startDate + '--to-' + endDate + '.json';

  const url = 'https://api-football-v1.p.rapidapi.com/v3/fixtures?league=' + league + '&season=' + season + '&from=' + startDate + '&to=' + endDate;

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.API_FOOTBALL_KEY,
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    },
  };

  if (!fs.existsSync(dataFileName)) {  
    await fetch(url, options)
      .then(res => res.json())
      .then(json => {
        console.log("Writing to data file...");
        if (!fs.existsSync(dataFolderName)) {
          console.log('creating data folder: ' + dataFolderName);
          fs.mkdirSync(dataFolderName);
        }
        fs.writeFileSync(dataFileName, JSON.stringify(json.response),'utf8');
        console.log("Finished writing.");
      })
      .catch(err => console.error('error:' + err));
  }

  const footballData = JSON.parse(fs.readFileSync(dataFileName, 'utf8'));

  return { 
    props: {
      footballData,
    },
  }
}

export default function Home( { footballData } ) {
  let [range, setRange] = useState({
    start: today(),
    end: today().add({ weeks: 1 })
  });
  let formatter = useDateFormatter({ dateStyle: 'long' });

  const router = useRouter();

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
          <h1 className={styles.title}>
            Welcome to Football Advisor
          </h1>

          <div className={styles.grid}>
            <div>
            <DateRangePicker label="Date range" value={range} onChange={setRange} />
            </div>
            
            <Button variant="cta" onPress={() => { 
              router.push(`/?startDate=${range.start.toString()}&endDate=${range.end.toString()}`) 
              }}>Submit</Button>

            { footballData.map(myItem => (
                // eslint-disable-next-line react/jsx-key
                <div className={styles.fixture}>
                  <h2>
                    <Image 
                      src={myItem.teams.home.logo}
                      layout="fixed"
                      height="100"
                      width="100"
                      alt='Home team logo'/>{' '}
                    {myItem.teams.home.name} {myItem.score.fulltime.home} x {' '}
                    {myItem.score.fulltime.away} {myItem.teams.away.name}{' '}
                    <Image 
                      src={myItem.teams.away.logo}
                      layout="fixed"
                      height="100"
                      width="100"
                      alt='away team logo'/>
                  </h2>
                  <h3>{myItem.fixture.date}</h3>
                  <h3>
                    {myItem.fixture.venue.name} ({myItem.fixture.venue.city})
                  </h3>
                  <div>
                    <Image 
                      src={myItem.league.logo}
                      layout="fixed"
                      height="50"
                      width="50"
                      alt='league logo'/>
                      {myItem.league.name} ({myItem.league.country}) : {myItem.league.round}
                  </div>
                  <h4>
                    
                  </h4>
                </div>
              ))
            }
          </div>
        </main>

        <footer className={styles.footer}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{' '}
            <span className={styles.logo}>
              <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
            </span>
          </a>
        </footer>
      </div>
    </Provider>
  </SSRProvider>  
  )
}
