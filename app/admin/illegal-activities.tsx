import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function AdminIllegalActivities() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Illegal Activities Records</Text>
            <Text style={styles.subText}>View and manage reported severe incidents.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f7fa' },
    text: { fontSize: 18, fontWeight: 'bold' },
    subText: { color: '#666', marginTop: 10 }
});
