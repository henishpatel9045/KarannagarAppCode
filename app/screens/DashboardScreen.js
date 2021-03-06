import React, { useContext, useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  FlatList,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
import colors from "../configs/colors";
import useApiRef from "../hooks/useApiRef";
import { getAnnouncements, getEmergencies, getPolls } from "../api/firebase";
import moment from "moment";
import { SpeedDial } from "react-native-elements";
import staticAppData from "../configs/staticAppData";
import LottieView from "lottie-react-native";
import AppButton from "../components/AppButton";
import AuthContext from "../auth/context";

const PollCard = ({ question, sender, receiver }) => (
  <View
    style={[
      styles.card,
      {
        backgroundColor: "rgba(0, 150, 40, 0.8)",
        shadowColor: "rgb(0, 150, 40)",
      },
    ]}
  >
    <View style={styles.cardHeader}>
      <Text style={styles.cardHeader}>Poll</Text>
      <Text style={styles.sender} numberOfLines={1}>
        {sender} : {receiver}
      </Text>
    </View>
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "baseline",
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text numberOfLines={3} style={{ color: colors.secondary }}>
          {question}
        </Text>
        <TouchableHighlight
          onPress={() => {
            return;
          }}
          underlayColor={"rgba(255,255,255,0.5)"}
          style={{ padding: 5, borderRadius: 10 }}
        >
          <MaterialCommunityIcons name="vote" size={30} color={"white"} />
        </TouchableHighlight>
      </View>
    </View>
    {/* <Text
      style={{
        fontSize: 12,
        marginTop: 5,
        alignSelf: "flex-end",
        color: "white",
      }}
    >
      Remaining Time: {remainingTime}
    </Text> */}
  </View>
);

const AnnouncementCard = ({
  title = "Announcement",
  sender,
  receiver,
  dateTime,
  message,
}) => (
  <View
    style={[
      styles.card,
      {
        backgroundColor: "rgba(0, 50, 250, 0.7)",
        shadowColor: "rgb(0, 50, 250)",
      },
    ]}
  >
    <View style={styles.cardHeader}>
      <Text style={styles.cardHeader}>{title}</Text>
      <Text style={styles.sender} numberOfLines={1}>
        {sender} : {receiver}
      </Text>
    </View>
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "baseline",
      }}
    >
      <View style={{ flex: 1 }}>
        <Text numberOfLines={2} style={{ color: colors.secondary }}>
          {message}
        </Text>
        <TouchableOpacity
          onPress={() => {
            return;
          }}
        >
          <Text style={{ fontSize: 12, color: "white", alignSelf: "flex-end" }}>
            Read More...
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 12,
            marginTop: 5,
            alignSelf: "flex-end",
            color: "white",
          }}
        >
          {dateTime}
        </Text>
      </View>
    </View>
  </View>
);

const iconsList = staticAppData.emerIconList;
const EmergencyCard = ({
  title = "Emergency",
  sender,
  type,

  dateTime,
}) => (
  <View
    style={[
      styles.card,
      {
        backgroundColor: "rgba(245, 50, 0, 0.8)",
        shadowColor: "rgb(245, 50, 0)",
      },
    ]}
  >
    <View style={styles.cardHeader}>
      <Text style={styles.cardHeader}>{title}</Text>
      <Text style={styles.sender}>{sender}</Text>
    </View>
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "baseline",
      }}
    >
      <MaterialCommunityIcons
        name={iconsList[title]}
        size={60}
        color={"white"}
      />
      <View style={{ flexDirection: "row" }}>
        <TouchableHighlight
          underlayColor={"rgba(255,255,255,0.5)"}
          onPress={() => {
            return;
          }}
          style={{ padding: 5, borderRadius: 10 }}
        >
          <MaterialCommunityIcons name="phone" size={30} color={"white"} />
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor={"rgba(255,255,255,0.5)"}
          onPress={() => {
            return;
          }}
          style={{ padding: 5, borderRadius: 10 }}
        >
          <MaterialCommunityIcons name="navigation" size={30} color={"white"} />
        </TouchableHighlight>
      </View>
    </View>
    <Text
      style={{
        fontSize: 12,

        alignSelf: "flex-end",
        color: "white",
      }}
    >
      {dateTime}
    </Text>
  </View>
);

