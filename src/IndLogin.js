import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import * as Google from "expo-google-app-auth";
import firebase from "firebase";
import Icon from "./UI/Icon";
import { androidToken, iosToken } from "./store/token";

const IndLogin = (props) => {
	const [loading, setLoading] = React.useState(false);
	signIn = async () => {
		setLoading(true);
		try {
			const result = await Google.logInAsync({
				behavior: "system",
				androidClientId: androidToken,
				iosClientId: iosToken,
				scopes: ["profile", "email"],
			});

			if (result.type === "success") {
				onSignIn(result);
				return result.accessToken;
			} else {
				return { cancelled: true };
			}
		} catch (e) {
			return { error: true };
		}
	};
	onSignIn = (googleUser) => {
		var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
			unsubscribe();
			if (!isUserEqual(googleUser, firebaseUser)) {
				//If User not existed in database
				var credential = firebase.auth.GoogleAuthProvider.credential(
					googleUser.idToken,
					googleUser.accessToken
				);
				firebase
					.auth()
					.signInWithCredential(credential)
					.then((data) => {
						const uid = data.user.uid;
						const email = data.user.email;
						const pic = data.additionalUserInfo.profile.picture;
						const name = data.additionalUserInfo.profile.name;

						firebase
							.database()
							.ref("/individuals/" + uid)
							.set({
								gmail: email,
								photoUrl: pic,
								name: name,
								subjects: {},
							})
							.then(() => props.setIndividualLogin(uid, email, pic, name, googleUser.accessToken));
					})
					.catch((error) => {});
			} else {
				// if user alrady exists
				firebase.auth().onAuthStateChanged((user) => {
					const uid = user.uid;
					firebase
						.database()
						.ref("/individuals/" + uid)
						.once("value", (snap) => {
							props.setIndividualLogin(
								uid,
								snap.val()["gmail"],
								snap.val()["photoUrl"],
								snap.val()["name"],
								googleUser.accessToken
							);
						});
				});
			}
		});
	};
	isUserEqual = (googleUser, firebaseUser) => {
		if (firebaseUser) {
			var providerData = firebaseUser.providerData;
			for (var i = 0; i < providerData.length; i++) {
				if (
					providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
					providerData[i].uid === googleUser.user.id
				) {
					return true;
				}
			}
		}
		return false;
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.buttonBox} onPress={() => signIn()}>
				{loading ? (
					<ActivityIndicator color='white' size={25} />
				) : (
					<>
						<Icon name='logo-google' style={{ color: "white" }} size={25} />
						<Text style={styles.buttonText}>SIGN IN</Text>
					</>
				)}
			</TouchableOpacity>
		</View>
	);
};

const mapDispatch = (dispatch) => {
	return {
		setIndividualLogin: (id, mail, p, n, tok) =>
			dispatch({ type: "IND_LOGGED_IN", id: id, email: mail, pic: p, name: n, token: tok }),
	};
};

export default connect(null, mapDispatch)(IndLogin);

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		marginTop: 15,
	},
	buttonBox: {
		backgroundColor: "black",
		marginTop: 35,
		padding: 10,
		borderRadius: 5,
		elevation: 5,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: "30%",
	},
	buttonText: {
		color: "white",
		fontSize: 20,
		paddingHorizontal: 10,
	},
});
