import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Linking,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function FacultyProfile() {
    const router = useRouter();

    const handleCall = () => Linking.openURL('tel:9876543210');
    const handleEmail = () => Linking.openURL('mailto:sharma.cse@college.edu');

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            {/* Header Background */}
            <LinearGradient
                colors={['#00695C', '#004D40']}
                style={styles.headerBg}
            />

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

                {/* Profile Card */}
                <Animated.View entering={FadeInDown.duration(800)} style={styles.profileCard}>
                    <View style={styles.avatarContainer}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>AS</Text>
                        </View>
                        <View style={styles.statusDot} />
                    </View>

                    <Text style={styles.name}>Dr. A. Sharma</Text>
                    <Text style={styles.designation}>Professor & HOD</Text>
                    <Text style={styles.dept}>Computer Science Engineering</Text>

                    <View style={styles.actionRow}>
                        <TouchableOpacity style={styles.actionBtn} onPress={handleCall}>
                            <MaterialIcons name="call" size={20} color="#fff" />
                            <Text style={styles.actionText}>Call</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionBtn} onPress={handleEmail}>
                            <MaterialIcons name="email" size={20} color="#fff" />
                            <Text style={styles.actionText}>Email</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>

                {/* Stats */}
                <View style={styles.statsRow}>
                    <View style={styles.statItem}>
                        <Text style={styles.statVal}>12</Text>
                        <Text style={styles.statLabel}>Years Exp</Text>
                    </View>
                    <View style={styles.statBorder} />
                    <View style={styles.statItem}>
                        <Text style={styles.statVal}>05</Text>
                        <Text style={styles.statLabel}>Classes</Text>
                    </View>
                    <View style={styles.statBorder} />
                    <View style={styles.statItem}>
                        <Text style={styles.statVal}>42</Text>
                        <Text style={styles.statLabel}>Papers</Text>
                    </View>
                </View>

                {/* Details Section */}
                <Text style={styles.sectionTitle}>Professional Details</Text>
                <View style={styles.detailsCard}>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Employee ID</Text>
                        <Text style={styles.detailValue}>EMP-CSE-001</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Specialization</Text>
                        <Text style={styles.detailValue}>Cloud Computing, AI</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Joining Date</Text>
                        <Text style={styles.detailValue}>15 June 2012</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.logoutBtn} onPress={() => router.replace('/login')}>
                    <Text style={styles.logoutText}>Log Out</Text>
                    <MaterialIcons name="logout" size={18} color="#D32F2F" style={{ marginLeft: 8 }} />
                </TouchableOpacity>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F5F7FA' },
    headerBg: {
        height: 150,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    content: {
        padding: 20,
        paddingTop: 60,
    },
    profileCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        alignItems: 'center',
        padding: 25,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        marginBottom: 25,
    },
    avatarContainer: { marginBottom: 15 },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#E0F2F1',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: '#fff',
    },
    avatarText: { fontSize: 36, fontWeight: 'bold', color: '#00695C' },
    statusDot: {
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: '#4CAF50',
        borderWidth: 3,
        borderColor: '#fff',
        position: 'absolute',
        bottom: 5,
        right: 5,
    },
    name: { fontSize: 22, fontWeight: 'bold', color: '#333', marginBottom: 5 },
    designation: { fontSize: 14, color: '#00695C', fontWeight: '600', marginBottom: 2 },
    dept: { fontSize: 13, color: '#777', marginBottom: 20 },

    actionRow: { flexDirection: 'row', gap: 15 },
    actionBtn: {
        flexDirection: 'row',
        backgroundColor: '#00695C',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        alignItems: 'center',
        elevation: 3,
    },
    actionText: { color: '#fff', marginLeft: 8, fontWeight: '600' },

    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 15,
        marginBottom: 25,
        elevation: 2,
    },
    statItem: { alignItems: 'center', flex: 1 },
    statVal: { fontSize: 18, fontWeight: 'bold', color: '#333' },
    statLabel: { fontSize: 11, color: '#777' },
    statBorder: { width: 1, backgroundColor: '#EEE' },

    sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 10, marginLeft: 5 },
    detailsCard: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        elevation: 2,
        marginBottom: 30,
    },
    detailItem: { paddingVertical: 5 },
    detailLabel: { fontSize: 12, color: '#888', marginBottom: 3, textTransform: 'uppercase' },
    detailValue: { fontSize: 16, color: '#333', fontWeight: '500' },
    divider: { height: 1, backgroundColor: '#F0F0F0', marginVertical: 10 },

    logoutBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#FFEBEE',
        backgroundColor: '#FFEBEE',
    },
    logoutText: { color: '#D32F2F', fontWeight: 'bold', fontSize: 15 },
});
