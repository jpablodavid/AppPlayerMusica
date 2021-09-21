import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { Audio, Video } from "expo-av";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function App() {
	const [audio, setAudio] = useState(null);
	const [musicas, setMusicas] = useState([
		{
			nome: "Sweet child of mine",
			artista: "Guns N Roses",
			playing: true,
			file: "",
		},
		{
			nome: "This Love",
			artista: "Maroon 5",
			playing: false,
			file: "",
		},
		{
			nome: "021",
			artista: "Planet Hemp",
			playing: false,
			file: "",
		},
		{
			nome: "666",
			artista: "Iron Maiden",
			playing: false,
			file: "",
		},
	]);

	const changeMusic = (id) => {
		let newMusicas = musicas.filter((music, index) => {
			if (id == index) {
				musicas[index].playing = true;
			} else {
				musicas[index].playing = false;
			}
			return musicas[index];
		});

		setMusicas(newMusicas);
	};

	return (
		<ScrollView style={styles.container}>
			<StatusBar style="auto" />
			<View style={styles.header}>
				<Text style={styles.textHeader}>App Music</Text>
			</View>

			<View style={styles.table}>
				<Text style={styles.textTable}>Música</Text>
				<Text style={styles.textTable}>Artista</Text>
			</View>

			{musicas.map((musica, index) => {
				if (musica.playing) {
					return (
						<View>
							<TouchableOpacity
								onPress={() => changeMusic(index)}
								style={styles.table}
							>
								<MaterialCommunityIcons
									style={styles.icone}
									name="pause-circle"
									size={20}
									color="red"
								/>
								<Text style={styles.textMusicaPlay}>{musica.nome}</Text>
								<Text style={styles.textMusicaPlay}>{musica.artista}</Text>
					
							</TouchableOpacity>
						</View>	
					);
				} else {
					return (
						<TouchableOpacity
							onPress={() => changeMusic(index)}
							style={styles.table}
						>
							<MaterialCommunityIcons
								style={styles.icone}
								name="play-circle"
								size={20}
								color="green"
							/>
							<Text style={styles.textMusicaStop}>{musica.nome}</Text>
							<Text style={styles.textMusicaStop}>{musica.artista}</Text>
						</TouchableOpacity>
					);
				}
			})}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#222",
	},
	header: {
		backgroundColor: "#1db954",
		width: "100%",
		padding: 20,
	},
	textHeader: {
		textAlign: "center",
		fontSize: 25,
		color: "white",
	},
	table: {
		flexDirection: "row",
		padding: 20,
		borderBottomColor: "white",
		borderBottomWidth: 1,
	},
	textTable: {
		width: "50%",
		color: "rgb(200,200,200)",
	},
	textMusicaStop: {
		width: "50%",
		color: "white",
	},
	textMusicaPlay: {
		width: "50%",
		color: "rgb(100,100,100)",
	},
	icone: {
		marginLeft: -15,
		marginRight: 5,
	},
});
