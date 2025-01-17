import React, { useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const RecipesDetailScreen = ({ route }) => {
    const { recipe } = route.params || {};
    const [completedInstructions, setCompletedInstructions] = useState([]);

    const toggleCompletion = (index) => {
        setCompletedInstructions(prev =>
            prev.includes(index)
                ? prev.filter(item => item !== index)
                : [...prev, index]
        );
    };

    const completedCount = completedInstructions.length;
    const totalInstructions = recipe.instructions.length;

    if (!recipe) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Image source={{ uri: recipe.image }} style={styles.image} />
            <View style={styles.contentContainer}>
                <Text style={styles.title}>{recipe.title}</Text>
                
                <View style={styles.infoContainer}>
                    <View style={styles.infoItem}>
                        <Ionicons name="time-outline" size={24} color="#FF6B6B" />
                        <Text style={styles.infoText}>{recipe.time} mins</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Ionicons name="people-outline" size={24} color="#FF6B6B" />
                        <Text style={styles.infoText}>{recipe.servings} servings</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Ingredients</Text>
                    {recipe.ingredients.map((ingredient, index) => (
                        <Text key={index} style={styles.listItem}>• {ingredient}</Text>
                    ))}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Instructions</Text>
                    <Text style={styles.progressText}>
                        Progress: {completedCount} / {totalInstructions} completed
                    </Text>
                    {recipe.instructions.map((instruction, index) => (
                        <View key={index} style={styles.instructionContainer}>
                            <TouchableOpacity onPress={() => toggleCompletion(index)}>
                                <Ionicons 
                                    name={completedInstructions.includes(index) ? 'checkbox-outline' : 'square-outline'}
                                    size={24}
                                    color="#FF6B6B"
                                />
                            </TouchableOpacity>
                            <Text style={[
                                styles.listItem, 
                                completedInstructions.includes(index) && styles.completed
                            ]}>
                                {index + 1}. {instruction}
                            </Text>
                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    image: {
        width: '100%',
        height: 250,
    },
    contentContainer: {
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2D3436',
        marginBottom: 16,
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 24,
        backgroundColor: '#FFF5F5',
        padding: 16,
        borderRadius: 12,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoText: {
        marginLeft: 8,
        color: '#2D3436',
        fontSize: 16,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FF6B6B',
        marginBottom: 12,
    },
    instructionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    listItem: {
        fontSize: 16,
        color: '#2D3436',
        marginLeft: 10,
        lineHeight: 24,
    },
    completed: {
        textDecorationLine: 'line-through',
        color: '#A5A5A5',
    },
    progressText: {
        fontSize: 16,
        color: '#2D3436',
        marginBottom: 8,
    },
});

export default RecipesDetailScreen;
