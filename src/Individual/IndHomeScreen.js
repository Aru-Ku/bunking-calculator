import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import Header from "./Header";
import TotalAttendance from "./TotalAttendance";
import SubjectwiseAttendance from "./SubjectWiseAttendance";
import ClassesSummary from "./ClassesSummary";
import Icon from "../UI/Icon";
import { connect } from "react-redux";
import firebase from "firebase";

class IndHomeScreen extends React.Component {
	state = {
		isDataLoading: false,
	};

	componentDidMount() {
		this.setState({ isDataLoading: true });
		this.componetMounted = this.props.navigation.addListener("focus", () => this.fetchData());
		this.setState({ isDataLoading: false });
	}
	componentWillUnmount() {
		this.componetMounted();
	}

	fetchData = () => {
		firebase
			.database()
			.ref("/individuals/" + this.props.uid + "/subjects")
			.once("value", (snap) => {
				this.props.setSubjectsData(snap.val());
			});
	};

	render() {
		let displayUserAttendance = null;
		if (Object.keys(this.props.data).length === 0) {
			displayUserAttendance = (
				<View style={styles.rectangle}>
					<View style={{ alignItems: "center" }}>
						<Text style={{ fontSize: 19, textAlign: "center", fontWeight: "bold", color: "black" }}>
							Oops!! currently you do not have any subjects.😏
						</Text>
						<Text></Text>
						<Text style={{ color: "black" }}>Add Subjects to track your attendance</Text>
						<Text></Text>
						<TouchableOpacity
							style={{ backgroundColor: "black", padding: 10, elevation: 5 }}
							onPress={() => this.props.navigation.navigate("Update Subjects")}>
							<Text style={{ color: "white", fontSize: 16 }}>Add Subjects</Text>
						</TouchableOpacity>
					</View>
				</View>
			);
		} else {
			displayUserAttendance = (
				<View>
					<TotalAttendance data={this.props.data} />
					<Text style={styles.midtext}>Subject wise attendance</Text>
					<SubjectwiseAttendance {...this.props} data={this.props.data} />
					<ClassesSummary data={this.props.data} />
				</View>
			);
		}
		return (
			<View style={styles.container}>
				<View>
					<Header {...this.props} />
				</View>
				<ScrollView nestedScrollEnabled={true}>
					<Text style={styles.welcomeText}>
						Hello <Text style={{ fontWeight: "bold" }}>{this.props.name}</Text>,
					</Text>
					{this.state.isDataLoading ? <ActivityIndicator /> : null}
					{displayUserAttendance}
				</ScrollView>
			</View>
		);
	}
}

const mapState = (state) => {
	return {
		name: state.ind.name,
		uid: state.ind.accID,
		data: state.ind.data,
		pic: state.ind.pic,
		accessToken: state.ind.accessToken,
	};
};

const mapDispatch = (dispatch) => {
	return {
		setSubjectsData: (d) => dispatch({ type: "SET_DATA", data: d }),
	};
};

export default connect(mapState, mapDispatch)(IndHomeScreen);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	welcomeText: {
		fontSize: 21,
		padding: 15,
		color: "black",
	},
	rectangle: {
		width: "93%",
		padding: 15,
		alignSelf: "center",
		elevation: 5,
		backgroundColor: "#fff",
		borderRadius: 10,
		marginBottom: 10,
	},
	midtext: {
		fontSize: 18,
		alignSelf: "center",
		paddingVertical: 20,
		fontWeight: "bold",
		color: "black",
	},
	button: {
		backgroundColor: "black",
		padding: 6,
		borderRadius: 3,
		alignSelf: "flex-end",
	},
});
