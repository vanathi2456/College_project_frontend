import React from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const students = [
    { id: '1', name: 'Student A', regNo: '722821104001' },
    { id: '2', name: 'Student B', regNo: '722821104002' },
    { id: '3', name: 'Student C', regNo: '722821104003' },
];

export default function FacultyStudents() {
    const handleCall = (name: string) => {
        Alert.alert("Call Student", `Calling parent of ${name}...`);
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={students}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.regNo}>{item.regNo}</Text>
                        </View>
                        <TouchableOpacity style={styles.callBtn} onPress={() => handleCall(item.name)}>
                            <Text style={styles.callText}>Call Parent</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f7fa', padding: 15 },
    card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 2 },
    name: { fontSize: 16, fontWeight: 'bold' },
    regNo: { color: '#666' },
    callBtn: { backgroundColor: '#e53935', padding: 8, borderRadius: 5 },
    callText: { color: '#fff', fontSize: 12, fontWeight: 'bold' }
});
