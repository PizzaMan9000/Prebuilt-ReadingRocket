import { Session } from '@supabase/supabase-js';
import { useFonts } from 'expo-font';
import { Slot, SplashScreen, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import { TamaguiProvider, Theme } from 'tamagui';

import config from '@/tamagui.config';
import { supabase } from '@/utils/supabase';

const InitalLayout = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [initialized, setInitialized] = useState(false);

  const segments = useSegments();
  const router = useRouter();

  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  const checkTransferForums = async () => {
    const {
      data: { user: User },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase.from('user_forums').select('user_id');

    if (error) {
      console.log('🚀 ~ checkTransferForums ~ error:', error);
      return;
    }
    console.log(data);

    if (data && User) {
      for (const row of data) {
        if (row['user_id'] === User?.id) {
          router.replace('/(auth)/');
          console.log('Transferring to home');
        } else {
          router.replace('/forum/userForum');
          console.log('Transferring to the forums');
        }
      }
    }
  };

  useEffect(() => {
    if (!initialized) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (session && !inAuthGroup) {
      checkTransferForums();
    } else if (!session) {
      router.replace('/');
    }
  }, [initialized, session]);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setInitialized(true);
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return (
    <TamaguiProvider config={config}>
      <Theme name="erudito">
        <Slot />
      </Theme>
    </TamaguiProvider>
  );
};

export default InitalLayout;
