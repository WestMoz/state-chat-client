import faker from 'faker';
import _ from 'lodash';
import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import '../../styles/test.css';

const addressDefinitions = faker.definitions.address;
const stateOptions = _.map(addressDefinitions.state, (state, index) => ({
  key: addressDefinitions.state_abbr[index],
  text: state,
  value: state,
}));

const TestDropdown = ({ setCategory }) => (
  <Dropdown
    style={{ backgroundColor: 'black', color: 'white' }}
    placeholder="State"
    search
    selection
    options={stateOptions}
    onChange={(e, data) => {
      // console.log('in on change', data);
      setCategory(data.value);
    }}
  />
);
export default TestDropdown;
