import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";

function ClassesSummary(props) {
	let [totalClasses, totalBunked, totalAttended] = [0, 0, 0];
	Object.keys(props.attendance).map((key) => {
		totalAttended += props.attendance[key]["attended"];
		totalClasses += props.attendance[key]["total"];
	});
	totalBunked = totalClasses - totalAttended;
	return (
		<View style={styles.rectangle}>
			<View style={styles.line1}>
				<Text style={styles.headText}>TOTAL NUMBER OF CLASSES</Text>
				<Text style={styles.headTextCount}>{totalClasses}</Text>
			</View>
			<View style={{ flexDirection: "row", justifyContent: "space-around" }}>
				<View style={styles.lines}>
					<Text style={styles.headText}>BUNKED</Text>
					<Text style={styles.headTextCount}>{totalBunked}</Text>
				</View>
				<View style={styles.lines}>
					<Text style={styles.headText}>ATTENDED</Text>
					<Text style={styles.headTextCount}>{totalAttended}</Text>
				</View>
			</View>
		</View>
	);
}

const mapState = (state) => {
	return {
		attendance: state.ins.attendanceData,
	};
};

export default connect(mapState, null)(ClassesSummary);

const styles = StyleSheet.create({
	rectangle: {
		width: "93%",
		padding: 15,
		alignSelf: "center",
		elevation: 3,
		backgroundColor: "#fff",
		borderRadius: 10,
		marginVertical: 10,
	},
	line1: {
		marginBottom: 8,
		alignSelf: "center",
		flexDirection: "column",
		alignItems: "center",
	},
	headText: {
		fontSize: 16,
	},
	headTextCount: {
		fontSize: 26,
		fontWeight: "bold",
		paddingHorizontal: 5,
	},
	lines: {
		alignItems: "center",
	},
});
