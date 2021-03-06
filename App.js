import "react-native-gesture-handler";
import { ApplicationProvider } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import * as eva from "@eva-design/eva";
import { LogBox } from "react-native";
import Screen from "./app/components/Screen";
import { useNetInfo } from "@react-native-community/netinfo";

import NetworkError from "./app/components/NetworkError";
import AuthNavigation from "./app/navigation/AuthNavigation";
import { NavigationContainer } from "@react-navigation/native";
import AuthContext from "./app/auth/context";
import {
  deleteUser,
  getAnnouncements,
  getEmergencies,
  getPolls,
  isUserRegistered,
} from "./app/api/firebase";
import AppNavigation from "./app/navigation/AppNavigation";
import useGetCurrUser from "./app/auth/useGetCurrUser";
import AppLoading from "expo-app-loading";

export default function App() {
  LogBox.ignoreLogs(["Setting a timer", "Linking"]);
  const netInfo = useNetInfo();
  const [currUser, setcurrUser] = useState(false);
  useGetCurrUser("current_user", setcurrUser);

  const {
    data: announcements,
    loading: lan,
    request: loadAnnouncements,
  } = useApiRef(getAnnouncements);
  const {
    data: emergencies,
    loading: lem,
    request: loademergency,
  } = useApiRef(getEmergencies);
  const {
    data: polls,
    loading: lpoll,
    request: loadPolls,
  } = useApiRef(getPolls);
  useEffect(() => {
    loademergency();
    loadAnnouncements();
    loadPolls();
  }, []);

  if (currUser === false) {
    return <AppLoading />;
  }

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      {netInfo.isInternetReachable === false ? (
        <NetworkError />
      ) : (
        <AuthContext.Provider
          value={{
            currUser,
            setcurrUser,
            announcements,
            emergencies,
            polls,
            loadAnnouncements,
            loademergency,
            loadPolls,
            lan,
            lem,
            lpoll,
          }}
        >
          <Screen>
            <NavigationContainer>
              {currUser && isUserRegistered(currUser.email) ? (
                <AppNavigation />
              ) : (
                <AuthNavigation />
              )}
            </NavigationContainer>
          </Screen>
        </AuthContext.Provider>
      )}
    </ApplicationProvider>
  );
}
