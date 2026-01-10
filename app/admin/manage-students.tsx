import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Alert,
    Linking,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
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
    {
        id: '3',
        registerNumber: 'EC2022015',
        name: 'Arun Prakash',
        email: 'arun.prakash@college.edu',
        phone: '+91 9876543230',
        dateOfBirth: '2004-03-10',
        gender: 'Male',
        department: 'Electronics',
        year: 2,
        semester: 3,
        address: '789, T Nagar',
        city: 'Chennai',
        state: 'Tamil Nadu',
        pincode: '600017',
        bloodGroup: 'B+',
        parentDetails: {
            fatherName: 'Prakash Venkat',
            fatherPhone: '+91 9876543231',
            fatherEmail: 'prakash.v@email.com',
            fatherOccupation: 'Banker',
            motherName: 'Radha Prakash',
            motherPhone: '+91 9876543232',
            motherOccupation: 'Homemaker'
        },
        admissionDate: '2022-08-15'
    }
];

export default function ManageStudents() {
    const [students, setStudents] = useState<Student[]>(mockStudents);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    // Filter students based on search query
    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.registerNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.department.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Handle phone call
    const handleCall = (phoneNumber: string, name: string) => {
        Alert.alert(
            'Make a Call',
            `Call ${name} at ${phoneNumber}?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Call',
                    onPress: () => Linking.openURL(`tel:${phoneNumber}`)
                }
            ]
        );
    };

    // Handle SMS
    const handleSMS = (phoneNumber: string, name: string) => {
        Alert.alert(
            'Send Message',
            `Send SMS to ${name} at ${phoneNumber}?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Message',
                    onPress: () => Linking.openURL(`sms:${phoneNumber}`)
                }
            ]
        );
    };

    // Handle Email
    const handleEmail = (email: string, name: string) => {
        if (email) {
            Linking.openURL(`mailto:${email}`);
        } else {
            Alert.alert('No Email', `No email address available for ${name}`);
        }
    };

    // Handle WhatsApp
    const handleWhatsApp = (phoneNumber: string, name: string) => {
        const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
        Linking.openURL(`whatsapp://send?phone=${cleanNumber}`).catch(() => {
            Alert.alert('Error', 'WhatsApp is not installed on this device');
        });
    };

    const viewStudentDetails = (student: Student) => {
        setSelectedStudent(student);
        setModalVisible(true);
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Student Management</Text>
                <Text style={styles.headerSubtitle}>View & Contact Students</Text>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search by name, register number, or department..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            {/* Student List */}
            <ScrollView style={styles.scrollView}>
                {filteredStudents.map((student) => (
                    <View key={student.id} style={styles.studentCard}>
                        {/* Student Header */}
                        <TouchableOpacity
                            style={styles.studentHeader}
                            onPress={() => viewStudentDetails(student)}
                        >
                            <View style={styles.avatarContainer}>
                                <Ionicons name="person-circle" size={50} color="#4A90E2" />
                            </View>
                            <View style={styles.studentInfo}>
                                <Text style={styles.studentName}>{student.name}</Text>
                                <Text style={styles.studentRegNo}>{student.registerNumber}</Text>
                                <Text style={styles.studentDept}>
                                    {student.department} - Year {student.year}
                                </Text>
                            </View>
                            <Ionicons name="chevron-forward" size={24} color="#999" />
                        </TouchableOpacity>

                        {/* Student Contact Options */}
                        <View style={styles.contactSection}>
                            <Text style={styles.sectionTitle}>Student Contact</Text>
                            <View style={styles.contactRow}>
                                <TouchableOpacity
                                    style={styles.contactButton}
                                    onPress={() => handleCall(student.phone, student.name)}
                                >
                                    <Ionicons name="call" size={20} color="#4CAF50" />
                                    <Text style={styles.contactButtonText}>Call</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.contactButton}
                                    onPress={() => handleSMS(student.phone, student.name)}
                                >
                                    <Ionicons name="chatbubble" size={20} color="#2196F3" />
                                    <Text style={styles.contactButtonText}>SMS</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.contactButton}
                                    onPress={() => handleWhatsApp(student.phone, student.name)}
                                >
                                    <Ionicons name="logo-whatsapp" size={20} color="#25D366" />
                                    <Text style={styles.contactButtonText}>WhatsApp</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.contactButton}
                                    onPress={() => handleEmail(student.email, student.name)}
                                >
                                    <Ionicons name="mail" size={20} color="#FF9800" />
                                    <Text style={styles.contactButtonText}>Email</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Parent Contact Options */}
                        <View style={styles.contactSection}>
                            <Text style={styles.sectionTitle}>Parent Contact</Text>

                            {/* Father's Contact */}
                            <View style={styles.parentRow}>
                                <View style={styles.parentInfo}>
                                    <Text style={styles.parentLabel}>Father</Text>
                                    <Text style={styles.parentName}>{student.parentDetails.fatherName}</Text>
                                    <Text style={styles.parentPhone}>{student.parentDetails.fatherPhone}</Text>
                                </View>
                                <View style={styles.parentActions}>
                                    <TouchableOpacity
                                        style={styles.iconButton}
                                        onPress={() => handleCall(student.parentDetails.fatherPhone, student.parentDetails.fatherName)}
                                    >
                                        <Ionicons name="call" size={20} color="#4CAF50" />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.iconButton}
                                        onPress={() => handleSMS(student.parentDetails.fatherPhone, student.parentDetails.fatherName)}
                                    >
                                        <Ionicons name="chatbubble" size={20} color="#2196F3" />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.iconButton}
                                        onPress={() => handleWhatsApp(student.parentDetails.fatherPhone, student.parentDetails.fatherName)}
                                    >
                                        <Ionicons name="logo-whatsapp" size={20} color="#25D366" />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* Mother's Contact */}
                            <View style={styles.parentRow}>
                                <View style={styles.parentInfo}>
                                    <Text style={styles.parentLabel}>Mother</Text>
                                    <Text style={styles.parentName}>{student.parentDetails.motherName}</Text>
                                    <Text style={styles.parentPhone}>{student.parentDetails.motherPhone}</Text>
                                </View>
                                <View style={styles.parentActions}>
                                    <TouchableOpacity
                                        style={styles.iconButton}
                                        onPress={() => handleCall(student.parentDetails.motherPhone, student.parentDetails.motherName)}
                                    >
                                        <Ionicons name="call" size={20} color="#4CAF50" />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.iconButton}
                                        onPress={() => handleSMS(student.parentDetails.motherPhone, student.parentDetails.motherName)}
                                    >
                                        <Ionicons name="chatbubble" size={20} color="#2196F3" />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.iconButton}
                                        onPress={() => handleWhatsApp(student.parentDetails.motherPhone, student.parentDetails.motherName)}
                                    >
                                        <Ionicons name="logo-whatsapp" size={20} color="#25D366" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
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
                        <ScrollView>
                            {selectedStudent && (
                                <>
                                    <View style={styles.modalHeader}>
                                        <Text style={styles.modalTitle}>Student Details</Text>
                                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                                            <Ionicons name="close-circle" size={32} color="#666" />
                                        </TouchableOpacity>
                                    </View>

                                    {/* Personal Information */}
                                    <View style={styles.detailSection}>
                                        <Text style={styles.detailSectionTitle}>Personal Information</Text>
                                        <DetailRow label="Name" value={selectedStudent.name} />
                                        <DetailRow label="Register Number" value={selectedStudent.registerNumber} />
                                        <DetailRow label="Email" value={selectedStudent.email} />
                                        <DetailRow label="Phone" value={selectedStudent.phone} />
                                        <DetailRow label="Date of Birth" value={selectedStudent.dateOfBirth} />
                                        <DetailRow label="Gender" value={selectedStudent.gender} />
                                        <DetailRow label="Blood Group" value={selectedStudent.bloodGroup || 'N/A'} />
                                    </View>

                                    {/* Academic Information */}
                                    <View style={styles.detailSection}>
                                        <Text style={styles.detailSectionTitle}>Academic Information</Text>
                                        <DetailRow label="Department" value={selectedStudent.department} />
                                        <DetailRow label="Year" value={selectedStudent.year.toString()} />
                                        <DetailRow label="Semester" value={selectedStudent.semester.toString()} />
                                        <DetailRow label="Admission Date" value={selectedStudent.admissionDate} />
                                    </View>

                                    {/* Address Information */}
                                    <View style={styles.detailSection}>
                                        <Text style={styles.detailSectionTitle}>Address</Text>
                                        <DetailRow label="Street" value={selectedStudent.address} />
                                        <DetailRow label="City" value={selectedStudent.city} />
                                        <DetailRow label="State" value={selectedStudent.state} />
                                        <DetailRow label="Pincode" value={selectedStudent.pincode} />
                                    </View>

                                    {/* Parent Information */}
                                    <View style={styles.detailSection}>
                                        <Text style={styles.detailSectionTitle}>Father's Details</Text>
                                        <DetailRow label="Name" value={selectedStudent.parentDetails.fatherName} />
                                        <DetailRow label="Phone" value={selectedStudent.parentDetails.fatherPhone} />
                                        <DetailRow label="Email" value={selectedStudent.parentDetails.fatherEmail || 'N/A'} />
                                        <DetailRow label="Occupation" value={selectedStudent.parentDetails.fatherOccupation || 'N/A'} />
                                    </View>

                                    <View style={styles.detailSection}>
                                        <Text style={styles.detailSectionTitle}>Mother's Details</Text>
                                        <DetailRow label="Name" value={selectedStudent.parentDetails.motherName} />
                                        <DetailRow label="Phone" value={selectedStudent.parentDetails.motherPhone} />
                                        <DetailRow label="Email" value={selectedStudent.parentDetails.motherEmail || 'N/A'} />
                                        <DetailRow label="Occupation" value={selectedStudent.parentDetails.motherOccupation || 'N/A'} />
                                    </View>
                                </>
                            )}
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

