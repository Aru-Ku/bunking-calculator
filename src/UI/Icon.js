import { Ionicons } from "@expo/vector-icons";
import React from "react";

export default function Icon(props) {
	return (
		<Ionicons
			name={props.name}
			size={props.size ? props.size : 27}
			style={props.style ? props.style : { marginBottom: -3 }}
			color={props.focused ? "black" : "#8c8c8c"}
		/>
	);
}
