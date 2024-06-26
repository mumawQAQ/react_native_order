import {Alert, StyleSheet, Text, TextInput, View} from "react-native";
import {Link, Stack} from "expo-router";
import Button from "@/src/components/Button";
import Colors from "@/src/constants/Colors";
import {useState} from "react";
import {supabase} from "@/src/lib/supabase";

const SignUpScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    async function signUpWithEmail() {
        setLoading(true)
        const {error} = await supabase.auth.signUp({email, password});
        if (error) {
            Alert.alert('Error', error.message);
        }
        setLoading(false)
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{title: "Sign up"}}/>

            <Text style={styles.label}>Email</Text>
            <TextInput placeholder="jon@gmail.com" style={styles.input} value={email} onChangeText={setEmail}/>

            <Text style={styles.label}>Password</Text>
            <TextInput secureTextEntry={true} style={styles.input} value={password} onChangeText={setPassword}/>

            <Button onPress={signUpWithEmail} disabled={loading}
                    text={loading ? "Creating account..." : "Create account"}/>
            <Link href={'/sign-in'} style={styles.textButton}>Sign in</Link>
        </View>
    );
}

export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        justifyContent: 'center',
        flex: 1,
    },
    label: {
        color: 'gray',
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        marginTop: 5,
        marginBottom: 20,
        backgroundColor: 'white',
        borderRadius: 5,
    },
    textButton: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: Colors.light.tint,
        marginVertical: 10,
    },
});
