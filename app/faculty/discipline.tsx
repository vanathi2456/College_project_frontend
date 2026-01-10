import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const ISSUE_TYPES = ['Late Attendance', 'Misconduct', 'Ragging', 'Illegal Activity', 'Dress Code'];

export default function FacultyDiscipline() {
    const router = useRouter();
    const [studentId, setStudentId] = useState('');
    const [selectedIssue, setSelectedIssue] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = () => {
        if (!studentId || !selectedIssue || !description) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }
        Alert.alert('Report Submitted', `Discipline case filed against ${studentId} for ${selectedIssue}. Admin notified.`);
        setStudentId('');
        setDescription('');
        setSelectedIssue('');
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
                <Text style={styles.title}>Report Misconduct</Text>
                <Text style={styles.subtitle}>File a disciplinary report against a student</Text>
            </View>

            <View style={styles.formCard}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Student Register Number</Text>
                    <View style={styles.inputWrapper}>
                        <FontAwesome name="search" size={16} color="#999" style={{ marginRight: 10 }} />
                        <TextInput
                            style={styles.input}
                            placeholder="Ex: 722821104..."
                            value={studentId}
                            onChangeText={setStudentId}
                        />
                    </View>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Select Issue Type</Text>
                    <View style={styles.chipContainer}>
                        {ISSUE_TYPES.map((type) => (
                            <TouchableOpacity
                                key={type}
                                style={[styles.chip, selectedIssue === type && styles.chipActive]}
                                onPress={() => setSelectedIssue(type)}
                            >
                                <Text style={[styles.chipText, selectedIssue === type && styles.chipTextActive]}>{type}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Incident Description</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="Detailed explanation of the incident..."
                        multiline
                        numberOfLines={4}
                        value={description}
                        onChangeText={setDescription}
                    />
                </View>

                <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
                    <Text style={styles.submitBtnText}>Submit Report</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.sectionHeader}>Recent Reports</Text>
            <View style={styles.historyCard}>
                <View style={styles.historyItem}>
                    <View style={styles.historyHeader}>
                        <Text style={styles.historyId}>722821104056</Text>
                        <Text style={styles.historyDate}>Today</Text>
                    </View>
                    <Text style={styles.historyIssue}>Late Attendance</Text>
                    <Text style={styles.historyStatus}>Pending Review</Text>
                </View>
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f7fa',
        padding: 20,
    },
    header: {
        marginBottom: 25,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#c62828',
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
    },
    formCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 3,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontWeight: '600',
        marginBottom: 8,
        color: '#333',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 10,
        paddingHorizontal: 15,
    },
    input: {
        flex: 1,
        paddingVertical: 12,
        fontSize: 15,
        color: '#333',
    },
    textArea: {
        backgroundColor: '#f9f9f9',
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 10,
        padding: 15,
        textAlignVertical: 'top',
        height: 100,
    },
    chipContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    chip: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
        marginRight: 10,
        marginBottom: 10,
    },
    chipActive: {
        backgroundColor: '#c62828',
    },
    chipText: {
        fontSize: 12,
        color: '#555',
    },
    chipTextActive: {
        color: '#fff',
        fontWeight: 'bold',
    },
    submitBtn: {
        backgroundColor: '#c62828',
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
    },
    submitBtnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333',
    },
    historyCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 15,
        elevation: 2,
    },
    historyItem: {
        marginBottom: 0,
    },
    historyHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    historyId: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    historyDate: {
        color: '#999',
        fontSize: 12,
    },
    historyIssue: {
        color: '#c62828',
        marginBottom: 5,
    },
    historyStatus: {
        fontSize: 12,
        color: '#f9a825',
        fontWeight: '600',
    },
});
