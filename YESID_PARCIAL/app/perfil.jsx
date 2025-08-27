import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { 
  Card, 
  Text, 
  Appbar, 
  Avatar,
  List,
  Button,
  TextInput,
  Dialog,
  Portal
} from 'react-native-paper';
import { useRouter } from 'expo-router';

export default function UserProfile() {
  const router = useRouter();
  const [user, setUser] = useState({
    name: 'Usuario Demo',
    email: 'usuario@inventario.com',
    role: 'Administrador',
    lastLogin: '2023-12-15 10:30',
    avatar: 'https://via.placeholder.com/100'
  });

  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');

  const handleEditProfile = () => {
    setEditName(user.name);
    setEditEmail(user.email);
    setEditDialogVisible(true);
  };

  const handleSaveProfile = () => {
    if (!editName.trim() || !editEmail.trim()) {
      Alert.alert('Error', 'Todos los campos son requeridos');
      return;
    }

    setUser(prev => ({
      ...prev,
      name: editName,
      email: editEmail
    }));

    setEditDialogVisible(false);
    Alert.alert('Éxito', 'Perfil actualizado exitosamente');
  };

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que deseas cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Cerrar Sesión', 
          style: 'destructive', 
          onPress: () => router.push('/login')
        }
      ]
    );
  };

  const stats = [
    { label: 'Productos creados', value: '15' },
    { label: 'Movimientos registrados', value: '48' },
    { label: 'Días activo', value: '30' }
  ];

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Perfil de Usuario" />
        <Appbar.Action icon="edit" onPress={handleEditProfile} />
      </Appbar.Header>

      <ScrollView style={styles.content}>
        {/* Información del Usuario */}
        <Card style={styles.card}>
          <Card.Content style={styles.profileHeader}>
            <Avatar.Image 
              size={80} 
              source={{ uri: user.avatar }}
              style={styles.avatar}
            />
            <View style={styles.userInfo}>
              <Text variant="headlineSmall" style={styles.userName}>
                {user.name}
              </Text>
              <Text variant="bodyMedium" style={styles.userEmail}>
                {user.email}
              </Text>
              <Text variant="bodySmall" style={styles.userRole}>
                {user.role}
              </Text>
            </View>
          </Card.Content>
        </Card>

        {/* Estadísticas del Usuario */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Estadísticas
            </Text>
            <View style={styles.statsContainer}>
              {stats.map((stat, index) => (
                <View key={index} style={styles.statItem}>
                  <Text variant="headlineMedium" style={styles.statValue}>
                    {stat.value}
                  </Text>
                  <Text variant="bodySmall" style={styles.statLabel}>
                    {stat.label}
                  </Text>
                </View>
              ))}
            </View>
          </Card.Content>
        </Card>

        {/* Información de Sesión */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Información de Sesión
            </Text>
            <List.Item
              title="Último acceso"
              description={user.lastLogin}
              left={(props) => <List.Icon {...props} icon="clock" />}
            />
            <List.Item
              title="Dispositivo"
              description="Móvil Android"
              left={(props) => <List.Icon {...props} icon="phone" />}
            />
            <List.Item
              title="Versión de la app"
              description="1.0.0"
              left={(props) => <List.Icon {...props} icon="information" />}
            />
          </Card.Content>
        </Card>

        {/* Acciones */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Acciones
            </Text>
            <List.Item
              title="Editar perfil"
              description="Actualizar información personal"
              left={(props) => <List.Icon {...props} icon="account-edit" />}
              onPress={handleEditProfile}
            />
            <List.Item
              title="Cambiar contraseña"
              description="Actualizar contraseña de acceso"
              left={(props) => <List.Icon {...props} icon="lock" />}
              onPress={() => router.push('/change-password')}
            />
            <List.Item
              title="Configuración"
              description="Preferencias de la aplicación"
              left={(props) => <List.Icon {...props} icon="cog" />}
              onPress={() => router.push('/settings')}
            />
          </Card.Content>
        </Card>

        {/* Botón de Cerrar Sesión */}
        <View style={styles.logoutContainer}>
          <Button
            mode="outlined"
            icon="logout"
            onPress={handleLogout}
            buttonColor="#F44336"
            textColor="white"
            style={styles.logoutButton}
          >
            Cerrar Sesión
          </Button>
        </View>
      </ScrollView>

      {/* Diálogo de Edición */}
      <Portal>
        <Dialog visible={editDialogVisible} onDismiss={() => setEditDialogVisible(false)}>
          <Dialog.Title>Editar Perfil</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Nombre completo"
              value={editName}
              onChangeText={setEditName}
              mode="outlined"
              style={styles.dialogInput}
            />
            <TextInput
              label="Email"
              value={editEmail}
              onChangeText={setEditEmail}
              mode="outlined"
              keyboardType="email-address"
              style={styles.dialogInput}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setEditDialogVisible(false)}>Cancelar</Button>
            <Button onPress={handleSaveProfile}>Guardar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    color: '#666',
    marginBottom: 4,
  },
  userRole: {
    color: '#2196F3',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    color: '#2196F3',
    fontWeight: 'bold',
  },
  statLabel: {
    textAlign: 'center',
    marginTop: 4,
  },
  logoutContainer: {
    marginBottom: 24,
  },
  logoutButton: {
    paddingVertical: 8,
  },
  dialogInput: {
    marginBottom: 16,
  },
});