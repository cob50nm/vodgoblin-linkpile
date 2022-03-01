import * as React from 'react';

import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import theme from "../../theme";



export default function SideBar(props) {

	function handleClick(e) {
		props.setFunc(e.target.innerHTML);
	}

	return (
		<div className='sidebar'>
			<List sx={{ bgcolor: theme.dark }}>
				<ListItem >
					<div className="streamDateHeader">Stream Dates</div>
				</ListItem>
				<Divider />
				{props.dates.map((text, index) => (
					<>
						<ListItem button key={index} onClick={handleClick}>
							<div className="streamDate">{text}</div>
						</ListItem>
						<Divider />
					</>
				))}
			</List>
			<Divider />
		</div >

	);
}