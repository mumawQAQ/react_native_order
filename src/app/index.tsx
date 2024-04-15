import {ActivityIndicator, View} from 'react-native';
import React from 'react';
import Button from '../components/Button';
import {Link, Redirect} from 'expo-router';
import {useAuth} from "@/src/providers/AuthProvider";

const index = () => {
    const {session, loading, isAdmin} = useAuth();

    if (loading) {
        return <ActivityIndicator/>;
    }

    if (!session) {
        return <Redirect href={'/sign-in'}/>
    }

    if (!isAdmin) {
        return <Redirect href={'/(user)'}/>
    }

    return (
        <View style={{flex: 1, justifyContent: 'center', padding: 10}}>
            <Link href={'/(user)'} asChild>
                <Button text="User"/>
            </Link>
            <Link href={'/(admin)'} asChild>
                <Button text="Admin"/>
            </Link>
        </View>
    );
};

export default index;
