import { ListingGeo } from "@/interfaces/listingGeo";
import { useRouter } from "expo-router";
import { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView from "react-native-map-clustering";
import { Marker, PROVIDER_GOOGLE } from "react-native-maps";

interface Props {
  listings: any;
}

const INITIAL_REGION = {
  latitude: 52.4834,
  longitude: 13.2658,
  latitudeDelta: 9,
  longitudeDelta: 9,
};

const ListingsMaps = memo(({ listings }: Props) => {
  const router = useRouter();
  const onMarkerPress = (item: ListingGeo) => {
    router.push(`/listing/${item.properties.id}`);
    console.log("onMarkerPress", item);
  };

  // Overwrite the renderCluster function to customize the cluster markers
  const renderCluster = (cluster: any) => {
    const { id, geometry, onPress, properties } = cluster;

    const points = properties.point_count;
    return (
      <Marker
        key={`cluster-${id}`}
        coordinate={{
          longitude: geometry.coordinates[0],
          latitude: geometry.coordinates[1],
        }}
        onPress={onPress}
      >
        <View style={styles.marker}>
          <Text
            style={{
              color: "#000",
              textAlign: "center",
              fontFamily: "mon-sb",
            }}
          >
            {points}
          </Text>
        </View>
      </Marker>
    );
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={StyleSheet.absoluteFill}
        showsUserLocation
        showsMyLocationButton
        initialRegion={INITIAL_REGION}
        clusterColor="#fff"
        clusterTextColor="#000"
        clusterFontFamily="mon-sb"
        renderCluster={renderCluster}
      >
        {listings.features.map((item: ListingGeo) => (
          <Marker
            onPress={() => onMarkerPress(item)}
            key={item.properties.id}
            coordinate={{
              latitude: +item.properties.latitude,
              longitude: +item.properties.longitude,
            }}
          >
            <View style={styles.marker}>
              <Text style={styles.markerText}>${item.properties.price}</Text>
            </View>
          </Marker>
        ))}
      </MapView>
    </View>
  );
});

export default ListingsMaps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  marker: {
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    elevation: 5,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 10,
    },
  },
  markerText: {
    fontSize: 14,
    fontFamily: "mon-sb",
  },
  locateBtn: {
    position: "absolute",
    top: 70,
    right: 20,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 10,
    },
  },
});
