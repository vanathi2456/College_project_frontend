import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const DISCIPLINE_RECORDS = [
    { id: 1, type: 'Warning', date: '2025-10-12', reason: 'Late to class (3rd instance)', status: 'Active', color: '#ff9800' },
    { id: 2, type: 'Notice', date: '2025-09-05', reason: 'Dress code violation', status: 'Resolved', color: '#4caf50' },
];

const ILLEGAL_ACTIVITIES = [
    // Empty for now, showing "Good Standing"
];

export default function StudentDiscipline() {
    const router = useRouter();

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Discipline & Compliance</Text>
                <Text style={styles.subtitle}>Track your conduct record and status</Text>
            </View>

            {/* Overall Status Card */}
            <View style={[styles.statusCard, { backgroundColor: '#4caf50' }]}>
                <View style={styles.statusIcon}>
                    <FontAwesome name="check-circle" size={40} color="#fff" />
                </View>
                <View style={styles.statusContent}>
                    <Text style={styles.statusTitle}>Good Standing</Text>
                    <Text style={styles.statusDesc}>You have no major disciplinary actions.</Text>
                </View>
            </View>

            {/* Warnings Section */}
            <Text style={styles.sectionHeader}>Active Warnings & Notices</Text>
            {DISCIPLINE_RECORDS.map((record) => (
                <View key={record.id} style={[styles.recordCard, { borderLeftColor: record.color }]}>
                    <View style={styles.recordHeader}>
                        <View style={styles.recordTypeTag}>
                            <Text style={[styles.recordType, { color: record.color }]}>{record.type}</Text>
                        </View>
                        <Text style={styles.recordDate}>{record.date}</Text>
                    </View>
                    <Text style={styles.recordReason}>{record.reason}</Text>
                    <Text style={[styles.recordStatus, { color: record.status === 'Resolved' ? '#4caf50' : '#ff9800' }]}>
                        Status: {record.status}
                    </Text>
                </View>
            ))}

            {/* Illegal Activity Section (Read-Only) */}
            <Text style={styles.sectionHeader}>Illegal Activity Record</Text>
            {ILLEGAL_ACTIVITIES.length === 0 ? (
                <View style={styles.emptyState}>
                    <FontAwesome name="shield" size={50} color="#ddd" />
                    <Text style={styles.emptyText}>No illegal activities recorded.</Text>
                    <Text style={styles.emptySubText}>Keep up the good conduct!</Text>
                </View>
            ) : (
                <View>
                    {/* Render items if any */}
                </View>
            )}

            {/* Compliance Guidelines */}
            <View style={styles.infoBox}>
                <FontAwesome name="info-circle" size={24} color="#1a237e" />
                <Text style={styles.infoText}>
                    Strict action involves reporting to parents and legal authorities for severe misconduct (ragging, substance abuse, etc.).
                </Text>
            </View>

            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Text style={styles.backButtonText}>Back to Dashboard</Text>
            </TouchableOpacity>
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
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1a237e',
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
    statusCard: {
        flexDirection: 'row',
        padding: 20,
        borderRadius: 15,
        alignItems: 'center',
        marginBottom: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 4,
    },
    statusIcon: {
        marginRight: 20,
    },
    statusContent: {
        flex: 1,
    },
    statusTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    statusDesc: {
        color: '#e8f5e9',
        fontSize: 13,
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
    },
    recordCard: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 12,
        marginBottom: 15,
        borderLeftWidth: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    recordHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    recordTypeTag: {
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    recordType: {
        fontWeight: 'bold',
        fontSize: 12,
    },
    recordDate: {
        color: '#999',
        fontSize: 12,
    },
    recordReason: {
        fontSize: 15,
        color: '#333',
        marginBottom: 8,
    },
    recordStatus: {
        fontSize: 12,
        fontWeight: '600',
    },
    emptyState: {
        alignItems: 'center',
        padding: 30,
        backgroundColor: '#fff',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#eee',
        borderStyle: 'dashed',
        marginBottom: 20,
    },
    emptyText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#666',
        marginTop: 15,
    },
    emptySubText: {
        fontSize: 13,
        color: '#999',
    },
    infoBox: {
        flexDirection: 'row',
        backgroundColor: '#e8eaf6',
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 30,
    },
    infoText: {
        flex: 1,
        marginLeft: 15,
        color: '#1a237e',
        fontSize: 12,
        lineHeight: 18,
    },
    backButton: {
        alignSelf: 'center',
        paddingVertical: 12,
        paddingHorizontal: 30,
    },
    backButtonText: {
        color: '#666',
        fontWeight: '600',
    },
});
