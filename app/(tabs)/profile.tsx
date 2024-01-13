import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useAuth} from "@clerk/clerk-expo";
import {Link} from "expo-router";

const Profile = () => {
    const {signOut, isSignedIn} = useAuth();
  return (
    <View>
      <Button title='Log Out' onPress={() => signOut()} />
        <View>
          {isSignedIn ? <View><Text>Haha</Text></View> : <Link href={'/(modals)/login'}>Login</Link>}
        </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
