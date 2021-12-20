import { useState, useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

export default () => {
  const [accessToken, setaccessToken] = useState(null);
  const [user, setUser] = useState({});
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "451510403937-d5ibi7lg91uig4iqflq9ccr6fpfihcbq.apps.googleusercontent.com",
    // iosClientId: "GOOGLE_GUID.apps.googleusercontent.com",
    // androidClientId: "GOOGLE_GUID.apps.googleusercontent.com",
    webClientId:
      "451510403937-d5ibi7lg91uig4iqflq9ccr6fpfihcbq.apps.googleusercontent.com",
  });

  const fetchUserInfo = async (token) => {
    await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((user) => setUser(user));
  };

  const logIn = () => promptAsync();

  useEffect(() => {
    WebBrowser.warmUpAsync();
    return () => {
      WebBrowser.coolDownAsync();
    };
  }, []);
  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      setaccessToken(authentication.accessToken);
    }
  }, [response]);

  if (accessToken) fetchUserInfo(accessToken);

  return { user, logIn };
};