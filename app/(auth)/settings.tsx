import React from 'react';
import { View, Button } from 'tamagui';

import { supabase } from '@/utils/supabase';

const Page = () => {
  return (
    <View>
      <Button onPress={() => supabase.auth.signOut()} bc="red">
        Logout
      </Button>
    </View>
  );
};

export default Page;
