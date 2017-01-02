
import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';

import {
	storiesOf,
	describe,
	it,
	specs,
} from '../facade';

import List from '../../src/components/List';

const items = [{
	key: 1, value: 'Lee',
}, {
	key: 2, value: 'Mike',
}];

const stories = storiesOf('List', module);

stories.add('with items', () => {
	const list = (
		<List items={items} />
	);

	specs(() => describe('List', () => {
		it('should have items property', () => {
			const component = mount(list);
			expect(component.props().items).toEqual(items);
		});
	}));

	return list;
});
