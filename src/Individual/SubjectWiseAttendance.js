import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";

class SubjectwiseAttendance extends React.Component {
	state = {
		actInd: false,
	};
	subjects = () => {
		const data = { ...this.props.data };
		return Object.keys(data).map((key) => {
			return (
				<View style={styles.subjectEntries} key={key}>
					<Text style={{ fontSize: 18, fontWeight: "bold", flexGrow: 3, width: "15%" }}>
						{data[key]["name"]}
					</Text>
					<Text style={{ fontSize: 18, fontWeight: "bold", flexGrow: 0.6 }}>
						{data[key]["attended"]} / {data[key]["total"]} <Text style={{ fontSize: 11 }}>CLASSES</Text>
					</Text>
					<Text style={{ fontSize: 18, fontWeight: "bold", flexGrow: 0.1 }}>
						{!isNaN(((data[key]["attended"] / data[key]["total"]) * 100).toFixed(2))
							? ((data[key]["attended"] / data[key]["total"]) * 100).toFixed(2)
							: "00.00"}
						%
					</Text>
				</View>
			);
		});
	};
	render() {
		return (
			<View style={styles.rectangle}>
				<ScrollView persistentScrollbar={true} nestedScrollEnabled={true}>
					{this.subjects()}
				</ScrollView>
				<View style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: 5 }}>
					{this.state.actInd ? <ActivityIndicator color='black' size={28} /> : null}
					<TouchableOpacity
						onPress={() => this.props.navigation.navigate("Update Subjects")}
						style={styles.button}>
						<Text style={{ fontSize: 16, color: "#fff" }}>Update subjects</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => this.props.navigation.navigate("Add Attendance", { ...this.props.data })}
						style={styles.button}>
						<Text style={{ fontSize: 16, color: "#fff" }}>Add Attendance</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

export default SubjectwiseAttendance;

const styles = StyleSheet.create({
	rectangle: {
		width: "93%",
		padding: 15,
		alignSelf: "center",
		elevation: 3,
		backgroundColor: "#fff",
		borderRadius: 10,
		height: 250,
	},
	button: {
		backgroundColor: "black",
		padding: 6,
		borderRadius: 3,
		alignSelf: "flex-end",
		marginLeft: 5,
	},
	subjectEntries: {
		flexDirection: "row",
		paddingVertical: 5,
	},
});
