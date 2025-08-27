import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { 
  Card, 
  Text, 
  Appbar, 
  FAB, 
  Searchbar, 
  Chip,
  Menu
} from 'react-native-paper';
import { useRouter } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function Movements() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('Todos');
  const [menuVisible, setMenuVisible] = useState(false);

  const movements = [
    {
      id: 1,
      date: '2023-12-15',
      type: 'Entrada',
      product: 'Laptop HP Pavilion',
      productCode: 'LP001',
      quantity: 20,
      reason: 'Compra inicial',
      user: 'Admin',
      time: '10:30'
    },
    {
      id: 2,
      date: '2023-12-14',
      type: 'Salida',
      product: 'Mouse Inalámbrico',
      productCode: 'MS002',
      quantity: 5,
      reason: 'Venta',
      user: 'Vendedor 1',
      time: '14:15'
    },
    {
      id: 3,
      date: '2023-12-13',
      type: 'Entrada',
      product: 'Teclado Mecánico',
      productCode: 'KB003',
      quantity: 10,
      reason: 'Reposición',
      user: 'Admin',
      time: '09:00'
    },
    {
      id: 4,
      date: '2023-12-12',
      type: 'Ajuste',
      product: 'Monitor 24"',
      productCode: 'MN004',
      quantity: -2,
      reason: 'Productos dañados',
      user: 'Supervisor',
      time: '16:45'
    },
  ];

  const movementTypes = ['Todos', 'Entrada', 'Salida', 'Ajuste'];

  const getMovementColor = (type) => {
    switch (type) {
      case 'Entrada': return '#4CAF50';
      case 'Salida': return '#F44336';
      case 'Ajuste': return '#FF9800';
      default: return '#2196F3';
    }
  };

  const getMovementIcon = (type) => {
    switch (type) {
      case 'Entrada': return 'arrow-downward';
      case 'Salida': return 'arrow-upward';
      case 'Ajuste': return 'build';
      default: return 'swap-horiz';
    }
  };

  const filteredMovements = movements.filter(movement => {
    const matchesSearch = movement.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         movement.productCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         movement.reason.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'Todos' || movement.type === selectedType;
    return matchesSearch && matchesType;
  });

  const MovementCard = ({ item }) => {
    const color = getMovementColor(item.type);
    const icon = getMovementIcon(item.type);
    
    return (
      <Card style={styles.movementCard}>
        <Card.Content style={styles.cardContent}>
          <View style={styles.movementHeader}>
            <View style={styles.movementIcon}>
              <MaterialIcons name={icon} size={24} color={color} />
            </View>
            <View style={styles.movementInfo}>
              <Text variant="titleMedium" style={styles.productName}>
                {item.product}
              </Text>
              <Text variant="bodySmall" style={styles.productCode}>
                {item.productCode}
              </Text>
            </View>
            <Chip
              mode="outlined"
              textStyle={{ color }}
              style={[styles.typeChip, { borderColor: color }]}
            >
              {item.type}
            </Chip>
          </View>

          <View style={styles.movementDetails}>
            <View style={styles.detailRow}>
              <Text variant="bodyMedium">Cantidad:</Text>
              <Text variant="bodyMedium" style={[styles.quantity, { color }]}>
                {item.quantity > 0 ? '+' : ''}{item.quantity}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text variant="bodyMedium">Motivo:</Text>
              <Text variant="bodyMedium">{item.reason}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text variant="bodySmall" style={styles.metadata}>
                {item.date} • {item.time} • {item.user}
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Movimientos" />
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
          {movementTypes.map(type => (
            <Menu.Item
              key={type}
              onPress={() => {
                setSelectedType(type);
                setMenuVisible(false);
              }}
              title={type}
            />
          ))}
        </Menu>
      </Appbar.Header>

      <View style={styles.content}>
        <Searchbar
          placeholder="Buscar movimientos..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
        />

        {selectedType !== 'Todos' && (
          <View style={styles.filterContainer}>
            <Chip
              mode="flat"
              onClose={() => setSelectedType('Todos')}
              style={styles.filterChip}
            >
              {selectedType}
            </Chip>
          </View>
        )}

        <FlatList
          data={filteredMovements}
          renderItem={({ item }) => <MovementCard item={item} />}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />

        <FAB
          icon="plus"
          style={styles.fab}
          onPress={() => router.push('/movement-form')}
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
  movementCard: {
    marginBottom: 12,
  },
  cardContent: {
    paddingVertical: 12,
  },
  movementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  movementIcon: {
    marginRight: 12,
  },
  movementInfo: {
    flex: 1,
  },
  productName: {
    fontWeight: 'bold',
  },
  productCode: {
    color: '#666',
    marginTop: 2,
  },
  typeChip: {
    backgroundColor: 'transparent',
  },
  movementDetails: {
    paddingLeft: 36,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  quantity: {
    fontWeight: 'bold',
  },
  metadata: {
    color: '#666',
    marginTop: 8,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#2196F3',
  },
});
