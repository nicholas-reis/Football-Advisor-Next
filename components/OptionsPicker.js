import styles from "../styles/Home.module.css";
import {
    DateRangePicker,
    Button,
    Grid,
    View
  } from "@adobe/react-spectrum";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";
import { useState } from "react";
import { useRouter } from "next/router";
import { today } from "@internationalized/date";

export const OptionsPicker = () => {
    const options = [
        { label: "Premier League", value: "39" },
        { label: "Championship", value: "40" },
        { label: "League 1", value: "41" },
        { label: "League 2", value: "42" }
    ];

    let [range, setRange] = useState({
        start: today(),
        end: today().add({ weeks: 4 })
      });
    
    const router = useRouter();
    
    const [leagueArr, setLeagueArr] = useState(["39"]);

    const handleOnchange = (val) => setLeagueArr(val);

    return (
        <>
            <Grid
                areas={[
                    'dateRange leagueSelect',
                    'button button'
                ]}
                columns={['2fr', '2fr']}
                rows={['auto', 'auto']}
                height="size-1500"
                gap="size-250"
                justifyItems="center"
                margin="50px">
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
                        defaultValue = '39'
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
        </>
    )
}



