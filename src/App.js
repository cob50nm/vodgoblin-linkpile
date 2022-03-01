import { useState, useEffect } from 'react';
import './App.css';
import MainBody from './components/MainBody/MainBody';
import SideBar from './components/sideBar/SideBar';

import Dayjs from 'dayjs';

import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, collectionGroup } from 'firebase/firestore/lite';
import firebaseConfig from './secrets';
import getTestDates from './testData/datesData';
import getTestLinks from './testData/linksData';


// Set this to true to use test data
const IS_DEV = false;


function App() {

	const [linkData, setLinkData] = useState([]);
	const [dateList, setDateList] = useState([])


	// Initialize Firebase
	const firebaseLink = IS_DEV ? null : initializeApp(firebaseConfig);
	const firestore = IS_DEV ? null : getFirestore(firebaseLink);


	// use as on load
	useEffect(() => {
		if (IS_DEV) {
			getTestDates()
				.then(data => {
					const sortedList = data.map(datum => datum.date).sort((a, b) => Dayjs(a, "YYYY-MM-DD").isAfter(Dayjs(b, "YYYY-MM-DD")) ? -1 : 1)
					setDateList(sortedList);
					getTestLinks(sortedList[0])
						.then(links => setLinkData(links));
				})
		} else {
			getDates()
				.then(data => {
					const sortedList = data.map(datum => datum.date).sort((a, b) => Dayjs(a, "YYYY-MM-DD").isAfter(Dayjs(b, "YYYY-MM-DD")) ? -1 : 1)
					setDateList(sortedList);
					getLinks(sortedList[0])
						.then(links => setLinkData(links));
				})
		}
	}, []);

	async function getDates() {
		const linksCollection = collectionGroup(firestore, "dates");
		const docs = await getDocs(linksCollection);
		const list = docs.docs.map(doc => doc.data());;
		return list;
	}

	async function getLinks(date) {
		const linksCollection = collectionGroup(firestore, date);
		const docs = await getDocs(linksCollection);
		const list = docs.docs.map(doc => doc.data());;
		return list;
	}

	function pickDate(date) {
		if (IS_DEV) {
			getTestLinks(date)
				.then(data => {
					setLinkData(data);
				})
		} else {
			getLinks(date)
				.then(data => {
					setLinkData(data);
				})
		}

	}

	return (
		<div className="App">
			<div className="content">
				<SideBar dates={dateList} setFunc={pickDate} />
				<MainBody links={linkData} />
			</div>
		</div>
	);
}

export default App;
