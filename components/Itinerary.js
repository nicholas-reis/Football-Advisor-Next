import { React } from "react";
import { Cell, Column, Row, TableView, TableHeader, TableBody } from '@adobe/react-spectrum';
import { timeZones } from "./utils.js";


export const Itinerary = ( { selectedFixtures } ) => {
    let contents = [];
    for (const selectedFixture of selectedFixtures) {
        let selectedFeaturesObj = {};
        selectedFeaturesObj.date = selectedFixture.fixture.date;
        selectedFeaturesObj.homeTeam = selectedFixture.teams.home.name;
        selectedFeaturesObj.awayTeam = selectedFixture.teams.away.name
        selectedFeaturesObj.venueName = selectedFixture.fixture.venue.name;
        selectedFeaturesObj.venueCity = selectedFixture.fixture.venue.city;
        selectedFeaturesObj.country = selectedFixture.league.country;
        selectedFeaturesObj.leagueName = selectedFixture.league.name;
        selectedFeaturesObj.leagueRound = selectedFixture.league.round;
        contents.push(selectedFeaturesObj);
    }

    let columns = [
        {name: 'Date (local time)', uid: 'date', width: "15%", align: "start"},
        {name: 'Home team', uid: 'homeTeam', width: "12.5%", align: "start"},
        {name: 'Away team', uid: 'awayTeam', width: "12.5%", align: "start"},
        {name: 'Stadium', uid: 'venueName', width: "40%", align: "start"},
        {name: 'League', uid: 'leagueName', width: "20%", align: "start"},
    ];

    let rows = [];
    for (let i =0; i < contents.length; i++) {
        let fixture = contents[i];
        console.log(fixture);
        let fixtureObj = {};
        fixtureObj.id = i;
        fixtureObj.fixture = fixture.fixture;
        fixtureObj.date = new Date(fixture.date).toLocaleString(navigator.language, {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            //timeZoneName: 'short',
            timeZone: timeZones[fixture.country] || "UTC"
          });
        fixtureObj.homeTeam = fixture.homeTeam;
        fixtureObj.awayTeam = fixture.awayTeam;
        fixtureObj.venueName = fixture.venueName + ' ' + fixture.venueCity + ' (' + fixture.country + ')';
        fixtureObj.leagueName = fixture.leagueName + ' - ' + fixture.leagueRound;
        rows.push(fixtureObj);
    }

    return (
        <>
            <TableView
                flex
                aria-label="Reports table"
                overflowMode="wrap"
                density="compact">
                <TableHeader columns={columns}>
                    {column => (
                        <Column
                            key={column.uid}
                            align={column.align}
                            width={column.width}>
                            {column.name}
                        </Column>
                    )}
                </TableHeader>

                <TableBody items={rows}>
                    {item => (
                        <Row>
                            {columnKey => <Cell>{item[columnKey]}</Cell>}
                        </Row>
                    )}
                </TableBody>
            </TableView>
        </>
    )
};
