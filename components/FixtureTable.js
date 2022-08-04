import { React, useState } from "react";
import { useAsyncList, useCollator } from '@adobe/react-spectrum';
import {
    SSRProvider,
    Provider,
    defaultTheme,
    Grid,
    View,
    repeat,
    TableHeader,
    TableView,
    TableBody,
    Column,
    Row,
    Cell,
    ListBox
  } from "@adobe/react-spectrum";
import { timeZones } from "../pages/utils.js";

export const FixtureTable = ( {footballData} ) => {
    let columns = [
      { name: '', uid: 'homelogo', width: "5%", align: "center" },
      { name: 'Home Team', uid: 'hometeam', width: "10%", align: "center" },
      { name: '', uid: 'vs', width: "5%", align: "center" },
      { name: 'Away Team', uid: 'awayteam', width: "10%", align: "center" },
      { name: '', uid: 'awaylogo', width: "5%", align: "center" },
      { name: 'Date', uid: 'date', width: "15%", align: "center" },
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
  
    return (
      <TableView
        aria-label="Table with controlled selection"
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        density="spacious"
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
            <Row>
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