import React from "react";
import { View, Image, StyleSheet, TouchableOpacity, Text, TextInput } from "react-native";
import IndLogin from "./IndLogin";
import InsLogin from "./InsLogin";

const LoginScreen = (props) => {
	const [accType, setAccType] = React.useState("ind");
	return (
		<View style={styles.container}>
			<Image style={styles.logo} source={require("../assets/Logo.png")} />
			<View style={styles.buttonWrap}>
				<TouchableOpacity
					style={accType === "ind" ? styles.buttonBox : { ...styles.buttonBox, backgroundColor: "white" }}
					onPress={() => setAccType("ind")}>
					<Text style={accType === "ind" ? styles.buttonText : { ...styles.buttonText, color: "black" }}>
						Individual Account
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={
						accType === "ins"
							? styles.buttonBox
							: {
									...styles.buttonBox,
									backgroundColor: "white",
							  }
					}
					onPress={() => setAccType("ins")}>
					<Text style={accType === "ins" ? styles.buttonText : { ...styles.buttonText, color: "black" }}>
						Institutional Account
					</Text>
				</TouchableOpacity>
			</View>
			{accType === "ind" ? <IndLogin /> : <InsLogin />}
		</View>
	);
};

export default LoginScreen;

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
	logo: {
		resizeMode: "contain",
		width: 200,
		alignSelf: "center",
	},
	buttonWrap: {
		flexDirection: "row",
		width: "100%",
		borderBottomWidth: 1,
	},
	buttonBox: {
		flexGrow: 1,
		backgroundColor: "black",
		paddingVertical: 5,
		marginHorizontal: 2,
		borderBottomWidth: 1,
		borderBottomColor: "white",
	},
	buttonText: {
		textAlign: "center",
		fontSize: 20,
		color: "white",
	},
});