// Helper component for detail rows
const DetailRow = ({ label, value }: { label: string; value: string }) => (
    <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>{label}:</Text>
        <Text style={styles.detailValue}>{value}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    header: {
        backgroundColor: '#4A90E2',
        padding: 20,
        paddingTop: 40
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff'
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#fff',
        opacity: 0.9,
        marginTop: 4
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        margin: 15,
        paddingHorizontal: 15,
        borderRadius: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4
    },
    searchIcon: {
        marginRight: 10
    },
    searchInput: {
        flex: 1,
        paddingVertical: 12,
        fontSize: 16
    },
    scrollView: {
        flex: 1
    },
    studentCard: {
        backgroundColor: '#fff',
        marginHorizontal: 15,
        marginBottom: 15,
        borderRadius: 12,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        overflow: 'hidden'
    },
    studentHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0'
    },
    avatarContainer: {
        marginRight: 12
    },
    studentInfo: {
        flex: 1
    },
    studentName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333'
    },
    studentRegNo: {
        fontSize: 14,
        color: '#666',
        marginTop: 2
    },
    studentDept: {
        fontSize: 13,
        color: '#4A90E2',
        marginTop: 2
    },
    contactSection: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0'
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
        marginBottom: 10,
        textTransform: 'uppercase'
    },
    contactRow: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    contactButton: {
        alignItems: 'center',
        padding: 10,
        minWidth: 70
    },
    contactButtonText: {
        fontSize: 12,
        color: '#666',
        marginTop: 4
    },
    parentRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0'
    },
    parentInfo: {
        flex: 1
    },
    parentLabel: {
        fontSize: 12,
        color: '#999',
        textTransform: 'uppercase'
    },
    parentName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginTop: 2
    },
    parentPhone: {
        fontSize: 14,
        color: '#666',
        marginTop: 2
    },
    parentActions: {
        flexDirection: 'row',
        gap: 10
    },
    iconButton: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: '#f5f5f5'
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 20,
        width: '90%',
        maxHeight: '80%',
        elevation: 5
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0'
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333'
    },
    detailSection: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0'
    },
    detailSectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4A90E2',
        marginBottom: 12
    },
    detailRow: {
        flexDirection: 'row',
        paddingVertical: 6
    },
    detailLabel: {
        fontSize: 14,
        color: '#666',
        width: 140,
        fontWeight: '500'
    },
    detailValue: {
        fontSize: 14,
        color: '#333',
        flex: 1
    }
});

