
// test data function that mimics the firestore instance without giving people access to the firestore credentials
const getTestDates = () => {
	return new Promise((res, rej) => {
		res([{ date: "2022-02-16" }, { date: "2022-02-23" }]);
	})
}

export default getTestDates;