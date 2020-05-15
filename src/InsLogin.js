import React from "react";
import { View, TouchableOpacity, Text, TextInput, ActivityIndicator, StyleSheet } from "react-native";
import { connect } from "react-redux";
import firebase from "firebase";

const InsLogin = (props) => {
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [error, setError] = React.useState("");
	const [noAccount, setNoAccount] = React.useState(false);
	const [isLoading, setLoading] = React.useState(false);
	const [nomail, setNomail] = React.useState(false);
	const [noPwd, setNoPwd] = React.useState(false);
	let condition = email === "" || password === "";

	signIn = () => {
		setLoading(true);
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then(() => {
				const userID = firebase.auth().currentUser.uid;
				firebase
					.database()
					.ref(userID)
					.once("value", (snap) => {
						if (snap.val()["accountType"] === "Student") {
							props.setInsLogin(email.split("@")[0], email.split("@")[1].replace(/\./g, "-"));
						} else {
							setNoAccount(true);
							setLoading(false);
						}
					});
			})
			.catch((error) => {
				setLoading(false);
				switch (error.code) {
					case "auth/invalid-email":
						setError("Invalid Email ID");
						setNomail(true);
						break;
					case "auth/user-not-found":
						setError("The account doesn't exist");
						setNomail(true);
						break;
					case "auth/wrong-password":
						setError("Wrong Password");
						setNoPwd(true);
						break;
				}
			});
	};

	return (
		<View style={styles.LoginView}>
			<Text>Use this login, if your institution has given you the login details</Text>
			<TextInput
				style={nomail ? { ...styles.inputField, borderColor: "red" } : styles.inputField}
				placeholder='Institutional Mail ID'
				value={email}
				onChangeText={(t) => setEmail(t)}
			/>
			{noAccount ? <Text style={s.warn}>This email is not a student email account</Text> : null}
			<TextInput
				style={noPwd ? { ...styles.inputField, borderColor: "red" } : styles.inputField}
				secureTextEntry
				value={password}
				onChangeText={(t) => setPassword(t)}
				placeholder='Password'
			/>
			<View style={{ width: 100 }}>
				<TouchableOpacity style={styles.loginButton} onPress={() => signIn()}>
					{isLoading ? (
						<ActivityIndicator color='white' size={20} />
					) : (
						<Text style={{ fontSize: 18, color: "#fff", textAlign: "center" }}>LOGIN</Text>
					)}
				</TouchableOpacity>
			</View>
			{error !== "" ? <Text style={s.warn}>{error}</Text> : null}
			<Text>{condition}</Text>
		</View>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		setInsLogin: (id, dname) => dispatch({ type: "INS_LOGGED_IN", id: id, dname: dname }),
	};
};

export default connect(null, mapDispatchToProps)(InsLogin);

const styles = StyleSheet.create({
	warn: {
		color: "red",
	},
	LoginView: {
		alignItems: "center",
		marginTop: 15,
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
