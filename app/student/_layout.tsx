import { Stack } from 'expo-router';
import { Text, TouchableOpacity } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function StudentLayout() {
    const { logout } = useAuth();

    return (
        <Stack screenOptions={{
            headerStyle: { backgroundColor: '#1a237e' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
            headerRight: () => (
                <TouchableOpacity onPress={logout} style={{ marginRight: 15 }}>
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>Logout</Text>
                </TouchableOpacity>
            )
        }}>
            <Stack.Screen name="index" options={{ title: 'Student Dashboard' }} />
            <Stack.Screen name="profile" options={{ title: 'My Profile' }} />
            <Stack.Screen name="academics" options={{ title: 'Academic Details' }} />
            <Stack.Screen name="achievements" options={{ title: 'Achievements' }} />
        </Stack>
    );
}
