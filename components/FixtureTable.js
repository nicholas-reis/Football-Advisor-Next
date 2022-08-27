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
import styles from "../styles/Home.module.css";

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

export const FixtureTable = ( { footballData, venueData } ) => {
    let columns = [
      { name: '', uid: 'homelogo', width: "5%", align: "center" },
      { name: 'Home Team', uid: 'hometeam', width: "10%", align: "center" },
      { name: '', uid: 'vs', width: "5%", align: "center" },
      { name: 'Away Team', uid: 'awayteam', width: "10%", align: "center" },
      { name: '', uid: 'awaylogo', width: "5%", align: "center" },
      { name: 'Date', uid: 'date', width: "17%", align: "center" },
      { name: 'Venue', uid: 'venue', width: "25%", align: "center" },
      { name: '', uid: 'leaguelogo', width: "5%", align: "center" },
      { name: 'League', uid: 'leaguename', width: "15%", align: "center" }
    ];

    let rows = [];
    for (let i = 0; i < footballData.length; i++) {
      rows.push({ 
        id: i,
        homelogo: footballData[i].teams.home.logo,
        hometeam: footballData[i].teams.home.name,
        vs: "vs",
        awayteam: footballData[i].teams.away.name,
        awaylogo: footballData[i].teams.away.logo,
        date: new Date(footballData[i].fixture.date).toLocaleString("en-GB", {
          dateStyle: "full",
          timeStyle: "short",
          timeZone: timeZones[footballData[i].league.country] || "UTC"
        }),
        venue: footballData[i].fixture.venue.name + ` (${footballData[i].fixture.venue.city})`,
        leaguelogo: footballData[i].league.logo,
        leaguename: footballData[i].league.name + ` (${footballData[i].league.country})`
      });
    }

    let [selectedKeys, setSelectedKeys] = useState(new Set([]));
    let [disabledFixtures, setDisabledFixtures] = useState(new Set([]));

    const obj = {1: [3, 4, 5], 2: [6, 7, 8]}; // Replace with calculated disabled games
    let venues = JSON.parse(venueData);

    useEffect(() => {
      let disabledSet = new Set([]);
      //console.log(selectedKeys);
      for (const selectedFixture of selectedKeys) {
        disabledSet = disableFixtures(footballData, selectedFixture, venues, disabledSet);
      }
      setDisabledFixtures(disabledSet);
    }, [selectedKeys]);
  
    return (
      <TableView
        aria-label="Table with controlled selection"
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        density="spacious"
        disabledKeys={disabledFixtures}
        height="size-6000"
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
                  layout="fixed"
                  height="45"
                  width="45"
                  alt="league logo"
                /> 
                : item[columnKey]  }</Cell>}
            </Row>
          )}
        </TableBody>
      </TableView>
    );
  }