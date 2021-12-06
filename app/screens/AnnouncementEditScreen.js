import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  Text,
  Layout,
  IndexPath,
  Select,
  SelectItem,
} from "@ui-kitten/components";
import AppSelece from "../components/forms/AppSelece";
import AppForm from "../components/forms/AppForm";
import { useFormikContext } from "formik";
import AppInput from "../components/forms/AppInput";
import colors from "../configs/colors";
import AppButton from "../components/AppButton";
import AppFormButton from "../components/forms/AppFormButton";

const choices = ["card", "link", "text"];
const areaName = ["Vadipati", "Khadki", "Tichudiyu", "ThakorVas"];

export default function AnnouncementEditScreen() {
  const [choice, setchoice] = useState("");

  return (
    <Layout style={styles.container}>
      <Select
        onSelect={setchoice}
        selectedIndex={choice}
        value={choices[choice.row]}
        style={styles.select}
        size="large"
        placeholder="Select Template"
      >
        {choices.map((item) => (
          <SelectItem title={item} key={item} />
        ))}
      </Select>

      {choice.row === 0 && (
        <AppForm
          values={{
            title: "",
            receiver: "",
            message: "",
            date: "",
          }}
          onSubmit={(values) => {
            console.log(values);
          }}
          style={styles.form}
        >
          <AppInput
            label="Title"
            placeholder
            width="93%"
            name="title"
            size="large"
            style={{ marginBottom: 15 }}
          />
          <AppSelece
            data={areaName}
            name="receiver"
            size="large"
            style={{ marginBottom: 15, width: "93%" }}
          />

          <AppInput
            label="Message"
            placeholder
            multiline={true}
            width="93%"
            name="message"
            size="large"
            textStyle={{ minHeight: 64 }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "90%",
              marginTop: 15,
            }}
          >
            <AppButton
              title="Clear Form"
              width="40%"
              radius={15}
              color="tomato"
              size={20}
            />
            <AppFormButton
              title="POST"
              width="40%"
              size={20}
              color={colors.primary}
              radius={15}
            />
          </View>
        </AppForm>
      )}
      {choice.row === 1 && (
        <AppForm
          values={{
            title: "",

            receiver: "",
            url: "",
            date: "",
          }}
          onSubmit={(values) => {
            console.log(values);
          }}
          style={styles.form}
        >
          <AppInput
            label="Title"
            placeholder
            width="93%"
            name="title"
            size="large"
            style={{ marginBottom: 15 }}
          />

          <AppSelece
            data={areaName}
            name="receiver"
            size="large"
            style={{ marginBottom: 15, width: "93%" }}
          />
          <AppInput
            label="URL"
            placeholder
            width="93%"
            name="message"
            size="large"
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "90%",
              marginTop: 15,
            }}
          >
            <AppButton
              title="Clear Form"
              width="40%"
              radius={15}
              color="tomato"
              size={20}
            />
            <AppFormButton
              title="POST"
              width="40%"
              size={20}
              color={colors.primary}
              radius={15}
            />
          </View>
        </AppForm>
      )}
      {choice.row === 2 && (
        <AppForm
          values={{
            title: "",

            receiver: "",
            message: "",
            date: "",
          }}
          onSubmit={(values) => {
            console.log(values);
          }}
          style={styles.form}
        >
          <AppSelece
            data={areaName}
            name="receiver"
            size="large"
            style={{ marginBottom: 15, width: "93%" }}
          />
          <AppInput
            label="Message"
            placeholder
            multiline={true}
            width="93%"
            name="message"
            size="large"
            textStyle={{ minHeight: 64 }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "90%",
              marginTop: 15,
            }}
          >
            <AppButton
              title="Clear Form"
              width="40%"
              radius={15}
              color="tomato"
              size={20}
            />
            <AppFormButton
              title="POST"
              width="40%"
              size={20}
              color={colors.primary}
              radius={15}
            />
          </View>
        </AppForm>
      )}
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray,
    flex: 1,
  },
  select: {
    width: "50%",
    backgroundColor: colors.primary,
    elevation: 30,
    top: 10,
    alignSelf: "center",
    borderRadius: 20,
  },
  form: {
    backgroundColor: colors.gray,
    shadowColor: colors.dark,
    elevation: 50,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    alignSelf: "center",
    top: 50,
    paddingVertical: 25,
    width: "90%",
  },
});