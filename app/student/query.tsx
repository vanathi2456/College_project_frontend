import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

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
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
            <StatusBar barStyle="light-content" />
            <LinearGradient
                colors={['#FF8C00', '#F57C00']} // Orange Theme for Queries
                style={styles.header}
            >
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <FontAwesome name="arrow-left" size={20} color="#fff" />
                </TouchableOpacity>
                <View>
                    <Text style={styles.headerTitle}>Help & Support</Text>
                    <Text style={styles.headerSubtitle}>Raise a ticket for any issues</Text>
                </View>
            </LinearGradient>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                <Animated.View entering={FadeInDown.duration(600)} style={styles.formCard}>
                    <Text style={styles.label}>Select Category</Text>
                    <View style={styles.catRow}>
                        {['Academic', 'Hostel', 'Transport', 'Accounts', 'Library', 'Other'].map((c) => (
                            <TouchableOpacity
                                key={c}
                                style={[styles.catChip, category === c && styles.catActive]}
                                onPress={() => setCategory(c)}
                                activeOpacity={0.8}
                            >
                                <Text style={[styles.catText, category === c && styles.catTextActive]}>{c}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <Text style={styles.label}>Subject</Text>
                    <View style={styles.inputWrapper}>
                        <FontAwesome name="tag" size={16} color="#999" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Brief subject of your query..."
                            value={subject}
                            onChangeText={setSubject}
                        />
                    </View>

                    <Text style={styles.label}>Description</Text>
                    <View style={[styles.inputWrapper, styles.textAreaWrapper]}>
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder="Describe your issue in detail..."
                            multiline
                            numberOfLines={5}
                            value={message}
                            onChangeText={setMessage}
                        />
                    </View>

                    <TouchableOpacity style={styles.submitBtnContainer} onPress={handleSubmit}>
                        <LinearGradient
                            colors={['#0056D2', '#1565C0']}
                            style={styles.submitBtn}
                        >
                            <Text style={styles.submitBtnText}>Submit Query</Text>
                            <FontAwesome name="paper-plane" size={16} color="#fff" style={{ marginLeft: 8 }} />
                        </LinearGradient>
                    </TouchableOpacity>
                </Animated.View>

            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F5F7FA' },
    header: {
        paddingTop: Platform.OS === 'android' ? 50 : 20,
        paddingBottom: 25,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        elevation: 5,
        shadowColor: '#FF8C00',
        shadowOpacity: 0.3,
        flexDirection: 'row',
        alignItems: 'center',
    },
    backBtn: { marginRight: 20, padding: 5 },
    headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
    headerSubtitle: { fontSize: 14, color: 'rgba(255,255,255,0.9)', marginTop: 2 },
    scrollContent: { padding: 20 },

    formCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 24,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 12,
        marginTop: 5,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    catRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20 },
    catChip: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 25,
        backgroundColor: '#F3F4F6',
        marginRight: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    catActive: {
        backgroundColor: '#FF8C00',
        borderColor: '#FF8C00',
    },
    catText: { fontSize: 13, color: '#555', fontWeight: '500' },
    catTextActive: { color: '#fff', fontWeight: 'bold' },

    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F9FAFB',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        paddingHorizontal: 15,
        marginBottom: 20,
    },
    inputIcon: { marginRight: 10 },
    input: {
        flex: 1,
        paddingVertical: 14,
        fontSize: 15,
        color: '#333',
    },
    textAreaWrapper: {
        alignItems: 'flex-start',
        paddingVertical: 5,
    },
    textArea: {
        minHeight: 100,
        textAlignVertical: 'top',
    },
    submitBtnContainer: {
        marginTop: 10,
        shadowColor: '#0056D2',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    submitBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 16,
        borderRadius: 14,
    },
    submitBtnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
});
