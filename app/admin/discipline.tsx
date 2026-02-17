import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Alert, FlatList, Modal, Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, SlideInUp } from 'react-native-reanimated';

const REPORTS = [
    { id: '1', student: '722821104056', name: 'Arun K', dept: 'CSE', issue: 'Ragging', severity: 'Severe', date: '2025-01-08', status: 'Pending' },
    { id: '2', student: '722821104001', name: 'Priya S', dept: 'ECE', issue: 'Late Attendance', severity: 'Low', date: '2025-01-07', status: 'Active' },
    { id: '3', student: '722821104088', name: 'Rahul M', dept: 'MECH', issue: 'Substance Abuse', severity: 'Critical', date: '2025-01-05', status: 'Under Review' },
    { id: '4', student: '722821104044', name: 'Sneha R', dept: 'IT', issue: 'Misconduct', severity: 'Low', date: '2025-01-02', status: 'Resolved' },
];

export default function AdminDiscipline() {
    const [filter, setFilter] = useState('All');
    const [selectedReport, setSelectedReport] = useState<any>(null);

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case 'Critical': return '#D32F2F'; // Red
            case 'Severe': return '#EF6C00'; // Orange
            case 'Low': return '#FBC02D'; // Yellow
            default: return '#666';
        }
    };

    const handleAction = (action: string) => {
        Alert.alert('Action Taken', `${action} has been initiated for ${selectedReport?.name}.`);
        setSelectedReport(null);
    };

    const renderItem = ({ item, index }: { item: any, index: number }) => (
        <Animated.View entering={FadeInDown.delay(index * 100).duration(500)}>
            <TouchableOpacity style={styles.card} onPress={() => setSelectedReport(item)} activeOpacity={0.9}>
                <View style={[styles.severityStrip, { backgroundColor: getSeverityColor(item.severity) }]} />
                <View style={styles.cardContent}>
                    <View style={styles.cardHeader}>
                        <View>
                            <Text style={styles.studentName}>{item.name}</Text>
                            <Text style={styles.studentId}>{item.student} | {item.dept}</Text>
                        </View>
                        <View style={[styles.badge, { backgroundColor: getSeverityColor(item.severity) + '20' }]}>
                            <Text style={[styles.badgeText, { color: getSeverityColor(item.severity) }]}>{item.severity}</Text>
                        </View>
                    </View>

                    <Text style={styles.issueText}>{item.issue}</Text>

                    <View style={styles.divider} />

                    <View style={styles.cardFooter}>
                        <View style={styles.dateBox}>
                            <FontAwesome name="calendar" size={12} color="#999" />
                            <Text style={styles.dateText}> {item.date}</Text>
                        </View>
                        <View style={[styles.statusBox, item.status === 'Resolved' && { backgroundColor: '#E8F5E9' }]}>
                            <Text style={[styles.statusText, item.status === 'Resolved' && { color: '#2E7D32' }]}>{item.status}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <LinearGradient
                colors={['#C62828', '#B71C1C']}
                style={styles.header}
            >
                <Text style={styles.headerTitle}>Legal & Discipline</Text>
                <Text style={styles.headerSubtitle}>Monitor and act on misconduct reports</Text>

                {/* Stats Row */}
                <View style={styles.statsRow}>
                    <View style={[styles.statCard, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
                        <Text style={styles.statVal}>3</Text>
                        <Text style={styles.statLabel}>Severe</Text>
                    </View>
                    <View style={[styles.statCard, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
                        <Text style={styles.statVal}>12</Text>
                        <Text style={styles.statLabel}>Active</Text>
                    </View>
                    <View style={[styles.statCard, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
                        <Text style={styles.statVal}>45</Text>
                        <Text style={styles.statLabel}>Resolved</Text>
                    </View>
                </View>
            </LinearGradient>

            {/* Filters */}
            <View style={styles.filterContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
                    {['All', 'Severe', 'Critical', 'Low', 'Resolved'].map((f) => (
                        <TouchableOpacity
                            key={f}
                            style={[styles.filterChip, filter === f && styles.filterActive]}
                            onPress={() => setFilter(f)}
                        >
                            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>{f}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <FlatList
                data={REPORTS.filter(r => filter === 'All' || r.severity === filter || (filter === 'Resolved' && r.status === 'Resolved'))}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />

            {/* Action Sheet Modal */}
            <Modal
                visible={!!selectedReport}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setSelectedReport(null)}
            >
                <View style={styles.modalOverlay}>
                    <Animated.View entering={SlideInUp.springify()} style={styles.modalContent}>
                        <View style={styles.modalTopBar} />

                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Take Disciplinary Action</Text>
                            <TouchableOpacity onPress={() => setSelectedReport(null)} style={styles.closeBtn}>
                                <MaterialIcons name="close" size={24} color="#666" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.reportSummary}>
                            <View style={[styles.summaryIcon, { backgroundColor: getSeverityColor(selectedReport?.severity || '') + '20' }]}>
                                <FontAwesome name="exclamation" size={20} color={getSeverityColor(selectedReport?.severity || '')} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.summaryName}>{selectedReport?.name}</Text>
                                <Text style={styles.summaryIssue}>{selectedReport?.issue}</Text>
                            </View>
                        </View>

                        <Text style={styles.actionLabel}>SELECT ACTION</Text>

                        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#FFF8E1' }]} onPress={() => handleAction('Official Warning')}>
                            <View style={[styles.actionIcon, { backgroundColor: '#FFECB3' }]}>
                                <FontAwesome name="exclamation-triangle" size={16} color="#FBC02D" />
                            </View>
                            <Text style={[styles.actionText, { color: '#F57F17' }]}>Issue Official Warning</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#FBE9E7' }]} onPress={() => handleAction('Suspension')}>
                            <View style={[styles.actionIcon, { backgroundColor: '#FFCCBC' }]}>
                                <FontAwesome name="ban" size={16} color="#E64A19" />
                            </View>
                            <Text style={[styles.actionText, { color: '#D84315' }]}>Suspend Student</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#FFEBEE', borderColor: '#EF9A9A', borderWidth: 1 }]} onPress={() => handleAction('Legal Report')}>
                            <View style={[styles.actionIcon, { backgroundColor: '#FFCDD2' }]}>
                                <FontAwesome name="legal" size={16} color="#C62828" />
                            </View>
                            <Text style={[styles.actionText, { color: '#C62828' }]}>File Legal Report</Text>
                        </TouchableOpacity>

                    </Animated.View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F5F7FA' },
    header: {
        paddingTop: Platform.OS === 'android' ? 50 : 20,
        paddingBottom: 20,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        elevation: 5,
    },
    headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
    headerSubtitle: { fontSize: 13, color: 'rgba(255,255,255,0.9)', marginTop: 2 },

    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    statCard: {
        width: '31%',
        padding: 12,
        borderRadius: 12,
        alignItems: 'center',
    },
    statVal: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
    statLabel: { fontSize: 10, color: 'rgba(255,255,255,0.9)', marginTop: 2, textTransform: 'uppercase' },

    filterContainer: { marginTop: 15, paddingLeft: 20, height: 40 },
    filters: { paddingRight: 20 },
    filterChip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#E0E0E0',
        marginRight: 10,
    },
    filterActive: { backgroundColor: '#C62828' },
    filterText: { fontSize: 12, color: '#555', fontWeight: '600' },
    filterTextActive: { color: '#fff' },

    listContent: { padding: 20, paddingBottom: 50 },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        marginBottom: 15,
        flexDirection: 'row',
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    severityStrip: { width: 6 },
    cardContent: { flex: 1, padding: 16 },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
    studentName: { fontSize: 16, fontWeight: 'bold', color: '#333' },
    studentId: { fontSize: 12, color: '#888', marginTop: 2 },
    badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
    badgeText: { fontSize: 10, fontWeight: 'bold' },
    issueText: { fontSize: 14, color: '#444', marginBottom: 10, fontWeight: '500' },
    divider: { height: 1, backgroundColor: '#F0F0F0', marginBottom: 10 },
    cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    dateBox: { flexDirection: 'row', alignItems: 'center' },
    dateText: { fontSize: 12, color: '#999' },
    statusBox: { backgroundColor: '#F3F4F6', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4 },
    statusText: { fontSize: 11, color: '#666', fontWeight: '600' },

    // Modal
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        padding: 25,
        paddingBottom: 40,
    },
    modalTopBar: {
        width: 40,
        height: 4,
        backgroundColor: '#E0E0E0',
        borderRadius: 2,
        alignSelf: 'center',
        marginBottom: 20,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 25,
    },
    modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#C62828' },
    closeBtn: { padding: 5 },

    reportSummary: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FAFAFA',
        padding: 15,
        borderRadius: 15,
        marginBottom: 25,
    },
    summaryIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    summaryName: { fontSize: 16, fontWeight: 'bold', color: '#333' },
    summaryIssue: { fontSize: 13, color: '#666', marginTop: 2 },

    actionLabel: { fontSize: 12, fontWeight: 'bold', color: '#999', marginBottom: 15, letterSpacing: 1 },

    actionBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderRadius: 15,
        marginBottom: 15,
    },
    actionIcon: {
        width: 32,
        height: 32,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    actionText: { fontSize: 15, fontWeight: '600' },
});
