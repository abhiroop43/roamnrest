import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

interface ListingsProps {
  listings: any[];
  category: string;
}

const Listings = ({ listings, category }: ListingsProps) => {
  useEffect(() => {
    console.log("Listings: ", listings?.length);
  }, [category]);

  return (
    <View>
      <Text>Listings</Text>
    </View>
  );
};

export default Listings;

const styles = StyleSheet.create({});
