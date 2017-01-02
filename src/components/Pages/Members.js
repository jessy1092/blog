
import React from 'react';

import ToggleButton from '../../containers/ToggleButton';
import List from '../List';

const Members = ({ getMembers, cleanMembers, members }) => (
	<div>
		<ToggleButton onOpen={getMembers} onClose={cleanMembers} />
		<List items={Object.keys(members).map(key => ({ key, value: members[key].name }))} />
	</div>
);

export default Members;
