import React from "react";
import { StyleSheet, View, Platform, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Font from "expo-font";
import { SplashScreen } from "expo";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./src/Screens/HomeScreen";
import AddAttendanceScreen from "./src/Screens/AddAttendanceScreen";
import SettingsScreen from "./src/Screens/SettingsScreen";
import LoginScreen from "./src/Screens/LoginScreen";
import UpadteScreen from "./src/Screens/UpdateScreen";
import PersonalDetailsScreen from "./src/Screens/PersonalDetailsScreen";

const Stack = createStackNavigator();
// const BottomTab = createBottomTabNavigator();

export default class App extends React.Component {
	state = {
		isLoading: false,
	};

	componentDidMount = async () => {
		try {
			SplashScreen.preventAutoHide();
			await Font.loadAsync({
				...Ionicons.font,
				"helvetica-font": require("./assets/Helvetica.ttf"),
				"space-mono": require("./assets/SpaceMono-Regular.ttf"),
			});
		} catch (e) {
			console.warn(e);
		} finally {
			SplashScreen.hide();
		}
	};

	render() {
		return (
			<View style={styles.container}>
				{Platform.OS === "android" && (
					<StatusBar backgroundColor='white' barStyle='dark-content' />
				)}
				<NavigationContainer>
					<Stack.Navigator initialRouteName='Home'>
						<Stack.Screen
							name='Home'
							component={HomeScreen}
							options={{ headerShown: false }}
						/>
						<Stack.Screen name='Settings' component={SettingsScreen} />
						<Stack.Screen
							name='Add Attendance'
							component={AddAttendanceScreen}
						/>
						<Stack.Screen name='LoginScreen' component={LoginScreen} />
						<Stack.Screen
							name='faq'
							component={LoginScreen}
							options={{ headerShown: false }}
						/>
						<Stack.Screen name='Update Subjects' component={UpadteScreen} />
						<Stack.Screen
							name='Personal Details'
							component={PersonalDetailsScreen}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		borderTopWidth: 0.5,
	},
});
