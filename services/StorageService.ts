import AsyncStorage from '@react-native-async-storage/async-storage';

export const StorageService = {
    storeData: async (key: string, value: string) => {
        await AsyncStorage.setItem(key, value);
    },
    getData: async (key: string): Promise<string | null> => {
          return await AsyncStorage.getItem(key);
    },
};