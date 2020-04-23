import React from "react";
import {
	View,
	StyleSheet,
	Text,
	TouchableOpacity,
	TextInput,
	ActivityIndicator,
} from "react-native";

export default class UpdateScreen extends React.Component {
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
		editing: false,
		isTextEditable: false,
	};
	fieldDisplay = () => {
		let duppedData = [...this.state.subjectData];
		if (duppedData.length === 0) {
		} else {
			return duppedData.map((subject) => {
				return (
					<View
						style={
							this.state.editing
								? { ...styles.fieldWrapper, backgroundColor: "#f5f5f5" }
								: styles.fieldWrapper
						}
						key={subject.name}>
						<TextInput
							style={styles.field}
							defaultValue={subject.name}
							editable={this.state.isTextEditable}
							onChangeText={(text) =>
								this.changingSubjects(text, subject.name, duppedData)
							}
						/>
					</View>
				);
			});
		}
	};
	changingSubjects = (text, subjectName, data) => {
		data.map((subject) => {
			console.log(subject);
			if (subject.name === subjectName) {
				subject.name = text;
			}
		});
	};
	editing = () => {
		this.setState({ isTextEditable: true, editing: true });
	};
	doneEditing = () => {
		// console.log(this.state.subjectData);
		// alert("doneEditing");
		this.setState({ isTextEditable: false, editing: false });
		// Submit data
	};
	render() {
		return (
			<View style={styles.container}>
				<Text style={{ fontSize: 18, fontWeight: "bold", paddingBottom: 15 }}>
					{this.state.editing
						? "Edit your subjects & add new subjects if needed"
						: "Your Subjects"}
				</Text>
				{this.fieldDisplay()}

				<View style={styles.buttonWrapper}>
					{this.state.editing ? (
						<TouchableOpacity onPress={() => {}} style={styles.buttonBox}>
							<Text style={styles.buttonText}>Add new subect</Text>
						</TouchableOpacity>
					) : null}
					<TouchableOpacity
						onPress={this.state.editing ? this.doneEditing : this.editing}
						style={styles.buttonBox}>
						<Text style={styles.buttonText}>
							{this.state.editing ? "Save Subjects" : "Edit Subjects"}
						</Text>
					</TouchableOpacity>
				</View>
				<Text>{this.state.temporaryArray}</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
		padding: 30,
	},
	buttonWrapper: {
		flexDirection: "row",
		justifyContent: "flex-end",
	},
	buttonBox: {
		backgroundColor: "black",
		marginLeft: 15,
		marginVertical: 10,
		flexDirection: "row",
		borderRadius: 6,
		elevation: 6,
	},
	buttonText: {
		textAlign: "center",
		color: "white",
		fontSize: 18,
		// padding: 10,
		// paddingHorizontal: 15,
		margin: 10,
	},
	fieldWrapper: {
		flexDirection: "row",
		alignItems: "center",
		marginVertical: 3,
	},
	fieldText: {
		fontSize: 20,
		paddingHorizontal: 5,
	},
	field: {
		padding: 3,
		fontSize: 20,
		width: "95%",
	},
	headText: {
		fontSize: 18,
	},
});
