import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function FacultyProfile() {
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.label}>Faculty Name: Prof. John Doe</Text>
                <Text style={styles.label}>Department: CSE</Text>
                <Text style={styles.label}>Designation: Assistant Professor</Text>
                <Text style={styles.label}>Experience: 10 Years</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f7fa', padding: 20 },
    card: { backgroundColor: '#fff', padding: 20, borderRadius: 10, elevation: 3 },
    label: { fontSize: 16, marginBottom: 10, color: '#333' }
});
