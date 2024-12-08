import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Image } from 'react-native';
import { useQuery } from 'react-query';
import { AxiosResponse } from 'axios';
import { BackendError } from '@/index';
import { Avatar, Button, Card, Paragraph, TextInput, Title } from 'react-native-paper';
import { UserContext } from '@/contexts/UserContext';
import FuzzySearch from 'fuzzy-search';
import { GetAllMachines } from '@/services/MachineServices';
import { GetMachineDto } from '@/dtos/machine.dto';


const Machines = () => {
  const [machines, setMachines] = useState<GetMachineDto[]>([])
  const [prefilteredMachines, setPrefilteredMachines] = useState<GetMachineDto[]>([])
  const [refreshing, setRefreshing] = useState(false); // State for pull-to-refresh
  const { user } = useContext(UserContext);
  const [hidden, setHidden] = useState(false);
  const [filter, setFilter] = useState<string | undefined>()
  const { data, isSuccess, isLoading, refetch, isError } = useQuery<AxiosResponse<GetMachineDto[]>, BackendError>(["machines",hidden], async () => GetAllMachines({ hidden: hidden }))

  console.log(machines)
  // Pull-to-refresh handler
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  useEffect(() => {
    if (filter) {
      const searcher = new FuzzySearch(machines, ['name', 'model'], {
        caseSensitive: true,
      });
      const result = searcher.search(filter);
      setMachines(result)
    }
    if (!filter)
      setMachines(prefilteredMachines)
  }, [filter])

  useEffect(() => {
    if (isSuccess) {
      setMachines(data.data)
      setPrefilteredMachines(data.data)
    }
  }, [isSuccess, data])
  // Render each engineer as a card
  const renderEngineer = ({ item }: { item: GetMachineDto }) => (

    <Card style={styles.card}>
      <Card.Content style={styles.cardContent}>
        <Image style={styles.image} source={{ uri: item.photo }} />
        <View style={styles.textContainer}>
          <Title style={styles.title}>{item.name}</Title>
          <Paragraph style={styles.paragraph}>Model No : {item.model}</Paragraph>
        </View>
      </Card.Content>
    </Card>
  );

  // Handle loading and error states
  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#6200ea" />
        <Text>Loading Machines...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.loader}>
        <Text>Failed to load machines. Please try again later.</Text>
        <Button mode="contained" onPress={() => refetch()}>
          Retry
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Title */}

      <Text style={styles.title}>Machines</Text>
      <TextInput style={{ marginBottom: 10 }} placeholder='Machines' mode='outlined' onChangeText={(val) => setFilter(val)} />


      {/* Engineer List */}
      <FlatList
        data={machines}
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderEngineer}
        refreshing={refreshing} // Indicates if the list is refreshing
        onRefresh={onRefresh} // Handler for pull-to-refresh
        ListEmptyComponent={
          <Text style={styles.emptyText}>No machines found.</Text>
        }
      />

      {/* Toggle Active/Inactive Customers */}
      {user && user.is_admin && (
        <Button
          mode="contained"
          onPress={() => setHidden(!hidden)}
          style={styles.toggleButton}
        >
          {hidden ? "Show Active Machines" : "Show Inactive Machines"}
        </Button>
      )}
    </View>
  );
};

export default Machines;

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
    width: 70,
    height: 70,
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
