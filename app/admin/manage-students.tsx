import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
    Linking,
    Modal,
    Platform,
    Pressable,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Student } from '../../types';

// Mock student data
const mockStudents: Student[] = [
    {
        id: '1',
        registerNumber: 'CS2021001',
        name: 'Rajesh Kumar',
        email: 'rajesh.kumar@college.edu',
        phone: '+91 9876543210',
        dateOfBirth: '2003-05-15',
        gender: 'Male',
        department: 'Computer Science',
        year: 3,
        semester: 5,
        address: '123, MG Road',
        city: 'Chennai',
        state: 'Tamil Nadu',
        pincode: '600001',
        bloodGroup: 'O+',
        parentDetails: {
            fatherName: 'Kumar Selvam',
            fatherPhone: '+91 9876543211',
            fatherEmail: 'kumar.s@email.com',
            fatherOccupation: 'Business',
            motherName: 'Lakshmi Kumar',
            motherPhone: '+91 9876543212',
            motherEmail: 'lakshmi.k@email.com',
            motherOccupation: 'Teacher'
        },
        admissionDate: '2021-08-15'
    },
    // ... add more mock data as needed
    {
        id: '2',
        registerNumber: 'CS2021002',
        name: 'Priya Sharma',
        email: 'priya.sharma@college.edu',
        phone: '+91 9876543220',
        dateOfBirth: '2003-08-22',
        gender: 'Female',
        department: 'Computer Science',
        year: 3,
        semester: 5,
        address: '456, Anna Nagar',
        city: 'Chennai',
        state: 'Tamil Nadu',
        pincode: '600040',
        bloodGroup: 'A+',
        parentDetails: {
            fatherName: 'Sharma Ravi',
            fatherPhone: '+91 9876543221',
            fatherEmail: 'sharma.r@email.com',
            fatherOccupation: 'Engineer',
            motherName: 'Meena Sharma',
            motherPhone: '+91 9876543222',
            motherEmail: 'meena.s@email.com',
            motherOccupation: 'Doctor'
        },
        admissionDate: '2021-08-15'
    },
];

