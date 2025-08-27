import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { 
  TextInput, 
  Button, 
  Card, 
  Text, 
  Appbar,
  SegmentedButtons,
  HelperText,
  Menu,
  Divider
} from 'react-native-paper';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function MovementForm() {
  const router = useRouter();
  const { productId } = useLocalSearchParams();

  const [formData, setFormData] = useState({
    productId: productId || '',
    productName: '',
    currentStock: '',
    type: 'Entrada',
    quantity: '',
    reason: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [productMenuVisible, setProductMenuVisible] = useState(false);

  // Productos simulados
  const products = [
    { id: 1, name: 'Laptop HP Pavilion', code: 'LP001', stock: 15 },
    { id: 2, name: 'Mouse Inalámbrico', code: 'MS002', stock: 3 },
    { id: 3, name: 'Teclado Mecánico', code: 'KB003', stock: 0 },
    { id: 4, name: 'Monitor 24"', code: 'MN004', stock: 8 },
  ];

  const movementTypes = [
    { value: 'Entrada', label: 'Entrada' },
    { value: 'Salida', label: 'Salida' },
    { value: 'Ajuste', label: 'Ajuste' }
  ];

  const reasons = {
    'Entrada': ['Compra', 'Devolución', 'Transferencia', 'Otro'],
    'Salida': ['Venta', 'Transferencia', 'Daño', 'Otro'],
    'Ajuste': ['Inventario físico', 'Corrección', 'Producto dañado', 'Otro']
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.productId) newErrors.productId = 'Debe seleccionar un producto';
    if (!formData.quantity.trim()) newErrors.quantity = 'La cantidad es requerida';
    if (!formData.reason.trim()) newErrors.reason = 'El motivo es requerido';

    // Validar cantidad
    const quantity = parseInt(formData.quantity);
    if (isNaN(quantity) || quantity <= 0) {
      newErrors.quantity = 'La cantidad debe ser un número positivo';
    }

    // Validar stock suficiente para salidas
    if (formData.type === 'Salida' && formData.currentStock) {
      const currentStock = parseInt(formData.currentStock);
      if (quantity > currentStock) {
        newErrors.quantity = 'No hay suficiente stock disponible';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Éxito',
        'Movimiento registrado exitosamente',
        [{ text: 'OK', onPress: () => router.back() }]
      );
    }, 1500);
  };

  const selectProduct = (product) => {
    setFormData(prev => ({
      ...prev,
      productId: product.id.toString(),
      productName: `${product.name} (${product.code})`,
      currentStock: product.stock.toString()
    }));
    setProductMenuVisible(false);
    if (errors.productId) {
      setErrors(prev => ({ ...prev, productId: null }));
    }
  };

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const calculateNewStock = () => {
    if (!formData.currentStock || !formData.quantity) return null;
    
    const current = parseInt(formData.currentStock);
    const quantity = parseInt(formData.quantity);
    
    if (isNaN(current) || isNaN(quantity)) return null;
    
    let newStock = current;
    if (formData.type === 'Entrada') {
      newStock = current + quantity;
    } else if (formData.type === 'Salida') {
      newStock = current - quantity;
    } else if (formData.type === 'Ajuste') {
      // Para ajustes, la cantidad puede ser positiva o negativa
      newStock = current + quantity;
    }
    
    return newStock;
  };

  const newStock = calculateNewStock();

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Registrar Movimiento" />
        <Appbar.Action icon="check" onPress={handleSave} />
      </Appbar.Header>

      <ScrollView style={styles.content}>
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Información del Movimiento
            </Text>

            <Text variant="bodyMedium" style={styles.fieldLabel}>
              Tipo de Movimiento
            </Text>
            <SegmentedButtons
              value={formData.type}
              onValueChange={(value) => updateField('type', value)}
              buttons={movementTypes}
              style={styles.segmentedButtons}
            />

            <Menu
              visible={productMenuVisible}
              onDismiss={() => setProductMenuVisible(false)}
              anchor={
                <TextInput
                  label="Producto *"
                  value={formData.productName}
                  mode="outlined"
                  style={styles.input}
                  error={!!errors.productId}
                  right={<TextInput.Icon icon="chevron-down" onPress={() => setProductMenuVisible(true)} />}
                  onPress={() => setProductMenuVisible(true)}
                  showSoftInputOnFocus={false}
                />
              }
            >
              {products.map(product => (
                <Menu.Item
                  key={product.id}
                  onPress={() => selectProduct(product)}
                  title={`${product.name} (${product.code})`}
                  subtitle={`Stock: ${product.stock}`}
                />
              ))}
            </Menu>
            <HelperText type="error" visible={!!errors.productId}>
              {errors.productId}
            </HelperText>

            {formData.currentStock && (
              <Card style={styles.stockCard}>
                <Card.Content>
                  <Text variant="bodyMedium">
                    Stock actual: {formData.currentStock} unidades
                  </Text>
                  {newStock !== null && (
                    <Text variant="bodyMedium" style={styles.newStock}>
                      Stock después del movimiento: {newStock} unidades
                    </Text>
                  )}
                </Card.Content>
              </Card>
            )}
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Detalles del Movimiento
            </Text>

            <TextInput
              label="Cantidad *"
              value={formData.quantity}
              onChangeText={(value) => updateField('quantity', value)}
              mode="outlined"
              keyboardType="numeric"
              style={styles.input}
              error={!!errors.quantity}
              placeholder={formData.type === 'Ajuste' ? 'Puede ser negativo' : 'Ingrese cantidad'}
            />
            <HelperText type="error" visible={!!errors.quantity}>
              {errors.quantity}
            </HelperText>

            <Menu
              visible={false}
              onDismiss={() => {}}
              anchor={
                <TextInput
                  label="Motivo *"
                  value={formData.reason}
                  onChangeText={(value) => updateField('reason', value)}
                  mode="outlined"
                  style={styles.input}
                  error={!!errors.reason}
                />
              }
            />
            <HelperText type="error" visible={!!errors.reason}>
              {errors.reason}
            </HelperText>

            <TextInput
              label="Notas adicionales"
              value={formData.notes}
              onChangeText={(value) => updateField('notes', value)}
              mode="outlined"
              multiline
              numberOfLines={3}
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
            Registrar Movimiento
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
  fieldLabel: {
    marginBottom: 8,
    marginTop: 8,
  },
  segmentedButtons: {
    marginBottom: 16,
  },
  input: {
    marginBottom: 8,
  },
  stockCard: {
    marginTop: 16,
    backgroundColor: '#E3F2FD',
  },
  newStock: {
    marginTop: 4,
    fontWeight: 'bold',
    color: '#2196F3',
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