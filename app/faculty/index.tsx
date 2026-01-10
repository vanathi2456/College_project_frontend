import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';

const CLASSES = [
    { time: '09:00 AM', subject: 'Data Structures', class: 'CSE II-A', room: 'LH-101', status: 'upcoming' },
    { time: '11:00 AM', subject: 'Algorithms', class: 'CSE III-B', room: 'LH-105', status: 'completed' },
    { time: '02:00 PM', subject: 'Project Lab', class: 'CSE IV-A', room: 'LAB-2', status: 'upcoming' },
];

export default function FacultyDashboard() {
    const router = useRouter();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        Alert.alert('Logout', 'Are you sure you want to logout?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Logout', onPress: logout, style: 'destructive' }
        ]);
    };

    const quickActions = [
        { title: 'Upload Marks', icon: 'edit', route: '/faculty/updates', color: '#43a047' },
        { title: 'Attendance', icon: 'check-square-o', route: null, color: '#fb8c00', action: () => Alert.alert('Attendance', 'Mark Attendance') },
        { title: 'Discipline', icon: 'gavel', route: '/faculty/discipline', color: '#c62828' },
        { title: 'Announce', icon: 'bullhorn', route: null, color: '#1e88e5', action: () => Alert.alert('Announcements', 'Post new notice') },
    ];

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Header Profile Card */}
            <View style={styles.headerCard}>
                <View style={styles.headerTop}>
                    <View>
                        <Text style={styles.welcomeLabel}>Good Morning,</Text>
                        <Text style={styles.userName}>Prof. {user?.name || 'Faculty'}</Text>
                        <Text style={styles.userDept}>Department of Computer Science</Text>
                    </View>
                    <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
                        <FontAwesome name="sign-out" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>

                {/* Faculty Stats */}
                <View style={styles.statsRow}>
                    <View style={styles.statBox}>
                        <Text style={styles.statValue}>3</Text>
                        <Text style={styles.statLabel}>Today's Classes</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statBox}>
                        <Text style={styles.statValue}>142</Text>
                        <Text style={styles.statLabel}>Total Students</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statBox}>
                        <Text style={styles.statValue}>2</Text>
                        <Text style={styles.statLabel}>Pending Tasks</Text>
                    </View>
                </View>
            </View>

            {/* Quick Actions */}
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.actionGrid}>
                {quickActions.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.actionCard}
                        onPress={() => item.route ? router.push(item.route as any) : item.action?.()}
                    >
                        <View style={[styles.iconCircle, { backgroundColor: item.color + '15' }]}>
                            <FontAwesome name={item.icon as any} size={20} color={item.color} />
                        </View>
                        <Text style={styles.actionText}>{item.title}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Today's Schedule (Timeline) */}
            <Text style={styles.sectionTitle}>Today's Schedule</Text>
            <View style={styles.timelineCard}>
                {CLASSES.map((cls, index) => (
                    <View key={index} style={styles.timelineItem}>
                        <View style={styles.timeColumn}>
                            <Text style={styles.timeText}>{cls.time}</Text>
                            <View style={[styles.statusDot, { backgroundColor: cls.status === 'completed' ? '#ccc' : '#2e7d32' }]} />
                            {index !== CLASSES.length - 1 && <View style={styles.lineLink} />}
                        </View>
                        <View style={styles.classInfoCard}>
                            <View style={styles.classHeader}>
                                <Text style={styles.subjectName}>{cls.subject}</Text>
                                <View style={styles.roomTag}>
                                    <Text style={styles.roomText}>{cls.room}</Text>
                                </View>
                            </View>
                            <Text style={styles.className}>{cls.class}</Text>
                        </View>
                    </View>
                ))}
            </View>

            {/* Performance Overview (Mock) */}
            <Text style={styles.sectionTitle}>Class Performance (Avg)</Text>
            <View style={styles.performanceCard}>
                <View style={styles.perfRow}>
                    <Text style={styles.perfLabel}>CSE II-A</Text>
                    <View style={styles.perfBarTrack}>
                        <View style={[styles.perfBarFill, { width: '85%', backgroundColor: '#43a047' }]} />
                    </View>
                    <Text style={styles.perfVal}>85%</Text>
                </View>
                <View style={styles.perfRow}>
                    <Text style={styles.perfLabel}>CSE III-B</Text>
                    <View style={styles.perfBarTrack}>
                        <View style={[styles.perfBarFill, { width: '72%', backgroundColor: '#fb8c00' }]} />
                    </View>
                    <Text style={styles.perfVal}>72%</Text>
                </View>
                <View style={styles.perfRow}>
                    <Text style={styles.perfLabel}>CSE IV-A</Text>
                    <View style={styles.perfBarTrack}>
                        <View style={[styles.perfBarFill, { width: '90%', backgroundColor: '#1e88e5' }]} />
                    </View>
                    <Text style={styles.perfVal}>90%</Text>
                </View>
            </View>

            <View style={{ height: 40 }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f7fa',
        padding: 20,
    },
    headerCard: {
        backgroundColor: '#2e7d32', // Green
        borderRadius: 20,
        padding: 24,
        marginBottom: 25,
        shadowColor: '#2e7d32',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 8,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    welcomeLabel: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 14,
        marginBottom: 4,
    },
    userName: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    userDept: {
        color: 'rgba(255,255,255,0.9)',
        fontSize: 13,
    },
    logoutBtn: {
        padding: 8,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 12,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.2)',
    },
    statBox: {
        alignItems: 'center',
        flex: 1,
    },
    statValue: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 2,
    },
    statLabel: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 10,
    },
    statDivider: {
        width: 1,
        height: 30,
        backgroundColor: 'rgba(255,255,255,0.3)',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
        marginLeft: 5,
    },
    actionGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 25,
    },
    actionCard: {
        width: '48%',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 16,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    iconCircle: {
        width: 40,
        height: 40,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    actionText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    timelineCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    timelineItem: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    timeColumn: {
        alignItems: 'center',
        marginRight: 15,
        width: 60,
    },
    timeText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#666',
        marginBottom: 5,
    },
    statusDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#2e7d32',
        zIndex: 2,
    },
    lineLink: {
        width: 2,
        flex: 1,
        backgroundColor: '#eee',
        marginTop: -5,
        marginBottom: -20,
        zIndex: 1,
    },
    classInfoCard: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        borderRadius: 12,
        padding: 15,
        borderLeftWidth: 3,
        borderLeftColor: '#2e7d32',
    },
    classHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    subjectName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    roomTag: {
        backgroundColor: '#e8f5e9',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 8,
    },
    roomText: {
        color: '#2e7d32',
        fontSize: 10,
        fontWeight: 'bold',
    },
    className: {
        color: '#666',
        fontSize: 13,
    },
    performanceCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    perfRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    perfLabel: {
        width: 80,
        fontSize: 13,
        fontWeight: '600',
        color: '#555',
    },
    perfBarTrack: {
        flex: 1,
        height: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        marginHorizontal: 10,
        overflow: 'hidden',
    },
    perfBarFill: {
        height: '100%',
        borderRadius: 5,
    },
    perfVal: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#333',
        width: 30,
        textAlign: 'right',
    },
});
