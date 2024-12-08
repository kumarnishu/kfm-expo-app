import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useQuery } from 'react-query';
import { AxiosResponse } from 'axios';
import { GetAllCustomers } from '@/services/CustomerServices';
import { GetCustomerDto } from '@/dtos/customer.dto';
import { BackendError } from '@/index';
import { Avatar, Button, Card, TextInput } from 'react-native-paper';
import { Link } from 'expo-router';
import { UserContext } from '@/contexts/UserContext';
import FuzzySearch from 'fuzzy-search';


const Customers = () => {
  const [hidden, setHidden] = useState(false);
  const [customers, setCustomers] = useState<GetCustomerDto[]>([])
  const [prefilteredCustomers, setPrefilteredCustomers] = useState<GetCustomerDto[]>([])
  const [refreshing, setRefreshing] = useState(false); // State for pull-to-refresh
  const { user } = useContext(UserContext);
  const [filter, setFilter] = useState<string | undefined>()
  // Fetch customers data
  const { data, isSuccess, isLoading, isError, refetch } = useQuery<
    AxiosResponse<GetCustomerDto[]>,
    BackendError
  >(["customers", hidden], async () => GetAllCustomers({ hidden: hidden }));

  // Pull-to-refresh handler
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  useEffect(() => {
    if (filter) {
      const searcher = new FuzzySearch(customers, ['name', 'address'], {
        caseSensitive: true,
      });
      const result = searcher.search(filter);
      setCustomers(result)
    }
    if (!filter)
      setCustomers(prefilteredCustomers)
  }, [filter])

  useEffect(() => {
    if (isSuccess) {
      setCustomers(data.data)
      setPrefilteredCustomers(data.data)
    }
  }, [isSuccess, data])
  // Render each customer as a card
  const renderCustomer = ({ item }: { item: GetCustomerDto }) => (
    <Link
      style={{ width: '100%' }}
      disabled={!user?.is_admin}
      href={{ pathname: "/main/customers/[id]", params: { id: item._id } }}
    >
      <Card style={styles.card}>
        <Card.Title
          style={{ width: '100%' }}
          title={item.name || "Customer"}
          subtitle={`Members : ${item.users || "0"}`}
          subtitleStyle={{ color: 'black'}}
          left={(props) => (
            <Avatar.Text
              {...props}
              label={item.name ? item.name.charAt(0).toUpperCase() : "C"}
            />
          )}
        />
        <Card.Content>
          <Text style={{ marginLeft: 56 }}>Address : {item.address || "0"}</Text>
        </Card.Content>
      </Card>
    </Link>
  );

  // Handle loading and error states
  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#6200ea" />
        <Text>Loading Customers...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.loader}>
        <Text>Failed to load customers. Please try again later.</Text>
        <Button mode="contained" onPress={() => refetch()}>
          Retry
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Title */}

      <Text style={styles.title}>Customers</Text>
      <TextInput style={{ marginBottom: 10 }} placeholder='Customers' mode='outlined' onChangeText={(val) => setFilter(val)} />


      {/* Customer List */}
      <FlatList
        data={customers}
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderCustomer}
        refreshing={refreshing} // Indicates if the list is refreshing
        onRefresh={onRefresh} // Handler for pull-to-refresh
        ListEmptyComponent={
          <Text style={styles.emptyText}>No customers found.</Text>
        }
      />

      {/* Toggle Active/Inactive Customers */}
      {user && user.is_admin && (
        <Button
          mode="contained"
          onPress={() => setHidden(!hidden)}
          style={styles.toggleButton}
        >
          {hidden ? "Show Active Customers" : "Show Inactive Customers"}
        </Button>
      )}
    </View>
  );
};

export default Customers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
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
