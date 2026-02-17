import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Platform, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown, ZoomIn } from 'react-native-reanimated';

const ACHIEVEMENTS = [
    { id: '1', title: 'Codeathon Winner', date: 'Oct 2025', category: 'Technical', icon: 'trophy', color: '#FFD700', desc: 'First place in the annual college hackathon.' },
    { id: '2', title: 'Best Project', date: 'Sep 2025', category: 'Academic', icon: 'star', color: '#00A86B', desc: 'Awarded for the "AI Traffic Control" final year project.' },
    { id: '3', title: 'Paper Published', date: 'Aug 2025', category: 'Research', icon: 'file-document-outline', color: '#2962FF', desc: 'Research paper on IoT security published in IEEE journal.' },
    { id: '4', title: 'NSS Volunteer', date: 'July 2025', category: 'Service', icon: 'hand-heart', color: '#FF5722', desc: 'Active participation in 3 major community service camps.' },
];

export default function StudentAchievements() {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <LinearGradient
                colors={['#6A0DAD', '#4A148C']}
                style={styles.header}
            >
                <Text style={styles.headerTitle}>Achievements</Text>
                <Text style={styles.headerSubtitle}>Hall of Fame & Certifications</Text>
            </LinearGradient>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

                {/* Summary Card */}
                <Animated.View entering={ZoomIn.duration(600)} style={styles.summaryCard}>
                    <LinearGradient
                        colors={['#FFD700', '#FFA000']}
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                        style={styles.summaryGradient}
                    >
                        <View>
                            <Text style={styles.summaryLabel}>Total Badges</Text>
                            <Text style={styles.summaryCount}>04</Text>
                        </View>
                        <View style={styles.trophyContainer}>
                            <FontAwesome name="trophy" size={40} color="#fff" />
                        </View>
                    </LinearGradient>
                </Animated.View>

                <Text style={styles.sectionTitle}>Recent Awards</Text>

                {ACHIEVEMENTS.map((item, index) => (
                    <Animated.View
                        key={item.id}
                        entering={FadeInDown.delay(index * 150).springify()}
                        style={styles.card}
                    >
                        <View style={[styles.iconBox, { backgroundColor: item.color + '20' }]}>
                            {item.icon === 'file-document-outline' || item.icon === 'hand-heart' ? (
                                <MaterialCommunityIcons name={item.icon as any} size={24} color={item.color} />
                            ) : (
                                <FontAwesome name={item.icon as any} size={24} color={item.color} />
                            )}
                        </View>

                        <View style={styles.cardContent}>
                            <View style={styles.cardHeader}>
                                <Text style={styles.cardTitle}>{item.title}</Text>
                                <View style={styles.dateBadge}>
                                    <Text style={styles.dateText}>{item.date}</Text>
                                </View>
                            </View>
                            <Text style={styles.cardDesc}>{item.desc}</Text>
                            <View style={[styles.catBadge, { borderColor: item.color }]}>
                                <Text style={[styles.catText, { color: item.color }]}>{item.category}</Text>
                            </View>
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
    },
    headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
    headerSubtitle: { fontSize: 13, color: 'rgba(255,255,255,0.9)', marginTop: 2 },

    content: { padding: 20 },

    summaryCard: {
        marginBottom: 25,
        borderRadius: 20,
        elevation: 5,
        shadowColor: '#FFA000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    summaryGradient: {
        padding: 20,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    summaryLabel: { color: 'rgba(255,255,255,0.9)', fontSize: 14, fontWeight: '600', textTransform: 'uppercase' },
    summaryCount: { color: '#fff', fontSize: 36, fontWeight: 'bold' },
    trophyContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15, marginLeft: 5 },

    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 15,
        marginBottom: 15,
        flexDirection: 'row',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
    },
    iconBox: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    cardContent: { flex: 1 },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 },
    cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
    dateBadge: { backgroundColor: '#F5F7FA', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
    dateText: { fontSize: 10, color: '#666', fontWeight: '600' },
    cardDesc: { fontSize: 13, color: '#666', marginBottom: 8, lineHeight: 18 },
    catBadge: { alignSelf: 'flex-start', borderWidth: 1, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 2 },
    catText: { fontSize: 10, fontWeight: 'bold' },
});
