import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Image } from 'react-native';
import { useQuery } from 'react-query';
import { AxiosResponse } from 'axios';
import { BackendError } from '@/index';
import { Button, Card, Paragraph, TextInput, Title } from 'react-native-paper';
import { UserContext } from '@/contexts/UserContext';
import FuzzySearch from 'fuzzy-search';
import { GetAllRegisteredProducts } from '@/services/RegisteredProductServices';
import { GetRegisteredProductDto } from '@/dtos/registered.product.dto';


const Products = () => {
  const [products, setProducts] = useState<GetRegisteredProductDto[]>([])
  const [prefilteredProducts, setPrefilteredProducts] = useState<GetRegisteredProductDto[]>([])
  const [refreshing, setRefreshing] = useState(false); // State for pull-to-refresh
  const { user } = useContext(UserContext);
  const [hidden, setHidden] = useState(false);
  const [filter, setFilter] = useState<string | undefined>()
  const { data, isSuccess, isLoading, refetch, isError } = useQuery<AxiosResponse<GetRegisteredProductDto[]>, BackendError>(["products", hidden], async () => GetAllRegisteredProducts({ hidden: hidden }))

  console.log(products)
  // Pull-to-refresh handler
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  useEffect(() => {
    if (filter) {
      const searcher = new FuzzySearch(products, ['slno', 'machine', 'customer'], {
        caseSensitive: true,
      });
      const result = searcher.search(filter);
      setProducts(result)
    }
    if (!filter)
      setProducts(prefilteredProducts)
  }, [filter])

  useEffect(() => {
    if (isSuccess) {
      setProducts(data.data)
      setPrefilteredProducts(data.data)
    }
  }, [isSuccess, data])
  // Render each engineer as a card
  const renderEngineer = ({ item }: { item: GetRegisteredProductDto }) => (

    <Card style={styles.card}>
      <Card.Content style={styles.cardContent}>
        <Image style={styles.image} source={{ uri: item.machine_photo }} />
        <View style={styles.textContainer}>
          <Title style={styles.title}>SerialNo : {item.sl_no}</Title>
          <Paragraph style={styles.paragraph}>Machine : {item.machine}</Paragraph>
          <Paragraph style={styles.paragraph}>Customer : {item.customer}</Paragraph>
          <Paragraph style={styles.paragraph}>{item.installationDate ? `Installation Date : ${item.installationDate}` : 'Not Installed'}</Paragraph>
          <Paragraph style={styles.paragraph}>{item.warrantyUpto ? `Warranty upto : ${item.warrantyUpto}` : 'Not Applicable'}</Paragraph>
        </View>
      </Card.Content>
    </Card>
  );

  // Handle loading and error states
  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#6200ea" />
        <Text>Loading Products...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.loader}>
        <Text>Failed to load products. Please try again later.</Text>
        <Button mode="contained" onPress={() => refetch()}>
          Retry
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Title */}

      <Text style={styles.title}>Products</Text>
      <TextInput style={{ marginBottom: 10 }} placeholder='Products' mode='outlined' onChangeText={(val) => setFilter(val)} />


      {/* Engineer List */}
      <FlatList
        data={products}
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderEngineer}
        refreshing={refreshing} // Indicates if the list is refreshing
        onRefresh={onRefresh} // Handler for pull-to-refresh
        ListEmptyComponent={
          <Text style={styles.emptyText}>No products found.</Text>
        }
      />

      {/* Toggle Active/Inactive Customers */}
      {user && user.is_admin && (
        <Button
          mode="contained"
          onPress={() => setHidden(!hidden)}
          style={styles.toggleButton}
        >
          {hidden ? "Show Active Products" : "Show Inactive Products"}
        </Button>
      )}
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 50,
    borderColor: 'red',
    borderWidth: 1,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    marginBottom: 16,
    backgroundColor: 'white',
    elevation: 2,
    borderRadius: 8,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  paragraph: {
    paddingLeft: 2,
    textTransform: 'capitalize',
    color: 'black'
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
  toggleButton: {
    marginTop: 16,
  },
});
