import React from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Picker,
	ActivityIndicator,
	ScrollView,
} from "react-native";
import firebase from "firebase";
import { connect } from "react-redux";

class AddScreen extends React.Component {
	state = {
		isActivityIndicator: false,
		attendance: {},
	};

	componentDidMount() {
		let attData = {};
		let subName = "";
		Object.keys(this.props.data).map((key) => {
			subName = this.props.data[key]["name"];
			attData[subName] = { attended: 0, bunked: 0 };
		});
		this.setState({ attendance: attData });
	}

	showSubjects = () => {
		let att = { ...this.state.attendance };
		return Object.keys(att).map((key) => {
			return (
				<View key={key}>
					<View style={{ paddingTop: 5 }}>
						<Text style={{ fontSize: 18, fontWeight: "bold", textAlignVertical: "center" }}>{key}</Text>
					</View>
					<View style={styles.box}>
						<Picker
							selectedValue={att[key]["attended"]}
							onValueChange={(v, i) => {
								let ob = { ...this.state.attendance };
								ob[key]["attended"] = v;
								this.setState({ attendance: ob });
							}}
							mode='dropdown'
							style={{ width: "50%" }}>
							<Picker.Item label='ATTENDED' value='ATTENDED' />
							<Picker.Item label='0' value='0' />
							<Picker.Item label='1' value='1' />
							<Picker.Item label='2' value='2' />
							<Picker.Item label='3' value='3' />
							<Picker.Item label='4' value='4' />
							<Picker.Item label='5' value='5' />
						</Picker>

						<Picker
							selectedValue={att[key]["bunked"]}
							onValueChange={(v, i) => {
								let ob = { ...this.state.attendance };
								ob[key]["bunked"] = v;
								this.setState({ attendance: ob });
							}}
							mode='dropdown'
							style={{ width: "50%" }}>
							<Picker.Item label='BUNKED' value='BUNKED' />
							<Picker.Item label='0' value='0' />
							<Picker.Item label='1' value='1' />
							<Picker.Item label='2' value='2' />
							<Picker.Item label='3' value='3' />
							<Picker.Item label='4' value='4' />
							<Picker.Item label='5' value='5' />
						</Picker>
					</View>
					<View style={styles.line} />
				</View>
			);
		});
	};

	sendAttendance = () => {
		this.setState({ isActivityIndicator: true });
		let data = { ...this.props.data };
		let att = { ...this.state.attendance };
		Object.keys(data).map((keys) => {
			if (att[data[keys]["name"]]["attended"] !== "ATTENDED") {
				data[keys]["attended"] += +att[data[keys]["name"]]["attended"];
				data[keys]["total"] += +att[data[keys]["name"]]["attended"];
			}
			if (att[data[keys]["name"]]["bunked"] !== "BUNKED") {
				data[keys]["total"] += +att[data[keys]["name"]]["bunked"];
			}
		});
		firebase
			.database()
			.ref("/individuals/" + this.props.uid + "/subjects/")
			.set(data);
		setTimeout(() => this.setState({ isActivityIndicator: false }), 1000);
	};

	render() {
		return (
			<ScrollView nestedScrollEnabled={true} style={styles.container}>
				{this.showSubjects()}
				<TouchableOpacity
					onPress={() => this.sendAttendance()}
					style={this.state.isActivityIndicator ? null : styles.button}
					disabled={this.state.isActivityIndicator}>
					{this.state.isActivityIndicator ? (
						<ActivityIndicator color='black' size={25} />
					) : (
						<Text style={styles.buttonText}>SUBMIT</Text>
					)}
				</TouchableOpacity>
				<View style={{ marginBottom: 70 }} />
			</ScrollView>
		);
	}
}

const mapState = (state) => {
	return {
		data: state.ind.data,
		uid: state.ind.accID,
	};
};

export default connect(mapState, null)(AddScreen);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		paddingHorizontal: 25,
	},
	heading: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
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
		marginBottom: 10,
	},
	box: {
		flexDirection: "row",
		paddingHorizontal: 5,
		alignSelf: "center",
	},
});
