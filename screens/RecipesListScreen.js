import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';
import { fetchRecipes } from '../services/api';

const RecipesListScreen = ({ navigation }) => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const loadRecipes = async () => {
            try {
                const data = await fetchRecipes();
                setRecipes(data);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };

        loadRecipes();
    }, []);

    const renderRecipeCard = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('RecipeDetail', { recipe: item.id })}
        >
            <Image
                source={{ uri: item.image }}
                style={styles.image}
                defaultSource={require('../assets/placeholder.jpg')}
            />
            <View style={styles.contentContainer}>
                <Text style={styles.title}>{item.name}</Text>
                <View style={styles.infoContainer}>
                    <View style={styles.infoItem}>
                        <AntDesign name="clockcircle" size={16} color="#FF6B6B" />
                        <Text style={styles.infoText}>{item.duration}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <AntDesign name="star" size={16} color="#FF6B6B" />
                        <Text style={styles.infoText}>Medium</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={recipes}
                renderItem={renderRecipeCard}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
    },
    listContainer: {
        padding: 16,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 15,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    contentContainer: {
        padding: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2D3436',
        marginBottom: 8,
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoText: {
        marginLeft: 4,
        color: '#636E72',
        fontSize: 14,
    },
});

export default RecipesListScreen;
