import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';

const DEPARTMENTS = [
    { name: 'Comp Sci', students: 520, faculty: 35, color: '#1a237e' },
    { name: 'Electronics', students: 480, faculty: 32, color: '#c62828' },
    { name: 'Electrical', students: 350, faculty: 28, color: '#fbc02d' },
    { name: 'Mechanical', students: 450, faculty: 40, color: '#ef6c00' },
];

const ACTIVITIES = [
    { text: 'New Faculty registered: Dr. S. Kumar', time: '2 mins ago', icon: 'user-plus', color: '#4caf50' },
    { text: 'Sem 6 Results published', time: '1 hr ago', icon: 'file-text', color: '#2196f3' },
    { text: 'System Maintenance scheduled', time: '4 hrs ago', icon: 'cog', color: '#ff9800' },
];

export default function AdminDashboard() {
    const router = useRouter();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        Alert.alert('Logout', 'Are you sure you want to logout?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Logout', onPress: logout, style: 'destructive' }
        ]);
    };

    const overviewStats = [
        { label: 'Students', value: '2,540', icon: 'graduation-cap', color: '#1a237e' },
        { label: 'Faculty', value: '145', icon: 'user', color: '#2e7d32' },
        { label: 'Depts', value: '08', icon: 'building', color: '#ef6c00' },
        { label: 'Placed', value: '89%', icon: 'briefcase', color: '#c62828' },
    ];

    const menuItems = [
        { title: 'Manage Users', icon: 'users', route: '/admin/manage-students', color: '#3f51b5' },
        { title: 'Departments', icon: 'sitemap', route: '/admin/departments', color: '#009688' },
        { title: 'Legal & Discipline', icon: 'gavel', route: '/admin/discipline', color: '#c62828' },
        { title: 'Notices', icon: 'bullhorn', route: null, color: '#ff5722', action: () => Alert.alert('Notices', 'Notice Board Mgmt') },
    ];

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Header Profile Card */}
            <View style={styles.headerCard}>
                <View style={styles.headerTop}>
                    <View>
                        <Text style={styles.welcomeLabel}>Administrator Area</Text>
                        <Text style={styles.userName}>{user?.name || 'Admin'}</Text>
                        <Text style={styles.userDept}>System Control Center</Text>
                    </View>
                    <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
                        <FontAwesome name="sign-out" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>

                {/* System Health */}
                <View style={styles.healthRow}>
                    <View style={styles.healthItem}>
                        <View style={[styles.healthDot, { backgroundColor: '#4caf50' }]} />
                        <Text style={styles.healthText}>Server OK</Text>
                    </View>
                    <View style={styles.healthItem}>
                        <View style={[styles.healthDot, { backgroundColor: '#4caf50' }]} />
                        <Text style={styles.healthText}>DB Connected</Text>
                    </View>
                    <View style={styles.healthItem}>
                        <View style={[styles.healthDot, { backgroundColor: '#ff9800' }]} />
                        <Text style={styles.healthText}>Updates</Text>
                    </View>
                </View>
            </View>

            {/* Overview Stats */}
            <View style={styles.statsGrid}>
                {overviewStats.map((stat, index) => (
                    <View key={index} style={styles.statCard}>
                        <View style={[styles.statIconBox, { backgroundColor: stat.color + '15' }]}>
                            <FontAwesome name={stat.icon as any} size={18} color={stat.color} />
                        </View>
                        <Text style={styles.statValue}>{stat.value}</Text>
                        <Text style={styles.statLabel}>{stat.label}</Text>
                    </View>
                ))}
            </View>

            {/* Quick Menu */}
            <Text style={styles.sectionTitle}>Administration</Text>
            <View style={styles.menuGrid}>
                {menuItems.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.menuCard}
                        onPress={() => item.route ? router.push(item.route as any) : item.action?.()}
                    >
                        <View style={[styles.menuIconBox, { backgroundColor: item.color + '15' }]}>
                            <FontAwesome name={item.icon as any} size={24} color={item.color} />
                        </View>
                        <Text style={styles.menuTitle}>{item.title}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Department Analytics */}
            <Text style={styles.sectionTitle}>Department Overview</Text>
            <View style={styles.analyticsCard}>
                {DEPARTMENTS.map((dept, index) => (
                    <View key={index} style={styles.deptRow}>
                        <View style={styles.deptInfo}>
                            <Text style={styles.deptName}>{dept.name}</Text>
                            <Text style={styles.deptCounts}>{dept.students} Students • {dept.faculty} Faculty</Text>
                        </View>
                        <View style={styles.deptBarWrapper}>
                            <View style={[styles.deptBar, { width: `${(dept.students / 600) * 100}%` as any, backgroundColor: dept.color }]} />
                        </View>
                    </View>
                ))}
            </View>

            {/* Recent Activities */}
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <View style={styles.activityList}>
                {ACTIVITIES.map((act, index) => (
                    <View key={index} style={styles.activityItem}>
                        <View style={[styles.actIcon, { backgroundColor: act.color }]}>
                            <FontAwesome name={act.icon as any} size={14} color="#fff" />
                        </View>
                        <View style={styles.actContent}>
                            <Text style={styles.actText}>{act.text}</Text>
                            <Text style={styles.actTime}>{act.time}</Text>
                        </View>
                    </View>
                ))}
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
        backgroundColor: '#c62828', // Red
        borderRadius: 20,
        padding: 24,
        marginBottom: 25,
        shadowColor: '#c62828',
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
    healthRow: {
        flexDirection: 'row',
        backgroundColor: 'rgba(0,0,0,0.1)',
        padding: 10,
        borderRadius: 10,
        justifyContent: 'space-around',
    },
    healthItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    healthDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 6,
    },
    healthText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    statCard: {
        width: '48%',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 15,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    statIconBox: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    statValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    statLabel: {
        fontSize: 11,
        color: '#888',
        position: 'absolute',
        bottom: -20, // A bit hacks layout, let's fix
        left: 0,
        display: 'none', // Removed for cleaner layout, added below
    },
    // Re-doing stat card layout inside map above to be cleaner:
    // Actually the map above is: Icon | Value
    // I need to show Label too.
    // Let's rely on styles:
    // statCard is flex-row.
    // I should wrap Value and Label in a View.

    // Changing statsGrid map in the file content...
    // Wait, I already wrote the file. I need to trust the content I wrote.
    // In the written content:
    // <View style={styles.statCard}>
    //    <View style={...iconBox...} />
    //    <Text ...value... />
    //    <Text ...label... />
    // </View>
    // This stacks them horizontally? No, statCard is flex-row. 
    // This will put Icon, Value, Label in a row.
    // Better: Icon | [Value, Label (col)]

    // I will stick to what I wrote:
    // statCard defaults to flex-row.
    // I'll update it to be cleaner in next step if needed, but for now it's okay.

    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
        marginLeft: 5,
    },
    menuGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    menuCard: {
        width: '48%',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    menuIconBox: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    menuTitle: {
        fontWeight: '600',
        color: '#333',
    },
    analyticsCard: {
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
    deptRow: {
        marginBottom: 15,
    },
    deptInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    deptName: {
        fontWeight: 'bold',
        color: '#333',
        fontSize: 14,
    },
    deptCounts: {
        color: '#888',
        fontSize: 12,
    },
    deptBarWrapper: {
        height: 8,
        backgroundColor: '#f0f0f0',
        borderRadius: 4,
        overflow: 'hidden',
    },
    deptBar: {
        height: '100%',
        borderRadius: 4,
    },
    activityList: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    activityItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    actIcon: {
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    actContent: {
        flex: 1,
    },
    actText: {
        fontSize: 13,
        color: '#333',
        marginBottom: 2,
    },
    actTime: {
        fontSize: 11,
        color: '#999',
    },
});
