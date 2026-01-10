import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function StudentAcademics() {
    const semesters = [
        { sem: 1, gpa: 8.5 },
        { sem: 2, gpa: 8.7 },
        { sem: 3, gpa: 8.2 },
        { sem: 4, gpa: 8.9 },
        { sem: 5, gpa: 8.6 },
    ];

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Semester-wise Performance</Text>
            {semesters.map((s) => (
                <View key={s.sem} style={styles.card}>
                    <Text style={styles.semText}>Semester {s.sem}</Text>
                    <Text style={styles.gpaText}>GPA: {s.gpa}</Text>
                </View>
            ))}
            <View style={[styles.card, styles.cgpaCard]}>
                <Text style={styles.semText}>Current CGPA</Text>
                <Text style={styles.gpaText}>8.58</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f7fa', padding: 20 },
    title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, color: '#333' },
    card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', elevation: 2 },
    cgpaCard: { backgroundColor: '#e8eaf6', marginTop: 10 },
    semText: { fontSize: 16, fontWeight: '500' },
    gpaText: { fontSize: 16, fontWeight: 'bold', color: '#1a237e' }
});
