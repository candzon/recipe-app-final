import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const RecipesListScreen = ({ navigation }) => {
    // Sample data - replace with your actual recipe data
    const recipes = [
        {
            id: '1',
            title: 'Spaghetti Carbonara',
            time: '30 mins',
            servings: '2',
            difficulty: 'Medium',
            ingredients: ['Eggs', 'Parmesan cheese', 'Spaghetti', 'Pancetta', 'Pepper'],
            instructions: ['Cook spaghetti', 'Fry pancetta', 'Mix eggs and cheese', 'Combine everything'],
            image: 'https://bellyfull.net/wp-content/uploads/2023/02/Spaghetti-Carbonara-blog-1.jpg',
        },
    ];

    const renderRecipeCard = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('RecipeDetail', { recipe: item })} // Pass the whole recipe object
        >
            <Image
                source={{ uri: item.image }}
                style={styles.image}
                defaultSource={require('../assets/placeholder.jpg')}
            />
            <View style={styles.contentContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <View style={styles.infoContainer}>
                    <View style={styles.infoItem}>
                        <AntDesign name="clockcircle" size={16} color="#FF6B6B" />
                        <Text style={styles.infoText}>{item.time}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <AntDesign name="star" size={16} color="#FF6B6B" />
                        <Text style={styles.infoText}>{item.difficulty}</Text>
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
