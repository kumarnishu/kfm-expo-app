import { Slot } from 'expo-router';
import { UserProvider } from '../contexts/UserContext';
import { ChoiceProvider } from '../contexts/ModalContext';
import { QueryClientProvider, QueryClient } from "react-query";
import { SafeAreaProvider } from 'react-native-safe-area-context';


export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnReconnect: true,
            refetchOnMount: true,
            refetchOnWindowFocus: true,
            retry: false,
            staleTime: 200
        }
    }
});
export default function Root() {
    return (
        <QueryClientProvider client={queryClient}>
            <UserProvider>
                <ChoiceProvider>
                    <SafeAreaProvider>
                        <Slot />
                    </SafeAreaProvider>
                </ChoiceProvider>
            </UserProvider>
        </QueryClientProvider>
    );
}
