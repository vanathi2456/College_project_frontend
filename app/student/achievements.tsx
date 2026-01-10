import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function StudentAchievements() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>No achievements recorded yet.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' },
    text: { fontSize: 16, color: '#666' }
});
