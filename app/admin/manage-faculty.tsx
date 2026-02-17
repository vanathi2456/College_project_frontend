import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Alert, FlatList, Linking, Platform, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

const FACULTY = [
    { id: '1', name: 'Dr. A. Sharma', dept: 'CSE', designation: 'Professor & HOD', phone: '9876543101', email: 'sharma.cse@college.edu', subject: 'Cloud Computing' },
    { id: '2', name: 'Dr. B. Verma', dept: 'ECE', designation: 'Assoc. Professor', phone: '9876543102', email: 'verma.ece@college.edu', subject: 'Digital Signals' },
    { id: '3', name: 'Prof. C. Gupta', dept: 'MECH', designation: 'Asst. Professor', phone: '9876543103', email: 'gupta.mech@college.edu', subject: 'Thermodynamics' },
    { id: '4', name: 'Prof. D. Rao', dept: 'CIVIL', designation: 'Professor', phone: '9876543104', email: 'rao.civil@college.edu', subject: 'Structural Engg' },
    { id: '5', name: 'Dr. E. Mani', dept: 'EEE', designation: 'Assoc. Professor', phone: '9876543105', email: 'mani.eee@college.edu', subject: 'Power Systems' },
];

export default function ManageFaculty() {
    const [search, setSearch] = useState('');

    const handleCall = (name: string, phone: string) => {
        Alert.alert("Call Faculty", `Calling ${name}...`, [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Call', onPress: () => Linking.openURL(`tel:${phone}`) }
        ]);
    };

    const handleEmail = (email: string) => {
        Linking.openURL(`mailto:${email}`);
    };

    const filtered = FACULTY.filter(f =>
        f.name.toLowerCase().includes(search.toLowerCase()) ||
        f.dept.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <LinearGradient
                colors={['#C62828', '#B71C1C']}
                style={styles.header}
            >
                <Text style={styles.headerTitle}>Faculty Management</Text>
                <Text style={styles.headerSubtitle}>Directory of Professors & Staff</Text>

                <View style={styles.searchBar}>
                    <Ionicons name="search" size={20} color="rgba(255,255,255,0.7)" />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search faculty by name or dept..."
                        placeholderTextColor="rgba(255,255,255,0.6)"
                        value={search}
                        onChangeText={setSearch}
                    />
                </View>
            </LinearGradient>

            <FlatList
                data={filtered}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <Animated.View entering={FadeInDown.delay(index * 100)}>
                        <View style={styles.card}>
                            <View style={styles.row}>
                                <View style={styles.avatar}>
                                    <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
                                </View>
                                <View style={styles.info}>
                                    <Text style={styles.name}>{item.name}</Text>
                                    <View style={styles.badgeRow}>
                                        <View style={styles.deptBadge}>
                                            <Text style={styles.deptText}>{item.dept}</Text>
                                        </View>
                                        <Text style={styles.designation}>{item.designation}</Text>
                                    </View>
                                    <Text style={styles.subject}>
                                        <FontAwesome name="book" size={12} color="#666" /> {item.subject}
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.divider} />

                            <View style={styles.actions}>
                                <TouchableOpacity style={styles.actionBtn} onPress={() => handleCall(item.name, item.phone)}>
                                    <Ionicons name="call" size={18} color="#2E7D32" />
                                    <Text style={[styles.actionText, { color: '#2E7D32' }]}>Call</Text>
                                </TouchableOpacity>
                                <View style={styles.vDivider} />
                                <TouchableOpacity style={styles.actionBtn} onPress={() => handleEmail(item.email)}>
                                    <Ionicons name="mail" size={18} color="#1565C0" />
                                    <Text style={[styles.actionText, { color: '#1565C0' }]}>Email</Text>
                                </TouchableOpacity>
                                <View style={styles.vDivider} />
                                <TouchableOpacity style={styles.actionBtn}>
                                    <MaterialIcons name="edit" size={18} color="#EF6C00" />
                                    <Text style={[styles.actionText, { color: '#EF6C00' }]}>Edit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Animated.View>
                )}
            />

            <TouchableOpacity style={styles.fab} activeOpacity={0.8}>
                <LinearGradient
                    colors={['#C62828', '#D32F2F']}
                    style={styles.fabGradient}
                >
                    <Ionicons name="person-add" size={24} color="#fff" />
                </LinearGradient>
            </TouchableOpacity>
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
    headerSubtitle: { fontSize: 13, color: 'rgba(255,255,255,0.9)', marginTop: 2, marginBottom: 15 },

    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderRadius: 12,
        paddingHorizontal: 15,
        height: 45,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    searchInput: { flex: 1, marginLeft: 10, color: '#fff', fontSize: 16 },

    list: { padding: 20, paddingBottom: 80 },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
    },
    row: { flexDirection: 'row', alignItems: 'center' },
    avatar: {
        width: 55,
        height: 55,
        borderRadius: 27.5,
        backgroundColor: '#FFEBEE',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    avatarText: { fontSize: 22, fontWeight: 'bold', color: '#D32F2F' },
    info: { flex: 1 },
    name: { fontSize: 17, fontWeight: 'bold', color: '#333' },
    badgeRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 4 },
    deptBadge: { backgroundColor: '#F5F5F5', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, marginRight: 8 },
    deptText: { fontSize: 11, fontWeight: 'bold', color: '#555' },
    designation: { fontSize: 12, color: '#666' },
    subject: { fontSize: 12, color: '#888', marginTop: 2 },

    divider: { height: 1, backgroundColor: '#F0F0F0', marginVertical: 12 },

    actions: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
    actionBtn: { flexDirection: 'row', alignItems: 'center', padding: 5 },
    actionText: { marginLeft: 6, fontSize: 13, fontWeight: '600' },
    vDivider: { width: 1, height: 20, backgroundColor: '#EEE' },

    fab: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        width: 56,
        height: 56,
        borderRadius: 28,
        elevation: 8,
        shadowColor: '#C62828',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    fabGradient: {
        flex: 1,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
