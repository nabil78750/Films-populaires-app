import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  FlatList,
  View,
} from "react-native";
import { useState, useEffect } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Constants from "expo-constants";
import axios from "axios";

const Movie = ({ navigation, route }) => {
  const { id } = route.params;
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const API_Key =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGM3OWZhODYyOTdhZTAwMTRkYzJhNWYiLCJlbWFpbCI6Im5hYmlsLmhvdWhvdUBob3RtYWlsLmZyIiwiZXhwaXJhdGlvbkRhdGUiOiIyMDI0LTA2LTE1VDIzOjAwOjAwLjAwMFoiLCJpc1RyYWluaW5nIjp0cnVlLCJpYXQiOjE3MDk5NzgzNDZ9.kXcIORC8WLudS6Jc1Jhh76KxWBBgVmN3GOQnnsk6Bfo";

  useEffect(() => {
    const fechData = async () => {
      try {
        const { data } = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/allocine/movie/${id}`,

          {
            headers: {
              Authorization: `Bearer ${API_Key}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("movie data>>>>", JSON.stringify(data, null, 2));
        setMovieList(data);
      } catch (error) {
        console.log("Movie catch>>>", error);
      }
      setIsLoading(false);
    };
    fechData();
  }, []);

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <View style={[styles.container, styles.moviesList]}>
      <Text style={styles.title}>{movieList.original_title}</Text>
      <Image
        style={styles.photo}
        source={{ uri: movieList.poster_path.original }}
      />
      <View style={styles.genres}>
        {movieList.genres.map((item) => {
          return (
            <Text style={styles.stlGenre} key={item.id}>
              {item.name}
            </Text>
          );
        })}
      </View>

      <ScrollView style={styles.scroll}>
        <Text style={styles.description}>{movieList.overview}</Text>
      </ScrollView>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("PopularMovies")}
      >
        <Text style={styles.toBack}>Retourner aux films</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Movie;
const styles = StyleSheet.create({
  container: { paddingTop: Constants.statusBarHeight },
  moviesList: {
    marginHorizontal: 10,
    backgroundColor: "#f1eff1",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  photo: { width: 150, height: 250, marginBottom: 25, alignSelf: "center" },
  genres: {
    gap: 10,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  stlGenre: { fontSize: 18, color: "#656465" },
  description: { textAlign: "center", fontSize: 18 },
  scroll: { height: 270, marginTop: 25 },

  btn: {
    backgroundColor: "#2d4d4d",
    width: 245,
    height: 45,
    alignSelf: "center",
    borderRadius: 10,
    justifyContent: "space-around",
    marginTop: 15,
  },
  toBack: {
    fontSize: 21,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
});
