import React from "react";
import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { Audio, Video } from "expo-av";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Player = (props) => {
	const handlePlay = async () => {
		let curFile = props.musicas[props.audioIndex].file;

		let newMusicas = props.musicas.filter((music, index) => {
			if (props.audioIndex == index) {
				props.musicas[index].playing = true;
				curFile = props.musicas[index].file;
			} else {
				props.musicas[index].playing = false;
			}
			return props.musicas[index];
		});

		try {
			if (props.audio != null) {
				props.setPlaying(true);
				props.setMusicas(newMusicas);
				await props.audio.playAsync();
			} else {
				let curAudio = new Audio.Sound();
				try {
					await curAudio.loadAsync(curFile);
					await curAudio.playAsync();
				} catch (error) {}
				props.setAudio(curAudio);
				props.setMusicas(newMusicas);
				props.setPlaying(true);
			}
		} catch (error) {}
	};

	const handlePause = async () => {
		if (props.audio != null) {
			props.audio.pauseAsync();
		}
		props.setPlaying(false);
	};

	const handleBack = async () => {
		let newIndex = props.audioIndex - 1;
		if (newIndex < 0) {
			newIndex = props.musicas.length - 1;
		}
		props.setAudioIndex(newIndex);

		let curFile = props.musicas[newIndex].file;

		//atualizar interface de app.
		let newMusicas = props.musicas.filter((music, index) => {
			if (newIndex == index) {
				props.musicas[index].playing = true;
				curFile = props.musicas[index].file;
			} else {
				props.musicas[index].playing = false;
			}
			return props.musicas[index];
		});

		//reproduzir audio em questão
		if (props.audio != null) {
			props.audio.unloadAsync();
		}

		let curAudio = new Audio.Sound();
		try {
			await curAudio.loadAsync(curFile);
			await curAudio.playAsync();
		} catch (error) {}
		props.setAudio(curAudio);
		props.setMusicas(newMusicas);
		props.setPlaying(true);
	};

	const handleNext = async () => {
		let newIndex = props.audioIndex + 1;
		if (newIndex >= props.musicas.length) {
			newIndex = 0;
		}
		props.setAudioIndex(newIndex);

		let curFile = props.musicas[newIndex].file;

		//atualizar interface de app.
		let newMusicas = props.musicas.filter((music, index) => {
			if (newIndex == index) {
				props.musicas[index].playing = true;
				curFile = props.musicas[index].file;
			} else {
				props.musicas[index].playing = false;
			}
			return props.musicas[index];
		});

		//reproduzir audio em questão
		if (props.audio != null) {
			props.audio.unloadAsync();
		}

		let curAudio = new Audio.Sound();
		try {
			await curAudio.loadAsync(curFile);
			await curAudio.playAsync();
		} catch (error) {}
		props.setAudio(curAudio);
		props.setMusicas(newMusicas);
		props.setPlaying(true);
	};

	return (
		<View style={styles.player}>
			<TouchableOpacity onPress={() => handleBack()} style={styles.btn}>
				<MaterialCommunityIcons name="play-circle" size={35} color="white" />
			</TouchableOpacity>
			{!props.playing ? (
				<TouchableOpacity onPress={() => handlePlay()} style={styles.btn}>
					<MaterialCommunityIcons name="play-circle" size={35} color="white" />
				</TouchableOpacity>
			) : (
				<TouchableOpacity onPress={() => handlePause()} style={styles.btn}>
					<MaterialCommunityIcons
						name="plause-circle"
						size={35}
						color="white"
					/>
				</TouchableOpacity>
			)}
			<TouchableOpacity onPress={() => handleNext()} style={styles.btn}>
				<MaterialCommunityIcons name="play-circle" size={35} color="white" />
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	player: {
		width: "100%",
		height: 80,
		position: "absolute",
		bottom: 0,
		left: 0,
		zIndex: 1,
		backgroundColor: "#111",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
	},
	btn: {
		marginRight: 20,
		marginLeft: 20,
	},
});

export default Player;
