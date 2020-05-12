import React from "react";
import { View, Image, StyleSheet, TouchableOpacity, Text, TextInput } from "react-native";

const LoginScreen = (props) => {
	const [username, setUsername] = React.useState("");
	const [password, setPassword] = React.useState("");
	return (
		<View style={styles.container}>
			<Image style={styles.logo} source={require("../../assets/Logo.png")} />
			<TextInput
				style={styles.inputField}
				placeholder='Student ID'
				value={username}
				onChangeText={(t) => setUsername(t)}
			/>
			<TextInput
				style={styles.inputField}
				secureTextEntry
				value={password}
				onChangeText={(t) => setPassword(t)}
				placeholder='Password'
			/>
			<TouchableOpacity style={styles.loginButton}>
				<Text style={{ fontSize: 18, color: "#fff" }}>LOGIN</Text>
			</TouchableOpacity>
		</View>
	);
};

export default LoginScreen;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		backgroundColor: "white",
	},
	logo: {
		resizeMode: "contain",
		width: 200,
		marginTop: 100,
	},
	inputField: {
		width: "70%",
		borderWidth: 1.5,
		marginVertical: 10,
		borderRadius: 10,
		padding: 10,
		fontSize: 16,
	},
	loginButton: {
		backgroundColor: "black",
		marginVertical: 10,
		padding: 10,
		borderRadius: 6,
	},
});
