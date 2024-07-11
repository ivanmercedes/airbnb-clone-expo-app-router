import listingsDataGeo from "@/assets/data/airbnb-listings.geo.json";
import listingsData from "@/assets/data/airbnb-listings.json";
import ExpoloreHeader from "@/components/ExploreHeader";
import ListingsBottomSheet from "@/components/ListingsBottomSheet";
import ListingsMaps from "@/components/ListingsMaps";
import { Stack } from "expo-router";
import { useMemo, useState } from "react";
import { View } from "react-native";

const Page = () => {
  const [category, setCategory] = useState("Tiny homes");
  const items = useMemo(() => listingsData as any[], []);
  const listingGeo = useMemo(() => listingsDataGeo as any[], []);

  const onCategoryChanged = (category: string) => {
    console.log("category changed to [onCategoryChanged]", category);
    setCategory(category);
  };
  return (
    <View style={{ flex: 1, marginTop: 80 }}>
      <Stack.Screen
        options={{
          header: () => (
            <ExpoloreHeader onCategoryChanged={onCategoryChanged} />
          ),
        }}
      />
      {/* <Listings listings={items} category={category} /> */}
      <ListingsMaps listings={listingGeo} />
      <ListingsBottomSheet listings={items} category={category} />
    </View>
  );
};

export default Page;
