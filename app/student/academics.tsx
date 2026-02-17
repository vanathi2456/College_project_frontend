import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Platform, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function StudentAcademics() {
    const semesters = [
        { sem: 1, gpa: 8.5, credits: 24, status: 'Pass' },
        { sem: 2, gpa: 8.7, credits: 24, status: 'Pass' },
        { sem: 3, gpa: 8.2, credits: 25, status: 'Pass' },
        { sem: 4, gpa: 8.9, credits: 26, status: 'Distinction' },
        { sem: 5, gpa: 8.6, credits: 25, status: 'Pass' },
    ];

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <LinearGradient
                colors={['#0056D2', '#003c8f']}
                style={styles.header}
            >
                <Text style={styles.headerTitle}>Academic Performance</Text>
                <Text style={styles.headerSubtitle}>CGPA & Semester Results</Text>
            </LinearGradient>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* CGPA Card */}
                <Animated.View entering={FadeInDown.delay(100)} style={styles.cgpaCard}>
                    <LinearGradient
                        colors={['#FF8C00', '#FFB74D']}
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                        style={styles.cgpaGradient}
                    >
                        <View>
                            <Text style={styles.cgpaLabel}>Current CGPA</Text>
                            <Text style={styles.cgpaValue}>8.58</Text>
                            <Text style={styles.cgpaSub}>Total Credits: 124</Text>
                        </View>
                        <View style={styles.trophyIcon}>
                            <FontAwesome name="trophy" size={50} color="rgba(255,255,255,0.3)" />
                        </View>
                    </LinearGradient>
                </Animated.View>

                <Text style={styles.sectionTitle}>Semester History</Text>

                {semesters.map((s, index) => (
                    <Animated.View
                        key={s.sem}
                        entering={FadeInDown.delay(index * 100 + 300)}
                        style={styles.card}
                    >
                        <View style={styles.cardLeft}>
                            <View style={styles.semBadge}>
                                <Text style={styles.semBadgeText}>{s.sem}</Text>
                            </View>
                            <View>
                                <Text style={styles.semTitle}>Semester {s.sem}</Text>
                                <Text style={styles.semCredits}>{s.credits} Credits • {s.status}</Text>
                            </View>
                        </View>
                        <View style={styles.gpaContainer}>
                            <Text style={styles.gpaLabel}>GPA</Text>
                            <Text style={styles.gpaText}>{s.gpa}</Text>
                        </View>
                    </Animated.View>
                ))}
            </ScrollView>
        </View>
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
        shadowColor: '#0056D2',
        shadowOpacity: 0.3,
        marginBottom: 10,
    },
    headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
    headerSubtitle: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
    scrollContent: { padding: 20, paddingTop: 10 },

    cgpaCard: {
        borderRadius: 20,
        marginBottom: 30,
        elevation: 5,
        shadowColor: '#FF8C00',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    cgpaGradient: {
        borderRadius: 20,
        padding: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cgpaLabel: { color: 'rgba(255,255,255,0.9)', fontSize: 16, fontWeight: '600' },
    cgpaValue: { color: '#fff', fontSize: 42, fontWeight: '900', marginVertical: 4 },
    cgpaSub: { color: 'rgba(255,255,255,0.8)', fontSize: 14 },
    trophyIcon: { opacity: 0.8 },

    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15, marginLeft: 5 },
    card: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 16,
        marginBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
    },
    cardLeft: { flexDirection: 'row', alignItems: 'center' },
    semBadge: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#E3F2FD',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
        borderWidth: 1,
        borderColor: '#BBDEFB',
    },
    semBadgeText: { fontSize: 18, fontWeight: 'bold', color: '#0056D2' },
    semTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
    semCredits: { fontSize: 13, color: '#666', marginTop: 2 },
    gpaContainer: { alignItems: 'flex-end' },
    gpaLabel: { fontSize: 10, color: '#888', textTransform: 'uppercase' },
    gpaText: { fontSize: 20, fontWeight: 'bold', color: '#0056D2' },
});
