import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  FlatList,
  View,
} from "react-native";
import { useState, useEffect } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Constants from "expo-constants";
import axios from "axios";

const PopularMovies = ({ navigation }) => {
  const [moviesList, setMoviesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const API_Key =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGM3OWZhODYyOTdhZTAwMTRkYzJhNWYiLCJlbWFpbCI6Im5hYmlsLmhvdWhvdUBob3RtYWlsLmZyIiwiZXhwaXJhdGlvbkRhdGUiOiIyMDI0LTA2LTE1VDIzOjAwOjAwLjAwMFoiLCJpc1RyYWluaW5nIjp0cnVlLCJpYXQiOjE3MDk5NzgzNDZ9.kXcIORC8WLudS6Jc1Jhh76KxWBBgVmN3GOQnnsk6Bfo";

  useEffect(() => {
    const fechData = async () => {
      try {
        const { data } = await axios.get(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/allocine/movies/popular",
          {
            headers: {
              Authorization: `Bearer ${API_Key}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        // console.log("popular data>>>>", JSON.stringify(data.results, null, 2));
        setMoviesList(data);
      } catch (error) {
        console.log("PopularMovis catch>>>", error);
      }
      setIsLoading(false);
    };
    fechData();
  }, []);

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <KeyboardAwareScrollView style={[styles.container, styles.moviesList]}>
      <Text style={styles.title}>Films populaires</Text>

      {moviesList.results.map((item) => {
        return (
          <TouchableOpacity
            style={styles.movies}
            onPress={() => navigation.navigate("Movie", { id: item.id })}
          >
            <Image
              style={styles.photo}
              source={{ uri: item.poster_path.original }}
            />
            <View>
              <Text style={styles.titleMovie}>{item.original_title}</Text>
              <Text numberOfLines={5} style={styles.descriptionMovie}>
                {item.overview}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </KeyboardAwareScrollView>
  );
};

export default PopularMovies;
const styles = StyleSheet.create({
  container: { paddingTop: Constants.statusBarHeight },
  moviesList: { marginHorizontal: 7, backgroundColor: "#f1eff1" },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  movies: { flexDirection: "row", gap: 10 },
  photo: { width: 120, height: 180, marginBottom: 30 },
  titleMovie: { fontSize: 20, marginBottom: 15 },
  descriptionMovie: { color: "#787a79", textAlign: "left", marginRight: 130 },
});
