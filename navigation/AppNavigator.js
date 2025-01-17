import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { TouchableOpacity, Text } from 'react-native';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import RecipesListScreen from '../screens/RecipesListScreen';
import RecipesDetailScreen from '../screens/RecipesDetailScreen';
import ShopListScreen from '../screens/ShopListScreen';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen
          name="Recipes"
          component={RecipesListScreen}
          options={({ navigation }) => ({
            headerLeft: () => null,
            gestureEnabled: false,
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                  });
                }}
                style={{ marginRight: 15 }}
              >
                <Text style={{ color: '#FF6B6B', fontSize: 16, fontWeight: 'bold' }}>
                  Logout
                </Text>
              </TouchableOpacity>
            ),
            headerTitleAlign: 'center'
          })}
        />
        <Stack.Screen name="RecipeDetail" component={RecipesDetailScreen} />
        <Stack.Screen name="Shop" component={ShopListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
