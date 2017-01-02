
import { contain } from 'react-container-helper';

import ToggleButton from '../components/ToggleButton';

const initState = () => ({
	toggle: true,
});

const mapStateToProps = ({ toggle }) => ({
	toggle,
});

const mapSetStateToProps = (setState, { toggle }, { onOpen, onClose }) => ({
	handleClick() {
		if (toggle) {
			onClose();
		} else {
			onOpen();
		}
		setState({ toggle: !toggle });
	},
});

export default contain(initState, mapStateToProps, mapSetStateToProps)(ToggleButton);
