import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MonteSeuPC from './screens/MonteSeuPC';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import MaisVendidosScreen from './screens/MaisVendidosScreen';
import CarrinhoScreen from './screens/CarrinhoScreen';
import CadastroScreen from './screens/CadastroScreen';
import VerificacaoScreen from './screens/VerificacaoScreen'; 
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="MaisVendidos" component={MaisVendidosScreen} />
        <Stack.Screen name="Carrinho" component={CarrinhoScreen} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} />
        <Stack.Screen name="Verificacao" component={VerificacaoScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}