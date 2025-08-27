import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { 
  Card, 
  Text, 
  Appbar, 
  List,
  Searchbar,
  Chip
} from 'react-native-paper';
import { useRouter } from 'expo-router';

export default function Help() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const helpCategories = ['Todos', 'Productos', 'Movimientos', 'Reportes', 'General'];

  const helpItems = [
    {
      id: 1,
      category: 'Productos',
      question: '¿Cómo agregar un nuevo producto?',
      answer: 'Para agregar un producto, ve a la pantalla de Productos y presiona el botón flotante (+). Completa la información requerida como nombre, código, precio y stock inicial.'
    },
    {
      id: 2,
      category: 'Productos',
      question: '¿Cómo editar la información de un producto?',
      answer: 'En la lista de productos, presiona el ícono de editar (lápiz) en la tarjeta del producto que deseas modificar, o ingresa al detalle del producto y presiona "Editar Producto".'
    },
    {
      id: 3,
      category: 'Movimientos',
      question: '¿Qué tipos de movimientos puedo registrar?',
      answer: 'Puedes registrar tres tipos de movimientos: Entrada (aumenta el stock), Salida (reduce el stock) y Ajuste (puede ser positivo o negativo para correcciones de inventario).'
    },
    {
      id: 4,
      category: 'Movimientos',
      question: '¿Cómo registrar una entrada de productos?',
      answer: 'Ve a Movimientos y presiona el botón (+). Selecciona "Entrada" como tipo de movimiento, elige el producto, ingresa la cantidad y el motivo.'
    },
    {
      id: 5,
      category: 'Reportes',
      question: '¿Cómo generar un reporte de inventario?',
      answer: 'En la sección de Reportes puedes ver diferentes estadísticas del inventario como valor total, productos más vendidos y productos con bajo stock. También puedes exportar estos reportes.'
    },
    {
      id: 6,
      category: 'General',
      question: '¿Cómo cambiar mi contraseña?',
      answer: 'Ve a tu Perfil de Usuario o a Configuración y selecciona "Cambiar contraseña". Ingresa tu nueva contraseña y confírmala.'
    },
    {
      id: 7,
      category: 'General',
      question: '¿Cómo hacer una copia de seguridad?',
      answer: 'En Configuración encontrarás las opciones de copia de seguridad. Puedes activar las copias automáticas o crear una copia manual cuando lo necesites.'
    },
    {
      id: 8,
      category: 'Productos',
      question: '¿Qué significa "Stock Mínimo"?',
      answer: 'El stock mínimo es la cantidad límite por debajo de la cual el sistema te alertará que necesitas reabastecer el producto. Te ayuda a mantener un control proactivo del inventario.'
    }
  ];

  const filteredItems = helpItems.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Ayuda" />
      </Appbar.Header>

      <View style={styles.content}>
        <Searchbar
          placeholder="Buscar en la ayuda..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
        />

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
        >
          {helpCategories.map(category => (
            <Chip
              key={category}
              mode={selectedCategory === category ? 'flat' : 'outlined'}
              onPress={() => setSelectedCategory(category)}
              style={styles.categoryChip}
            >
              {category}
            </Chip>
          ))}
        </ScrollView>

        <ScrollView style={styles.helpList}>
          {filteredItems.length === 0 ? (
            <Card style={styles.noResultsCard}>
              <Card.Content>
                <Text variant="bodyMedium" style={styles.noResultsText}>
                  No se encontraron resultados para tu búsqueda.
                </Text>
              </Card.Content>
            </Card>
          ) : (
            filteredItems.map(item => (
              <Card key={item.id} style={styles.helpCard}>
                <Card.Content>
                  <List.Accordion
                    title={item.question}
                    titleStyle={styles.questionTitle}
                    left={(props) => <List.Icon {...props} icon="help-circle" />}
                  >
                    <View style={styles.answerContainer}>
                      <Text variant="bodyMedium" style={styles.answerText}>
                        {item.answer}
                      </Text>
                    </View>
                  </List.Accordion>
                </Card.Content>
              </Card>
            ))
          )}
        </ScrollView>

        {/* Información de Contacto */}
        <Card style={styles.contactCard}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.contactTitle}>
              ¿Necesitas más ayuda?
            </Text>
            <Text variant="bodyMedium" style={styles.contactText}>
              Si no encontraste la respuesta que buscas, puedes contactarnos:
            </Text>
            <List.Item
              title="Email de soporte"
              description="soporte@inventario.com"
              left={(props) => <List.Icon {...props} icon="email" />}
            />
            <List.Item
              title="Teléfono"
              description="+57 300 123 4567"
              left={(props) => <List.Icon {...props} icon="phone" />}
            />
            <List.Item
              title="Horario de atención"
              description="Lunes a Viernes, 8:00 AM - 6:00 PM"
              left={(props) => <List.Icon {...props} icon="clock" />}
            />
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
  },
  searchbar: {
    marginBottom: 16,
  },
  categoriesContainer: {
    marginBottom: 16,
  },
  categoryChip: {
    marginRight: 8,
  },
  helpList: {
    flex: 1,
    marginBottom: 16,
  },
  helpCard: {
    marginBottom: 8,
  },
  questionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  answerContainer: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
  },
  answerText: {
    lineHeight: 20,
    color: '#666',
  },
  noResultsCard: {
    marginTop: 32,
  },
  noResultsText: {
    textAlign: 'center',
    color: '#666',
  },
  contactCard: {
    backgroundColor: '#E3F2FD',
  },
  contactTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  contactText: {
    marginBottom: 16,
    color: '#666',
  },
});