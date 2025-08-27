import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { 
  Card, 
  Text, 
  Appbar, 
  Button, 
  Chip,
  DataTable,
  Divider
} from 'react-native-paper';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function ProductDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  // Datos simulados del producto
  const product = {
    id: id,
    name: 'Laptop HP Pavilion',
    code: 'LP001',
    category: 'Electrónicos',
    description: 'Laptop HP Pavilion con procesador Intel Core i5, 8GB RAM, SSD 256GB',
    stock: 15,
    minStock: 5,
    price: 850.00,
    cost: 650.00,
    supplier: 'HP Distribuidor',
    location: 'Almacén A - Estante 3',
    image: 'https://via.placeholder.com/300x200'
  };

  // Historial de movimientos simulado
  const movements = [
    { date: '2023-12-15', type: 'Entrada', quantity: 20, reason: 'Compra inicial' },
    { date: '2023-12-10', type: 'Salida', quantity: 3, reason: 'Venta' },
    { date: '2023-12-08', type: 'Salida', quantity: 2, reason: 'Venta' },
  ];

  const getStockStatus = () => {
    if (product.stock === 0) return { label: 'Sin Stock', color: '#F44336' };
    if (product.stock <= product.minStock) return { label: 'Bajo Stock', color: '#FF9800' };
    return { label: 'Normal', color: '#4CAF50' };
  };

  const handleDelete = () => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro de que deseas eliminar este producto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Eliminar', 
          style: 'destructive', 
          onPress: () => {
            router.back();
            // Aquí iría la lógica para eliminar
          }
        }
      ]
    );
  };

  const stockStatus = getStockStatus();

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Detalle del Producto" />
        <Appbar.Action 
          icon="edit" 
          onPress={() => router.push(`/product-form/${product.id}`)} 
        />
      </Appbar.Header>

      <ScrollView style={styles.content}>
        {/* Imagen del producto */}
        <Card style={styles.imageCard}>
          <Image source={{ uri: product.image }} style={styles.productImage} />
        </Card>

        {/* Información básica */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="headlineSmall" style={styles.productName}>
              {product.name}
            </Text>
            <Text variant="bodyMedium" style={styles.productCode}>
              Código: {product.code}
            </Text>
            
            <View style={styles.statusContainer}>
              <Chip
                mode="outlined"
                textStyle={{ color: stockStatus.color }}
                style={[styles.statusChip, { borderColor: stockStatus.color }]}
              >
                {stockStatus.label}
              </Chip>
              <Chip mode="outlined" style={styles.categoryChip}>
                {product.category}
              </Chip>
            </View>

            <Text variant="bodyMedium" style={styles.description}>
              {product.description}
            </Text>
          </Card.Content>
        </Card>

        {/* Información de inventario */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Información de Inventario
            </Text>
            <Divider style={styles.divider} />
            
            <View style={styles.infoRow}>
              <Text variant="bodyMedium">Stock Actual:</Text>
              <Text variant="bodyMedium" style={{ fontWeight: 'bold' }}>
                {product.stock} unidades
              </Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text variant="bodyMedium">Stock Mínimo:</Text>
              <Text variant="bodyMedium">{product.minStock} unidades</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text variant="bodyMedium">Ubicación:</Text>
              <Text variant="bodyMedium">{product.location}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text variant="bodyMedium">Proveedor:</Text>
              <Text variant="bodyMedium">{product.supplier}</Text>
            </View>
          </Card.Content>
        </Card>

        {/* Información de precios */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Información de Precios
            </Text>
            <Divider style={styles.divider} />
            
            <View style={styles.infoRow}>
              <Text variant="bodyMedium">Precio de Costo:</Text>
              <Text variant="bodyMedium">${product.cost.toFixed(2)}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text variant="bodyMedium">Precio de Venta:</Text>
              <Text variant="bodyMedium" style={{ fontWeight: 'bold', color: '#2196F3' }}>
                ${product.price.toFixed(2)}
              </Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text variant="bodyMedium">Margen:</Text>
              <Text variant="bodyMedium" style={{ color: '#4CAF50' }}>
                ${(product.price - product.cost).toFixed(2)} 
                ({(((product.price - product.cost) / product.cost) * 100).toFixed(1)}%)
              </Text>
            </View>
          </Card.Content>
        </Card>

        {/* Historial de movimientos */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Últimos Movimientos
            </Text>
            <Divider style={styles.divider} />
            
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Fecha</DataTable.Title>
                <DataTable.Title>Tipo</DataTable.Title>
                <DataTable.Title numeric>Cantidad</DataTable.Title>
              </DataTable.Header>

              {movements.map((movement, index) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell>{movement.date}</DataTable.Cell>
                  <DataTable.Cell>
                    <Chip 
                      mode="outlined"
                      textStyle={{ 
                        color: movement.type === 'Entrada' ? '#4CAF50' : '#F44336' 
                      }}
                      style={{ 
                        borderColor: movement.type === 'Entrada' ? '#4CAF50' : '#F44336' 
                      }}
                    >
                      {movement.type}
                    </Chip>
                  </DataTable.Cell>
                  <DataTable.Cell numeric>{movement.quantity}</DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>

            <Button
              mode="outlined"
              onPress={() => router.push('/movements')}
              style={styles.viewAllButton}
            >
              Ver Todos los Movimientos
            </Button>
          </Card.Content>
        </Card>

        {/* Acciones */}
        <View style={styles.actionsContainer}>
          <Button
            mode="contained"
            icon="edit"
            onPress={() => router.push(`/product-form/${product.id}`)}
            style={styles.actionButton}
          >
            Editar Producto
          </Button>
          
          <Button
            mode="outlined"
            icon="swap-horiz"
            onPress={() => router.push(`/movement-form?productId=${product.id}`)}
            style={styles.actionButton}
          >
            Registrar Movimiento
          </Button>
          
          <Button
            mode="outlined"
            icon="delete"
            buttonColor="#F44336"
            textColor="white"
            onPress={handleDelete}
            style={styles.deleteButton}
          >
            Eliminar Producto
          </Button>
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
  imageCard: {
    marginBottom: 16,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  card: {
    marginBottom: 16,
  },
  productName: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productCode: {
    color: '#666',
    marginBottom: 12,
  },
  statusContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  statusChip: {
    marginRight: 8,
    backgroundColor: 'transparent',
  },
  categoryChip: {
    backgroundColor: 'transparent',
  },
  description: {
    lineHeight: 20,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  divider: {
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  viewAllButton: {
    marginTop: 12,
  },
  actionsContainer: {
    marginBottom: 24,
  },
  actionButton: {
    marginBottom: 12,
  },
  deleteButton: {
    marginTop: 8,
  },
});