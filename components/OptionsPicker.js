import styles from "../styles/Home.module.css";
import { DateRangePicker, Button, Grid, View } from "@adobe/react-spectrum";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";
import { useState } from "react";
import { useRouter } from "next/router";
import { today } from "@internationalized/date";

export const OptionsPicker = () => {
  const options = [
    { label: "Bundesliga (Austria)", value: "218" },
    { label: "Premier League (Belarus)", value: "116" },
    { label: "Jupiler Pro League (Belgium)", value: "144" },
    { label: "Challenger Pro League (Belgium)", value: "145" },
    { label: "Premijer Liga (Bosnia)", value: "315" },
    { label: "First League (Bulgaria)", value: "172" },
    { label: "HNL (Croatia)", value: "210" },
    { label: "Czech Liga (Czech-Republic)", value: "345" },
    { label: "Superliga (Denmark)", value: "119" },
    { label: "Premier League (England)", value: "39" },
    { label: "Championship (England)", value: "40" },
    { label: "League One (England)", value: "41" },
    { label: "League Two (England)", value: "42" },
    { label: "FA Cup (England)", value: "45" },
    { label: "EFL Trophy (England)", value: "46" },
    { label: "League Cup (England)", value: "48" },
    { label: "Community Shield (England)", value: "528" },
    { label: "Meistriliiga (Estonia)", value: "329" },
    { label: "Veikkausliiga (Finland)", value: "244" },
    { label: "Ligue 1 (France)", value: "61" },
    { label: "Ligue 2 (France)", value: "62" },
    { label: "National 1 (France)", value: "63" },
    { label: "Bundesliga (Germany)", value: "78" },
    { label: "2. Bundesliga (Germany)", value: "79" },
    { label: "3. Liga (Germany)", value: "80" },
    { label: "DFB Pokal (Germany)", value: "81" },
    { label: "Premier Division (Gibraltar)", value: "758" },
    { label: "Super League 1 (Greece)", value: "197" },
    { label: "NB I (Hungary)", value: "271" },
    { label: "Premier Division (Ireland)", value: "357" },
    { label: "Serie A (Italy)", value: "135" },
    { label: "Serie B (Italy)", value: "136" },
    { label: "Coppa Italia (Italy)", value: "137" },
    { label: "Serie C (Italy)", value: "138" },
    { label: "Virsliga (Latvia)", value: "365" },
    { label: "A Lyga (Lithuania)", value: "362" },
    { label: "National Division (Luxembourg)", value: "261" },
    { label: "Super Liga (Moldova)", value: "394" },
    { label: "First League (Montenegro)", value: "355" },
    { label: "Eredivisie (Netherlands)", value: "88" },
    { label: "Eerste Divisie (Netherlands)", value: "89" },
    { label: "KNVB Beker (Netherlands)", value: "90" },
    { label: "Championship (Northern-Ireland)", value: "407" },
    { label: "Premiership (Northern-Ireland)", value: "408" },
    { label: "Eliteserien (Norway)", value: "103" },
    { label: "Ekstraklasa (Poland)", value: "106" },
    { label: "Primeira Liga (Portugal)", value: "94" },
    { label: "Segunda Liga (Portugal)", value: "95" },
    { label: "Taça de Portugal (Portugal)", value: "96" },
    { label: "Liga I (Romania)", value: "283" },
    { label: "Premier League (Russia)", value: "235" },
    { label: "First League (Russia)", value: "236" },
    { label: "Premiership (Scotland)", value: "179" },
    { label: "Championship (Scotland)", value: "180" },
    { label: "FA Cup (Scotland)", value: "181" },
    { label: "Challenge Cup (Scotland)", value: "182" },
    { label: "League One (Scotland)", value: "183" },
    { label: "League Two (Scotland)", value: "184" },
    { label: "Super Liga (Serbia)", value: "286" },
    { label: "Super Liga (Slovakia)", value: "332" },
    { label: "1. SNL (Slovenia)", value: "373" },
    { label: "La Liga (Spain)", value: "140" },
    { label: "Segunda Divisi√≥n (Spain)", value: "141" },
    { label: "Copa del Rey (Spain)", value: "143" },
    { label: "Allsvenskan (Sweden)", value: "113" },
    { label: "Super League (Switzerland)", value: "207" },
    { label: "Süper Lig (Turkey)", value: "203" },
    { label: "Premier League (Wales)", value: "10" }
  ];

  let [range, setRange] = useState({
    start: today(),
    end: today().add({ weeks: 4 })
  });

  const router = useRouter();

  const [leagueArr, setLeagueArr] = useState(["39"]);

  const handleOnchange = (val) => setLeagueArr(val);

  return (
    <div className={styles.optionsPicker}>
      <Grid
        areas={["dateRange leagueSelect", "button button"]}
        columns={["2fr", "2fr"]}
        rows={["auto", "auto"]}
        height="size-1500"
        gap="size-250"
        justifyItems="center"
        margin="50px"
        width="50%"
      >
        <View gridArea="dateRange">
          <DateRangePicker
            label="Trip Dates"
            value={range}
            onChange={setRange}
          />
        </View>
        <View gridArea="leagueSelect">
          <MultiSelect
            label="League Selector"
            className="multi-select"
            onChange={handleOnchange}
            options={options}
            defaultValue="39"
          />
        </View>
        <View gridArea="button">
          <Button
            variant="cta"
            onPress={() => {
              router.push(
                `/?startDate=${range.start.toString()}&endDate=${range.end.toString()}&leagueArr=${leagueArr}`
              );
            }}
          >
            Submit
          </Button>
        </View>
      </Grid>
    </div>
  );
};
