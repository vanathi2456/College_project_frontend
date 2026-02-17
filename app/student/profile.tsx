import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Linking,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

interface StudentProfileData {
    // Personal Details
    registerNumber: string;
    fullName: string;
    dob: string;
    gender: string;
    department: string;
    semester: string;
    mobileNumber: string;
    email: string;
    residentialAddress: string;

    // Parent Details
    parentName: string;
    relationship: string;
    parentMobile: string;
    parentEmail: string;
    occupation: string;
    parentAddress: string;

    // Mother Details
    motherName: string;
    motherMobile: string;
    motherEmail: string;
    motherOccupation: string;
    motherAddress: string;
}

const INITIAL_DATA: StudentProfileData = {
    registerNumber: '710020104001',
    fullName: 'Arun Kumar',
    dob: '2004-05-15',
    gender: 'Male',
    department: 'Computer Science',
    semester: '6',
    mobileNumber: '9876543210',
    email: 'arun.k@example.com',
    residentialAddress: '123, Gandhi Street, Coimbatore - 641001',

    // Father
    parentName: 'Ravi Kumar',
    relationship: 'Father',
    parentMobile: '9988776655',
    parentEmail: 'ravi.k@example.com',
    occupation: 'Engineer',
    parentAddress: '123, Gandhi Street, Coimbatore - 641001',

    // Mother
    motherName: 'Lakshmi Devi',
    motherMobile: '9876500000',
    motherEmail: 'lakshmi.d@example.com',
    motherOccupation: 'Teacher',
    motherAddress: '123, Gandhi Street, Coimbatore - 641001',
};

const DEPARTMENTS = ['Computer Science', 'Electronics & Comm', 'Mechanical', 'Civil', 'Electrical & Electronics', 'AI & Data Science'];

