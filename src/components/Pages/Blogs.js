
import React from 'react';

import ToggleButton from '../../containers/ToggleButton';
import List from '../List';

const Blogs = ({ getBlogs, cleanBlogs, posts }) => (
	<div>
		<ToggleButton onOpen={getBlogs} onClose={cleanBlogs} />
		<List items={posts.map(post => ({ key: post.pID, value: post.title }))} />
	</div>
);

export default Blogs;
