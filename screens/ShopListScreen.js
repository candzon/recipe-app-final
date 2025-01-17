import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const ShopListScreen = () => {
    const [selectedStore, setSelectedStore] = useState(null);

    const supermarkets = [
        {
            id: 1,
            name: 'Supermarket A',
            location: 'Jl. Main Street No. 123',
            description: 'A great place to buy groceries.',
            image: null, // Add image source later
        },
        {
            id: 2,
            name: 'Supermarket B',
            location: 'Jl. Central Road No. 456',
            description: 'Offers a wide variety of products.',
            image: null,
        },
        {
            id: 3,
            name: 'Supermarket C',
            location: 'Jl. Market Street No. 789',
            description: 'Known for fresh produce.',
            image: null,
        },
    ];

    const handleStorePress = (store) => {
        setSelectedStore(store);
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.content}>
                <View style={styles.productGrid}>
                    {supermarkets.map((store) => (
                        <TouchableOpacity
                            key={store.id}
                            style={styles.productCard}
                            onPress={() => handleStorePress(store)}
                        >
                            <View style={styles.productImage} />
                            <Text style={styles.productName}>{store.name}</Text>
                            <Text style={styles.productLocation}>{store.location}</Text>
                            <Text style={styles.productDescription}>{store.description}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
            {selectedStore && (
                <View style={styles.selectedStoreInfo}>
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
        padding: 16, // Added padding
    },
    content: {
        flex: 1,
    },
    productGrid: {
        padding: 8,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between', // Adjust the position of cards
    },
    productCard: {
        width: '48%', // Adjust width to fit grid
        marginVertical: 8,
        padding: 8,
        backgroundColor: '#f8f8f8',
        borderRadius: 8,
    },
    productImage: {
        height: 120,
        backgroundColor: '#ddd',
        borderRadius: 4,
        marginBottom: 8,
    },
    productName: {
        fontSize: 16,
        marginBottom: 4,
        fontWeight: 'bold',
    },
    productLocation: {
        fontSize: 14,
        color: '#666',
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
    },
    selectedStoreName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    selectedStoreLocation: {
        fontSize: 16,
        color: '#666',
    },
    selectedStoreDescription: {
        fontSize: 14,
        color: '#888',
    },
});

export default ShopListScreen;