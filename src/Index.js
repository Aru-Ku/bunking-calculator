import React from "react";
import { StyleSheet, View, Platform, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { connect } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen, LoginScreen, SettingsScreen, AddAttendanceScreen, UpdateScreen } from "./ExportScreens";

const Stack = createStackNavigator();

class Index extends React.Component {
	state = {};
	render() {
		return (
			<View style={styles.container}>
				<NavigationContainer>
					<Stack.Navigator initialRouteName='LoginScreen'>
						{!this.props.isLoggedin ? (
							<Stack.Screen name='LoginScreen' component={LoginScreen} options={{ headerShown: false }} />
						) : (
							<>
								<Stack.Screen name='Home' component={HomeScreen} />
								<Stack.Screen name='Settings' component={SettingsScreen} />
								<Stack.Screen name='Add Attendance' component={AddAttendanceScreen} />
								<Stack.Screen name='Update Subjects' component={UpdateScreen} />
							</>
						)}
					</Stack.Navigator>
				</NavigationContainer>
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedin: state.isLoggedin,
	};
};

export default connect(mapStateToProps, null)(Index);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		borderTopWidth: 0.5,
	},
});
