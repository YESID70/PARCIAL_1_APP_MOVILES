import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Text, Appbar, ProgressBar } from 'react-native-paper';
import { useRouter } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function Home() {
  const router = useRouter();

  const stats = [
    { title: 'Total Productos', value: '248', icon: 'inventory', color: '#4CAF50' },
    { title: 'Bajo Stock', value: '12', icon: 'warning', color: '#FF9800' },
    { title: 'Sin Stock', value: '3', icon: 'error', color: '#F44336' },
    { title: 'Valor Total', value: '$45,230', icon: 'attach-money', color: '#2196F3' },
  ];

  const quickActions = [
    { title: 'Agregar Producto', icon: 'add-box', route: '/product-form' },
    { title: 'Registrar Movimiento', icon: 'swap-horiz', route: '/movement-form' },
    { title: 'Ver Reportes', icon: 'assessment', route: '/reports' },
    { title: 'Configuración', icon: 'settings', route: '/settings' },
  ];

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Dashboard" />
        <Appbar.Action icon="refresh" onPress={() => {}} />
      </Appbar.Header>

      <ScrollView style={styles.content}>
        <Text variant="headlineSmall" style={styles.sectionTitle}>
          Resumen del Inventario
        </Text>

        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <Card key={index} style={[styles.statCard, { borderLeftColor: stat.color }]}>
              <Card.Content style={styles.statContent}>
                <MaterialIcons name={stat.icon} size={24} color={stat.color} />
                <View style={styles.statText}>
                  <Text variant="bodySmall">{stat.title}</Text>
                  <Text variant="headlineSmall" style={{ color: stat.color }}>
                    {stat.value}
                  </Text>
                </View>
              </Card.Content>
            </Card>
          ))}
        </View>

        <Text variant="headlineSmall" style={styles.sectionTitle}>
          Estado del Inventario
        </Text>
        
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.progressItem}>
              <Text variant="bodyMedium">Productos con stock normal</Text>
              <ProgressBar progress={0.8} color="#4CAF50" style={styles.progressBar} />
              <Text variant="bodySmall">80%</Text>
            </View>
            <View style={styles.progressItem}>
              <Text variant="bodyMedium">Productos con bajo stock</Text>
              <ProgressBar progress={0.15} color="#FF9800" style={styles.progressBar} />
              <Text variant="bodySmall">15%</Text>
            </View>
            <View style={styles.progressItem}>
              <Text variant="bodyMedium">Productos sin stock</Text>
              <ProgressBar progress={0.05} color="#F44336" style={styles.progressBar} />
              <Text variant="bodySmall">5%</Text>
            </View>
          </Card.Content>
        </Card>

        <Text variant="headlineSmall" style={styles.sectionTitle}>
          Acciones Rápidas
        </Text>

        <View style={styles.actionsContainer}>
          {quickActions.map((action, index) => (
            <Card 
              key={index} 
              style={styles.actionCard}
              onPress={() => router.push(action.route)}
            >
              <Card.Content style={styles.actionContent}>
                <MaterialIcons name={action.icon} size={32} color="#2196F3" />
                <Text variant="bodyMedium" style={styles.actionText}>
                  {action.title}
                </Text>
              </Card.Content>
            </Card>
          ))}
        </View>
      </ScrollView>
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
  sectionTitle: {
    marginVertical: 16,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    marginBottom: 12,
    borderLeftWidth: 4,
  },
  statContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    marginLeft: 12,
    flex: 1,
  },
  card: {
    marginBottom: 16,
  },
  progressItem: {
    marginVertical: 8,
  },
  progressBar: {
    marginVertical: 4,
  },
  actionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  actionCard: {
    width: '48%',
    marginBottom: 12,
  },
  actionContent: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  actionText: {
    marginTop: 8,
    textAlign: 'center',
  },
});