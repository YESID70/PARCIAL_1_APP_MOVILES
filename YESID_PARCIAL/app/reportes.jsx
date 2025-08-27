import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { 
  Card, 
  Text, 
  Appbar, 
  Button,
  SegmentedButtons,
  DataTable,
  ProgressBar
} from 'react-native-paper';
import { useRouter } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function Reports() {
  const router = useRouter();
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const periods = [
    { value: 'week', label: 'Semana' },
    { value: 'month', label: 'Mes' },
    { value: 'year', label: 'Año' }
  ];

  // Datos simulados para reportes
  const inventoryValue = {
    total: 125430.50,
    byCategory: [
      { category: 'Electrónicos', value: 85230.00, percentage: 68 },
      { category: 'Accesorios', value: 25100.50, percentage: 20 },
      { category: 'Oficina', value: 10500.00, percentage: 8 },
      { category: 'Hogar', value: 4600.00, percentage: 4 },
    ]
  };

  const topProducts = [
    { name: 'Laptop HP Pavilion', sales: 15, revenue: 12750.00 },
    { name: 'Monitor 24"', sales: 12, revenue: 2160.00 },
    { name: 'Mouse Inalámbrico', sales: 25, revenue: 637.50 },
    { name: 'Teclado Mecánico', sales: 8, revenue: 760.00 },
  ];

  const lowStockProducts = [
    { name: 'Mouse Inalámbrico', current: 3, minimum: 10, needed: 7 },
    { name: 'Teclado Mecánico', current: 0, minimum: 5, needed: 5 },
    { name: 'Cables HDMI', current: 2, minimum: 15, needed: 13 },
  ];

  const movements = {
    entries: 145,
    exits: 132,
    adjustments: 8
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Reportes" />
        <Appbar.Action icon="download" onPress={() => {}} />
      </Appbar.Header>

      <ScrollView style={styles.content}>
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Período de Reporte
            </Text>
            <SegmentedButtons
              value={selectedPeriod}
              onValueChange={setSelectedPeriod}
              buttons={periods}
              style={styles.segmentedButtons}
            />
          </Card.Content>
        </Card>

        {/* Valor del Inventario */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Valor del Inventario
            </Text>
            <Text variant="headlineMedium" style={styles.totalValue}>
              ${inventoryValue.total.toLocaleString()}
            </Text>
            
            <Text variant="titleSmall" style={styles.subsectionTitle}>
              Por Categoría
            </Text>
            {inventoryValue.byCategory.map((item, index) => (
              <View key={index} style={styles.categoryItem}>
                <View style={styles.categoryHeader}>
                  <Text variant="bodyMedium">{item.category}</Text>
                  <Text variant="bodyMedium" style={styles.categoryValue}>
                    ${item.value.toLocaleString()}
                  </Text>
                </View>
                <ProgressBar 
                  progress={item.percentage / 100} 
                  color="#2196F3" 
                  style={styles.progressBar}
                />
                <Text variant="bodySmall" style={styles.percentage}>
                  {item.percentage}%
                </Text>
              </View>
            ))}
          </Card.Content>
        </Card>

        {/* Productos Más Vendidos */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Productos Más Vendidos
            </Text>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Producto</DataTable.Title>
                <DataTable.Title numeric>Ventas</DataTable.Title>
                <DataTable.Title numeric>Ingresos</DataTable.Title>
              </DataTable.Header>

              {topProducts.map((product, index) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell>{product.name}</DataTable.Cell>
                  <DataTable.Cell numeric>{product.sales}</DataTable.Cell>
                  <DataTable.Cell numeric>${product.revenue.toLocaleString()}</DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </Card.Content>
        </Card>

        {/* Productos con Bajo Stock */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Productos con Bajo Stock
            </Text>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Producto</DataTable.Title>
                <DataTable.Title numeric>Actual</DataTable.Title>
                <DataTable.Title numeric>Mínimo</DataTable.Title>
                <DataTable.Title numeric>Necesita</DataTable.Title>
              </DataTable.Header>

              {lowStockProducts.map((product, index) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell>{product.name}</DataTable.Cell>
                  <DataTable.Cell numeric style={{ color: '#F44336' }}>
                    {product.current}
                  </DataTable.Cell>
                  <DataTable.Cell numeric>{product.minimum}</DataTable.Cell>
                  <DataTable.Cell numeric style={{ color: '#FF9800' }}>
                    {product.needed}
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </Card.Content>
        </Card>

        {/* Resumen de Movimientos */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Resumen de Movimientos
            </Text>
            <View style={styles.movementsContainer}>
              <View style={styles.movementItem}>
                <MaterialIcons name="arrow-downward" size={24} color="#4CAF50" />
                <View style={styles.movementText}>
                  <Text variant="bodyMedium">Entradas</Text>
                  <Text variant="titleMedium" style={{ color: '#4CAF50' }}>
                    {movements.entries}
                  </Text>
                </View>
              </View>
              
              <View style={styles.movementItem}>
                <MaterialIcons name="arrow-upward" size={24} color="#F44336" />
                <View style={styles.movementText}>
                  <Text variant="bodyMedium">Salidas</Text>
                  <Text variant="titleMedium" style={{ color: '#F44336' }}>
                    {movements.exits}
                  </Text>
                </View>
              </View>
              
              <View style={styles.movementItem}>
                <MaterialIcons name="build" size={24} color="#FF9800" />
                <View style={styles.movementText}>
                  <Text variant="bodyMedium">Ajustes</Text>
                  <Text variant="titleMedium" style={{ color: '#FF9800' }}>
                    {movements.adjustments}
                  </Text>
                </View>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Acciones de Exportación */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Exportar Reportes
            </Text>
            <View style={styles.exportButtons}>
              <Button
                mode="outlined"
                icon="file-pdf-box"
                onPress={() => {}}
                style={styles.exportButton}
              >
                Exportar PDF
              </Button>
              <Button
                mode="outlined"
                icon="file-excel"
                onPress={() => {}}
                style={styles.exportButton}
              >
                Exportar Excel
              </Button>
            </View>
          </Card.Content>
        </Card>
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
  card: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subsectionTitle: {
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 16,
  },
  segmentedButtons: {
    marginBottom: 8,
  },
  totalValue: {
    textAlign: 'center',
    color: '#2196F3',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  categoryItem: {
    marginBottom: 16,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  categoryValue: {
    fontWeight: 'bold',
    color: '#2196F3',
  },
  progressBar: {
    marginBottom: 4,
  },
  percentage: {
    textAlign: 'right',
    color: '#666',
  },
  movementsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  movementItem: {
    alignItems: 'center',
    flex: 1,
  },
  movementText: {
    alignItems: 'center',
    marginTop: 8,
  },
  exportButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  exportButton: {
    flex: 1,
    marginHorizontal: 8,
  },
});
