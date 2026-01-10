import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';

const { width } = Dimensions.get('window');

const EVENTS = [
    { title: 'Tech Symposium', date: '24 Aug', color: '#ff9800', icon: 'microchip' },
    { title: 'Workshop on AI', date: '02 Sep', color: '#2196f3', icon: 'laptop' },
    { title: 'Cultural Fest', date: '15 Sep', color: '#e91e63', icon: 'music' },
];

const MARKS = [
    { subject: 'Maths', score: 85 },
    { subject: 'Physics', score: 78 },
    { subject: 'Chem', score: 92 },
    { subject: 'Eng', score: 88 },
    { subject: 'CS', score: 95 },
];

export default function StudentDashboard() {
    const router = useRouter();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        Alert.alert('Logout', 'Are you sure you want to logout?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Logout', onPress: logout, style: 'destructive' }
        ]);
    };

    const quickActions = [
        { title: 'Academics', icon: 'graduation-cap', route: '/student/academics', color: '#3f51b5' },
        { title: 'Discipline', icon: 'gavel', route: '/student/discipline', color: '#d32f2f' },
        { title: 'Timetable', icon: 'calendar', route: null, color: '#009688', action: () => Alert.alert('Timetable', 'Showing Weekly Schedule...') },
        { title: 'Queries', icon: 'question-circle', route: '/student/query', color: '#ff5722' },
        { title: 'Contact Faculty', icon: 'phone', route: null, color: '#4caf50', action: () => Alert.alert('Call', 'Connecting to Faculty Advisor...') },
        { title: 'Profile', icon: 'user', route: '/student/profile', color: '#673ab7' },
    ];

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Header Profile Card */}
            <View style={styles.headerCard}>
                <View style={styles.headerTop}>
                    <View>
                        <Text style={styles.welcomeLabel}>Welcome Back,</Text>
                        <Text style={styles.userName}>{user?.name || 'Student Name'}</Text>
                        <Text style={styles.userDept}>B.E. Computer Science | Sem 6</Text>
                    </View>
                    <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
                        <FontAwesome name="sign-out" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>

                {/* Attendance Ring Mockup */}
                <View style={styles.attendanceRow}>
                    <View style={styles.attendanceContainer}>
                        <View style={styles.circleOuter}>
                            <View style={styles.circleInner}>
                                <Text style={styles.attendancePercent}>92%</Text>
                                <Text style={styles.attendanceLabel}>Attendance</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.statsCol}>
                        <View style={styles.statItem}>
                            <Text style={styles.statVal}>8.5</Text>
                            <Text style={styles.statLbl}>CGPA</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={styles.statVal}>12</Text>
                            <Text style={styles.statLbl}>Backlogs: 0</Text>
                        </View>
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

            {/* Marks Overview (Bar Chart) */}
            <Text style={styles.sectionTitle}>Internal Marks Overview</Text>
            <View style={styles.chartCard}>
                <View style={styles.chartContainer}>
                    {MARKS.map((item, index) => (
                        <View key={index} style={styles.barCol}>
                            <View style={styles.barTrack}>
                                <View style={[styles.barFill, { height: `${item.score}%` }]} />
                            </View>
                            <Text style={styles.barLabel}>{item.subject}</Text>
                        </View>
                    ))}
                </View>
            </View>

            {/* Upcoming Events */}
            <Text style={styles.sectionTitle}>Upcoming Events</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.eventScroll}>
                {EVENTS.map((event, index) => (
                    <View key={index} style={[styles.eventCard, { borderLeftColor: event.color }]}>
                        <View style={[styles.eventIconBox, { backgroundColor: event.color + '20' }]}>
                            <FontAwesome name={event.icon as any} size={20} color={event.color} />
                        </View>
                        <View>
                            <Text style={styles.eventTitle}>{event.title}</Text>
                            <Text style={styles.eventDate}>{event.date}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>

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
        backgroundColor: '#1a237e',
        borderRadius: 20,
        padding: 24,
        marginBottom: 25,
        shadowColor: '#1a237e',
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
        color: 'rgba(255,255,255,0.7)',
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
    attendanceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    attendanceContainer: {
        alignItems: 'center',
    },
    circleOuter: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 8,
        borderColor: '#4caf50', // Green for good attendance
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    circleInner: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    attendancePercent: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    attendanceLabel: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 10,
    },
    statsCol: {
        flex: 1,
        marginLeft: 20,
        justifyContent: 'space-around',
        height: 80,
    },
    statItem: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    statVal: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    statLbl: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 12,
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
    chartCard: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 16,
        marginBottom: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    chartContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        height: 150,
        paddingBottom: 10,
    },
    barCol: {
        alignItems: 'center',
    },
    barTrack: {
        width: 12,
        height: 120,
        backgroundColor: '#f0f0f0',
        borderRadius: 6,
        justifyContent: 'flex-end',
        overflow: 'hidden',
    },
    barFill: {
        width: '100%',
        backgroundColor: '#1a237e',
        borderRadius: 6,
    },
    barLabel: {
        fontSize: 10,
        color: '#666',
        marginTop: 8,
    },
    eventScroll: {
        marginBottom: 20,
    },
    eventCard: {
        backgroundColor: '#fff',
        width: 200,
        padding: 15,
        borderRadius: 12,
        marginRight: 15,
        flexDirection: 'row',
        alignItems: 'center',
        borderLeftWidth: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    eventIconBox: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    eventTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 2,
    },
    eventDate: {
        fontSize: 12,
        color: '#666',
    },
});
