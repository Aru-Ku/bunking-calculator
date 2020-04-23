import React from "react";
import { View, Text, StyleSheet } from "react-native";

class TimeTableScreen extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<Text>TimeTableScreen</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});

export default TimeTableScreen;
