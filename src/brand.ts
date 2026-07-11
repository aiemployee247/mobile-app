import { Platform } from 'react-native';

/** Android = GStream, iOS = AStream */
export const brand = {
  name: Platform.OS === 'ios' ? 'AStream' : 'GStream',
  id: Platform.OS === 'ios' ? 'astream' : 'gstream',
  bundleId:
    Platform.OS === 'ios' ? 'com.astream.auth' : 'com.gstream.auth',
} as const;
