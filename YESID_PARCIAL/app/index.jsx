import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { List, Appbar, Provider as PaperProvider } from 'react-native-paper';
import { useRouter } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function App() {
  const router = useRouter();

  const menuItems = [
    { title: 'Autor', icon: 'person', route: '/creador' },
    { title: 'Inicio de Sesión', icon: 'login', route: '/inicio-sesion' },
    { title: 'Dashboard', icon: 'dashboard', route: '/home' },
    { title: 'Lista de Productos', icon: 'inventory', route: '/productos' },
    { title: 'Movimientos', icon: 'swap-horiz', route: '/movimientos' },
    { title: 'Categorías', icon: 'category', route: '/categories' },
    { title: 'Reportes', icon: 'assessment', route: '/reportes' },
    { title: 'Configuración', icon: 'settings', route: '/configuracion' },
    { title: 'Perfil de Usuario', icon: 'account-circle', route: '/perfil' },
    { title: 'Ayuda', icon: 'help', route: '/ayuda' }
  ];

  return (
    <PaperProvider>
      <Appbar.Header>
        <Appbar.Content title="Inventario App" />
      </Appbar.Header>
      <ScrollView style={styles.container}>
        {menuItems.map((item, index) => (
          <List.Item
            key={index}
            title={item.title}
            left={() => <MaterialIcons name={item.icon} size={24} />}
            right={() => <MaterialIcons name="chevron-right" size={24} />}
            onPress={() => router.push(item.route)}
            style={styles.listItem}
          />
        ))}
      </ScrollView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listItem: {
    backgroundColor: 'white',
    marginVertical: 2,
  },
});