import React from "react";
import {
	View,
	Image,
	Platform,
	StyleSheet,
	TouchableOpacity,
} from "react-native";
import Icon from "../UI/Icon";

const Header = (props) => {
	return (
		<View style={styles.container}>
			<Image style={styles.logo} source={require("../../assets/Logo.png")} />
			<View style={{ flexDirection: "row" }}>
				<TouchableOpacity
					style={{ paddingHorizontal: 15 }}
					onPress={() => props.navigation.navigate("Personal Details")}>
					<Icon name='md-contact' focused />
				</TouchableOpacity>
				<TouchableOpacity
					style={{ paddingHorizontal: 5 }}
					onPress={() => props.navigation.navigate("Settings")}>
					<Icon name='md-settings' focused />
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: 60,
		backgroundColor: "#fff",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 15,
		elevation: 5,
	},
	logo: {
		resizeMode: "contain",
		width: 90,
	},
});

export default Header;
