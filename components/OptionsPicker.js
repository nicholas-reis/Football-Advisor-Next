import styles from "../styles/Home.module.css";
import {
    DateRangePicker,
    Button
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
            <div className={styles.selections}>
                <div className={styles.dateRangePicker}>
                    <div>
                        <DateRangePicker
                            label="Date range"
                            value={range}
                            onChange={setRange}
                        />
                    </div>
                    <div>
                        <MultiSelect
                            className="multi-select"
                            onChange={handleOnchange}
                            options={options}
                        />
                    </div>
                    <div className={styles.dateRangePicker}>
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
                    </div>
                </div> 
            </div>
        </>
    )
}



