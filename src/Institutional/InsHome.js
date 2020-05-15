import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import TotalAttendance from "./TotalAttendance";
import SubjectwiseAttendance from "./SubjectWiseAttendance";
import ClassesSummary from "./ClassesSummary";
import Icon from "../UI/Icon";
import { connect } from "react-redux";
import firebase from "firebase";

class InsHome extends React.Component {
	state = {
		dataLoading: false,
		logoutLoading: false,
	};

	componentDidMount() {
		this.setState({ dataLoading: true });
		this.fetchDataFromDb();
		this.loadSignoutButton();
		this.setState({ dataLoading: false });
	}

	fetchDataFromDb = () => {
		firebase
			.database()
			.ref(this.props.dname + "/adminID")
			.once("value", (snap) => this.props.setAdminID(snap.val()));
		firebase
			.database()
			.ref(this.props.dname + "/students")
			.once("value", (snap) => {
				Object.keys(snap.val()).map((key) => {
					if (snap.val()[key].id === this.props.stuID) {
						this.props.setStudentName(snap.val()[key].name);
					}
				});
			});
		firebase
			.database()
			.ref(this.props.dname + "/attendance")
			.once("value", (snap) => {
				let data = { ...snap.val() };
				let finalData = {};
				let attendance = {};
				Object.keys(data).map((key) => {
					if (data[key][this.props.stuID] !== undefined) {
						finalData[key] = { attended: data[key][this.props.stuID], total: data[key]["dates"] };
					}
				});
				let att = { ...finalData };
				Object.keys(att).map((key) => {
					attendance[key] = {};
					Object.keys(att[key]).map((k) => {
						attendance[key][k] = Object.keys(att[key][k]).length;
					});
				});
				this.props.setAttendanceData(attendance);
			});
	};

	loadSignoutButton = () => {
		this.props.navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity
					onPress={() => {
						this.setState({ logoutLoading: true });
						firebase
							.auth()
							.signOut()
							.then(() => {
								this.props.setInsLoggedOut();
							})
							.catch((error) => {
								console.log(error);
							});
					}}
					style={{ paddingRight: 15 }}>
					{this.state.logoutLoading ? (
						<ActivityIndicator color='black' size={27} />
					) : (
						<Icon icon='Material' name='logout-variant' size={27} />
					)}
				</TouchableOpacity>
			),
		});
	};

	render() {
		let displayUserAttendance = null;
		if (Object.keys(this.props.attendanceData).length === 0) {
			displayUserAttendance = (
				<View style={{ ...styles.rectangle, marginBottom: 10 }}>
					<View style={{ alignItems: "center" }}>
						<Text style={{ fontSize: 19, textAlign: "center", fontWeight: "bold" }}>
							Oops!! currently you have not given any attendance by your faculty
						</Text>
						<Text></Text>
						<Text style={{ fontSize: 18 }}>
							For further information, please contact Your Adminstrator "{this.props.adminID}"
						</Text>
					</View>
				</View>
			);
		} else {
			displayUserAttendance = (
				<View>
					<TotalAttendance />
					<Text style={styles.midtext}>Subject wise attendance</Text>
					<SubjectwiseAttendance />
					<Text style={styles.midtext}>Summary</Text>
					<ClassesSummary />
				</View>
			);
		}
		return (
			<ScrollView nestedScrollEnabled={true} style={styles.container}>
				{this.state.dataLoading ? (
					<ActivityIndicator color='black' size={35} />
				) : (
					<>
						<Text style={styles.welcomeText}>
							Hello <Text style={{ fontWeight: "bold" }}>{this.props.name}</Text>,
						</Text>
						{displayUserAttendance}
					</>
				)}
			</ScrollView>
		);
	}
}

const mapstateToProps = (state) => {
	return {
		dname: state.ins.dname,
		adminID: state.ins.adminID,
		stuID: state.ins.stuID,
		name: state.ins.name,
		attendanceData: state.ins.attendanceData,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setStudentName: (name) => dispatch({ type: "SET_NAME", name: name }),
		setAttendanceData: (d) => dispatch({ type: "SET_ATT_DATA", data: d }),
		setAdminID: (id) => dispatch({ type: "SET_ADMIN_ID", id: id }),
		setInsLoggedOut: () => dispatch({ type: "INS_LOGGED_OUT" }),
	};
};

export default connect(mapstateToProps, mapDispatchToProps)(InsHome);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	welcomeText: {
		fontSize: 21,
		padding: 15,
	},
	rectangle: {
		width: "93%",
		padding: 15,
		alignSelf: "center",
		elevation: 5,
		backgroundColor: "#fff",
		borderRadius: 10,
	},
	midtext: {
		fontSize: 18,
		alignSelf: "center",
		paddingVertical: 20,
		fontWeight: "bold",
	},
	button: {
		backgroundColor: "black",
		padding: 6,
		borderRadius: 3,
		alignSelf: "flex-end",
	},
});
