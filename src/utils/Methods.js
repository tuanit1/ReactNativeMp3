import NetInfo from "@react-native-community/netinfo";

export const checkWifiConnection = async () => {

    const wifiState = await NetInfo.fetch();

    return wifiState.isConnected;

}

export const createRequest = async (url, method, params) => {

    const requestOptions = {
        method: method,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    }

    if(method !== "GET"){
        requestOptions.body = JSON.stringify(params)
    }

    const res = await fetch(url, requestOptions);
    
    return res.json();
}