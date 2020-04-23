import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "../Components/Header";
import TotalAttendance from "../Components/TotalAttendance";
import SubjectwiseAttendance from "../Components/SubjectWiseAttendance";
import Icon from "../UI/Icon";

class HomeScreen extends React.Component {
	state = {
		userName: "",
		subjectData: [],
	};

	componentDidMount() {
		let data = [
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
		];
		let user = "ArunKumar";
		this.setState({ subjectData: data, userName: user });
	}

	render() {
		let displayUserAttendance = null;
		if (this.state.subjectData.length === 0) {
			displayUserAttendance = (
				<View style={styles.rectangle}>
					<View style={{ alignItems: "center" }}>
						<Icon name='md-settings' focused='true' size={20} />
						<Text
							style={{ fontSize: 19, textAlign: "center", fontWeight: "bold" }}>
							Oops!! currently you do not have any subjects.
						</Text>
						<Text></Text>
						<Text style={{ fontSize: 18, textAlign: "center" }}>
							Please, add your subjects in [{" "}
							<Icon name='md-settings' focused='true' size={20} /> {"\u27a4"}{" "}
							𝐔𝐩𝐝𝐚𝐭𝐞 𝐒𝐮𝐛𝐣𝐞𝐜𝐭𝐬 ] to track your attendance.
						</Text>
					</View>
				</View>
			);
		} else {
			displayUserAttendance = (
				<>
					<TotalAttendance subjects={this.state.subjectData} />
					<Text style={styles.midtext}>Subject wise attendance</Text>
					<SubjectwiseAttendance
						{...this.props}
						subjects={this.state.subjectData}
					/>
				</>
			);
		}
		return (
			<View style={styles.container}>
				<View>
					<Header {...this.props} />
				</View>
				<Text style={styles.welcomeText}>Hello {this.state.userName},</Text>
				{displayUserAttendance}
			</View>
		);
	}
}

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
		...Platform.select({
			android: {
				elevation: 3,
			},
		}),
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

export default HomeScreen;
