import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function StudentQuery() {
    const router = useRouter();
    const [category, setCategory] = useState('Academic');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = () => {
        if (!subject || !message) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }
        Alert.alert('Query Submitted', 'Your ticket has been raised. ID: #TKT-2026001');
        router.back();
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Raise a Query</Text>
                <Text style={styles.subtitle}>We are here to help you.</Text>
            </View>

            <View style={styles.formCard}>
                <Text style={styles.label}>Category</Text>
                <View style={styles.catRow}>
                    {['Academic', 'Hostel', 'Transport', 'Accounts'].map((c) => (
                        <TouchableOpacity
                            key={c}
                            style={[styles.catChip, category === c && styles.catActive]}
                            onPress={() => setCategory(c)}
                        >
                            <Text style={[styles.catText, category === c && styles.catTextActive]}>{c}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Text style={styles.label}>Subject</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Brief subject..."
                    value={subject}
                    onChangeText={setSubject}
                />

                <Text style={styles.label}>Message</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Describe your issue..."
                    multiline
                    numberOfLines={5}
                    value={message}
                    onChangeText={setMessage}
                />

                <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
                    <Text style={styles.submitBtnText}>Submit Ticket</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f7fa', padding: 20 },
    header: { marginBottom: 30, alignItems: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', color: '#1a237e' },
    subtitle: { color: '#666', marginTop: 5 },
    formCard: { backgroundColor: '#fff', padding: 25, borderRadius: 15, elevation: 3 },
    label: { fontWeight: '600', marginBottom: 10, color: '#333' },
    catRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20 },
    catChip: { paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20, backgroundColor: '#f0f0f0', marginRight: 10, marginBottom: 10 },
    catActive: { backgroundColor: '#1a237e' },
    catText: { fontSize: 12, color: '#555' },
    catTextActive: { color: '#fff' },
    input: { backgroundColor: '#f9f9f9', borderWidth: 1, borderColor: '#eee', borderRadius: 10, padding: 15, marginBottom: 20 },
    textArea: { height: 120, textAlignVertical: 'top' },
    submitBtn: { backgroundColor: '#1a237e', padding: 15, borderRadius: 12, alignItems: 'center' },
    submitBtnText: { color: '#fff', fontWeight: 'bold' }
});
