import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { 
  List, 
  Switch, 
  Appbar,
  Card,
  Text,
  Button,
  Dialog,
  Portal,
  TextInput
} from 'react-native-paper';
import { useRouter } from 'expo-router';

export default function Settings() {
  const router = useRouter();
  const [settings, setSettings] = useState({
    notifications: true,
    lowStockAlerts: true,
    darkMode: false,
    autoBackup: true,
    showStockInList: true
  });

  const [backupDialogVisible, setBackupDialogVisible] = useState(false);
  const [passwordDialogVisible, setPasswordDialogVisible] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const toggleSetting = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleBackup = () => {
    setBackupDialogVisible(false);
    Alert.alert('Éxito', 'Copia de seguridad creada exitosamente');
  };

  const handleRestore = () => {
    Alert.alert(
      'Confirmar Restauración',
      '¿Estás seguro de que deseas restaurar los datos? Esto sobrescribirá la información actual.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Restaurar', style: 'destructive', onPress: () => {} }
      ]
    );
  };

  const handleChangePassword = () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert('Error', 'Todos los campos son requeridos');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    setPasswordDialogVisible(false);
    setNewPassword('');
    setConfirmPassword('');
    Alert.alert('Éxito', 'Contraseña cambiada exitosamente');
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Configuración" />
      </Appbar.Header>

      <ScrollView style={styles.content}>
        {/* Notificaciones */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Notificaciones
            </Text>
            <List.Item
              title="Notificaciones generales"
              description="Recibir notificaciones de la aplicación"
              right={() => (
                <Switch
                  value={settings.notifications}
                  onValueChange={() => toggleSetting('notifications')}
                />
              )}
            />
            <List.Item
              title="Alertas de stock bajo"
              description="Notificar cuando los productos tengan poco stock"
              right={() => (
                <Switch
                  value={settings.lowStockAlerts}
                  onValueChange={() => toggleSetting('lowStockAlerts')}
                />
              )}
            />
          </Card.Content>
        </Card>

        {/* Apariencia */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Apariencia
            </Text>
            <List.Item
              title="Modo oscuro"
              description="Usar tema oscuro en la aplicación"
              right={() => (
                <Switch
                  value={settings.darkMode}
                  onValueChange={() => toggleSetting('darkMode')}
                />
              )}
            />
            <List.Item
              title="Mostrar stock en listas"
              description="Mostrar cantidad de stock en las listas de productos"
              right={() => (
                <Switch
                  value={settings.showStockInList}
                  onValueChange={() => toggleSetting('showStockInList')}
                />
              )}
            />
          </Card.Content>
        </Card>

        {/* Copia de Seguridad */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Copia de Seguridad
            </Text>
            <List.Item
              title="Copia automática"
              description="Realizar copias de seguridad automáticamente"
              right={() => (
                <Switch
                  value={settings.autoBackup}
                  onValueChange={() => toggleSetting('autoBackup')}
                />
              )}
            />
            <List.Item
              title="Crear copia de seguridad"
              description="Crear una copia manual de los datos"
              left={(props) => <List.Icon {...props} icon="backup" />}
              onPress={() => setBackupDialogVisible(true)}
            />
            <List.Item
              title="Restaurar datos"
              description="Restaurar datos desde una copia de seguridad"
              left={(props) => <List.Icon {...props} icon="restore" />}
              onPress={handleRestore}
            />
          </Card.Content>
        </Card>

        {/* Seguridad */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Seguridad
            </Text>
            <List.Item
              title="Cambiar contraseña"
              description="Actualizar tu contraseña de acceso"
              left={(props) => <List.Icon {...props} icon="lock" />}
              onPress={() => setPasswordDialogVisible(true)}
            />
          </Card.Content>
        </Card>

        {/* Información */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Información
            </Text>
            <List.Item
              title="Versión de la aplicación"
              description="1.0.0"
              left={(props) => <List.Icon {...props} icon="information" />}
            />
            <List.Item
              title="Términos y condiciones"
              left={(props) => <List.Icon {...props} icon="file-document" />}
              onPress={() => {}}
            />
            <List.Item
              title="Política de privacidad"
              left={(props) => <List.Icon {...props} icon="shield" />}
              onPress={() => {}}
            />
          </Card.Content>
        </Card>
      </ScrollView>

      {/* Diálogos */}
      <Portal>
        <Dialog visible={backupDialogVisible} onDismiss={() => setBackupDialogVisible(false)}>
          <Dialog.Title>Crear Copia de Seguridad</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              ¿Deseas crear una copia de seguridad de todos los datos de la aplicación?
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setBackupDialogVisible(false)}>Cancelar</Button>
            <Button onPress={handleBackup}>Crear</Button>
          </Dialog.Actions>
        </Dialog>

        <Dialog visible={passwordDialogVisible} onDismiss={() => setPasswordDialogVisible(false)}>
          <Dialog.Title>Cambiar Contraseña</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Nueva contraseña"
              value={newPassword}
              onChangeText={setNewPassword}
              mode="outlined"
              secureTextEntry
              style={styles.dialogInput}
            />
            <TextInput
              label="Confirmar contraseña"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              mode="outlined"
              secureTextEntry
              style={styles.dialogInput}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setPasswordDialogVisible(false)}>Cancelar</Button>
            <Button onPress={handleChangePassword}>Cambiar</Button>
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
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  dialogInput: {
    marginBottom: 16,
  },
});
