
import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import expect from 'expect';

import {
	storiesOf,
	action,
	describe,
	it,
	specs,
	snapshot,
} from '../facade';

import ToggleButton from '../../src/containers/ToggleButton';

const stories = storiesOf('ToggleButton', module);

stories.add('with default', () => {
	const toggleButton = (
		<ToggleButton
			onOpen={action('open')}
			onClose={action('close')}
		/>
	);

	specs(() => describe('ToggleButton', () => {
		it('should have default value: Close', () => {
			const component = mount(toggleButton);
			expect(component.text()).toContain('Close');
		});

		it('should become Open after click', () => {
			const component = mount(toggleButton);
			component.find('button').simulate('click');
			expect(component.text()).toContain('Open');
		});
	}));

	// Create custom snapshot testing
	snapshot('should become Open after click', (jestExpect) => {
		const component = renderer.create(toggleButton);

		let tree = component.toJSON();
		jestExpect(tree).toMatchSnapshot();

		// manually trigger the callback
		tree.props.onClick();
		// re-rendering would become Open
		tree = component.toJSON();
		jestExpect(tree).toMatchSnapshot();

		// manually trigger the callback
		tree.props.onClick();
		// re-rendering would become Close
		tree = component.toJSON();
		jestExpect(tree).toMatchSnapshot();
	});

	return toggleButton;
});
