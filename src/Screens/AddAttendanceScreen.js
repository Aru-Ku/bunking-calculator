import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator } from "react-native";

class AddScreen extends React.Component {
	state = {
		subjectData: [
			{
				name: "subject1",
				count: 12,
				totalCount: 60,
			},
			{
				name: "subject2",
				count: 45,
				totalCount: 60,
			},
			{
				name: "subject3",
				count: 45,
				totalCount: 60,
			},
		],
		isActivityIndicator: false,
	};

	bunked = (event, name, data) => {
		data.map((eachSub) => {
			if (eachSub.name === name) {
				eachSub.totalCount += +event.nativeEvent.text;
			}
		});
		console.log(this.state.subjectData);
	};

	attended = (event, name, data) => {
		this.state.subjectData.map((eachSub) => {
			if (eachSub.name === name) {
				eachSub.count += +event.nativeEvent.text;
				eachSub.totalCount += +event.nativeEvent.text;
			}
		});
		console.log(this.state.subjectData);
	};

	updateAttendance = () => {
		this.setState({ isActivityIndicator: true });
		// this.props.navigation.setParams(this.state.subjectData);
		// this.props.navigation.goBack();
	}; // Add data submission method

	showSubjects = () => {
		let subjects = this.state.subjectData;
		return subjects.map((data) => {
			return (
				<View key={data.name}>
					<View style={styles.subjectEntries}>
						<Text style={{ fontSize: 18, fontWeight: "bold", flexGrow: 5 }}>{data.name}</Text>
					</View>
					<View style={styles.box}>
						<Text style={styles.addText}>No. of classes:</Text>
						<TextInput
							style={styles.addTextInput}
							placeholder='Attended'
							keyboardType='numeric'
							returnKeyType='done'
							onChange={(event) => this.attended(event, data.name, subjects)}
						/>
						<TextInput
							style={styles.addTextInput}
							placeholder='Bunked'
							keyboardType='numeric'
							returnKeyType='done'
							onChange={(event) => this.bunked(event, data.name, subjects)}
						/>
					</View>
					<View style={styles.line} />
				</View>
			);
		});
	};
	render() {
		console.log(this.state.subjectData);
		return (
			<View style={styles.container}>
				<View style={styles.line} />
				{this.showSubjects()}
				<TouchableOpacity
					onPress={() => this.updateAttendance()}
					style={this.state.isActivityIndicator ? null : styles.button}
					disabled={this.state.isActivityIndicator}>
					{this.state.isActivityIndicator ? (
						<ActivityIndicator color='black' size={25} />
					) : (
						<Text style={styles.buttonText}>SUBMIT</Text>
					)}
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		padding: 25,
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
	button: {
		backgroundColor: "black",
		padding: 8,
		flexDirection: "row",
		borderRadius: 3,
		width: 80,
		alignSelf: "flex-end",
		justifyContent: "center",
	},
	buttonText: {
		fontSize: 18,
		color: "white",
	},
	line: {
		borderBottomColor: "#cccccc",
		borderBottomWidth: 1,
		marginVertical: 10,
	},
	addText: {
		fontSize: 18,
		alignSelf: "center",
	},
	addTextInput: {
		borderColor: "black",
		borderWidth: 1,
		borderRadius: 3,
		fontSize: 16,
		paddingHorizontal: 10,
		margin: 2,
	},
	box: {
		flexDirection: "row",
		paddingHorizontal: 5,
		alignSelf: "center",
	},
});

export default AddScreen;
