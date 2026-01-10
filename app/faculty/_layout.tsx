import { Stack } from 'expo-router';
import { Text, TouchableOpacity } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function FacultyLayout() {
    const { logout } = useAuth();

    return (
        <Stack screenOptions={{
            headerStyle: { backgroundColor: '#2e7d32' }, // Green for Faculty
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
            headerRight: () => (
                <TouchableOpacity onPress={logout} style={{ marginRight: 15 }}>
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>Logout</Text>
                </TouchableOpacity>
            )
        }}>
            <Stack.Screen name="index" options={{ title: 'Faculty Dashboard' }} />
            <Stack.Screen name="profile" options={{ title: 'Faculty Profile' }} />
            <Stack.Screen name="students" options={{ title: 'Student List' }} />
        </Stack>
    );
}
