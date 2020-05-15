import { Ionicons, Feather, MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import React from "react";

export default function Icon(props) {
	switch (props.icon) {
		case "Feather":
			return <Feather name={props.name} size={props.size ? props.size : 27} style={props.style} />;
		case "Material":
			return (
				<MaterialCommunityIcons name={props.name} size={props.size ? props.size : 27} style={props.style} />
			);
		case "AntDesign":
			return <AntDesign name={props.name} size={props.size ? props.size : 27} style={props.style} />;
		default:
			return <Ionicons name={props.name} size={props.size ? props.size : 27} style={props.style} />;
	}
}
