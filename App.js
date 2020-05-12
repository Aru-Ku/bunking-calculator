import React from "react";
import * as Font from "expo-font";
import { SplashScreen } from "expo";
import { Ionicons } from "@expo/vector-icons";
import Index from "./src/Index";
import { Provider } from "react-redux";
import ApiKeys from "./src/store/FirebaseApi";
import * as firebase from "firebase";
import { store } from "./src/store/reducer";

export default class App extends React.Component {
	constructor(props) {
		super(props);
		state = {};
		if (!firebase.apps.length) {
			firebase.initializeApp(ApiKeys.FireBaseConfig);
		}
	}

	componentDidMount = async () => {
		try {
			SplashScreen.preventAutoHide();
			await Font.loadAsync({
				...Ionicons.font,
			});
		} catch (e) {
			console.warn(e);
		} finally {
			SplashScreen.hide();
		}
	};

	render() {
		return (
			<Provider store={store}>
				<Index />
			</Provider>
		);
	}
}
