import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const REPORTS = [
    { id: '1', student: '722821104056', name: 'Arun K', dept: 'CSE', issue: 'Ragging', severity: 'Severe', date: '2025-01-08', status: 'Pending' },
    { id: '2', student: '722821104001', name: 'Priya S', dept: 'ECE', issue: 'Late Attendance', severity: 'Low', date: '2025-01-07', status: 'Active' },
    { id: '3', student: '722821104088', name: 'Rahul M', dept: 'MECH', issue: 'Substance Abuse', severity: 'Critical', date: '2025-01-05', status: 'Under Review' },
];

export default function AdminDiscipline() {
    const [filter, setFilter] = useState('All');
    const [selectedReport, setSelectedReport] = useState<any>(null);

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case 'Critical': return '#c62828'; // Red
            case 'Severe': return '#ef6c00'; // Orange
            case 'Low': return '#fbc02d'; // Yellow
            default: return '#666';
        }
    };

    const handleAction = (action: string) => {
        Alert.alert('Action Taken', `${action} has been initiated for ${selectedReport?.name}.`);
        setSelectedReport(null);
    };

    const renderItem = ({ item }: { item: any }) => (
        <TouchableOpacity style={styles.card} onPress={() => setSelectedReport(item)}>
            <View style={[styles.severityStrip, { backgroundColor: getSeverityColor(item.severity) }]} />
            <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                    <Text style={styles.studentName}>{item.name}</Text>
                    <Text style={[styles.severityBadge, { color: getSeverityColor(item.severity) }]}>{item.severity}</Text>
                </View>
                <Text style={styles.studentId}>{item.student} | {item.dept}</Text>
                <Text style={styles.issueText}>{item.issue}</Text>
                <View style={styles.cardFooter}>
                    <Text style={styles.dateText}>{item.date}</Text>
                    <Text style={styles.statusText}>{item.status}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Discipline & Legal Oversight</Text>
                <Text style={styles.subtitle}>Manage student conduct and legal issues</Text>
            </View>

            {/* Stats */}
            <View style={styles.statsRow}>
                <View style={[styles.statCard, { backgroundColor: '#c62828' }]}>
                    <Text style={styles.statVal}>3</Text>
                    <Text style={styles.statLabel}>Severe Cases</Text>
                </View>
                <View style={[styles.statCard, { backgroundColor: '#1565c0' }]}>
                    <Text style={styles.statVal}>12</Text>
                    <Text style={styles.statLabel}>Active Warnings</Text>
                </View>
                <View style={[styles.statCard, { backgroundColor: '#4caf50' }]}>
                    <Text style={styles.statVal}>45</Text>
                    <Text style={styles.statLabel}>Resolved</Text>
                </View>
            </View>

            {/* Filters */}
            <View style={styles.filters}>
                {['All', 'Severe', 'Critical', 'Low'].map((f) => (
                    <TouchableOpacity
                        key={f}
                        style={[styles.filterChip, filter === f && styles.filterActive]}
                        onPress={() => setFilter(f)}
                    >
                        <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>{f}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <FlatList
                data={REPORTS.filter(r => filter === 'All' || r.severity === filter)}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />

            {/* Action Sheet Modal */}
            <Modal
                visible={!!selectedReport}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setSelectedReport(null)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Take Action</Text>
                            <TouchableOpacity onPress={() => setSelectedReport(null)}>
                                <FontAwesome name="close" size={24} color="#666" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.reportSummary}>
                            <Text style={styles.summaryName}>{selectedReport?.name} ({selectedReport?.student})</Text>
                            <Text style={styles.summaryIssue}>{selectedReport?.issue}</Text>
                            <Text style={[styles.summarySeverity, { color: getSeverityColor(selectedReport?.severity || '') }]}>
                                Severity: {selectedReport?.severity}
                            </Text>
                        </View>

                        <Text style={styles.actionLabel}>Select Disciplinary Action:</Text>

                        <TouchableOpacity style={styles.actionBtn} onPress={() => handleAction('Official Warning')}>
                            <FontAwesome name="exclamation-triangle" size={18} color="#fbc02d" />
                            <Text style={styles.actionText}>Issue Official Warning</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.actionBtn} onPress={() => handleAction('Suspension')}>
                            <FontAwesome name="ban" size={18} color="#ef6c00" />
                            <Text style={styles.actionText}>Suspend Student</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.actionBtn, { borderColor: '#c62828' }]} onPress={() => handleAction('Legal Report')}>
                            <FontAwesome name="legal" size={18} color="#c62828" />
                            <Text style={[styles.actionText, { color: '#c62828' }]}>File Legal Report</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>
        </View>
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
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1a237e',
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    statCard: {
        width: '31%',
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
        elevation: 3,
    },
    statVal: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
    },
    statLabel: {
        fontSize: 10,
        color: 'rgba(255,255,255,0.9)',
        marginTop: 2,
    },
    filters: {
        flexDirection: 'row',
        marginBottom: 15,
    },
    filterChip: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#e0e0e0',
        marginRight: 10,
    },
    filterActive: {
        backgroundColor: '#1a237e',
    },
    filterText: {
        fontSize: 12,
        color: '#333',
    },
    filterTextActive: {
        color: '#fff',
        fontWeight: 'bold',
    },
    listContent: {
        paddingBottom: 20,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 15,
        flexDirection: 'row',
        overflow: 'hidden',
        elevation: 2,
    },
    severityStrip: {
        width: 6,
    },
    cardContent: {
        flex: 1,
        padding: 15,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    studentName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    severityBadge: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    studentId: {
        fontSize: 12,
        color: '#888',
        marginBottom: 5,
    },
    issueText: {
        fontSize: 14,
        color: '#444',
        marginBottom: 8,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        paddingTop: 8,
    },
    dateText: {
        fontSize: 12,
        color: '#999',
    },
    statusText: {
        fontSize: 12,
        color: '#1a237e',
        fontWeight: '600',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 25,
        minHeight: 400,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    reportSummary: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
    summaryName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    summaryIssue: {
        fontSize: 14,
        color: '#555',
        marginBottom: 5,
    },
    summarySeverity: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    actionLabel: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 15,
        color: '#333',
    },
    actionBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#ddd',
        marginBottom: 15,
    },
    actionText: {
        marginLeft: 15,
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
});
