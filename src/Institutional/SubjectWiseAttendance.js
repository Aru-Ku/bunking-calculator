import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { connect } from "react-redux";

class SubjectwiseAttendance extends React.Component {
	subjects = () => {
		let data = { ...this.props.attendance };
		return Object.keys(data).map((key) => {
			return (
				<View style={styles.subjectEntries} key={key}>
					<Text style={{ fontSize: 18, fontWeight: "bold", flexGrow: 2.9, width: "15%" }}>{key}</Text>
					<Text style={{ fontSize: 18, fontWeight: "bold", flexGrow: 0.6 }}>
						{/* {data.count} / {data.totalCount} */}
						{data[key]["attended"]} / {data[key]["total"]}
					</Text>
					<Text style={{ fontSize: 18, fontWeight: "bold", flexGrow: 0.1 }}>
						{((data[key]["attended"] / data[key]["total"]) * 100).toFixed(2)}%
					</Text>
				</View>
			);
		});
	};
	render() {
		return (
			<View style={styles.rectangle}>
				<View style={styles.heading}>
					<Text style={{ fontSize: 10, flexGrow: 5 }}>SUBJECTS</Text>
					<Text style={{ fontSize: 10, flexGrow: 0.9 }}>CLASSES</Text>
					<Text style={{ fontSize: 10, flexGrow: 0.1 }}>PERCENTAGE</Text>
				</View>
				<ScrollView nestedScrollEnabled={true} style={{ backgoundColor: "#fafafa" }}>
					{this.subjects()}
				</ScrollView>
			</View>
		);
	}
}

const mapState = (state) => {
	return {
		attendance: state.ins.attendanceData,
	};
};

export default connect(mapState, null)(SubjectwiseAttendance);

const styles = StyleSheet.create({
	rectangle: {
		width: "93%",
		padding: 15,
		alignSelf: "center",
		elevation: 3,
		backgroundColor: "#fff",
		borderRadius: 10,
	},
	button: {
		backgroundColor: "black",
		padding: 6,
		borderRadius: 3,
		alignSelf: "flex-end",
		marginLeft: 5,
	},
	heading: {
		flexDirection: "row",
		justifyContent: "flex-start",
		alignContent: "center",
	},
	subjectEntries: {
		flexDirection: "row",
		paddingVertical: 5,
	},
});
