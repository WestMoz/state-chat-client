//https://www.react-simple-maps.io/examples/usa-with-state-labels/
//https://dkum2vv7yc.execute-api.us-east-1.amazonaws.com/dev/

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
import Axios from 'axios';

const geoUrl = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';

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
        const maxResp = await Axios.get(
          'https://dkum2vv7yc.execute-api.us-east-1.amazonaws.com/dev/get-max-activity',
        );
        setMaxActivity(maxResp.data.max);

        const statesActivityResp = await Axios.get(
          'https://dkum2vv7yc.execute-api.us-east-1.amazonaws.com/dev/get-state-activity',
        );
        setStatesActivity(statesActivityResp.data);
        const tempActivity = {};
        statesActivityResp.data.map((state) => {
          tempActivity[state.category] = state.totalActivity;
        });
        setActivityObj({ ...tempActivity });
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

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
                key={geo.rsmKey}
                stroke="#FFF"
                geography={geo}
                fill={
                  activityObj[geo.properties.name]
                    ? `rgb(51, 204, 51, ${getOpacity(geo.properties.name)})`
                    : 'grey'
                }
                style={{
                  default: { outline: 'none' },
                  hover: {
                    outline: 'none',
                    fill: 'rebeccapurple',
                    stroke: 'white',
                  },
                  pressed: { outline: 'none', fill: 'green' },
                }}
              />
            ))}
            {geographies.map((geo) => {
              const centroid = geoCentroid(geo);
              const cur = allStates.find((s) => s.val === geo.id);
              return (
                <g key={geo.rsmKey + '-name'}>
                  {cur &&
                    centroid[0] > -160 &&
                    centroid[0] < -67 &&
                    (Object.keys(offsets).indexOf(cur.id) === -1 ? (
                      <Marker coordinates={centroid}>
                        <text y="2" fontSize={14} textAnchor="middle"></text>
                      </Marker>
                    ) : (
                      <></>
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

export default MapChart;
