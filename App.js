import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState, useEffect } from "react";

import Movie from "./screens/Movie";
import PopularMovies from "./screens/PopularMovies";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="PopularMovies" options={{ headerShown: false }}>
          {(props) => <PopularMovies {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Movie" options={{ headerShown: false }}>
          {(props) => <Movie {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
