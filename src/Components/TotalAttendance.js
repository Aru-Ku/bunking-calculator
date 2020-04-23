import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ProgressCircle from "react-native-progress-circle";

function TotalAttendance(props) {
	let percentage = () => {
		let count = 0;
		let percent = 0;
		props.subjects.map((each) => {
			count++;
			percent += (each.count / each.totalCount) * 100;
		});
		return (percent / count).toFixed(1);
	};
	let percent = percentage();
	return (
		<View style={{ ...styles.rectangle, flexDirection: "row" }}>
			<View style={{ flex: 1 }}>
				<Text style={styles.lead}>Your Total Attendance:</Text>
				<Text>
					You are at the edge of safe zone, Please go to class to increase and
					increase the attendance
				</Text>
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

export default TotalAttendance;

const styles = StyleSheet.create({
	rectangle: {
		width: "93%",
		padding: 15,
		alignSelf: "center",
		...Platform.select({
			android: {
				elevation: 3,
			},
		}),
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
		flexGrow: 0.6,
		justifyContent: "center",
		alignItems: "center",
	},
});
