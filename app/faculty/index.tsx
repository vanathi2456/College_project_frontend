import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInUp, ZoomIn } from 'react-native-reanimated';
import { useAuth } from '../../context/AuthContext';

const CLASSES = [
    { time: '09:00 AM', subject: 'Data Structures', class: 'CSE II-A', room: 'LH-101', status: 'upcoming', color: '#0056D2' },
    { time: '11:00 AM', subject: 'Algorithms', class: 'CSE III-B', room: 'LH-105', status: 'completed', color: '#888' },
    { time: '02:00 PM', subject: 'Project Lab', class: 'CSE IV-A', room: 'LAB-2', status: 'upcoming', color: '#6A0DAD' },
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
        { title: 'Upload Marks', icon: 'edit', route: '/faculty/updates', color: '#0056D2', bg: '#E3F2FD' },
        { title: 'Attendance', icon: 'check-square-o', route: null, color: '#00A86B', bg: '#E8F5E9', action: () => Alert.alert('Attendance', 'Mark Attendance Module') },
        { title: 'Discipline', icon: 'gavel', route: '/faculty/discipline', color: '#D32F2F', bg: '#FFEBEE' },
        { title: 'My Students', icon: 'users', route: '/faculty/students', color: '#6A0DAD', bg: '#F3E5F5' },
        { title: 'Announce', icon: 'bullhorn', route: null, color: '#FF8C00', bg: '#FFF3E0', action: () => Alert.alert('Announcements', 'Post new notice') },
    ];

    const stats = [
        { label: 'Classes', value: '3', icon: 'book' },
        { label: 'Students', value: '142', icon: 'users' },
        { label: 'Pending', value: '2', icon: 'tasks' },
    ];

    return (
        <View style={styles.mainContainer}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                {/* 🔷 Header Profile Card */}
                <LinearGradient
                    colors={['#2E7D32', '#66BB6A']} // Green Theme for Faculty
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                    style={styles.headerCard}
                >
                    <View style={styles.headerTop}>
                        <View>
                            <Text style={styles.welcomeLabel}>Faculty Portal</Text>
                            <Text style={styles.userName}>Prof. {user?.name || 'Faculty'}</Text>
                            <Text style={styles.userDept}>Computer Science Dept.</Text>
                        </View>
                        <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
                            <MaterialIcons name="logout" size={20} color="#fff" />
                        </TouchableOpacity>
                    </View>

                    {/* Stats Dashboard */}
                    <View style={styles.statsContainer}>
                        {stats.map((stat, index) => (
                            <View key={index} style={styles.statBox}>
                                <View style={styles.statIconBox}>
                                    <FontAwesome name={stat.icon as any} size={16} color="rgba(255,255,255,0.9)" />
                                </View>
                                <View>
                                    <Text style={styles.statValue}>{stat.value}</Text>
                                    <Text style={styles.statLabel}>{stat.label}</Text>
                                </View>
                                {index !== stats.length - 1 && <View style={styles.statDivider} />}
                            </View>
                        ))}
                    </View>
                </LinearGradient>

                <View style={styles.contentBody}>

                    {/* 🔷 Quick Actions Grid */}
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>Quick Actions</Text>
                        <View style={styles.actionGrid}>
                            {quickActions.map((item, index) => (
                                <Animated.View key={index} entering={ZoomIn.delay(index * 50)} style={{ width: '48%', marginBottom: 15 }}>
                                    <TouchableOpacity
                                        style={styles.actionCard}
                                        activeOpacity={0.8}
                                        onPress={() => item.route ? router.push(item.route as any) : item.action?.()}
                                    >
                                        <View style={[styles.iconCircle, { backgroundColor: item.bg }]}>
                                            <FontAwesome name={item.icon as any} size={20} color={item.color} />
                                        </View>
                                        <Text style={styles.actionText}>{item.title}</Text>
                                    </TouchableOpacity>
                                </Animated.View>
                            ))}
                        </View>
                    </View>

                    {/* 🔷 Today's Schedule (Timeline) */}
                    <View style={styles.sectionContainer}>
                        <View style={styles.sectionHeaderLine}>
                            <Text style={styles.sectionTitle}>Today's Schedule</Text>
                            <TouchableOpacity><Text style={styles.seeAllText}>Calender</Text></TouchableOpacity>
                        </View>

                        <View style={styles.timelineCard}>
                            {CLASSES.map((cls, index) => (
                                <Animated.View key={index} entering={FadeInUp.delay(index * 100)} style={styles.timelineItem}>
                                    <View style={styles.timeColumn}>
                                        <Text style={styles.timeText}>{cls.time}</Text>
                                        <View style={[
                                            styles.statusDot,
                                            { backgroundColor: cls.status === 'completed' ? '#ccc' : cls.color, borderColor: cls.status === 'completed' ? '#eee' : '#fff' }
                                        ]} />
                                        {index !== CLASSES.length - 1 && <View style={styles.lineLink} />}
                                    </View>
                                    <View style={[
                                        styles.classInfoCard,
                                        cls.status === 'completed' ? styles.classInfoCardCompleted : { borderLeftColor: cls.color }
                                    ]}>
                                        <View style={styles.classHeader}>
                                            <Text style={[styles.subjectName, cls.status === 'completed' && styles.textCompleted]}>{cls.subject}</Text>
                                            <View style={[styles.roomTag, cls.status === 'completed' && styles.roomTagCompleted]}>
                                                <Text style={[styles.roomText, cls.status === 'completed' && styles.textCompleted]}>{cls.room}</Text>
                                            </View>
                                        </View>
                                        <Text style={styles.className}>{cls.class}</Text>
                                    </View>
                                </Animated.View>
                            ))}
                        </View>
                    </View>

                    {/* 🔷 Performance Overview */}
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>Class Average</Text>
                        <View style={styles.performanceCard}>
                            {[
                                { label: 'CSE II-A', val: 85, color: '#00A86B' },
                                { label: 'CSE III-B', val: 72, color: '#FF8C00' },
                                { label: 'CSE IV-A', val: 90, color: '#0056D2' }
                            ].map((item, idx) => (
                                <View key={idx} style={styles.perfRow}>
                                    <Text style={styles.perfLabel}>{item.label}</Text>
                                    <View style={styles.perfBarTrack}>
                                        <View style={[styles.perfBarFill, { width: `${item.val}%`, backgroundColor: item.color }]} />
                                    </View>
                                    <Text style={styles.perfVal}>{item.val}%</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                </View>
                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#F3F4F6',
    },
    scrollContent: {
        paddingBottom: 100,
    },
    headerCard: {
        paddingTop: Platform.OS === 'android' ? 60 : 30,
        paddingBottom: 40,
        paddingHorizontal: 24,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        shadowColor: '#2E7D32',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 15,
        elevation: 10,
        marginBottom: 10,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 25,
    },
    welcomeLabel: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 14,
        marginBottom: 4,
        fontWeight: '500',
    },
    userName: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 4,
        letterSpacing: 0.5,
    },
    userDept: {
        color: 'rgba(255,255,255,0.9)',
        fontSize: 13,
    },
    logoutBtn: {
        padding: 10,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 12,
    },
    statsContainer: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderRadius: 20,
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'space-between',
    },
    statBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statIconBox: {
        width: 36,
        height: 36,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    statValue: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    statLabel: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 10,
        fontWeight: '500',
        textTransform: 'uppercase',
    },
    statDivider: {
        width: 1,
        height: 25,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginHorizontal: 15, // Space between stats
        display: 'none', // Removed logic for flex-space-between to work better
    },
    contentBody: {
        paddingHorizontal: 20,
        marginTop: -30,
        paddingTop: 40,
        zIndex: 10,
    },
    // Sections
    sectionContainer: {
        marginBottom: 25,
    },
    sectionHeaderLine: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
        letterSpacing: 0.5,
    },
    seeAllText: {
        color: '#2E7D32',
        fontWeight: '600',
        fontSize: 13,
    },
    // Quick Actions
    actionGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    actionCard: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
        height: 80,
    },
    iconCircle: {
        width: 44,
        height: 44,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    actionText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        flexShrink: 1,
    },
    // Timeline
    timelineCard: {
        backgroundColor: '#fff',
        borderRadius: 24,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
    },
    timelineItem: {
        flexDirection: 'row',
        marginBottom: 24,
    },
    timeColumn: {
        alignItems: 'center',
        marginRight: 16,
        width: 65,
    },
    timeText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#666',
        marginBottom: 8,
    },
    statusDot: {
        width: 14,
        height: 14,
        borderRadius: 7,
        borderWidth: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
        zIndex: 2,
    },
    lineLink: {
        width: 2,
        flex: 1,
        backgroundColor: '#E5E7EB',
        marginTop: -2,
        marginBottom: -24,
        zIndex: 1,
    },
    classInfoCard: {
        flex: 1,
        backgroundColor: '#F9FAFB',
        borderRadius: 16,
        padding: 16,
        borderLeftWidth: 4,
    },
    classInfoCardCompleted: {
        backgroundColor: '#F3F4F6',
        borderLeftColor: '#D1D5DB',
    },
    classHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    subjectName: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#1F2937',
    },
    roomTag: {
        backgroundColor: '#E8F5E9',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 6,
    },
    roomTagCompleted: {
        backgroundColor: '#E5E7EB',
    },
    roomText: {
        color: '#2E7D32',
        fontSize: 10,
        fontWeight: 'bold',
    },
    textCompleted: {
        color: '#6B7280',
    },
    className: {
        color: '#6B7280',
        fontSize: 12,
        fontWeight: '500',
    },
    // Performance
    performanceCard: {
        backgroundColor: '#fff',
        borderRadius: 24,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
    },
    perfRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    perfLabel: {
        width: 70,
        fontSize: 13,
        fontWeight: '600',
        color: '#4B5563',
    },
    perfBarTrack: {
        flex: 1,
        height: 8,
        backgroundColor: '#F3F4F6',
        borderRadius: 4,
        marginHorizontal: 12,
        overflow: 'hidden',
    },
    perfBarFill: {
        height: '100%',
        borderRadius: 4,
    },
    perfVal: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#1F2937',
        width: 35,
        textAlign: 'right',
    },
});
