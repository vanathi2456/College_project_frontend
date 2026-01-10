import { Stack } from 'expo-router';
import { Text, TouchableOpacity } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function AdminLayout() {
    const { logout } = useAuth();

    return (
        <Stack screenOptions={{
            headerStyle: { backgroundColor: '#c62828' }, // Red for Admin
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
            headerRight: () => (
                <TouchableOpacity onPress={logout} style={{ marginRight: 15 }}>
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>Logout</Text>
                </TouchableOpacity>
            )
        }}>
            <Stack.Screen name="index" options={{ title: 'Admin Dashboard' }} />
            <Stack.Screen name="manage-students" options={{ title: 'Manage Students' }} />
            <Stack.Screen name="manage-faculty" options={{ title: 'Manage Faculty' }} />
        </Stack>
    );
}
