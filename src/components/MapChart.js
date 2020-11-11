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
import { navigate } from '@reach/router';
import statesArray from '../assests/stateArray';
import Axios from 'axios';

const geoUrl = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';

// const stateColors = {
//   SC: 'blue',
//   CA: 'red',
//   NY: 'green',
// };

// const popularity = {
//   'South Carolina': '1',
//   California: '.6',
//   Texas: '.8',
//   Alaska: '.1',
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

const MapChart = ({ signedIn }) => {
  const [maxActivity, setMaxActivity] = React.useState(undefined);
  const [statesActivity, setStatesActivity] = React.useState([]);
  const [activityObj, setActivityObj] = React.useState({});

  React.useEffect(() => {
    (async function () {
      const token = signedIn.signInUserSession.idToken.jwtToken;
      try {
        const maxResp = await Axios.post(
          'http://localhost:4000/get-max-activity',
          {
            token,
          },
        );
        setMaxActivity(maxResp.data.max);

        const statesActivityResp = await Axios.post(
          'http://localhost:4000/get-state-activity',
          {
            token,
          },
        );
        setStatesActivity(statesActivityResp.data);
        statesActivityResp.data.map((state) => {
          activityObj[state.category] = state.totalActivity;
        });
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  console.log(activityObj);

  // function buildArray(activity) {
  //   ({ geographies }.map((geo) => {
  //     activity.map((state) => {
  //       if (state.category === geo.properties.name) {
  //         activityObj[state.category] = '1';
  //       } else {
  //         activityObj[state.category] = '0';
  //       }
  //     });
  //   }));
  // }

  function onClick(state) {
    console.log('state has been clicked');
    navigate(`/state/${state}`);
    //here can be my logic for opening forum for specific state
  }

  function getOpacity(state) {
    console.log('IN OPACITY FUNCTION');
    return activityObj[state] / maxActivity + 0.1;
  }

  function containsState(stateName) {
    console.log('in contains state', stateName);
    statesActivity.map((state) => {
      console.log(state.category === stateName);
      if (state.category === stateName) return true;
    });
    return false;
  }

  return (
    <ComposableMap
      projection="geoAlbersUsa"
      style={{
        width: '100%',
        height: '50vh',
      }}
      //here is where i can change the map size
    >
      <Geographies geography={geoUrl}>
        {({ geographies }) => (
          <>
            {geographies.map((geo) => (
              <Geography
                onClick={() => onClick(geo.properties.name)}
                // ******i can add oncick here to open forum from the state clicked******
                key={geo.rsmKey}
                stroke="#FFF"
                // onclick can also change this value
                // stroke referes to the border color around the state
                geography={geo}
                // fill="#DDD"
                // fill={
                //   statesArray[geo.properties.name]
                //     ? `rgb(51, 204, 51, ${statesArray[geo.properties.name]})`
                //     : 'grey'
                // }
                fill={
                  activityObj[geo.properties.name]
                    ? `rgb(51, 204, 51, ${getOpacity(geo.properties.name)})`
                    : 'grey'
                }
                //the fill is where the states are colored
                //the fill value can change depending on the popularity of state
                //not too hard just correlate to an array of popularity values
                style={{
                  default: { outline: 'none' },
                  hover: {
                    outline: 'none',
                    fill: 'rebeccapurple',
                    stroke: 'white',
                  },
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
                      <></>
                      //removed annotation
                      // <Annotation
                      //   subject={centroid}
                      //   dx={offsets[cur.id][0]}
                      //   dy={offsets[cur.id][1]}
                      //   fill="lightgray"
                      // >
                      //   <text x={4} fontSize={14} alignmentBaseline="middle">
                      //     {cur.id}
                      //   </text>
                      // </Annotation>
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
