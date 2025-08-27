import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { 
  Card, 
  Text, 
  Appbar, 
  FAB, 
  Searchbar, 
  Chip,
  Menu,
  IconButton 
} from 'react-native-paper';
import { useRouter } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function Products() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [menuVisible, setMenuVisible] = useState(false);

  const products = [
    {
      id: 1,
      name: 'Laptop HP Pavilion',
      code: 'LP001',
      category: 'Electrónicos',
      stock: 15,
      price: 850.00,
      minStock: 5,
      image: 'https://via.placeholder.com/80'
    },
    {
      id: 2,
      name: 'Mouse Inalámbrico',
      code: 'MS002',
      category: 'Accesorios',
      stock: 3,
      price: 25.50,
      minStock: 10,
      image: 'https://via.placeholder.com/80'
    },
    {
      id: 3,
      name: 'Teclado Mecánico',
      code: 'KB003',
      category: 'Accesorios',
      stock: 0,
      price: 95.00,
      minStock: 5,
      image: 'https://via.placeholder.com/80'
    },
    {
      id: 4,
      name: 'Monitor 24"',
      code: 'MN004',
      category: 'Electrónicos',
      stock: 8,
      price: 180.00,
      minStock: 3,
      image: 'https://via.placeholder.com/80'
    },
  ];

  const categories = ['Todos', 'Electrónicos', 'Accesorios', 'Oficina'];

  const getStockStatus = (stock, minStock) => {
    if (stock === 0) return { label: 'Sin Stock', color: '#F44336' };
    if (stock <= minStock) return { label: 'Bajo Stock', color: '#FF9800' };
    return { label: 'Normal', color: '#4CAF50' };
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDeleteProduct = (productId) => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro de que deseas eliminar este producto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive', onPress: () => {} }
      ]
    );
  };

  const ProductCard = ({ item }) => {
    const stockStatus = getStockStatus(item.stock, item.minStock);
    
    return (
      <Card style={styles.productCard} onPress={() => router.push(`/product-detail/${item.id}`)}>
        <Card.Content style={styles.cardContent}>
          <View style={styles.productInfo}>
            <Text variant="titleMedium" style={styles.productName}>
              {item.name}
            </Text>
            <Text variant="bodySmall" style={styles.productCode}>
              Código: {item.code}
            </Text>
            <Text variant="bodyMedium" style={styles.productPrice}>
              ${item.price.toFixed(2)}
            </Text>
            
            <View style={styles.stockContainer}>
              <Chip
                mode="outlined"
                textStyle={{ color: stockStatus.color }}
                style={[styles.stockChip, { borderColor: stockStatus.color }]}
              >
                {stockStatus.label}: {item.stock}
              </Chip>
            </View>
          </View>
          
          <View style={styles.cardActions}>
            <IconButton
              icon="edit"
              mode="outlined"
              size={20}
              onPress={() => router.push(`/product-form/${item.id}`)}
            />
            <IconButton
              icon="delete"
              mode="outlined"
              size={20}
              iconColor="#F44336"
              onPress={() => handleDeleteProduct(item.id)}
            />
          </View>
        </Card.Content>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Productos" />
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <Appbar.Action
              icon="filter-list"
              onPress={() => setMenuVisible(true)}
            />
          }
        >
          {categories.map(category => (
            <Menu.Item
              key={category}
              onPress={() => {
                setSelectedCategory(category);
                setMenuVisible(false);
              }}
              title={category}
            />
          ))}
        </Menu>
      </Appbar.Header>

      <View style={styles.content}>
        <Searchbar
          placeholder="Buscar productos..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
        />

        {selectedCategory !== 'Todos' && (
          <View style={styles.filterContainer}>
            <Chip
              mode="flat"
              onClose={() => setSelectedCategory('Todos')}
              style={styles.filterChip}
            >
              {selectedCategory}
            </Chip>
          </View>
        )}

        <FlatList
          data={filteredProducts}
          renderItem={({ item }) => <ProductCard item={item} />}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />

        <FAB
          icon="plus"
          style={styles.fab}
          onPress={() => router.push('/product-form')}
        />
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
  },
  searchbar: {
    marginBottom: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  filterChip: {
    marginRight: 8,
  },
  listContent: {
    paddingBottom: 80,
  },
  productCard: {
    marginBottom: 12,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productCode: {
    color: '#666',
    marginBottom: 4,
  },
  productPrice: {
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 8,
  },
  stockContainer: {
    flexDirection: 'row',
  },
  stockChip: {
    backgroundColor: 'transparent',
  },
  cardActions: {
    flexDirection: 'row',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#2196F3',
  },
});
