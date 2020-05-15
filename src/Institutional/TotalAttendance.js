import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ProgressCircle from "react-native-progress-circle";
import { connect } from "react-redux";

function TotalAttendance(props) {
	let percentage = () => {
		let count = 0;
		let total = 0;
		Object.keys(props.attendance).map((key) => {
			count += props.attendance[key]["attended"];
			total += props.attendance[key]["total"];
		});
		return ((count / total) * 100).toFixed(1);
	};
	let percent = percentage();
	let textToDisplay = "";
	if (+percent >= 75 && +percent < 90) {
		textToDisplay = "Keep up the pace 🎉🎉. However you can bunk a few classes today. 😉";
	} else if ((+percent < 75) & (+percent >= 70)) {
		textToDisplay = "You are at the edge of safe zone 🤨, Please go to class to increase the attendance.";
	} else if ((+percent < 70) & (+percent >= 60)) {
		textToDisplay = "Attend the classes 🤨, to be in safe zone";
	} else if (+percent >= 90) {
		textToDisplay = "You are too overloaded with attendance 😲. Over attendance is painful.";
	} else {
		textToDisplay = "OH OH 😓😓 !! You are too low on attendance, please do not bunk the classes.";
	}
	return (
		<View style={{ ...styles.rectangle, flexDirection: "row" }}>
			<View style={{ flex: 1 }}>
				<Text style={styles.lead}>Your Total Attendance:</Text>
				<Text style={{ textAlign: "justify" }}>{textToDisplay}</Text>
			</View>
			<View style={styles.right}>
				<ProgressCircle
					percent={+percent}
					radius={45}
					borderWidth={3}
					color='#000'
					shadowColor='#eee'
					bgColor='#fff'>
					<Text style={{ fontSize: 20 }}>{+percent}%</Text>
				</ProgressCircle>
			</View>
		</View>
	);
}

const mapState = (state) => {
	return {
		attendance: state.ins.attendanceData,
	};
};

export default connect(mapState, null)(TotalAttendance);

const styles = StyleSheet.create({
	rectangle: {
		width: "93%",
		padding: 15,
		alignSelf: "center",
		elevation: 3,
		backgroundColor: "#fff",
		borderRadius: 10,
	},
	lead: {
		paddingVertical: 5,
		fontSize: 20,
		fontWeight: "bold",
	},
	right: {
		flex: 1,
		flexGrow: 0.8,
		justifyContent: "center",
		alignItems: "center",
	},
});
