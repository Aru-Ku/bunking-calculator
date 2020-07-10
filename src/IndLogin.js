import React from "react";
import { View, StyleSheet, Alert, ActivityIndicator, Text } from "react-native";
import { connect } from "react-redux";
import { GoogleSignin, GoogleSigninButton, statusCodes } from "@react-native-community/google-signin";
import firebase from "firebase";
import { androidToken, iosToken, webToken } from "./store/token";

class IndLogin extends React.Component {
	state = {
		loading: false,
	};

	signInHandler = async () => {
		this.setState({ loading: true });
		try {
			GoogleSignin.configure({
				shouldFetchBasicProfile: true,
				webClientId: webToken,
				offlineAccess: true,
			});
			await GoogleSignin.hasPlayServices();
			const data = await GoogleSignin.signIn();
			this.onSignIn(data);
		} catch (error) {
			if (error.code === statusCodes.SIGN_IN_CANCELLED) {
				// user cancelled the login flow
			} else if (error.code === statusCodes.IN_PROGRESS) {
				// operation (e.g. sign in) is in progress already
			} else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
				// play services not available or outdated
			} else {
				Alert.alert("Oh Ohh, Something happened", "Please Contact the developer");
			}
			this.setState({ loading: false });
		}
	};

	onSignIn = (googleUser) => {
		firebase.auth().onAuthStateChanged((firebaseUser) => {
			if (!this.isUserEqual(googleUser, firebaseUser)) {
				this.setState({ loading: false });
				//If User not existed in database
				var credential = firebase.auth.GoogleAuthProvider.credential(googleUser.idToken);
				firebase
					.auth()
					.signInWithCredential(credential)
					.then(async (data) => {
						const uid = firebase.auth().currentUser.uid;
						const email = data.user.email;
						const pic = data.user.photoURL;
						const name = data.user.displayName;

						firebase
							.database()
							.ref("/individuals/" + uid)
							.set({
								gmail: email,
								photoUrl: pic,
								name: name,
							})
							.then(() => this.props.setIndividualLogin(uid, email, pic, name));
					})
					.catch((error) => {});
			} else {
				// if user alrady exists
				this.setState({ loading: false });
				const uid = firebaseUser.uid;
				const email = firebaseUser.email;
				const pic = firebaseUser.photoURL;
				const name = firebaseUser.displayName;

				this.props.setIndividualLogin(uid, email, pic, name);
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

	render() {
		return (
			<View style={styles.container}>
				{!this.state.loadingText ? (
					<GoogleSigninButton
						style={{ width: 192, height: 50 }}
						size={GoogleSigninButton.Size.Wide}
						color={GoogleSigninButton.Color.Dark}
						onPress={this.signInHandler}
					/>
				) : (
					<Text>Checking status...</Text>
				)}
				{this.state.loading ? <ActivityIndicator size={30} color='black' /> : null}
			</View>
		);
	}
}

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
