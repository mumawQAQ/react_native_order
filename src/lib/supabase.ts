import 'react-native-url-polyfill/auto';
import * as SecureStore from 'expo-secure-store';
import {createClient} from '@supabase/supabase-js';
import {Database} from "@/src/database.types";

const ExpoSecureStoreAdapter = {
    getItem: (key: string) => {
        return SecureStore.getItemAsync(key);
    },
    setItem: (key: string, value: string) => {
        SecureStore.setItemAsync(key, value);
    },
    removeItem: (key: string) => {
        SecureStore.deleteItemAsync(key);
    },
};

const supabaseUrl = 'https://qbdwmwiwprntvlbigbir.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFiZHdtd2l3cHJudHZsYmlnYmlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMyMDA4NzgsImV4cCI6MjAyODc3Njg3OH0.wNiv0VC3zXkhmKL4BYBTOmliqW0V0o2emtMTqQbIWls';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: ExpoSecureStoreAdapter as any,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
});