export default function StudentProfile() {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<StudentProfileData>(INITIAL_DATA);
    const [sameAddress, setSameAddress] = useState(true);

    const handleSave = () => {
        if (!formData.fullName || !formData.email || !formData.mobileNumber) {
            Alert.alert('Error', 'Please fill in all required fields');
            return;
        }
        Alert.alert('Success', 'Profile updated successfully!', [
            { text: 'OK', onPress: () => setIsEditing(false) }
        ]);
    };

    const toggleSameAddress = (value: boolean) => {
        setSameAddress(value);
        if (value) {
            setFormData(prev => ({
                ...prev,
                parentAddress: prev.residentialAddress,
                motherAddress: prev.residentialAddress
            }));
        }
    };

    const updateField = (key: keyof StudentProfileData, value: string) => {
        setFormData(prev => {
            const newData = { ...prev, [key]: value };
            if (sameAddress && key === 'residentialAddress') {
                newData.parentAddress = value;
                newData.motherAddress = value;
            }
            return newData;
        });
    };

    const renderHeader = () => (
        <LinearGradient
            colors={['#0056D2', '#6A0DAD']}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            style={styles.headerContainer}
        >
            <View style={styles.headerContent}>
                <View style={styles.avatarContainer}>
                    <Text style={styles.avatarText}>{formData.fullName.charAt(0)}</Text>
                </View>
                <View>
                    <Text style={styles.headerName}>{formData.fullName}</Text>
                    <Text style={styles.headerSub}>{formData.registerNumber} • {formData.department}</Text>
                </View>
            </View>
            <TouchableOpacity
                style={styles.editBtn}
                onPress={() => isEditing ? handleSave() : setIsEditing(true)}
            >
                <FontAwesome name={isEditing ? "check" : "pencil"} size={16} color="#0056D2" />
                <Text style={styles.editBtnText}>{isEditing ? 'Save Profile' : 'Edit Profile'}</Text>
            </TouchableOpacity>
        </LinearGradient>
    );

    const renderField = (label: string, field: keyof StudentProfileData, placeholder: string, icon: string, keyboardType: 'default' | 'email-address' | 'phone-pad' = 'default') => (
        <View style={styles.fieldContainer}>
            <View style={styles.labelRow}>
                <View style={[styles.labelIcon, { backgroundColor: '#E3F2FD' }]}>
                    <FontAwesome name={icon as any} size={14} color="#0056D2" />
                </View>
                <Text style={styles.label}>{label}</Text>
            </View>

            {isEditing ? (
                <TextInput
                    style={styles.input}
                    value={formData[field]}
                    onChangeText={(text) => updateField(field, text)}
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    autoCapitalize="none"
                    placeholderTextColor="#999"
                />
            ) : (
                <View style={styles.valueRow}>
                    <Text style={styles.valueText}>{formData[field]}</Text>
                    {(field === 'parentMobile' || field === 'motherMobile' || field === 'mobileNumber') && (
                        <View style={styles.actionIcons}>
                            <TouchableOpacity
                                style={[styles.actionBtn, { backgroundColor: '#E8F5E9' }]}
                                onPress={() => Linking.openURL(`tel:${formData[field]}`)}
                            >
                                <FontAwesome name="phone" size={16} color="#00A86B" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.actionBtn, { backgroundColor: '#FFF3E0' }]}
                                onPress={() => Linking.openURL(`sms:${formData[field]}`)}
                            >
                                <FontAwesome name="comment" size={16} color="#FF8C00" />
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            )}
        </View>
    );

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <Stack.Screen options={{ headerShown: false }} />
            <StatusBar barStyle="light-content" backgroundColor="#0056D2" />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
                {renderHeader()}

                <View style={styles.contentContainer}>

                    {/* 🔹 Personal Details */}
                    <View style={styles.sectionCard}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Personal Information</Text>
                            <View style={styles.sectionLine} />
                        </View>

                        {renderField('Full Name', 'fullName', 'Enter Name', 'user')}
                        {renderField('Date of Birth', 'dob', 'YYYY-MM-DD', 'calendar')}
                        {renderField('Gender', 'gender', 'Select Gender', 'transgender')}
                        {renderField('Mobile', 'mobileNumber', 'Enter Mobile', 'mobile', 'phone-pad')}
                        {renderField('Email', 'email', 'Enter Email', 'envelope', 'email-address')}
                        {renderField('Address', 'residentialAddress', 'Enter Address', 'map-marker')}
                    </View>

                    {/* 🔹 Father Details */}
                    <View style={styles.sectionCard}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Father / Guardian</Text>
                            <View style={[styles.sectionLine, { backgroundColor: '#FF8C00' }]} />
                        </View>
                        {renderField('Father Name', 'parentName', 'Enter Name', 'user')}
                        {renderField('Occupation', 'occupation', 'Enter Occupation', 'briefcase')}
                        {renderField('Mobile', 'parentMobile', 'Enter Mobile', 'phone', 'phone-pad')}
                        {renderField('Email', 'parentEmail', 'Enter Email', 'envelope', 'email-address')}
                        {/* {renderField('Address', 'parentAddress', 'Enter Address', 'home')} */}

                        {!isEditing && (
                            <View style={{ flexDirection: 'row', marginTop: 15, justifyContent: 'flex-end' }}>
                                <TouchableOpacity
                                    style={[styles.actionBtn, { backgroundColor: '#E8F5E9', width: 120, borderRadius: 10, marginRight: 10 }]}
                                    onPress={() => Linking.openURL(`tel:${formData.parentMobile}`)}
                                >
                                    <FontAwesome name="phone" size={16} color="#00A86B" style={{ marginRight: 8 }} />
                                    <Text style={{ color: '#00A86B', fontWeight: 'bold' }}>Call</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.actionBtn, { backgroundColor: '#FFF3E0', width: 120, borderRadius: 10 }]}
                                    onPress={() => Linking.openURL(`sms:${formData.parentMobile}`)}
                                >
                                    <FontAwesome name="comment" size={16} color="#FF8C00" style={{ marginRight: 8 }} />
                                    <Text style={{ color: '#FF8C00', fontWeight: 'bold' }}>Message</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>

                    {/* 🔹 Mother Details */}
                    <View style={styles.sectionCard}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Mother's Details</Text>
                            <View style={[styles.sectionLine, { backgroundColor: '#6A0DAD' }]} />
                        </View>
                        {renderField('Mother Name', 'motherName', 'Enter Name', 'female')}
                        {renderField('Occupation', 'motherOccupation', 'Enter Occupation', 'briefcase')}
                        {renderField('Mobile', 'motherMobile', 'Enter Mobile', 'phone', 'phone-pad')}
                        {renderField('Email', 'motherEmail', 'Enter Email', 'envelope', 'email-address')}

                        {!isEditing && (
                            <View style={{ flexDirection: 'row', marginTop: 15, justifyContent: 'flex-end' }}>
                                <TouchableOpacity
                                    style={[styles.actionBtn, { backgroundColor: '#E8F5E9', width: 120, borderRadius: 10, marginRight: 10 }]}
                                    onPress={() => Linking.openURL(`tel:${formData.motherMobile}`)}
                                >
                                    <FontAwesome name="phone" size={16} color="#00A86B" style={{ marginRight: 8 }} />
                                    <Text style={{ color: '#00A86B', fontWeight: 'bold' }}>Call</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.actionBtn, { backgroundColor: '#FFF3E0', width: 120, borderRadius: 10 }]}
                                    onPress={() => Linking.openURL(`sms:${formData.motherMobile}`)}
                                >
                                    <FontAwesome name="comment" size={16} color="#FF8C00" style={{ marginRight: 8 }} />
                                    <Text style={{ color: '#FF8C00', fontWeight: 'bold' }}>Message</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>

                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
    },
    headerContainer: {
        paddingTop: Platform.OS === 'android' ? 50 : 20,
        paddingBottom: 30,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        shadowColor: '#0056D2',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 15,
        elevation: 10,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    avatarContainer: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.5)',
    },
    avatarText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
    },
    headerName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        letterSpacing: 0.5,
    },
    headerSub: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.9)',
        marginTop: 4,
    },
    editBtn: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignSelf: 'flex-start',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    editBtnText: {
        color: '#0056D2',
        fontWeight: 'bold',
        marginLeft: 8,
        fontSize: 14,
    },
    contentContainer: {
        padding: 20,
        marginTop: 0,
    },
    sectionCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#f0f0f0',
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginRight: 15,
    },
    sectionLine: {
        flex: 1,
        height: 2,
        backgroundColor: '#0056D2',
        opacity: 0.2,
        borderRadius: 1,
    },
    fieldContainer: {
        marginBottom: 18,
    },
    labelRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    labelIcon: {
        width: 24,
        height: 24,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    label: {
        fontSize: 12,
        fontWeight: '700',
        color: '#666',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    valueRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 4,
    },
    valueText: {
        fontSize: 16,
        color: '#222',
        fontWeight: '500',
        flex: 1,
    },
    input: {
        backgroundColor: '#F9FAFB',
        padding: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        fontSize: 16,
        color: '#333',
    },
    actionIcons: {
        flexDirection: 'row',
    },
    actionBtn: {
        width: 38,
        height: 38,
        borderRadius: 19,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
});
