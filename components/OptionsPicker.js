import styles from "../styles/Home.module.css";
import { DateRangePicker, Button, Grid, View } from "@adobe/react-spectrum";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { today, parseDate } from "@internationalized/date";
import Select from "react-select";
import makeAnimated from 'react-select/animated';
import { leagueOptions } from "./utils";

const customStyles = {
  control: (base, state) => ({
    ...base,
    background: "white",
    borderColor: "#505152",
    boxShadow: state.isFocused ? null : null,
    "&:hover": {
      borderColor: "#696a6b"
    }
  }),
  menu: (base) => ({
    ...base,
    background: "white"
  })
};

export const OptionsPicker = ( { startDateIn, endDateIn, leagueArrIn, selectedMatchesArr, setProgressMsg } ) => {
  const [startDate, setStartDate] = useState(startDateIn);
  const [endDate, setEndDate] = useState(endDateIn);
  const [leagueArr, setLeagueArr] = useState(leagueArrIn);
  const [range, setRange] = useState({
    start: parseDate(startDateIn),
    end:  parseDate(endDateIn)
  });

  const router = useRouter();
  const animatedComponents = makeAnimated();

  const handleOnChange = (val) => {
    let arr = [];
    val.map((obj) => {
      arr.push(obj.value);
    })
    setLeagueArr(arr);
  }

  /*
  useEffect( () => {
    let startDate = range.start;
    let endDate = range.end;
    router.push(
      `/?startDate=${startDate}&endDate=${endDate}&leagueArr=${leagueArr}`
    );
  }, [ range, leagueArr ]);
  */

  return (
    <div className={styles.optionsPicker}>
      <Grid
        areas={["dateRange leagueSelect retrieveMatches"]}
        columns={["1fr","5fr", "1fr"]}
        height='10vh'
        gap="size-250"
        justifyItems="left"
        margin="20px"
        width="90%"
      >
        <View gridArea="dateRange">
          <DateRangePicker
            value={range}
            onChange={setRange}
          />
        </View>

        <View gridArea="leagueSelect" width="100%">
          <Select 
            options={leagueOptions}
            isMulti
            onChange={handleOnChange}
            defaultValue={ selectedMatchesArr }
            className="basic-multi-select"
            classNamePrefix="select"
            components={animatedComponents}
            closeMenuOnSelect={false}
            styles={customStyles}
          />
        </View>


        <View gridArea="retrieveMatches">
          <div className={styles.retrieveMatches}>
            <Button
              variant="primary"
              width="200px"
              onPress={() => {
                // setProgressMsg('Retrieving match data...');
                router.push(
                  `/?startDate=${range.start.toString()}&endDate=${range.end.toString()}&leagueArr=${leagueArr}`
                );
              }}
            >
              Submit
            </Button>
          </div>
        </View>

      </Grid>
    </div>
  );
};
