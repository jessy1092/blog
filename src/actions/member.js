
import { createAction } from 'redux-actions';

export const getMembers = createAction('GET_MEMBERS', () => (
	fetch(
		'http://lab.25sprout.com/avatar/apo/25sproutMember.php', { method: 'GET' },
	).then(
		res => res.json(),
		() => ({ staffs: '' }),
	)
));

export const cleanMembers = createAction('CLEAN_MEMBERS');
