import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "../UI/Icon";

const Header = (props) => {
	return (
		<View style={styles.container}>
			<Image style={styles.logo} source={require("../../assets/Logo.png")} />
			<View style={{ flexDirection: "row" }}>
				<TouchableOpacity
					style={{ paddingHorizontal: 5 }}
					onPress={() => props.navigation.navigate("Settings")}>
					<Icon icon='AntDesign' name='setting' style={{ color: "black" }} />
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: 70,
		backgroundColor: "#fff",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 15,
		paddingTop: 25,
		elevation: 5,
		marginTop: 0,
	},
	logo: {
		resizeMode: "contain",
		width: 90,
	},
});

export default Header;
