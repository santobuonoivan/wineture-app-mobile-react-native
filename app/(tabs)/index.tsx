import { StatusBar } from "expo-status-bar";
import { Screen } from "../../components/Screen";
import { VineyardList } from "../../components/vineyard/VineyardList";
import MapComponent from "../../components/MapComponent";

export default function HomeScreen() {
  return (
    <Screen>
      <StatusBar style="light" />
      <MapComponent />
      <VineyardList />
    </Screen>
  );
}
