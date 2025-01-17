import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from 'react-native';
import { login } from '../services/api';

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        if (!username || !password) {
            Alert.alert('Error', 'Please enter both username and password');
            return;
        }

        setIsLoading(true);
        try {
            const response = await login(username, password);
            if (response) {
                Alert.alert('Success', response.message);
                navigation.navigate('Recipes');
            }
        } catch (error) {
            Alert.alert('Error', 'Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.logoContainer}>
                <Image
                    source={require('../assets/logo.png')}
                    style={[styles.logo, { backgroundColor: 'transparent' }]}
                />
                <Text style={styles.title}>Recipe App</Text>
            </View>

            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    placeholderTextColor="#666"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#666"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <TouchableOpacity
                    style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
                    onPress={handleLogin}
                    disabled={isLoading}
                >
                    <Text style={styles.loginButtonText}>
                        {isLoading ? 'Logging in...' : 'Login'}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.registerLink}
                    onPress={() => navigation.navigate('Register')}
                >
                    <Text style={styles.registerText}>
                        Don't have an account? <Text style={styles.registerButtonText}>Register</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 100,
    },
    logo: {
        width: 120,
        height: 120,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 20,
    },
    formContainer: {
        padding: 20,
        marginTop: 30,
    },
    input: {
        backgroundColor: '#f5f5f5',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        fontSize: 16,
    },
    loginButton: {
        backgroundColor: '#FF6B6B',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    registerLink: {
        marginTop: 20,
        alignItems: 'center',
    },
    registerText: {
        color: '#666',
        fontSize: 16,
    },
    registerButtonText: {
        color: '#FF6B6B',
        fontWeight: 'bold',
    },
});

export default LoginScreen;