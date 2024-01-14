import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Link, Stack } from 'expo-router';
import ExploreHeader from "@/components/ExploreHeader";

const Page = () => {
  return (
    <View>
      <View style={{flex: 1}}>
          <Stack.Screen options={{
              header: () => <ExploreHeader/>
          }}/>
      </View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({});
