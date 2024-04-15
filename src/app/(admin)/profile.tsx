import Button from "@/src/components/Button";
import {supabase} from "@/src/lib/supabase";
import React from "react";

const ProfileScreen = () => {
    return (
        <>
            <Button text={'Sign out'} onPress={() => {
                supabase.auth.signOut();
            }}/>
        </>
    );
}

export default ProfileScreen;
