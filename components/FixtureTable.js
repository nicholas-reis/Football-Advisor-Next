import { React, useEffect, useState } from "react";
import {
    TableHeader,
    TableView,
    TableBody,
    Column,
    Row,
    Cell
  } from "@adobe/react-spectrum";
import { timeZones } from "./utils.js";

const isWatchable = (fixture1, fixture2, driveTimeSeconds) => {
  let buffer = 2.5 * 3600 * 1000;
  let delta = (driveTimeSeconds * 1000) + buffer;
  let fixture1Date = new Date(fixture1.fixture.date);
  let fixture2Date = new Date(fixture2.fixture.date);
  if (Math.abs(fixture1Date.getTime() - fixture2Date.getTime()) >= delta)
    return true;
  return false;
}

const getVenueObj = (selectedVenueId, venueData) => {
  for (let i = 0; i < venueData.length; i++) {
    if (venueData[i].id === selectedVenueId) {
      return venueData[i];
    }
  }
}

const disableFixtures = (fixtureArray, selectedFixtureIndex, venueData, disabledSet) => {
  let selectedVenueId = fixtureArray[selectedFixtureIndex].fixture.venue.id;
  let selectedVenueObj = getVenueObj(selectedVenueId, venueData);

  for (let i = 0; i < fixtureArray.length; i++) {
    if (i !== selectedFixtureIndex) {
      for (let j = 0; j < selectedVenueObj.directions.length; j++) {
        if (selectedVenueObj.directions[j] !== null) {
          if (fixtureArray[i].fixture.venue.id === selectedVenueObj.directions[j].destinationVenueId) {
            if ((isWatchable(fixtureArray[i], fixtureArray[selectedFixtureIndex], selectedVenueObj.directions[j].drive.time)) === false) {
              disabledSet = disabledSet.add(i);
            }
          }
        }
      }
    }
  }
  return disabledSet;
}

export const FixtureTable = ( { footballData, venueData, setSelectedFixtures, selectedKeys, setSelectedKeys } ) => {
    let columns = [
      { name: '', uid: 'homelogo', width: "4%", align: "center" },
      { name: 'Home Team', uid: 'hometeam', width: "13.5%", align: "start" },
      { name: 'Away Team', uid: 'awayteam', width: "13.5%", align: "start" },
      { name: '', uid: 'awaylogo', width: "4%", align: "center" },
      { name: 'Date (local time)', uid: 'date', width: "17%", align: "start" },
      { name: 'Stadium', uid: 'venue', width: "32%", align: "start" },
      { name: '', uid: 'leaguelogo', width: "4%", align: "center" },
      { name: 'League', uid: 'leaguename', width: "12%", align: "start" }
    ];

    let rows = [];
    for (let i = 0; i < footballData.length; i++) {
      rows.push({ 
        id: i,
        homelogo: footballData[i].teams.home.logo,
        hometeam: footballData[i].teams.home.name,
        awayteam: footballData[i].teams.away.name,
        awaylogo: footballData[i].teams.away.logo,
        date: new Date(footballData[i].fixture.date).toLocaleString(navigator.language, {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          //timeZoneName: 'short',
          timeZone: timeZones[footballData[i].league.country] || "UTC"
        }),
        venue: footballData[i].fixture.venue.name + ` (${footballData[i].fixture.venue.city}, ${footballData[i].league.country})`,
        leaguelogo: footballData[i].league.logo,
        leaguename: footballData[i].league.name
      });
    }

    let [disabledFixtures, setDisabledFixtures] = useState(new Set([]));

    const obj = {1: [3, 4, 5], 2: [6, 7, 8]}; // Replace with calculated disabled games
    let venues = JSON.parse(venueData);

    useEffect(() => {
      let disabledSet = new Set([]);
      let selectedFeatures = [];
      for (const selectedFixture of selectedKeys) {
        disabledSet = disableFixtures(footballData, selectedFixture, venues, disabledSet);
        selectedFeatures.push(footballData[selectedFixture]);
      }
      setSelectedFixtures(selectedFeatures);
      setDisabledFixtures(disabledSet);
    }, [selectedKeys]);
  
    return (
      <TableView
        aria-label="Table with controlled selection"
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        density="compact"
        overflowMode="wrap"
        disabledKeys={disabledFixtures}
        height='70vh'
        // onAction can be used to take the user to fixture-specific pages
        // onAction={(key) => alert(`Opening item ${key}...`)}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <Column
              key={column.uid}
              align={column.align}
              width={column.width}
            >
              {column.name}
            </Column>
          )}
        </TableHeader>
        <TableBody items={rows}>
          {(item) => (
            <Row >
              {(columnKey) => <Cell>{  
                columnKey === 'homelogo' || columnKey === 'awaylogo' || columnKey === 'leaguelogo' ?
                <img
                  src={item[columnKey]}
                  height="25"
                  width="25"
                  alt="league logo"
                /> 
                : item[columnKey]  }</Cell>}
            </Row>
          )}
        </TableBody>
      </TableView>
    );
  }