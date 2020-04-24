import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, TextInput, ActivityIndicator } from "react-native";

export default class UpdateScreen extends React.Component {
	state = {
		subjectData: [
			// {
			// 	name: "subject1",
			// 	count: 12,
			// 	totalCount: 60,
			// },
			// {
			// 	name: "subject2",
			// 	count: 45,
			// 	totalCount: 60,
			// },
			// {
			// 	name: "subject3",
			// 	count: 45,
			// 	totalCount: 60,
			// },
		],
		editing: false,
		isActivityIndicator: false,
		displayNewField: false,
		fieldData: [],
	};

	componentDidMount() {
		if (this.state.subjectData.length === 0) {
			this.setState({ editing: true });
		}
	}
	fieldDisplay = () => {
		let duppedData = [...this.state.subjectData];
		if (duppedData.length !== 0) {
			return duppedData.map((subject) => {
				return (
					<View
						style={
							this.state.editing
								? { ...styles.fieldWrapper, backgroundColor: "#f5f5f5" }
								: styles.fieldWrapper
						}
						key={subject.name + Math.random()}>
						<TextInput
							style={styles.field}
							defaultValue={subject.name}
							editable={this.state.editing}
							onChangeText={(text) => {
								duppedData.map((sub) => {
									if (sub.name === subject.name) {
										sub.name = text;
									}
								});
							}}
						/>
					</View>
				);
			});
		}
	};

	noDataAvailable = () => {
		this.setState({ noData: true });
	};

	addNewSubject = () => {
		this.setState({ displayNewField: true });
		let fields = [...this.state.fieldData];
		fields.push({ name: "", count: 0, totalCount: 0 });
		this.setState({ fieldData: fields });
	};

	newField = () => {
		let fieldNames = [...this.state.fieldData];
		return fieldNames.map((field, fieldIndex) => {
			return (
				<View
					key={Math.random()}
					style={
						this.state.editing ? { ...styles.fieldWrapper, backgroundColor: "#f5f5f5" } : styles.fieldWrapper
					}>
					<TextInput
						style={styles.field}
						editable={this.state.editing}
						placeholder='New Subject Name'
						autoFocus={this.state.editing}
						defaultValue={field.name}
						onChangeText={(text) => {
							fieldNames.map((f, index) => {
								if (index === fieldIndex) {
									f.name = text;
								}
							});
						}}
					/>
				</View>
			);
		});
	};

	editing = () => this.setState({ editing: true });
	doneEditing = () => {
		this.setState({
			isActivityIndicator: true,
			editing: false,
			displayNewField: false,
		});
		let subs = [...this.state.subjectData];
		let fields = [...this.state.fieldData];
		this.setState({ subjectData: subs.concat(fields) });
		// Submit data
	};

	addButton = () => (
		<TouchableOpacity onPress={() => this.addNewSubject()} style={styles.buttonBox}>
			<Text style={styles.buttonText}>Add new subject</Text>
		</TouchableOpacity>
	);
	submitButton = () => (
		<TouchableOpacity
			onPress={this.state.editing ? this.doneEditing : this.editing}
			style={styles.buttonBox}
			disabled={this.state.isActivityIndicator}>
			{this.state.isActivityIndicator ? (
				<ActivityIndicator color='white' size={20} />
			) : (
				<Text style={styles.buttonText}>{this.state.editing ? "Save Subjects" : "Edit Subjects"}</Text>
			)}
		</TouchableOpacity>
	);

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.heading}>
					{this.state.noData
						? "You do not have any subjects, please add them"
						: this.state.editing
						? "Edit your subjects & add new subjects if needed"
						: "Your subjects"}
				</Text>

				{this.fieldDisplay()}
				{this.state.displayNewField ? this.newField() : null}

				<View style={styles.buttonWrapper}>
					{this.state.editing ? this.addButton() : null}
					{this.submitButton()}
				</View>
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
	heading: { fontSize: 18, fontWeight: "bold", paddingBottom: 15 },
	buttonWrapper: {
		flexDirection: "row",
		justifyContent: "flex-end",
	},
	buttonBox: {
		backgroundColor: "black",
		marginLeft: 15,
		marginVertical: 10,
		padding: 10,
		width: 135,
		flexDirection: "row",
		justifyContent: "center",
		borderRadius: 6,
		elevation: 6,
	},
	buttonText: {
		color: "white",
		fontSize: 18,
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
