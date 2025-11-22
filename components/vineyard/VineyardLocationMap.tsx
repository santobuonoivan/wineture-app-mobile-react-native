import React from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

interface VineyardLocationMapProps {
  latitude: number;
  longitude: number;
  vineyardName: string;
}

export const VineyardLocationMap: React.FC<VineyardLocationMapProps> = ({
  latitude,
  longitude,
  vineyardName,
}) => {
  const createMapHTML = () => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <style>
          html, body { margin: 0; padding: 0; height: 100%; }
          #map { height: 100%; width: 100%; }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <script>
          var map = L.map('map').setView([${latitude}, ${longitude}], 13);

          L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap'
          }).addTo(map);

          L.marker([${latitude}, ${longitude}])
            .addTo(map)
            .bindPopup('${vineyardName.replace(/'/g, "\\'")}');
        </script>
      </body>
      </html>
    `;
  };

  return (
    <View style={styles.container}>
      <WebView
        source={{ html: createMapHTML() }}
        style={styles.map}
        javaScriptEnabled
        domStorageEnabled
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
