import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Icon from "../UI/Icon";

const SettingsScreen = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<View style={{ backgroundColor: "#f8f8f8", width: "100%" }}>
				<Image style={styles.image} source={require("../../assets/Logo.png")} />
			</View>
			<View style={styles.card}>
				<TouchableOpacity
					onPress={() => navigation.navigate("Personal Details")}
					style={styles.setting}>
					<Icon name='md-contacts' size={26} focused='true' />
					<Text style={styles.settingFont}>Personal Details</Text>
					<Icon
						style={styles.arrow}
						name='md-arrow-round-forward'
						size={25}
						focused='true'
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => navigation.navigate("Update Subjects")}
					style={styles.setting}>
					<Icon name='md-book' size={26} focused='true' />
					<Text style={styles.settingFont}>Update Subjects</Text>
					<Icon
						style={styles.arrow}
						name='md-arrow-round-forward'
						size={25}
						focused='true'
					/>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => {}} style={styles.setting}>
					<Icon name='md-rocket' size={26} focused='true' />
					<Text style={styles.settingFont}>FAQ</Text>
					<Icon
						style={styles.arrow}
						name='md-arrow-round-forward'
						size={25}
						focused='true'
					/>
				</TouchableOpacity>
			</View>

			<View style={styles.credits}>
				<Text
					style={{
						fontSize: 18,
						fontWeight: "bold",
						textAlign: "center",
					}}>
					Credits
				</Text>
				<View style={styles.bottomImages}>
					<Image
						style={{ width: 180, height: 180, resizeMode: "center" }}
						source={require("../../assets/ns-logo.png")}
					/>
					<Image
						style={{ width: 180, height: 180, resizeMode: "center" }}
						source={require("../../assets/mastrero-logo.png")}
					/>
				</View>
			</View>
		</View>
	);
};

export default SettingsScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
	},
	image: {
		resizeMode: "contain",
		width: 200,
		alignSelf: "center",
	},
	card: {
		width: "100%",
		height: "100%",
		backgroundColor: "white",
	},
	setting: {
		flexDirection: "row",
		backgroundColor: "white",
		padding: 15,
		paddingVertical: 20,
	},
	settingFont: {
		textAlignVertical: "center",
		fontSize: 20,
		paddingHorizontal: 18,
		flexGrow: 5,
	},
	arrow: {
		alignSelf: "stretch",
		paddingHorizontal: 5,
	},
	credits: {
		position: "absolute",
		bottom: 0,
	},
	bottomImages: {
		flexDirection: "row",
	},
});
