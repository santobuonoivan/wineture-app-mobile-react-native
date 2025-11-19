import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";
import * as Location from "expo-location";

interface MapComponentProps {
  latitude?: number;
  longitude?: number;
  markers?: Array<{
    id: string;
    latitude: number;
    longitude: number;
    title?: string;
    description?: string;
  }>;
  onMarkerPress?: (markerId: string) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({
  latitude = -35.4161,
  longitude = -69.6167,
  markers = [],
  onMarkerPress,
}) => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLoading(false);
        return;
      }

      try {
        const location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      } catch (error) {
        console.log("Error getting location:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const createMapHTML = () => {
    const currentLat = location?.coords?.latitude || latitude;
    const currentLng = location?.coords?.longitude || longitude;

    const markersScript = markers
      .map(
        (marker) =>
          `L.marker([${marker.latitude}, ${marker.longitude}])
        .addTo(map)
        .bindPopup('${marker.title || "Vineyard"}<br>${marker.description || ""}')
        .on('click', function() {
          window.ReactNativeWebView.postMessage('${marker.id}');
        });`
      )
      .join("\n");

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <style>
          body { margin: 0; padding: 0; }
          #map { height: 100vh; width: 100vw; }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <script>
          var map = L.map('map').setView([${currentLat}, ${currentLng}], 13);
          
          L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap'
          }).addTo(map);

          ${
            location
              ? `
          L.marker([${currentLat}, ${currentLng}])
            .addTo(map)
            .bindPopup('Your Location')
            .openPopup();
          `
              : ""
          }

          ${markersScript}
        </script>
      </body>
      </html>
    `;
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading map...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <WebView
        source={{ html: createMapHTML() }}
        style={styles.map}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onMessage={(event) => {
          const markerId = event.nativeEvent.data;
          onMarkerPress?.(markerId);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default MapComponent;
