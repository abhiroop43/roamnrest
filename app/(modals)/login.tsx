import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {useWarmUpBrowser} from "@/hooks/useWarmUpBrowser";
import {defaultStyles} from "@/constants/Styles";
import {TouchableOpacity} from "react-native-gesture-handler";
import Colors from "@/constants/Colors";
import {Ionicons} from "@expo/vector-icons";
import {useOAuth} from "@clerk/clerk-expo";
import {useRouter} from "expo-router";

enum OAuthStrategy {
    Apple = 'oauth_apple',
    Google = 'oauth_google',
    Facebook = 'oauth_facebook',
}

const Login = () => {
    useWarmUpBrowser();

    const router = useRouter();

    const {startOAuthFlow: appleAuth} = useOAuth({strategy: 'oauth_apple'})
    const {startOAuthFlow: googleAuth} = useOAuth({strategy: 'oauth_google'})
    const {startOAuthFlow: facebookAuth} = useOAuth({strategy: 'oauth_facebook'})

    const onSelectAuth = async (strategy: OAuthStrategy) => {
        const selectedAuth = {
            [OAuthStrategy.Apple]: appleAuth,
            [OAuthStrategy.Google]: googleAuth,
            [OAuthStrategy.Facebook]: facebookAuth,
        }[strategy];

        try {
            const {createdSessionId, setActive} = await selectedAuth();
            console.log("createdSessionId: ", createdSessionId);

            if(createdSessionId) {
                await setActive!({session: createdSessionId});
                router.back();
            }
        } catch (err) {
            console.error("Authentication error: ", err);
        }
    };

  return (
    <View style={styles.container}>
      <TextInput autoCapitalize={'none'} placeholder={'Email'} style={[defaultStyles.inputField, {marginBottom: 30}]} />
        <TouchableOpacity style={[defaultStyles.btn]}>
            <Text style={defaultStyles.btnText}>Continue</Text>
        </TouchableOpacity>

        <View style={styles.separatorView}>
            <View style={{flex: 1, borderBottomColor: '#000', borderBottomWidth: StyleSheet.hairlineWidth}}/>
            <Text style={styles.separator}>or</Text>
            <View style={{flex: 1, borderBottomColor: '#000', borderBottomWidth: StyleSheet.hairlineWidth}}/>
        </View>

        <View style={{gap: 20}}>
            <TouchableOpacity style={[defaultStyles.btn, styles.btnOutline]}
                              onPress={() => onSelectAuth(OAuthStrategy.Facebook)}>
                <Ionicons name={'md-logo-facebook'} size={24}  style={defaultStyles.btnIcon}/>
                <Text style={[defaultStyles.btnText, styles.btnOutlineText]}>Continue with Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[defaultStyles.btn, styles.btnOutline]}
                              onPress={() => onSelectAuth(OAuthStrategy.Google)}>
                <Ionicons name={'md-logo-google'} size={24}  style={defaultStyles.btnIcon}/>
                <Text style={[defaultStyles.btnText, styles.btnOutlineText]}>Continue with Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[defaultStyles.btn, styles.btnOutline]}
                              onPress={() => onSelectAuth(OAuthStrategy.Apple)}>
                <Ionicons name={'md-logo-apple'} size={24}  style={defaultStyles.btnIcon}/>
                <Text style={[defaultStyles.btnText, styles.btnOutlineText]}>Continue with Apple</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 26
    },
    separatorView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 30,
        gap: 10,
    },
    separator: {
        fontFamily: 'cabin-semibold',
        color: Colors.grey,
    },
    btnOutline: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: Colors.grey,
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10
    },
    btnOutlineText: {
        fontFamily: 'cabin-semibold',
        color: '#000',
        fontSize: 16,
    },
});
