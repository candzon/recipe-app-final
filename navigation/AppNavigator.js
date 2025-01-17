import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { TouchableOpacity, Text } from 'react-native';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import RecipesListScreen from '../screens/RecipesListScreen';
import RecipesDetailScreen from '../screens/RecipesDetailScreen';
import ShopListScreen from '../screens/ShopListScreen';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
        />
        <Stack.Screen
          name="Recipes"
          component={RecipesListScreen}
          options={({ navigation }) => ({
            headerShown: true,
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Shop')}
                style={{ marginLeft: 15 }}
              >
                <Icon name="shopping-cart" size={24} color="#FF6B6B" />
              </TouchableOpacity>
            ),
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
        <Stack.Screen
          name="RecipeDetail"
          component={RecipesDetailScreen}
          options={({ navigation }) => ({
            headerShown: true,
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Shop')}
                style={{ marginRight: 15 }}
              >
                <Text style={{ color: '#FF6B6B', fontSize: 16, fontWeight: 'bold' }}>
                  Shop
                </Text>
              </TouchableOpacity>
            ),
            headerTitleAlign: 'center'
          })}
        />
        <Stack.Screen
          name="Shop"
          component={ShopListScreen}
          options={{
            headerShown: true,
            headerRight: () => null,
            headerTitleAlign: 'center'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
