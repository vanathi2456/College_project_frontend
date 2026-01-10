import { FontAwesome } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    Linking,
    Modal,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { UserRole } from '../types';

const { width } = Dimensions.get('window');

const DEPARTMENTS = [
    { id: 'cse', name: 'Computer Science', code: 'CSE', icon: 'laptop', color: '#1a237e' },
    { id: 'ece', name: 'Electronics & Comm', code: 'ECE', icon: 'microchip', color: '#0d47a1' },
    { id: 'eee', name: 'Electrical & Electronics', code: 'EEE', icon: 'bolt', color: '#1565c0' },
    { id: 'mech', name: 'Mechanical Engg', code: 'MECH', icon: 'cogs', color: '#1976d2' },
    { id: 'civil', name: 'Civil Engineering', code: 'CIVIL', icon: 'building', color: '#0277bd' },
    { id: 'aids', name: 'AI & Data Science', code: 'AIDS', icon: 'sitemap', color: '#00695c' },
];

const FEATURES = [
    { icon: 'graduation-cap', title: 'Expert Faculty', desc: 'Learn from industry veterans and PhD holders.' },
    { icon: 'globe', title: 'Global Exposure', desc: 'International conferences and exchange programs.' },
    { icon: 'briefcase', title: 'Placement Support', desc: '100% placement assistance with top MNCs.' },
    { icon: 'flask', title: 'Research & Innovation', desc: 'State-of-the-art labs and research centers.' },
];

const STATS = [
    { label: 'Students', value: '2500+' },
    { label: 'Faculty', value: '150+' },
    { label: 'Courses', value: '12' },
    { label: 'Placement', value: '95%' },
];

