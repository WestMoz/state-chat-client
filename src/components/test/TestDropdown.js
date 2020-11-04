import faker from 'faker';
import _ from 'lodash';
import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import '../../styles/test.css';

const addressDefinitions = faker.definitions.address;
const stateOptions = _.map(addressDefinitions.state, (state, index) => ({
  key: addressDefinitions.state_abbr[index],
  text: state,
  value: addressDefinitions.state_abbr[index],
}));

const TestDropdown = ({ setCategory }) => (
  <Dropdown
    style={{ backgroundColor: 'black', color: 'white' }}
    placeholder="State"
    search
    selection
    options={stateOptions}
    onChange={(e) => setCategory(e.target.textContext)}
  />
);
export default TestDropdown;
