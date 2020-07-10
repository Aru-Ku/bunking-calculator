import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Icon from "../UI/Icon";
import { connect } from "react-redux";
import { GoogleSignin } from "@react-native-community/google-signin";
import firebase from "firebase";

const SettingsScreen = (props) => {
	const signoutHandler = async () => {
		try {
			await GoogleSignin.revokeAccess();
			await GoogleSignin.signOut();
			firebase.auth().signOut();
			await props.signOut();
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<View style={styles.container}>
			<View style={styles.profile}>
				<View style={{}}>
					<Text style={{ fontWeight: "bold", fontSize: 23, paddingVertical: 15, color: "black" }}>
						{props.name}
					</Text>
					<Text style={{ fontSize: 18, fontStyle: "italic", color: "black" }}>{props.email}</Text>
				</View>
				<Image style={styles.image} source={{ uri: props.pic }} />
			</View>

			<TouchableOpacity onPress={() => props.navigation.navigate("Update Subjects")} style={styles.setting}>
				<Icon name='ios-book' size={26} style={{ color: "black" }} />
				<Text style={styles.settingFont}>Update Subjects</Text>
				<Icon style={styles.arrow} name='md-arrow-round-forward' size={25} focused='true' />
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() => signoutHandler()}
				style={{
					alignSelf: "center",
					marginTop: 20,
					backgroundColor: "black",
					padding: 8,
					borderRadius: 8,
					elevation: 5,
					color: "black",
				}}>
				<Text style={{ color: "white", fontSize: 16 }}>Sign out</Text>
			</TouchableOpacity>
			<View style={styles.creditsCard}>
				<Text
					style={{
						fontSize: 18,
						fontWeight: "bold",
						color: "black",
					}}>
					Designed & Developed by:
				</Text>
				<View style={styles.bottomImageContainer}>
					<Image style={styles.bottomImage} source={require("../../assets/ns-logo.png")} />
					<Image style={styles.bottomImage} source={require("../../assets/mastrero-logo.png")} />
				</View>
			</View>
		</View>
	);
};

const mapState = (state) => {
	return {
		pic: state.ind.pic,
		email: state.ind.email,
		name: state.ind.name,
		accessToken: state.ind.accessToken,
	};
};

const mapDispatch = (dispatch) => {
	return {
		signOut: () => dispatch({ type: "IND_LOGGED_OUT" }),
	};
};

export default connect(mapState, mapDispatch)(SettingsScreen);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
	profile: {
		flexDirection: "row",
		width: "100%",
		padding: 10,
		backgroundColor: "rgb(240, 240, 240)",
		justifyContent: "space-around",
	},
	image: { width: 100, height: 100, borderRadius: 15 },
	setting: {
		flexDirection: "row",
		backgroundColor: "white",
		padding: 15,
		paddingVertical: 20,
	},
	settingFont: {
		fontWeight: "bold",
		textAlignVertical: "center",
		fontSize: 20,
		paddingHorizontal: 18,
		flexGrow: 5,
		color: "black",
	},
	arrow: {
		alignSelf: "stretch",
		paddingHorizontal: 5,
		color: "black",
	},
	creditsCard: {
		position: "absolute",
		bottom: 0,
		alignSelf: "center",
	},
	bottomImageContainer: {
		flexDirection: "row",
	},
	bottomImage: { width: 150, height: 150, resizeMode: "center" },
});
