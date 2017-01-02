
import React from 'react';

import style from './index.css';

const ToggleButton = ({ toggle, handleClick }) => (
	<button className={toggle ? style.button : style.buttonReverse} onClick={handleClick}>
		{toggle ? 'Close' : 'Open'}
	</button>
);

export default ToggleButton;
