import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { useAuthState } from "@/context/UserProvider";
export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="home"
              size={28}
              color={focused ? "#A67B5B" : "black"}
            />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="createTrip/index"
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="plus"
              size={28}
              color={focused ? "#A67B5B" : "black"}
            />
          ),
          headerTitle: "Create a Trip",
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="user"
              size={28}
              color={focused ? "#A67B5B" : "black"}
            />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
