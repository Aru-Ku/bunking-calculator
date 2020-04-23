import React from "react";
import { View, Image, StyleSheet, TouchableOpacity, Text } from "react-native";
export default function LoginScreen(props) {
	props.navigation.setOptions({ headerShown: false });
	return (
		<View style={styles.container}>
			<Image style={styles.logo} source={require("../../assets/Logo.png")} />
			<TouchableOpacity style={styles.login}>
				<Text style={{ fontSize: 18, color: "#fff" }}>LOGIN</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	logo: {
		resizeMode: "stretch",
		width: 200,
		height: 90,
		marginVertical: 100,
	},
	login: {
		backgroundColor: "black",
		padding: 10,
		borderRadius: 6,
		elevation: 8,
	},
});
