import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { setItemAsync, getItemAsync,
    deleteItemAsync } from 'expo-secure-store';
import * as SplashScreen from 'expo-splash-screen';

import { BACKEND_URL } from '@env';

import AuthContext from './src/context/AuthContext.js';

import AuthStack from './src/navigation/AuthStack.js';
import UserTabs from './src/navigation/UserTabs.js';
import BusinessTabs from './src/navigation/BusinessTabs.js'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

SplashScreen.preventAutoHideAsync();

const saveData = async (key, data) => {
  await setItemAsync(key, data);
}
const removeData = async (key) => {
    await deleteItemAsync(key);
}

export default App = () => {
    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        userSession: action.session,
                        isLoading: false,
                    };
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        isSignout: false,
                        userSession: action.session,
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        isSignout: true,
                        userSession: null,
                    };
            }
        }, {
            isLoading: true,
            isSignout: false,
            userSession: null,
        }
    );

    React.useEffect(() => {
        const hideSplash = async () => {
            await SplashScreen.hideAsync();
        }

        if (!state.isLoading) { hideSplash(); }
      }, [state.isLoading]);

    React.useEffect(() => {
        const bootstrapAsync = async () => {
            let session = null;
            try {
                auth0 = JSON.parse(
                    await getItemAsync('auth0'));
            } catch (e) { console.error(e); }
        
            if (auth0) {
              const now = new Date();
              const expirationTime = new Date(auth0.expirationTime);
              if (now < expirationTime) {
                session = {
                  token: auth0.token,
                  isBusinessOwner: auth0.isBusinessOwner
                }
              }
            }

            dispatch({ type: 'RESTORE_TOKEN', session });
        };

        bootstrapAsync();
    }, []);

    const authContext = React.useMemo(() => ({
        signIn: async (email, password) => {
          try {
            const response = await fetch(`${BACKEND_URL}/user-authe/userSign/${email}&${password}`, {
              method: 'GET',
                headers: {
                'Content-Type': 'application/json'
              }
            });
            
            if (response.status == 200) {

              const body = await response.json();
              const auth0 = {
                token: body.token,
                expirationTime: new Date().getTime()+4.32e+8,
                isBusinessOwner: body.isBusinessOwner,
                uid : body.uid,
              };
              await saveData('auth0', JSON.stringify(auth0));
              dispatch({ type: 'SIGN_IN', session: {
                token: body.token,
                isBusinessOwner: body.isBusinessOwner,
              }});
            } else { return {
              signInError: 'Email o contraseña no son correctos'
            }}
          } catch (signInError) { return {
            signInError: 'Problema de red'
          }; }
        },
        signOut: () => {
            removeData('auth0');
            dispatch({ type: 'SIGN_OUT' })
        }
    }), []);

    if (state.isLoading) { return null; }

    return (
      <GestureHandlerRootView style={{flex:1}}>
        <NavigationContainer>
            <AuthContext.Provider value={authContext}>
                { state.userSession != null
                ? (state.userSession.isBusinessOwner
                    ? <BusinessTabs />
                    : <UserTabs />)
                : <AuthStack state={state.isSignout} />
                }
            </AuthContext.Provider>
        </NavigationContainer>
        </GestureHandlerRootView>
    );
}