import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    RefreshControl,
    Alert
} from 'react-native';
import { fetchShops } from '../services/api';

const ShopListScreen = () => {
    const [selectedStore, setSelectedStore] = useState(null);
    const [shops, setShops] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const loadShops = async (showLoading = true) => {
        try {
            if (showLoading) setIsLoading(true);

            // Debug log
            console.log('Fetching shops...');

            const response = await fetchShops();
            console.log('API Response:', response); // Debug response

            if (!response) {
                throw new Error('No response from API');
            }

            // Handle different response structures
            const shopsData = response.data || response || [];
            console.log('Processed shops data:', shopsData); // Debug processed data

            setShops(shopsData);
        } catch (error) {
            console.error('Error loading shops:', error);
            Alert.alert(
                'Error',
                'Failed to load shops: ' + error.message
            );
        } finally {
            setIsLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        loadShops();
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        loadShops(false);
    };

    if (isLoading) {
        return (
            <View style={[styles.container, styles.centered]}>
                <ActivityIndicator size="large" color="#FF6B6B" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.content}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={['#FF6B6B']}
                    />
                }
            >
                <View style={styles.productGrid}>
                    {shops.map((store) => (
                        <TouchableOpacity
                            key={store.id}
                            style={styles.productCard}
                            onPress={() => setSelectedStore(store)}
                        >
                            <Image
                                source={{ uri: store.image }}
                                style={styles.productImage}
                                defaultSource={require('../assets/placeholder.jpg')}
                            />
                            <Text style={styles.productName}>{store.name}</Text>
                            <Text style={styles.productLocation}>{store.location}</Text>
                            <Text style={styles.productDescription}>{store.description}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
            {selectedStore && (
                <View style={styles.selectedStoreInfo}>
                    <Image
                        source={{ uri: selectedStore.image }}
                        style={styles.selectedStoreImage}
                        defaultSource={require('../assets/placeholder.jpg')}
                    />
                    <Text style={styles.selectedStoreName}>{selectedStore.name}</Text>
                    <Text style={styles.selectedStoreLocation}>{selectedStore.location}</Text>
                    <Text style={styles.selectedStoreDescription}>{selectedStore.description}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flex: 1,
    },
    productGrid: {
        padding: 8,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    productCard: {
        width: '48%',
        marginVertical: 8,
        padding: 8,
        backgroundColor: '#f8f8f8',
        borderRadius: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    productImage: {
        height: 120,
        width: '100%',
        resizeMode: 'cover',
        borderRadius: 4,
        marginBottom: 8,
        backgroundColor: '#ddd',
    },
    productName: {
        fontSize: 16,
        marginBottom: 4,
        fontWeight: 'bold',
        color: '#333',
    },
    productLocation: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    productDescription: {
        fontSize: 12,
        color: '#888',
    },
    selectedStoreInfo: {
        padding: 16,
        backgroundColor: '#f0f0f0',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        borderRadius: 12,
        margin: 8,
    },
    selectedStoreImage: {
        height: 200,
        width: '100%',
        resizeMode: 'cover',
        borderRadius: 8,
        marginBottom: 12,
    },
    selectedStoreName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#333',
    },
    selectedStoreLocation: {
        fontSize: 16,
        color: '#666',
        marginBottom: 4,
    },
    selectedStoreDescription: {
        fontSize: 14,
        color: '#888',
    },
});

export default ShopListScreen;