export default function LandingPage() {
    const router = useRouter();
    const [modalVisible, setModalVisible] = useState(false);

    // Animations
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(30)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const handleLoginPress = () => {
        setModalVisible(true);
    };

    const handleRoleSelect = (role: UserRole) => {
        setModalVisible(false);
        router.push(`/login?role=${role}`);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <Stack.Screen options={{ headerShown: false }} />
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.logoContainer}>
                    <Image
                        source={require('../assets/images/college_logo.png')}
                        style={styles.headerLogo}
                        resizeMode="contain"
                    />
                    <View>
                        <Text style={styles.headerTitle}>Kathir College</Text>
                        <Text style={styles.headerSubTitle}>of Engineering</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.loginBtn} onPress={handleLoginPress}>
                    <Text style={styles.loginBtnText}>Login</Text>
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                {/* Hero Section */}
                <View style={styles.heroSection}>
                    <Image
                        source={require('../assets/images/college_hero.png')}
                        style={styles.heroImage}
                        resizeMode="cover"
                    />
                    <View style={styles.heroOverlay} />

                    <Animated.View style={[styles.heroContent, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
                        <View style={styles.heroBadge}>
                            <Text style={styles.heroBadgeText}>Top Ranked Engineering College</Text>
                        </View>
                        <Text style={styles.heroTitle}>Shaping the Future of Engineering</Text>
                        <Text style={styles.heroSubtitle}>Empowering students with knowledge, innovation, and excellence since 2008.</Text>

                        <View style={styles.heroActions}>
                            <TouchableOpacity style={styles.primaryBtn} onPress={handleLoginPress}>
                                <Text style={styles.primaryBtnText}>Get Started</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.secondaryBtn}>
                                <Text style={styles.secondaryBtnText}>Explore Courses</Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                </View>

                {/* Quick Stats Bar */}
                <View style={styles.statsContainer}>
                    {STATS.map((stat, index) => (
                        <View key={index} style={styles.statItem}>
                            <Text style={styles.statValue}>{stat.value}</Text>
                            <Text style={styles.statLabel}>{stat.label}</Text>
                        </View>
                    ))}
                </View>

                {/* Departments Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeaderRow}>
                        <Text style={styles.sectionHeader}>Our Departments</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAllText}>See All</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.deptScroll}>
                        {DEPARTMENTS.map((dept, index) => (
                            <TouchableOpacity key={index} style={styles.deptCard}>
                                <View style={[styles.deptIconContainer, { backgroundColor: dept.color }]}>
                                    <FontAwesome name={dept.icon as any} size={24} color="#fff" />
                                </View>
                                <Text style={styles.deptCode}>{dept.code}</Text>
                                <Text style={styles.deptName}>{dept.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Why Choose Us */}
                <View style={[styles.section, styles.bgLight]}>
                    <Text style={styles.sectionHeader}>Why Choose Us?</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.featuresScroll}>
                        {FEATURES.map((feature, index) => (
                            <View key={index} style={styles.featureCard}>
                                <View style={styles.featureIconBox}>
                                    <FontAwesome name={feature.icon as any} size={32} color="#1a237e" />
                                </View>
                                <Text style={styles.featureTitle}>{feature.title}</Text>
                                <Text style={styles.featureDesc}>{feature.desc}</Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <View style={styles.footerContent}>
                        <View style={styles.footerBrand}>
                            <Image source={require('../assets/images/college_logo.png')} style={{ width: 40, height: 40, marginRight: 10 }} resizeMode="contain" />
                            <Text style={styles.footerTitle}>Kathir College of Engineering</Text>
                        </View>
                        <Text style={styles.footerAddress}>
                            Avinashi Road, Neelambur, Coimbatore - 641062, Tamil Nadu, India.
                        </Text>
                        <View style={styles.socialRow}>
                            {['facebook', 'twitter', 'linkedin', 'instagram'].map((icon, i) => (
                                <TouchableOpacity key={i} style={styles.socialIcon}>
                                    <FontAwesome name={icon as any} size={18} color="#fff" />
                                </TouchableOpacity>
                            ))}
                        </View>
                        <TouchableOpacity onPress={() => Linking.openURL('tel:+911234567890')}>
                            <Text style={styles.contactText}>📞 +91 123 456 7890</Text>
                        </TouchableOpacity>
                        <Text style={styles.copyText}>© 2026 Kathir College of Engineering. All rights reserved.</Text>
                    </View>
                </View>

            </ScrollView>

            {/* Login Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Welcome Back</Text>
                            <Text style={styles.modalSubtitle}>Please select your role to continue</Text>
                        </View>

                        <TouchableOpacity style={styles.roleCard} onPress={() => handleRoleSelect('student')}>
                            <View style={[styles.roleIconContainer, { backgroundColor: '#e3f2fd' }]}>
                                <Text style={styles.roleIcon}>🎓</Text>
                            </View>
                            <View style={styles.roleInfo}>
                                <Text style={styles.roleName}>Student</Text>
                                <Text style={styles.roleDesc}>Access profile, marks & attendance</Text>
                            </View>
                            <FontAwesome name="chevron-right" size={16} color="#ccc" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.roleCard} onPress={() => handleRoleSelect('faculty')}>
                            <View style={[styles.roleIconContainer, { backgroundColor: '#e8f5e9' }]}>
                                <Text style={styles.roleIcon}>👩‍🏫</Text>
                            </View>
                            <View style={styles.roleInfo}>
                                <Text style={styles.roleName}>Faculty</Text>
                                <Text style={styles.roleDesc}>Manage classes, marks & logic</Text>
                            </View>
                            <FontAwesome name="chevron-right" size={16} color="#ccc" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.roleCard} onPress={() => handleRoleSelect('admin')}>
                            <View style={[styles.roleIconContainer, { backgroundColor: '#fff3e0' }]}>
                                <Text style={styles.roleIcon}>🛠</Text>
                            </View>
                            <View style={styles.roleInfo}>
                                <Text style={styles.roleName}>Admin</Text>
                                <Text style={styles.roleDesc}>System administration & oversight</Text>
                            </View>
                            <FontAwesome name="chevron-right" size={16} color="#ccc" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.closeBtn} onPress={() => setModalVisible(false)}>
                            <Text style={styles.closeBtnText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContent: {
        paddingBottom: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        zIndex: 10,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerLogo: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    logoIcon: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: '#1a237e',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1a237e',
    },
    headerSubTitle: {
        fontSize: 11,
        color: '#666',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    loginBtn: {
        backgroundColor: '#1a237e',
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 20,
        shadowColor: '#1a237e',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
    },
    loginBtnText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 14,
    },
    // Hero Section
    heroSection: {
        position: 'relative',
        height: 450,
        justifyContent: 'center',
        marginBottom: 20,
    },
    heroImage: {
        ...StyleSheet.absoluteFillObject,
        width: '100%',
        height: '100%',
    },
    heroOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(26,35,126,0.6)',
    },
    heroContent: {
        padding: 20,
        alignItems: 'center',
    },
    heroBadge: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.4)',
    },
    heroBadgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
        letterSpacing: 0.5,
    },
    heroTitle: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 15,
        lineHeight: 44,
        textShadowColor: 'rgba(0,0,0,0.3)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    heroSubtitle: {
        fontSize: 16,
        color: '#e0e0e0',
        textAlign: 'center',
        marginBottom: 30,
        paddingHorizontal: 20,
        lineHeight: 24,
    },
    heroActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    primaryBtn: {
        backgroundColor: '#fff',
        paddingHorizontal: 25,
        paddingVertical: 14,
        borderRadius: 30,
        marginRight: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    primaryBtnText: {
        color: '#1a237e',
        fontSize: 16,
        fontWeight: 'bold',
    },
    secondaryBtn: {
        backgroundColor: 'rgba(255,255,255,0.15)',
        paddingHorizontal: 25,
        paddingVertical: 14,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#fff',
    },
    secondaryBtnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    // Stats Bar
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#fff',
        marginHorizontal: 20,
        marginTop: -40,
        paddingVertical: 20,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        marginBottom: 30,
    },
    statItem: {
        alignItems: 'center',
    },
    statValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1a237e',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: '#666',
        fontWeight: '500',
    },
    // Sections
    section: {
        marginBottom: 40,
    },
    bgLight: {
        backgroundColor: '#f8f9fa',
        paddingVertical: 40,
    },
    sectionHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    sectionHeader: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1a237e',
        paddingHorizontal: 20,
        marginBottom: 25,
    },
    seeAllText: {
        color: '#1a237e',
        fontWeight: '600',
    },
    deptScroll: {
        paddingHorizontal: 15,
    },
    deptCard: {
        backgroundColor: '#fff',
        width: 140,
        height: 160,
        borderRadius: 15,
        marginHorizontal: 8,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#f0f0f0',
    },
    deptIconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    deptCode: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    deptName: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
        paddingHorizontal: 5,
    },
    featuresScroll: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    featureCard: {
        width: 300,
        backgroundColor: '#fff',
        marginRight: 20,
        padding: 25,
        borderRadius: 24,
        shadowColor: '#1a237e',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 6,
        borderWidth: 1,
        borderColor: 'rgba(26,35,126,0.05)',
    },
    featureIconBox: {
        width: 64,
        height: 64,
        borderRadius: 20,
        backgroundColor: '#e8eaf6',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    featureTitle: {
        fontSize: 22, // Highly visible
        fontWeight: 'bold',
        color: '#1a237e',
        marginBottom: 12,
        letterSpacing: 0.5,
    },
    featureDesc: {
        fontSize: 16, // Highly visible
        color: '#444',
        lineHeight: 24,
        fontWeight: '500',
    },
    // Footer
    footer: {
        backgroundColor: '#0d47a1', // Dark blue
        paddingVertical: 40,
        paddingHorizontal: 20,
    },
    footerContent: {
        alignItems: 'center',
    },
    footerBrand: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    footerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginLeft: 10,
    },
    footerAddress: {
        color: 'rgba(255,255,255,0.7)',
        textAlign: 'center',
        fontSize: 13,
        lineHeight: 20,
        marginBottom: 20,
        maxWidth: 300,
    },
    socialRow: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    socialIcon: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(255,255,255,0.15)',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 8,
    },
    contactText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 25,
    },
    copyText: {
        color: 'rgba(255,255,255,0.4)',
        fontSize: 12,
    },
    // Modal
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 30,
        minHeight: 450,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -5 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10,
    },
    modalHeader: {
        alignItems: 'center',
        marginBottom: 30,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    modalSubtitle: {
        fontSize: 14,
        color: '#666',
    },
    roleCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 16,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#f0f0f0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 5,
        elevation: 2,
    },
    roleIconContainer: {
        width: 50,
        height: 50,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    roleIcon: {
        fontSize: 24,
    },
    roleInfo: {
        flex: 1,
    },
    roleName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 2,
    },
    roleDesc: {
        fontSize: 12,
        color: '#888',
    },
    closeBtn: {
        marginTop: 20,
        padding: 15,
        alignItems: 'center',
    },
    closeBtnText: {
        color: '#ff5252',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
