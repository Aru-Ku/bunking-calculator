import React from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	TextInput,
} from "react-native";

class AddScreen extends React.Component {
	state = {
		subjectData: this.props.route.params,
	};

	bunked = (event, name) => {
		let data = [...this.state.subjectData];
		data.map((eachSub) => {
			if (eachSub.name === name) {
				eachSub.totalCount += +event.nativeEvent.text;
			}
		});
		this.setState({ subjectData: data });
		console.log(this.state.subjectData);
	};

	attended = (event, name) => {
		let data = [...this.state.subjectData];
		this.state.subjectData.map((eachSub) => {
			if (eachSub.name === name) {
				eachSub.count += +event.nativeEvent.text;
				eachSub.totalCount += +event.nativeEvent.text;
			}
		});
		this.setState({ subjectData: data });
		console.log(this.state.subjectData);
	};

	updateAttendance = () => {
		this.props.navigation.setParams(this.state.subjectData);
		// this.props.navigation.goBack();
	}; // Add data submission method

	showSubjects = () => {
		return this.state.subjectData.map((data) => {
			return (
				<View key={data.name}>
					<View style={styles.subjectEntries}>
						<Text style={{ fontSize: 18, fontWeight: "bold", flexGrow: 5 }}>
							{data.name}
						</Text>
					</View>
					<View style={styles.box}>
						<Text style={styles.addText}>No. of classes:</Text>
						<TextInput
							style={styles.addTextInput}
							placeholder='Attended'
							keyboardType='numeric'
							returnKeyType='done'
							onChange={(event) => this.attended(event, data.name)}
						/>
						<TextInput
							style={styles.addTextInput}
							placeholder='Bunked'
							keyboardType='numeric'
							returnKeyType='done'
							onChange={(event) => this.bunked(event, data.name)}
						/>
					</View>
					<View style={styles.line} />
				</View>
			);
		});
	};
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.line} />
				{this.showSubjects()}
				<TouchableOpacity
					onPress={() => this.updateAttendance()}
					style={styles.button}>
					<Text style={{ fontSize: 16, color: "#fff" }}>SUBMIT</Text>
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
		padding: 6,
		borderRadius: 3,
		alignSelf: "flex-end",
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
