import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, TextInput, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import firebase from "firebase";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "../UI/Icon";

class UpdateScreen extends React.Component {
	state = {
		editing: false,
		isActivityIndicator: false,
		displayNewField: false,
		displayAddButton: false,
		existingData: {},
		newData: {},
		dataLoading: false,
	};

	componentDidMount() {
		this.setState({ dataLoading: true });
		setTimeout(() => this.setState({ dataLoading: false }), 1000);
		this.fetchData();
	}

	fetchData = () => {
		firebase
			.database()
			.ref("/individuals/" + this.props.uid + "/subjects/")
			.once("value", (snap) => {
				this.setState({ existingData: { ...snap.val() } });
				if (Object.keys({ ...snap.val() }).length === 0) {
					this.setState({ noData: true, editing: true });
				}
			});
	};

	fieldDisplay = () => {
		let data = { ...this.state.existingData };
		if (Object.keys(data).length !== 0) {
			return Object.keys(data).map((key) => {
				return (
					<View style={styles.fieldWrapper} key={key}>
						<TextInput
							ref={key}
							style={
								!this.state.editing
									? styles.field
									: data[key]["name"] !== ""
									? { ...styles.field, backgroundColor: "#f5f5f5", color: "black" }
									: { ...styles.field, backgroundColor: "#f5f5f5", borderColor: "red", borderWidth: 1 }
							}
							defaultValue={data[key]["name"]}
							editable={this.state.editing}
							placeholder='Subject Name'
							onChangeText={(text) => (data[key]["name"] = text)}
						/>
						{this.state.editing ? (
							<TouchableOpacity
								style={{ paddingHorizontal: 10 }}
								onPress={() => {
									let ob = { ...this.state.existingData };
									delete ob[key];
									this.setState({ existingData: ob });
									firebase
										.database()
										.ref("/individuals/" + this.props.uid + "/subjects/" + key)
										.remove();
								}}>
								<Icon name='md-remove-circle-outline' style={{ color: "red" }} />
							</TouchableOpacity>
						) : null}
					</View>
				);
			});
		}
	};

	addNewSubject = () => {
		this.setState({ displayNewField: true });
		let field = { ...this.state.newData };
		field[Math.random()] = { name: "", attended: 0, total: 0 };
		this.setState({ newData: { ...field } });
	};

	newField = () => {
		let data = { ...this.state.newData };
		return Object.keys(data).map((key) => {
			return (
				<View key={key} style={styles.fieldWrapper}>
					<TextInput
						ref={key}
						style={
							!this.state.editing
								? styles.field
								: data[key]["name"] !== ""
								? { ...styles.field, backgroundColor: "#f5f5f5" }
								: { ...styles.field, backgroundColor: "#f5f5f5", borderColor: "red", borderWidth: 1 }
						}
						editable={this.state.editing}
						placeholder='New Subject Name'
						autoFocus={this.state.editing}
						defaultValue={data[key]["name"]}
						onChangeText={(text) => (data[key]["name"] = text)}
					/>
					{this.state.editing ? (
						<TouchableOpacity
							style={{ paddingHorizontal: 10 }}
							onPress={() => {
								let ob = { ...this.state.newData };
								delete ob[key];
								this.setState({ newData: ob });
							}}>
							<Icon name='md-remove-circle-outline' style={{ color: "red" }} />
						</TouchableOpacity>
					) : null}
				</View>
			);
		});
	};

	editing = () => this.setState({ editing: true, displayAddButton: true });

	doneEditing = async () => {
		this.setState({
			isActivityIndicator: true,
			editing: false,
			noData: false,
		});

		let existingData = { ...this.state.existingData };
		let newData = { ...this.state.newData };
		Object.keys(existingData).map(async (key) => {
			await firebase
				.database()
				.ref("/individuals/" + this.props.uid + "/subjects/" + key)
				.set(existingData[key]);
		});
		Object.keys(newData).map((key) => {
			if (newData[key]["name"] !== "") {
				firebase
					.database()
					.ref("/individuals/" + this.props.uid + "/subjects")
					.push(newData[key]);
			} else {
				let ob = { ...this.state.newData };
				delete ob[key];
				this.setState({ newData: ob });
			}
		});

		this.setState({
			isActivityIndicator: false,
			displayAddButton: false,
		});
	};

	render() {
		return (
			<View style={styles.container}>
				{this.state.noData ? (
					<Text style={styles.heading}>Currently, you do not have any subjects</Text>
				) : (
					<Text style={styles.heading}>
						{this.state.editing ? "Edit your subjects / Add new subjects if needed" : "Your subjects"}
					</Text>
				)}

				<ScrollView nestedScrollEnabled={true} keyboardDismissMode='on-drag'>
					{this.fieldDisplay()}
					{this.state.displayNewField ? this.newField() : null}

					<View style={styles.buttonWrapper}>
						{this.state.noData || this.state.displayAddButton ? (
							<TouchableOpacity onPress={() => this.addNewSubject()} style={styles.buttonBox}>
								<Text style={styles.buttonText}>Add new subject</Text>
							</TouchableOpacity>
						) : null}
						{this.state.dataLoading ? <ActivityIndicator color='black' size={30} /> : null}
						<TouchableOpacity
							onPress={this.state.editing ? this.doneEditing : this.editing}
							style={styles.buttonBox}
							disabled={this.state.isActivityIndicator}>
							{this.state.isActivityIndicator ? (
								<ActivityIndicator color='white' size={20} />
							) : (
								<Text style={styles.buttonText}>
									{this.state.editing || this.state.noData ? "Save Subjects" : "Edit Subjects"}
								</Text>
							)}
						</TouchableOpacity>
					</View>
				</ScrollView>
				<Text style={styles.warningText}>
					- Deleting existing subject deletes its' relevant attendance data
				</Text>
				<Text style={styles.warningText}>- Subject(s) once deleted, cannot be ratained</Text>
			</View>
		);
	}
}

const mapState = (state) => {
	return {
		uid: state.ind.accID,
	};
};

const mapDispatch = (dispatch) => {
	return {
		updateSubjects: (d) => dispatch({ type: "SET_DATA", data: d }),
	};
};

export default connect(mapState, mapDispatch)(UpdateScreen);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
		paddingHorizontal: 30,
	},
	heading: {
		marginTop: 5,
		fontSize: 20,
		fontWeight: "bold",
		paddingBottom: 10,
		color: "black",
	},
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
	warningText: {
		color: "red",
		fontSize: 15,
		textAlign: "justify",
		fontStyle: "italic",
	},
	buttonText: {
		color: "white",
		fontSize: 18,
	},
	fieldWrapper: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		alignItems: "center",
		marginVertical: 3,
	},
	field: {
		alignContent: "flex-start",
		paddingHorizontal: 3,
		paddingVertical: 5,
		marginLeft: 5,
		fontSize: 18,
		width: "90%",
		color: "black",
	},
	headText: {
		fontSize: 18,
	},
});
