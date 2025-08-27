import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Card, Text, Appbar, Avatar } from 'react-native-paper';
import { useRouter } from 'expo-router';

export default function Author() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Información del Autor" />
      </Appbar.Header>
      
      <View style={styles.content}>
        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <Avatar.Image 
              size={120} 
              source={{ uri: 'https://via.placeholder.com/120' }}
              style={styles.avatar}
            />
            <Text variant="headlineMedium" style={styles.name}>
              Yesid Martinez
            </Text>
            <Text variant="titleMedium" style={styles.title}>
              Estudiante de Ingeniería
            </Text>
            <Text variant="bodyLarge" style={styles.university}>
              Universidad Tecnológica
            </Text>
            <Text variant="bodyMedium" style={styles.contact}>
              📧 tu.email@universidad.edu
            </Text>
            <Text variant="bodyMedium" style={styles.contact}>
              📱 +57 300 123 4567
            </Text>
            <Text variant="bodySmall" style={styles.description}>
              Desarrollador de aplicaciones móviles especializado en React Native
              con experiencia en desarrollo de sistemas de inventario y gestión.
            </Text>
          </Card.Content>
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  card: {
    padding: 16,
  },
  cardContent: {
    alignItems: 'center',
  },
  avatar: {
    marginBottom: 16,
  },
  name: {
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
    color: '#666',
  },
  university: {
    textAlign: 'center',
    marginBottom: 16,
    color: '#888',
  },
  contact: {
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    textAlign: 'center',
    marginTop: 16,
    color: '#666',
    lineHeight: 20,
  },
});