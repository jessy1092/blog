
import React from 'react';

import Navigation from './Navigation';

const App = ({ children }) => (
	<div>
		<Navigation />
		{children}
	</div>
);

export default App;
