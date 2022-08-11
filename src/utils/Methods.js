import NetInfo from "@react-native-community/netinfo";

export const checkWifiConnection = async () => {

    const wifiState = await NetInfo.fetch();

    return wifiState.isConnected;
    
}