export default function ManageStudents() {
    const [students, setStudents] = useState<Student[]>(mockStudents);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    // Filter students
    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.registerNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.department.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleCall = (phoneNumber: string) => Linking.openURL(`tel:${phoneNumber}`);
    const handleSMS = (phoneNumber: string) => Linking.openURL(`sms:${phoneNumber}`);
    const handleEmail = (email: string) => Linking.openURL(`mailto:${email}`);
    const handleWhatsApp = (phoneNumber: string) => {
        const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
        Linking.openURL(`whatsapp://send?phone=${cleanNumber}`);
    };

    const viewStudentDetails = (student: Student) => {
        setSelectedStudent(student);
        setModalVisible(true);
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

            {/* Header */}
            <LinearGradient
                colors={['#C62828', '#D32F2F']} // Admin Red
                style={styles.header}
            >
                <Text style={styles.headerTitle}>Student Management</Text>
                <Text style={styles.headerSubtitle}>View & Contact Students</Text>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search by name, ID, or dept..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        placeholderTextColor="#999"
                    />
                </View>
            </LinearGradient>

            {/* Student List */}
            <ScrollView contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}>
                {filteredStudents.map((student, index) => (
                    <Animated.View key={student.id} entering={FadeInDown.delay(index * 100).springify()}>
                        <Pressable
                            style={styles.studentCard}
                            onPress={() => viewStudentDetails(student)}
                        >
                            <View style={styles.cardHeader}>
                                <View style={styles.avatarContainer}>
                                    <Text style={styles.avatarText}>{student.name.charAt(0)}</Text>
                                </View>
                                <View style={styles.headerInfo}>
                                    <Text style={styles.studentName}>{student.name}</Text>
                                    <Text style={styles.studentReg}>{student.registerNumber}</Text>
                                </View>
                                <View style={styles.deptBadge}>
                                    <Text style={styles.deptText}>{student.department.substring(0, 3).toUpperCase()}</Text>
                                </View>
                            </View>

                            <View style={styles.divider} />

                            <View style={styles.contactRow}>
                                <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#E8F5E9' }]} onPress={() => handleCall(student.phone)}>
                                    <Ionicons name="call" size={18} color="#2E7D32" />
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#E3F2FD' }]} onPress={() => handleSMS(student.phone)}>
                                    <Ionicons name="chatbubble" size={18} color="#1565C0" />
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#FFF3E0' }]} onPress={() => handleEmail(student.email)}>
                                    <Ionicons name="mail" size={18} color="#EF6C00" />
                                </TouchableOpacity>
                            </View>
                        </Pressable>
                    </Animated.View>
                ))}
            </ScrollView>

            {/* Student Details Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Student Profile</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeBtn}>
                                <Ionicons name="close" size={24} color="#666" />
                            </TouchableOpacity>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false}>
                            {selectedStudent && (
                                <>
                                    <View style={styles.profileHeader}>
                                        <View style={styles.largeAvatar}>
                                            <Text style={styles.largeAvatarText}>{selectedStudent.name.charAt(0)}</Text>
                                        </View>
                                        <Text style={styles.profileName}>{selectedStudent.name}</Text>
                                        <Text style={styles.profileReg}>{selectedStudent.registerNumber}</Text>
                                    </View>

                                    <View style={styles.infoSection}>
                                        <Text style={styles.sectionTitle}>Academic Info</Text>
                                        <InfoRow label="Department" value={selectedStudent.department} />
                                        <InfoRow label="Year/Sem" value={`Year ${selectedStudent.year} / Sem ${selectedStudent.semester}`} />
                                        <InfoRow label="Admission" value={selectedStudent.admissionDate} />
                                    </View>

                                    <View style={styles.infoSection}>
                                        <Text style={styles.sectionTitle}>Personal Details</Text>
                                        <InfoRow label="Email" value={selectedStudent.email} />
                                        <InfoRow label="Phone" value={selectedStudent.phone} />
                                        <InfoRow label="Gender" value={selectedStudent.gender} />
                                        <InfoRow label="Address" value={`${selectedStudent.city}, ${selectedStudent.state}`} />
                                    </View>

                                    <View style={styles.infoSection}>
                                        <Text style={styles.sectionTitle}>Parent Contact</Text>

                                        <View style={styles.parentCard}>
                                            <View style={{ flex: 1 }}>
                                                <Text style={styles.parentLabel}>Father</Text>
                                                <Text style={styles.parentName}>{selectedStudent.parentDetails.fatherName}</Text>
                                                <Text style={styles.parentPhone}>{selectedStudent.parentDetails.fatherPhone}</Text>
                                            </View>
                                            <TouchableOpacity style={styles.callRoundBtn} onPress={() => handleCall(selectedStudent.parentDetails.fatherPhone)}>
                                                <Ionicons name="call" size={18} color="#fff" />
                                            </TouchableOpacity>
                                        </View>

                                        <View style={[styles.parentCard, { marginTop: 10 }]}>
                                            <View style={{ flex: 1 }}>
                                                <Text style={styles.parentLabel}>Mother</Text>
                                                <Text style={styles.parentName}>{selectedStudent.parentDetails.motherName}</Text>
                                                <Text style={styles.parentPhone}>{selectedStudent.parentDetails.motherPhone}</Text>
                                            </View>
                                            <TouchableOpacity style={styles.callRoundBtn} onPress={() => handleCall(selectedStudent.parentDetails.motherPhone)}>
                                                <Ionicons name="call" size={18} color="#fff" />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </>
                            )}
                            <View style={{ height: 30 }} />
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const InfoRow = ({ label, value }: { label: string; value: string }) => (
    <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
    </View>
);

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
    headerSubtitle: { fontSize: 14, color: 'rgba(255,255,255,0.9)', marginTop: 2, marginBottom: 15 },

    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingHorizontal: 15,
        height: 45,
    },
    searchIcon: { marginRight: 10 },
    searchInput: { flex: 1, height: '100%', fontSize: 15, color: '#333' },

    listContent: { padding: 20 },
    studentCard: {
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
    cardHeader: { flexDirection: 'row', alignItems: 'center' },
    avatarContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#FFEBEE',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    avatarText: { fontSize: 20, fontWeight: 'bold', color: '#D32F2F' },
    headerInfo: { flex: 1 },
    studentName: { fontSize: 16, fontWeight: 'bold', color: '#333' },
    studentReg: { fontSize: 12, color: '#666', marginTop: 2 },
    deptBadge: { backgroundColor: '#F3F4F6', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
    deptText: { fontSize: 10, fontWeight: 'bold', color: '#666' },

    divider: { height: 1, backgroundColor: '#F0F0F0', marginVertical: 15 },

    contactRow: { flexDirection: 'row', justifyContent: 'space-around' },
    actionBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },

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
        height: '85%',
        padding: 20,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#333' },
    closeBtn: { padding: 5 },

    profileHeader: { alignItems: 'center', marginBottom: 25 },
    largeAvatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#D32F2F',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        shadowColor: '#D32F2F',
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    largeAvatarText: { fontSize: 32, fontWeight: 'bold', color: '#fff' },
    profileName: { fontSize: 22, fontWeight: 'bold', color: '#333' },
    profileReg: { fontSize: 14, color: '#666' },

    infoSection: { marginBottom: 25 },
    sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 12, borderLeftWidth: 3, borderLeftColor: '#D32F2F', paddingLeft: 10 },
    infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: '#F5F5F5' },
    infoLabel: { color: '#666', fontSize: 14 },
    infoValue: { color: '#333', fontSize: 14, fontWeight: '500' },

    parentCard: {
        backgroundColor: '#F9FAFB',
        padding: 15,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    parentLabel: { fontSize: 11, color: '#999', textTransform: 'uppercase' },
    parentName: { fontSize: 15, fontWeight: 'bold', color: '#333' },
    parentPhone: { fontSize: 13, color: '#666' },
    callRoundBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#00A86B',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
