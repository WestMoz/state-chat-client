//https://www.react-simple-maps.io/examples/usa-with-state-labels/

import React from 'react';
import { geoCentroid } from 'd3-geo';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation,
} from 'react-simple-maps';

import allStates from '../data/allstates.json';

const geoUrl = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';

// const stateColors = {
//   SC: 'blue',
//   CA: 'red',
//   NY: 'green',
// };

const offsets = {
  VT: [50, -8],
  NH: [34, 2],
  MA: [30, -1],
  RI: [28, 2],
  CT: [35, 10],
  NJ: [34, 1],
  DE: [33, 0],
  MD: [47, 10],
  DC: [49, 21],
};

const MapChart = () => {
  function onClick() {
    console.log('state has been clicked');
    //here can be my logic for opening forum for specific state
  }

  return (
    <ComposableMap
      projection="geoAlbersUsa"
      style={{
        width: 'auto',
        height: '100%',
      }}
      //here is where i can change the map size
    >
      <Geographies geography={geoUrl}>
        {({ geographies }) => (
          <>
            {geographies.map((geo) => (
              <Geography
                onClick={() => onClick()}
                // ******i can add oncick here to open forum from the state clicked******
                key={geo.rsmKey}
                stroke="#FFF"
                // onclick can also change this value
                // stroke referes to the border color around the state
                geography={geo}
                // fill="#DDD"
                fill={
                  geo.properties.name === 'North Carolina' ? 'green' : 'grey'
                }
                //the fill is where the states are colored
                //the fill value can change depending on the popularity of state
                //not too hard just correlate to an array of popularity values
                style={{
                  default: { outline: 'none' },
                  hover: { outline: 'none', fill: 'lightblue', stroke: 'blue' },
                  pressed: { outline: 'none', fill: 'green' },
                }}
                //removes outline from clicking on state and i can add interactive styles to clicked states
              />
            ))}
            {geographies.map((geo) => {
              // console.log(geo);
              const centroid = geoCentroid(geo);
              const cur = allStates.find((s) => s.val === geo.id);
              return (
                <g key={geo.rsmKey + '-name'}>
                  {cur &&
                    centroid[0] > -160 &&
                    centroid[0] < -67 &&
                    (Object.keys(offsets).indexOf(cur.id) === -1 ? (
                      <Marker coordinates={centroid}>
                        <text y="2" fontSize={14} textAnchor="middle">
                          {/* {cur.id} */}
                          {/* main state labels */}
                        </text>
                      </Marker>
                    ) : (
                      // <></>
                      <Annotation
                        subject={centroid}
                        dx={offsets[cur.id][0]}
                        dy={offsets[cur.id][1]}
                      >
                        <text x={4} fontSize={14} alignmentBaseline="middle">
                          {cur.id}
                        </text>
                      </Annotation>
                    ))}
                </g>
              );
            })}
          </>
        )}
      </Geographies>
    </ComposableMap>
  );
};

// const styles = {
//   test: {
//     backgroundColor: 'blue',
//   },
// };

export default MapChart;
