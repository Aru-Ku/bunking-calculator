import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";

class SubjectwiseAttendance extends React.Component {
	subjects = () => {
		return this.props.subjects.map((data) => {
			return (
				<View style={styles.subjectEntries} key={data.name + Math.random()}>
					<Text style={{ fontSize: 18, fontWeight: "bold", flexGrow: 2.9 }}>{data.name}</Text>
					<Text style={{ fontSize: 18, fontWeight: "bold", flexGrow: 0.5 }}>
						{data.count} / {data.totalCount}
					</Text>
					<Text style={{ fontSize: 18, fontWeight: "bold", flexGrow: 0.1 }}>
						{((+data.count / +data.totalCount) * 100).toFixed(2)}%
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
				<ScrollView endFillColor='red' style={{ height: 180, backgoundColor: "#fafafa" }}>
					{this.subjects()}
				</ScrollView>
				<View style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: 5 }}>
					<TouchableOpacity
						onPress={() => this.props.navigation.navigate("Update Subjects", this.props.subjects)}
						style={styles.button}>
						<Text style={{ fontSize: 16, color: "#fff" }}>Update subjects</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => this.props.navigation.navigate("Add Attendance", this.props.subjects)}
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
		...Platform.select({
			android: {
				elevation: 3,
			},
		}),
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
