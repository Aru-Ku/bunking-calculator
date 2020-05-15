import React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { connect } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import {
	IndHomeScreen,
	LoginScreen,
	SettingsScreen,
	AddAttendanceScreen,
	UpdateScreen,
	InsHome,
} from "./ExportScreens";

const Stack = createStackNavigator();

class Index extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<NavigationContainer>
					<Stack.Navigator initialRouteName='LoginScreen'>
						{!(this.props.isIndividualLoggedIn || this.props.isInstitutionalLoggedIn) ? (
							<Stack.Screen name='LoginScreen' component={LoginScreen} options={{ headerShown: false }} />
						) : null}
						{this.props.isIndividualLoggedIn ? (
							<>
								<Stack.Screen name='Home' component={IndHomeScreen} options={{ headerShown: false }} />
								<Stack.Screen name='Settings' component={SettingsScreen} />
								<Stack.Screen name='Add Attendance' component={AddAttendanceScreen} />
								<Stack.Screen name='Update Subjects' component={UpdateScreen} />
							</>
						) : null}
						{this.props.isInstitutionalLoggedIn ? (
							<Stack.Screen name='insHome' component={InsHome} options={{ title: "Bunking Calculator" }} />
						) : null}
					</Stack.Navigator>
				</NavigationContainer>
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isIndividualLoggedIn: state.ind.isIndividualLoggedIn,
		isInstitutionalLoggedIn: state.ins.isInstitutionalLoggedIn,
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
