import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { 
  Card, 
  Text, 
  Appbar, 
  FAB, 
  IconButton,
  Dialog,
  Portal,
  TextInput,
  Button
} from 'react-native-paper';
import { useRouter } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function Categories() {
  const router = useRouter();
  const [categories, setCategories] = useState([
    { id: 1, name: 'Electrónicos', description: 'Dispositivos electrónicos y tecnología', productCount: 15 },
    { id: 2, name: 'Accesorios', description: 'Accesorios para computadores', productCount: 8 },
    { id: 3, name: 'Oficina', description: 'Artículos de oficina', productCount: 5 },
    { id: 4, name: 'Hogar', description: 'Productos para el hogar', productCount: 2 },
  ]);

  const [dialogVisible, setDialogVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');

  const handleAddCategory = () => {
    setEditingCategory(null);
    setCategoryName('');
    setCategoryDescription('');
    setDialogVisible(true);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setCategoryName(category.name);
    setCategoryDescription(category.description);
    setDialogVisible(true);
  };

  const handleSaveCategory = () => {
    if (!categoryName.trim()) {
      Alert.alert('Error', 'El nombre de la categoría es requerido');
      return;
    }

    if (editingCategory) {
      // Editar categoría existente
      setCategories(prev => prev.map(cat => 
        cat.id === editingCategory.id 
          ? { ...cat, name: categoryName, description: categoryDescription }
          : cat
      ));
    } else {
      // Crear nueva categoría
      const newCategory = {
        id: Date.now(),
        name: categoryName,
        description: categoryDescription,
        productCount: 0
      };
      setCategories(prev => [...prev, newCategory]);
    }

    setDialogVisible(false);
    setCategoryName('');
    setCategoryDescription('');
    setEditingCategory(null);
  };

  const handleDeleteCategory = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    
    if (category.productCount > 0) {
      Alert.alert(
        'No se puede eliminar',
        'Esta categoría tiene productos asociados. Primero debe mover o eliminar los productos.'
      );
      return;
    }

    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro de que deseas eliminar esta categoría?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Eliminar', 
          style: 'destructive', 
          onPress: () => {
            setCategories(prev => prev.filter(cat => cat.id !== categoryId));
          }
        }
      ]
    );
  };

  const CategoryCard = ({ item }) => (
    <Card style={styles.categoryCard}>
      <Card.Content style={styles.cardContent}>
        <View style={styles.categoryInfo}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="category" size={24} color="#2196F3" />
          </View>
          <View style={styles.textContainer}>
            <Text variant="titleMedium" style={styles.categoryName}>
              {item.name}
            </Text>
            <Text variant="bodySmall" style={styles.categoryDescription}>
              {item.description}
            </Text>
            <Text variant="bodySmall" style={styles.productCount}>
              {item.productCount} productos
            </Text>
          </View>
        </View>
        
        <View style={styles.cardActions}>
          <IconButton
            icon="edit"
            mode="outlined"
            size={20}
            onPress={() => handleEditCategory(item)}
          />
          <IconButton
            icon="delete"
            mode="outlined"
            size={20}
            iconColor="#F44336"
            onPress={() => handleDeleteCategory(item.id)}
          />
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Categorías" />
      </Appbar.Header>

      <View style={styles.content}>
        <FlatList
          data={categories}
          renderItem={({ item }) => <CategoryCard item={item} />}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />

        <FAB
          icon="plus"
          style={styles.fab}
          onPress={handleAddCategory}
        />
      </View>

      <Portal>
        <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
          <Dialog.Title>
            {editingCategory ? 'Editar Categoría' : 'Nueva Categoría'}
          </Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Nombre de la categoría"
              value={categoryName}
              onChangeText={setCategoryName}
              mode="outlined"
              style={styles.dialogInput}
            />
            <TextInput
              label="Descripción"
              value={categoryDescription}
              onChangeText={setCategoryDescription}
              mode="outlined"
              multiline
              numberOfLines={2}
              style={styles.dialogInput}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDialogVisible(false)}>Cancelar</Button>
            <Button onPress={handleSaveCategory}>
              {editingCategory ? 'Actualizar' : 'Crear'}
            </Button>
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
    flex: 1,
    padding: 16,
  },
  listContent: {
    paddingBottom: 80,
  },
  categoryCard: {
    marginBottom: 12,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  categoryName: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  categoryDescription: {
    color: '#666',
    marginBottom: 4,
  },
  productCount: {
    color: '#2196F3',
    fontWeight: 'bold',
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
  dialogInput: {
    marginBottom: 16,
  },
});