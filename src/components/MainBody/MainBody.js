import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import theme from "../../theme";


// Contains everything that isn't the side bar. 
export default function MainBody(props) {

	return (<div className='mainbody'>

		<div className='banner'>Links for the vod goblin pile</div>
		<div className="imgurLinksIntro">
			Imgur albums that the machine spirit is pretty sure contain picutres of tiny toys.
		</div>
		{
			// this bit maps all the imgur links into the expanding cards
			// lot of messy trying to get MUI stuff to work propperly
			props.links.filter(item => item.type == "imgur").map((item, i) => {
				return (
					<Accordion key={i} sx={{
						bgcolor: theme.dark,
						padding: "0.5em",
						margin: "0.5em",
						color: theme.highlight
					}}>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel1bh-content"
							id="panel1bh-header"
						>
							This album contains &nbsp;<a href={item.albumLink} target="_blank"> {item.title}</a>
						</AccordionSummary>
						<AccordionDetails>
							{buildImages(item.images)}
						</AccordionDetails>
					</Accordion>)
			})
		}
		<Divider />
		<div className="unknownLinksIntro">
			Gobbos is not very good at reading, so these might not be pictures of tiny toys, but are links that were posted during the stream.
		</div>
		<List sx={{ color: theme.link }}>
			{props.links.filter(item => item.type != "imgur")
				.map((item, i) => {
					// adding this bitly expander stuff because you shouldn't click random bitlys 
					const isBitly = item.albumLink.indexOf("bit.ly") > -1;
					const bitlyExpander = isBitly ? "+" : "";
					const bitlyExplainer = isBitly ? "(This link will take you to bitly so you can see where it goes.)" : "";
					return (
						<ListItem button key={i} onClick={() => openInNewTab(`${item.albumLink}${bitlyExpander}`)}>
							<div className={"fakeLink"}>{item.albumLink}{bitlyExpander}&nbsp;{bitlyExplainer}</div>
						</ListItem>
					)
				})}
		</List>
		<div className="footer">This site is pretty rough and ready, source code will be available on my(cob50nm) github soon™ if anyone wants to make it look good</div>
	</div >)
}

function openInNewTab(link) {
	window.open(link, '_blank').focus();
}

// takes an array of image links and turns it into a "gallery"
function buildImages(images) {
	return (<div>
		{images.map((image, index) => {
			return (<div key={index}>
				<div>{image.title}</div>
				<img src={image.link} style={{ padding: "0.25em", width: "50vw" }} />
				<div>{image.description}</div>
			</div>)
		})}
	</div>)
}