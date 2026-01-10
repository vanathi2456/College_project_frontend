import { FontAwesome } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    Image as RNImage,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import Toast from '../components/Toast';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

export default function LoginScreen() {
    const router = useRouter();
    const { role: initialRole } = useLocalSearchParams<{ role: UserRole }>();
    const { login, isLoading } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<UserRole>('student');

    // Toast State
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'error'>('error');

    useEffect(() => {
        if (initialRole) {
            setRole(initialRole);
        }
    }, [initialRole]);

    const showToast = (message: string, type: 'success' | 'error' = 'error') => {
        setToastMessage(message);
        setToastType(type);
        setToastVisible(true);
    };

    const validate = () => {
        if (!email) {
            showToast('Please enter your Email or Register Number');
            return false;
        }
        if (role === 'student' && !email.includes('@') && isNaN(Number(email))) {
            showToast('Enter a valid Email or Student Reg No');
            return false;
        }
        if (!password) {
            showToast('Please enter your password');
            return false;
        }
        if (password.length < 6) {
            showToast('Password must be at least 6 characters');
            return false;
        }
        return true;
    };

    const handleLogin = async () => {
        if (!validate()) return;

        try {
            await login(email, password, role);
            // Success handled by router/auth context usually, but just in case:
            // showToast('Login Successful!', 'success');
        } catch (error) {
            showToast('Login Failed. Please check your credentials.');
        }
    };

    const roles: { id: UserRole, label: string, icon: string, color: string }[] = [
        { id: 'student', label: 'Student', icon: 'graduation-cap', color: '#1a237e' },
        { id: 'faculty', label: 'Faculty', icon: 'user', color: '#2e7d32' },
        { id: 'admin', label: 'Admin', icon: 'cogs', color: '#c62828' },
    ];

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                <View style={styles.header}>
                    <View style={styles.logoContainer}>
                        <RNImage source={require('../assets/images/college_logo.png')} style={styles.logoImage} resizeMode="contain" />
                    </View>
                    <Text style={styles.collegeName}>Kathir College of Engineering</Text>
                    <Text style={styles.subtitle}>Welcome Back!</Text>
                </View>

                <View style={styles.roleConfigContainer}>
                    <Text style={styles.roleLabel}>I am a...</Text>
                    <View style={styles.roleRow}>
                        {roles.map((r) => (
                            <TouchableOpacity
                                key={r.id}
                                style={[
                                    styles.roleCard,
                                    role === r.id && styles.roleCardActive,
                                    { borderColor: role === r.id ? r.color : 'transparent' }
                                ]}
                                onPress={() => setRole(r.id)}
                            >
                                <View style={[
                                    styles.roleIconCircle,
                                    { backgroundColor: role === r.id ? r.color : '#f0f0f0' }
                                ]}>
                                    <FontAwesome
                                        name={r.icon as any}
                                        size={20}
                                        color={role === r.id ? '#fff' : '#666'}
                                    />
                                </View>
                                <Text style={[
                                    styles.roleText,
                                    role === r.id && { color: r.color, fontWeight: 'bold' }
                                ]}>
                                    {r.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={styles.formContainer}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>
                            {role === 'student' ? 'Register Number / Email' : 'Email Address'}
                        </Text>
                        <View style={styles.inputWrapper}>
                            <FontAwesome name="user-o" size={20} color="#666" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder={role === 'student' ? "71001..." : "faculty@kce.ac.in"}
                                placeholderTextColor="#aaa"
                                value={email}
                                onChangeText={setEmail}
                                autoCapitalize="none"
                            />
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Password</Text>
                        <View style={styles.inputWrapper}>
                            <FontAwesome name="lock" size={20} color="#666" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="••••••"
                                placeholderTextColor="#aaa"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                            />
                        </View>
                    </View>

                    <TouchableOpacity style={styles.forgotPass}>
                        <Text style={styles.forgotPassText}>Forgot Password?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.submitButton, isLoading && styles.buttonDisabled]}
                        onPress={handleLogin}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.submitButtonText}>Login Details</Text>
                        )}
                    </TouchableOpacity>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Don't have an account?</Text>
                    <TouchableOpacity>
                        <Text style={styles.signupText}>Contact Admin</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>

            <Toast
                visible={toastVisible}
                message={toastMessage}
                type={toastType}
                onHide={() => setToastVisible(false)}
            />
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    scrollContent: {
        flexGrow: 1,
        padding: 24,
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: 30,
    },
    logoContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#e8eaf6',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    logoImage: {
        width: 60,
        height: 60,
    },
    collegeName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1a237e',
        textAlign: 'center',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
    },
    roleConfigContainer: {
        marginBottom: 25,
    },
    roleLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#444',
        marginBottom: 10,
        marginLeft: 5,
    },
    roleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    roleCard: {
        width: '31%',
        backgroundColor: '#fff',
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'transparent',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    roleCardActive: {
        backgroundColor: '#fff',
        transform: [{ scale: 1.05 }],
        elevation: 5,
    },
    roleIconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    roleText: {
        fontSize: 12,
        color: '#666',
        fontWeight: '500',
    },
    formContainer: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 5,
    },
    inputGroup: {
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f7fa',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#eee',
        paddingHorizontal: 15,
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        paddingVertical: 12,
        fontSize: 16,
        color: '#333',
    },
    forgotPass: {
        alignSelf: 'flex-end',
        marginBottom: 20,
    },
    forgotPassText: {
        color: '#1a237e',
        fontWeight: '500',
        fontSize: 13,
    },
    submitButton: {
        backgroundColor: '#1a237e',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#1a237e',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    buttonDisabled: {
        backgroundColor: '#9fa8da',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30,
    },
    footerText: {
        color: '#666',
        marginRight: 5,
    },
    signupText: {
        color: '#1a237e',
        fontWeight: 'bold',
    },
});