export default function DashboardScreen({ navigation }) {
  const authContext = useContext(AuthContext);
  const [open, setopen] = useState(false);
  const [EmerRefreshing, setEmerRefreshing] = useState(false);
  const [AnnRefreshing, setAnnRefreshing] = useState(false);
  const [PollRefreshing, setPollRefreshing] = useState(false);

  const Loading = () => (
    <LottieView
      source={require("../assets/animations/loadingCircle.json")}
      loop
      autoPlay
      style={{ height: 200, width: "100%", alignSelf: "center" }}
    />
  );

  const Emergency = () => (
    <FlatList
      horizontal
      contentContainerStyle={styles.scrollStyle}
      data={authContext.emergencies.data}
      keyExtractor={(item) => item.docId.toString()}
      renderItem={({ item }) => (
        <EmergencyCard
          title={item.title}
          type={item.type}
          sender={item.sender.name}
          dateTime={moment(item.dateCreated.toDate()).format(
            "DD-MM-YYYY, hh:mm:ss"
          )}
        />
      )}
      refreshing={EmerRefreshing}
      onRefresh={() => loademergency()}
    />
  );

  const Announcement = () => (
    <FlatList
      data={authContext.announcements.data}
      contentContainerStyle={styles.scrollStyle}
      keyExtractor={(item) => item.docId.toString()}
      horizontal
      renderItem={({ item }) => (
        <AnnouncementCard
          title={item.title}
          sender={item.sender.name}
          receiver={item.receiver.join(", ")}
          message={item.message}
          dateTime={moment(item.dateCreated.toDate()).format(
            "DD-MM-YYYY, hh:mm"
          )}
        />
      )}
      refreshing={AnnRefreshing}
      onRefresh={() => loadAnnouncements()}
    />
  );

  const Poll = () => (
    <FlatList
      data={authContext.polls.data}
      keyExtractor={(item) => item.docId.toString()}
      renderItem={({ item }) => (
        <PollCard
          sender={item.sender.name}
          question={item.question}
          receiver={item.receiver}
        />
      )}
      horizontal
      contentContainerStyle={[styles.scrollStyle, { paddingBottom: 35 }]}
      refreshing={PollRefreshing}
      onRefresh={() => loadPolls()}
    />
  );

  const EditScreens = () => (
    <SpeedDial
      isOpen={open}
      icon={{ name: "add", color: "#fff" }}
      openIcon={{ name: "close", color: "#fff" }}
      onOpen={() => setopen(!open)}
      onClose={() => setopen(!open)}
    >
      <SpeedDial.Action
        icon={{ name: "message", color: "#fff" }}
        title="Create Announcement"
        onPress={() => navigation.navigate("AddAnnouncement")}
      />
      <SpeedDial.Action
        icon={{ name: "poll", color: "#fff" }}
        title="Create Poll"
        onPress={() => navigation.navigate("AddPoll")}
      />
    </SpeedDial>
  );

  const Header = () => {
    let time = new Date().toTimeString().split(":")[0];
    time = parseInt(time);
    return (
      <View style={styles.header}>
        <Text style={styles.greetingsHeader}>
          Good{" "}
          {time > 4 && time < 12
            ? "Morning"
            : time < 17
            ? "Afternoon"
            : time < 20
            ? "Evening"
            : "Night"}
          ,
        </Text>
        <Text style={styles.userHeader}>{authContext.currUser.name}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={{ width: "100%" }}>
        <View style={[styles.section, { minHeight: 200, marginTop: 20 }]}>
          <Text style={styles.sectionHeader}>Emergencies</Text>
          {authContext.lem ? <Loading /> : <Emergency />}
        </View>
        <View style={[styles.section, { minHeight: 200 }]}>
          <Text style={styles.sectionHeader}>Announcements</Text>
          {authContext.lan ? <Loading /> : <Announcement />}
        </View>
        {/* <View style={styles.section}>
          <Text style={styles.sectionHeader}>Polls</Text>
          {authContext.lpoll ? <Loading /> : <Poll />}
        </View> */}
      </ScrollView>
      <EditScreens />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    // backgroundColor: "#ededed",
    flex: 1,
  },
  header: {
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    paddingHorizontal: 10,
    paddingBottom: 35,
    top: 0,
    width: "100%",
    elevation: 10,
  },
  greetingsHeader: {
    alignSelf: "flex-start",
    color: "white",
    elevation: 2,
    fontSize: 35,
    fontWeight: "bold",
  },
  userHeader: {
    fontSize: 20,
    color: "white",
  },
  card: {
    width: 200,
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 15,
    // elevation: 500,
  },

  section: {
    width: "100%",
    marginBottom: 0,
  },
  cardHeader: {},
  sender: {
    color: "white",
  },
  sectionHeader: {
    fontSize: 30,
    color: colors.dark,
    marginLeft: 15,
    textShadowColor: colors.dark,
    textShadowRadius: 2,
  },
  cardHeader: {
    alignItems: "baseline",
    color: "white",
    flexWrap: "wrap",
    flexDirection: "row",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Roboto",
    justifyContent: "space-between",
    top: -5,
  },
  scrollStyle: { elevation: 100, paddingBottom: 20 },
});
