import { Layout } from "@ui-kitten/components";
import React, { useState, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { Text } from "@ui-kitten/components";
import AppButton from "../components/AppButton";
import colors from "../configs/colors";

const options = ["Henish", "Sarjil", "Om", "Divya", "Devin"];

export default function PollScreen() {
  const [res, setRes] = useState("");
  const fadeAnim1 = useRef(new Animated.Value(1)).current;
  const fadeAnim2 = useRef(new Animated.Value(0)).current;

  const fadeIn = (ref) => {
    Animated.timing(ref, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };
  const fadeOut = (ref) => {
    Animated.timing(ref, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const renderOptions = (option) => (
    <AppButton
      title={option}
      color={colors.secondary}
      key={option}
      onPress={() => {
        setRes(option);
        fadeOut(fadeAnim1);
        fadeIn(fadeAnim2);
      }}
      txtColor="black"
      radius={10}
      style={{ width: "80%", marginVertical: 5 }}
    />
  );
  const optionsComponent = [];
  for (let index = 0; index < options.length; index++) {
    optionsComponent.push(renderOptions(options[index]));
  }
  return (
    <Layout style={styles.container}>
      <View style={styles.pollPrompt}>
        <Text style={styles.question}>What's your name?</Text>
      </View>

      <Animated.View style={[styles.options, { opacity: fadeAnim1 }]}>
        {optionsComponent}
      </Animated.View>

      <Animated.View style={[styles.stats, { opacity: fadeAnim2 }]}>
        <Text category="h5" style={{ fontWeight: "bold" }}>
          Thanks For Your Response
        </Text>
        <Text>Total People Responded: 214</Text>
        <Text>For: Vadiparti</Text>
        <Text>PollCreater: Sarpanch</Text>
      </Animated.View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  pollPrompt: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 20,
    marginVertical: 30,
    padding: 15,
  },
  question: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
  },
  options: {
    alignItems: "center",
  },
  stats: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 20,
    marginVertical: 30,
    padding: 15,
    position: "absolute",
    top: 150,
    zIndex: -2,
  },
});
