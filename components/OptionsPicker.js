import styles from "../styles/Home.module.css";
import { DateRangePicker, Button, Grid, View } from "@adobe/react-spectrum";
import { useState } from "react";
import { useRouter } from "next/router";
import { today } from "@internationalized/date";
import Select from "react-select";
import makeAnimated from 'react-select/animated';

const customStyles = {
  control: (base, state) => ({
    ...base,
    background: "black",
    borderColor: "#505152",
    boxShadow: state.isFocused ? null : null,
    "&:hover": {
      borderColor: "#696a6b"
    }
  }),
  menu: (base) => ({
    ...base,
    background: "black"
  })
};

export const OptionsPicker = () => {
  const options = [
    { label: "Premier League (England)", value: "39" },
    { label: "La Liga (Spain)", value: "140" },
    { label: "Bundesliga (Germany)", value: "78" },
    { label: "Ligue 1 (France)", value: "61" },
    { label: "Serie A (Italy)", value: "135" },
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
  ];

  let [range, setRange] = useState({
    start: today(),
    end: today().add({ weeks: 2 })
  });

  const router = useRouter();

  const [leagueArr, setLeagueArr] = useState(["39"]);

  const handleOnchange = (val) => {
    let arr = [];
    val.map((obj) => {
      arr.push(obj.value);
    })
    setLeagueArr(arr);
  }

  const animatedComponents = makeAnimated();

  return (
    <div className={styles.optionsPicker}>
      <Grid
        areas={["dateRange leagueSelect", "button button"]}
        columns={["1fr", "1fr"]}
        rows={["auto", "auto"]}
        height="size-1500"
        gap="size-250"
        justifyItems="center"
        margin="50px"
        width="90%"
      >
        <View gridArea="dateRange">
          <DateRangePicker
            label="Trip Dates"
            value={range}
            onChange={setRange}
          />
        </View>
        <View gridArea="leagueSelect" width="70%">
          <Select 
            options={options}
            isMulti
            onChange={handleOnchange}
            className="basic-multi-select"
            classNamePrefix="select"
            components={animatedComponents}
            closeMenuOnSelect={false}
            styles={customStyles}
          />
        </View>
        <View gridArea="button">
          <Button
            variant="primary"
            width="200px"
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
