import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { 
  TextInput, 
  Button, 
  Card, 
  Text, 
  Appbar,
  SegmentedButtons,
  HelperText
} from 'react-native-paper';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function ProductForm() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    category: 'Electrónicos',
    description: '',
    price: '',
    cost: '',
    stock: '',
    minStock: '',
    supplier: '',
    location: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const categories = [
    { value: 'Electrónicos', label: 'Electrónicos' },
    { value: 'Accesorios', label: 'Accesorios' },
    { value: 'Oficina', label: 'Oficina' },
    { value: 'Hogar', label: 'Hogar' }
  ];

  useEffect(() => {
    if (isEditing) {
      // Simular carga de datos del producto existente
      setFormData({
        name: 'Laptop HP Pavilion',
        code: 'LP001',
        category: 'Electrónicos',
        description: 'Laptop HP Pavilion con procesador Intel Core i5',
        price: '850.00',
        cost: '650.00',
        stock: '15',
        minStock: '5',
        supplier: 'HP Distribuidor',
        location: 'Almacén A - Estante 3'
      });
    }
  }, [isEditing]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'El nombre es requerido';
    if (!formData.code.trim()) newErrors.code = 'El código es requerido';
    if (!formData.price.trim()) newErrors.price = 'El precio es requerido';
    if (!formData.cost.trim()) newErrors.cost = 'El costo es requerido';
    if (!formData.stock.trim()) newErrors.stock = 'El stock es requerido';
    if (!formData.minStock.trim()) newErrors.minStock = 'El stock mínimo es requerido';

    // Validar números
    if (formData.price && isNaN(parseFloat(formData.price))) {
      newErrors.price = 'El precio debe ser un número válido';
    }
    if (formData.cost && isNaN(parseFloat(formData.cost))) {
      newErrors.cost = 'El costo debe ser un número válido';
    }
    if (formData.stock && isNaN(parseInt(formData.stock))) {
      newErrors.stock = 'El stock debe ser un número entero';
    }
    if (formData.minStock && isNaN(parseInt(formData.minStock))) {
      newErrors.minStock = 'El stock mínimo debe ser un número entero';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setLoading(true);
    
    // Simular guardado
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Éxito',
        `Producto ${isEditing ? 'actualizado' : 'creado'} exitosamente`,
        [{ text: 'OK', onPress: () => router.back() }]
      );
    }, 1500);
  };

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title={isEditing ? 'Editar Producto' : 'Nuevo Producto'} />
        <Appbar.Action icon="check" onPress={handleSave} />
      </Appbar.Header>

      <ScrollView style={styles.content}>
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Información Básica
            </Text>

            <TextInput
              label="Nombre del Producto *"
              value={formData.name}
              onChangeText={(value) => updateField('name', value)}
              mode="outlined"
              style={styles.input}
              error={!!errors.name}
            />
            <HelperText type="error" visible={!!errors.name}>
              {errors.name}
            </HelperText>

            <TextInput
              label="Código del Producto *"
              value={formData.code}
              onChangeText={(value) => updateField('code', value)}
              mode="outlined"
              style={styles.input}
              error={!!errors.code}
            />
            <HelperText type="error" visible={!!errors.code}>
              {errors.code}
            </HelperText>

            <Text variant="bodyMedium" style={styles.fieldLabel}>
              Categoría
            </Text>
            <SegmentedButtons
              value={formData.category}
              onValueChange={(value) => updateField('category', value)}
              buttons={categories}
              style={styles.segmentedButtons}
            />

            <TextInput
              label="Descripción"
              value={formData.description}
              onChangeText={(value) => updateField('description', value)}
              mode="outlined"
              multiline
              numberOfLines={3}
              style={styles.input}
            />
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Información de Precios
            </Text>

            <View style={styles.row}>
              <View style={styles.halfWidth}>
                <TextInput
                  label="Precio de Costo *"
                  value={formData.cost}
                  onChangeText={(value) => updateField('cost', value)}
                  mode="outlined"
                  keyboardType="numeric"
                  error={!!errors.cost}
                />
                <HelperText type="error" visible={!!errors.cost}>
                  {errors.cost}
                </HelperText>
              </View>

              <View style={styles.halfWidth}>
                <TextInput
                  label="Precio de Venta *"
                  value={formData.price}
                  onChangeText={(value) => updateField('price', value)}
                  mode="outlined"
                  keyboardType="numeric"
                  error={!!errors.price}
                />
                <HelperText type="error" visible={!!errors.price}>
                  {errors.price}
                </HelperText>
              </View>
            </View>

            {formData.cost && formData.price && (
              <Card style={styles.marginCard}>
                <Card.Content>
                  <Text variant="bodyMedium">
                    Margen: ${(parseFloat(formData.price) - parseFloat(formData.cost)).toFixed(2)}
                  </Text>
                  <Text variant="bodyMedium">
                    Porcentaje: {(((parseFloat(formData.price) - parseFloat(formData.cost)) / parseFloat(formData.cost)) * 100).toFixed(1)}%
                  </Text>
                </Card.Content>
              </Card>
            )}
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Información de Inventario
            </Text>

            <View style={styles.row}>
              <View style={styles.halfWidth}>
                <TextInput
                  label="Stock Inicial *"
                  value={formData.stock}
                  onChangeText={(value) => updateField('stock', value)}
                  mode="outlined"
                  keyboardType="numeric"
                  error={!!errors.stock}
                />
                <HelperText type="error" visible={!!errors.stock}>
                  {errors.stock}
                </HelperText>
              </View>

              <View style={styles.halfWidth}>
                <TextInput
                  label="Stock Mínimo *"
                  value={formData.minStock}
                  onChangeText={(value) => updateField('minStock', value)}
                  mode="outlined"
                  keyboardType="numeric"
                  error={!!errors.minStock}
                />
                <HelperText type="error" visible={!!errors.minStock}>
                  {errors.minStock}
                </HelperText>
              </View>
            </View>

            <TextInput
              label="Proveedor"
              value={formData.supplier}
              onChangeText={(value) => updateField('supplier', value)}
              mode="outlined"
              style={styles.input}
            />

            <TextInput
              label="Ubicación en Almacén"
              value={formData.location}
              onChangeText={(value) => updateField('location', value)}
              mode="outlined"
              style={styles.input}
            />
          </Card.Content>
        </Card>

        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={handleSave}
            loading={loading}
            style={styles.saveButton}
          >
            {isEditing ? 'Actualizar Producto' : 'Crear Producto'}
          </Button>

          <Button
            mode="outlined"
            onPress={() => router.back()}
            style={styles.cancelButton}
          >
            Cancelar
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
  card: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    marginBottom: 8,
  },
  fieldLabel: {
    marginBottom: 8,
    marginTop: 8,
  },
  segmentedButtons: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  marginCard: {
    marginTop: 16,
    backgroundColor: '#E3F2FD',
  },
  buttonContainer: {
    marginBottom: 24,
  },
  saveButton: {
    marginBottom: 12,
    paddingVertical: 8,
  },
  cancelButton: {
    paddingVertical: 8,
  },
});