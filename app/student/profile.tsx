import { FontAwesome } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Linking,
    Platform,
    ScrollView,
    StyleSheet,
    Switch,
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
    parentName: 'Ravi Kumar',
    relationship: 'Father',
    parentMobile: '9988776655',
    parentEmail: 'ravi.k@example.com',
    occupation: 'Engineer',
    parentAddress: '123, Gandhi Street, Coimbatore - 641001',
};

const DEPARTMENTS = ['Computer Science', 'Electronics & Comm', 'Mechanical', 'Civil', 'Electrical & Electronics', 'AI & Data Science'];

export default function StudentProfile() {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<StudentProfileData>(INITIAL_DATA);
    const [sameAddress, setSameAddress] = useState(true);

    const handleSave = () => {
        // Validation
        if (!formData.fullName || !formData.email || !formData.mobileNumber) {
            Alert.alert('Error', 'Please fill in all required fields');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            Alert.alert('Error', 'Invalid email format');
            return;
        }

        if (formData.mobileNumber.length < 10) {
            Alert.alert('Error', 'Invalid mobile number');
            return;
        }

        // Mock Save
        Alert.alert('Success', 'Profile updated successfully!', [
            { text: 'OK', onPress: () => setIsEditing(false) }
        ]);
    };

    const toggleSameAddress = (value: boolean) => {
        setSameAddress(value);
        if (value) {
            setFormData(prev => ({ ...prev, parentAddress: prev.residentialAddress }));
        }
    };

    const updateField = (key: keyof StudentProfileData, value: string) => {
        setFormData(prev => {
            const newData = { ...prev, [key]: value };
            if (sameAddress && key === 'residentialAddress') {
                newData.parentAddress = value;
            }
            return newData;
        });
    };

    const renderField = (label: string, field: keyof StudentProfileData, placeholder: string, keyboardType: 'default' | 'email-address' | 'phone-pad' = 'default', editable = true) => (
        <View style={styles.inputGroup}>
            <Text style={styles.label}>{label}</Text>
            {isEditing && editable ? (
                <TextInput
                    style={styles.input}
                    value={formData[field]}
                    onChangeText={(text) => updateField(field, text)}
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    autoCapitalize="none"
                />
            ) : (
                <View style={styles.valueRow}>
                    <Text style={styles.valueText}>{formData[field]}</Text>
                    {field === 'parentMobile' && (
                        <View style={styles.actionIcons}>
                            <TouchableOpacity
                                style={[styles.actionBtn, { backgroundColor: '#e8f5e9' }]}
                                onPress={() => Linking.openURL(`tel:${formData[field]}`)}
                            >
                                <FontAwesome name="phone" size={16} color="#2e7d32" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.actionBtn, { backgroundColor: '#e3f2fd' }]}
                                onPress={() => Linking.openURL(`sms:${formData[field]}`)}
                            >
                                <FontAwesome name="comment" size={16} color="#1565c0" />
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            )}
        </View>
    );

    const renderDropdown = (label: string, field: keyof StudentProfileData, options: string[]) => (
        <View style={styles.inputGroup}>
            <Text style={styles.label}>{label}</Text>
            {isEditing ? (
                <View style={styles.dropdownContainer}>
                    {/* Simplified Dropdown for Mockup - In real app use a Picker or Modal */}
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {options.map((option) => (
                            <TouchableOpacity
                                key={option}
                                style={[
                                    styles.optionChip,
                                    formData[field] === option && styles.optionChipSelected
                                ]}
                                onPress={() => updateField(field, option)}
                            >
                                <Text style={[
                                    styles.optionText,
                                    formData[field] === option && styles.optionTextSelected
                                ]}>{option}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            ) : (
                <Text style={styles.valueText}>{formData[field]}</Text>
            )}
        </View>
    );

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <Stack.Screen options={{
                headerRight: () => (
                    <TouchableOpacity onPress={() => isEditing ? handleSave() : setIsEditing(true)}>
                        <Text style={styles.headerBtn}>{isEditing ? 'Save' : 'Edit'}</Text>
                    </TouchableOpacity>
                )
            }} />

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <View style={styles.iconBox}>
                            <FontAwesome name="user-circle" size={24} color="#1a237e" />
                        </View>
                        <Text style={styles.sectionTitle}>Personal Details</Text>
                    </View>

                    <View style={styles.card}>
                        {renderField('Register Number', 'registerNumber', 'Enter Register Number', 'default', false)}
                        {renderField('Full Name', 'fullName', 'Enter Full Name')}
                        {renderField('Date of Birth', 'dob', 'YYYY-MM-DD')}
                        {renderDropdown('Gender', 'gender', ['Male', 'Female', 'Other'])}
                        {renderDropdown('Department', 'department', DEPARTMENTS)}
                        {renderField('Semester', 'semester', 'Enter Semester', 'phone-pad')}
                        {renderField('Mobile Number', 'mobileNumber', 'Enter Mobile Number', 'phone-pad')}
                        {renderField('Email Address', 'email', 'Enter Email', 'email-address')}
                        {renderField('Residential Address', 'residentialAddress', 'Enter Address')}
                    </View>
                </View>

                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <View style={[styles.iconBox, { backgroundColor: '#e8f5e9' }]}>
                            <FontAwesome name="users" size={24} color="#2e7d32" />
                        </View>
                        <Text style={styles.sectionTitle}>Parent / Guardian Details</Text>
                    </View>

                    <View style={styles.card}>
                        {renderField('Parent Name', 'parentName', 'Enter Parent Name')}
                        {renderField('Relationship', 'relationship', 'Father/Mother/Guardian')}
                        {renderField('Parent Mobile', 'parentMobile', 'Enter Parent Mobile', 'phone-pad')}
                        {renderField('Parent Email', 'parentEmail', 'Enter Parent Email', 'email-address')}
                        {renderField('Occupation', 'occupation', 'Enter Occupation')}

                        {isEditing && (
                            <View style={styles.switchRow}>
                                <Text style={styles.switchLabel}>Same as Student Address</Text>
                                <Switch
                                    value={sameAddress}
                                    onValueChange={toggleSameAddress}
                                    trackColor={{ false: "#767577", true: "#1a237e" }}
                                    thumbColor={sameAddress ? "#fff" : "#f4f3f4"}
                                />
                            </View>
                        )}

                        {!sameAddress ? renderField('Parent Address', 'parentAddress', 'Enter Parent Address') : (
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Parent Address</Text>
                                <Text style={[styles.valueText, { color: '#666', fontStyle: 'italic' }]}>
                                    Same as residential address
                                </Text>
                            </View>
                        )}
                    </View>
                </View>

                {isEditing && (
                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <Text style={styles.saveButtonText}>Save Changes</Text>
                    </TouchableOpacity>
                )}

                <View style={{ height: 40 }} />
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f7fa',
    },
    scrollContent: {
        padding: 20,
    },
    headerBtn: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10,
    },
    section: {
        marginBottom: 25,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: '#e8eaf6',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    inputGroup: {
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        paddingBottom: 10,
    },
    label: {
        fontSize: 12,
        color: '#666',
        marginBottom: 8,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    valueRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    valueText: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
    actionIcons: {
        flexDirection: 'row',
    },
    actionBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
    input: {
        fontSize: 16,
        color: '#333',
        paddingVertical: 4,
        fontWeight: '500',
    },
    dropdownContainer: {
        flexDirection: 'row',
    },
    optionChip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#f5f5f5',
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    optionChipSelected: {
        backgroundColor: '#e8eaf6',
        borderColor: '#1a237e',
    },
    optionText: {
        color: '#666',
        fontSize: 14,
    },
    optionTextSelected: {
        color: '#1a237e',
        fontWeight: 'bold',
    },
    switchRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingVertical: 5,
    },
    switchLabel: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
    },
    saveButton: {
        backgroundColor: '#1a237e',
        paddingVertical: 15,
        borderRadius: 30,
        alignItems: 'center',
        marginTop: 10,
        shadowColor: '#1a237e',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
