import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function FacultyUpdates() {
    const [activeTab, setActiveTab] = useState<'attendance' | 'marks'>('attendance');
    const [selectedClass, setSelectedClass] = useState('CSE-II-A');
    const [subject, setSubject] = useState('');
    const [notes, setNotes] = useState('');

    const handleUpload = () => {
        Alert.alert('Success', `${activeTab === 'attendance' ? 'Attendance' : 'Marks'} uploaded successfully for ${selectedClass}.`);
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
            <StatusBar barStyle="light-content" />
            <LinearGradient
                colors={['#00A86B', '#00796B']}
                style={styles.header}
            >
                <Text style={styles.headerTitle}>Academic Updates</Text>
                <Text style={styles.headerSubtitle}>Manage Attendance & Marks</Text>
            </LinearGradient>

            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'attendance' && styles.activeTab]}
                    onPress={() => setActiveTab('attendance')}
                >
                    <Text style={[styles.tabText, activeTab === 'attendance' && styles.activeTabText]}>Attendance</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'marks' && styles.activeTab]}
                    onPress={() => setActiveTab('marks')}
                >
                    <Text style={[styles.tabText, activeTab === 'marks' && styles.activeTabText]}>Internal Marks</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <Animated.View entering={FadeInDown.duration(600)} style={styles.card}>
                    <Text style={styles.label}>Select Class</Text>
                    <View style={styles.row}>
                        {['CSE-II-A', 'CSE-III-B', 'CSE-IV-A'].map((cls) => (
                            <TouchableOpacity
                                key={cls}
                                style={[styles.chip, selectedClass === cls && styles.activeChip]}
                                onPress={() => setSelectedClass(cls)}
                            >
                                <Text style={[styles.chipText, selectedClass === cls && styles.activeChipText]}>{cls}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <Text style={styles.label}>Subject Code / Name</Text>
                    <View style={styles.inputWrapper}>
                        <FontAwesome name="book" size={16} color="#666" style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder="e.g. CS8601 - AI"
                            value={subject}
                            onChangeText={setSubject}
                        />
                    </View>

                    {activeTab === 'marks' && (
                        <>
                            <Text style={styles.label}>Exam Title</Text>
                            <View style={styles.inputWrapper}>
                                <FontAwesome name="file-text-o" size={16} color="#666" style={styles.icon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="e.g. Internal Assessment 1"
                                />
                            </View>
                        </>
                    )}

                    <Text style={styles.label}>Description / Notes</Text>
                    <View style={[styles.inputWrapper, { alignItems: 'flex-start', height: 100, paddingVertical: 10 }]}>
                        <TextInput
                            style={[styles.input, { height: '100%', textAlignVertical: 'top' }]}
                            placeholder="Add any specific remarks..."
                            multiline
                            value={notes}
                            onChangeText={setNotes}
                        />
                    </View>

                    <TouchableOpacity style={styles.uploadBtn} onPress={handleUpload}>
                        <LinearGradient
                            colors={['#00A86B', '#00796B']}
                            style={styles.gradientBtn}
                        >
                            <Text style={styles.btnText}>
                                {activeTab === 'attendance' ? 'Mark Attendance' : 'Upload Marks'}
                            </Text>
                            <MaterialIcons name="cloud-upload" size={20} color="#fff" style={{ marginLeft: 10 }} />
                        </LinearGradient>
                    </TouchableOpacity>
                </Animated.View>

                <View style={styles.infoCard}>
                    <FontAwesome name="info-circle" size={20} color="#0056D2" />
                    <Text style={styles.infoText}>
                        Ensure you select the correct academic year and semester before uploading.
                    </Text>
                </View>

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
    },
    headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
    headerSubtitle: { fontSize: 13, color: 'rgba(255,255,255,0.9)', marginTop: 2 },

    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginHorizontal: 20,
        marginTop: 20,
        borderRadius: 12,
        padding: 4,
        elevation: 2,
    },
    tab: { flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 10 },
    activeTab: { backgroundColor: '#E8F5E9' },
    tabText: { fontSize: 14, fontWeight: '600', color: '#666' },
    activeTabText: { color: '#00A86B', fontWeight: 'bold' },

    content: { padding: 20 },
    card: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        marginBottom: 20,
    },
    label: { fontSize: 13, fontWeight: '700', color: '#444', marginBottom: 10, marginTop: 5, textTransform: 'uppercase' },
    row: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 15 },
    chip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#f5f5f5',
        marginRight: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#eee',
    },
    activeChip: { backgroundColor: '#00A86B', borderColor: '#00A86B' },
    chipText: { fontSize: 13, color: '#555' },
    activeChipText: { color: '#fff', fontWeight: 'bold' },

    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 12,
        paddingHorizontal: 15,
        height: 50,
        marginBottom: 15,
    },
    icon: { marginRight: 10 },
    input: { flex: 1, fontSize: 15, color: '#333' },

    uploadBtn: { marginTop: 10, borderRadius: 12, overflow: 'hidden', elevation: 5 },
    gradientBtn: { paddingVertical: 15, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
    btnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },

    infoCard: {
        flexDirection: 'row',
        backgroundColor: '#E3F2FD',
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
    },
    infoText: { color: '#0056D2', marginLeft: 10, flex: 1, fontSize: 13, lineHeight: 18 },
});
