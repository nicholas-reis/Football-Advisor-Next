import { React, useEffect, useState } from "react";
import { Button, Cell, Column, Flex, Form, Grid, Heading, Item, Link, Row, StatusLight, Tabs, TabPanels, TabList, TableView, TableHeader, TableBody, TextField, Well, defaultTheme, Provider } from '@adobe/react-spectrum';


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
        {name: 'Match date', uid: 'date'},
        {name: 'Home team', uid: 'homeTeam'},
        {name: 'Away team', uid: 'awayTeam'},
        {name: 'Stadium', uid: 'venueName'},
        {name: 'City', uid: 'venueCity'},
        {name: 'League', uid: 'leagueName'},
    ];

    let rows = [];
    for (let i =0; i < contents.length; i++) {
        let fixture = contents[i];
        console.log(fixture);
        let fixtureObj = {};
        fixtureObj.id = i;
        fixtureObj.fixture = fixture.fixture;
        fixtureObj.date = new Date(fixture.date).toLocaleString(navigator.language, { dateStyle: 'full', timeStyle: 'medium'});
        fixtureObj.homeTeam = fixture.homeTeam;
        fixtureObj.awayTeam = fixture.awayTeam;
        fixtureObj.venueName = fixture.venueName;
        fixtureObj.venueCity = fixture.venueCity + ' (' + fixture.country + ')';
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
                            align='start'>
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
