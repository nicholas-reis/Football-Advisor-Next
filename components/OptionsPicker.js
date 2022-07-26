import styles from "../styles/Home.module.css";
import {
    DateRangePicker,
    Button
  } from "@adobe/react-spectrum";

export const OptionsPicker = ({range, setRange, router}) => {
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
                    <div className={styles.dateRangePicker}>
                        <Button
                            variant="cta"
                            onPress={() => {
                            router.push(
                                `/?startDate=${range.start.toString()}&endDate=${range.end.toString()}`
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



