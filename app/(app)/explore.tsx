import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Image } from 'react-native';
import { useQuery } from 'react-query';
import { AxiosResponse } from 'axios';
import { BackendError } from '@/index';
import { Button, Card, TextInput } from 'react-native-paper';
import FuzzySearch from 'fuzzy-search';
import { GetAllExploreItems } from '@/services/ExploreServices';
import { GetExploreDto } from '@/dtos/explore.dto';


const Explore = () => {
  const [explores, setExplores] = useState<GetExploreDto[]>([])
  const [prefilteredExplores, setPrefilteredExplores] = useState<GetExploreDto[]>([])
  const [refreshing, setRefreshing] = useState(false); // State for pull-to-refresh
  const [filter, setFilter] = useState<string | undefined>()
  const { data, isSuccess, isLoading, refetch, isError } = useQuery<AxiosResponse<GetExploreDto[]>, BackendError>(["explores"], async () => GetAllExploreItems())

  console.log(explores)
  // Pull-to-refresh handler
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  useEffect(() => {
    if (filter) {
      const searcher = new FuzzySearch(explores, ['name', 'model','type'], {
        caseSensitive: false,
      });
      const result = searcher.search(filter);
      setExplores(result)
    }
    if (!filter)
      setExplores(prefilteredExplores)
  }, [filter])

  useEffect(() => {
    if (isSuccess) {
      setExplores(data.data)
      setPrefilteredExplores(data.data)
    }
  }, [isSuccess, data])

  const renderEngineer = ({ item }: { item: GetExploreDto }) => (
    <>
      {item.photo !== "" ? (
        <Card style={styles.card}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={
                item.photo !== ""
                  ? { uri: item.photo }
                  : require("../../assets/img/placeholder.png")
              }
            />
            <View style={styles.label}>
              <Text style={styles.labelText}>{item.type}</Text>
            </View>
          </View>
        </Card>
      ) : (
        <></>
      )}
    </>
  );
  

  // Handle loading and error states
  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#6200ea" />
        <Text>Loading Explores...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.loader}>
        <Text>Failed to load explores. Please try again later.</Text>
        <Button mode="contained" onPress={() => refetch()}>
          Retry
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput style={{ marginBottom: 10 }} placeholder='Search items' mode='outlined' onChangeText={(val) => setFilter(val)} />


      {/* Engineer List */}
      <FlatList
        data={explores}
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderEngineer}
        refreshing={refreshing} // Indicates if the list is refreshing
        onRefresh={onRefresh} // Handler for pull-to-refresh
        ListEmptyComponent={
          <Text style={styles.emptyText}>No explores found.</Text>
        }
      />


    </View>
  );
};

export default Explore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    minHeight: 200,
    maxHeight: 400,
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 8, // Optional for rounded corners
  },
  label: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent black background
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  labelText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  cardContent: {
    width: '100%',
    padding: 10,
  },
  
  textContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textTransform: 'uppercase'
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
    color: 'black',
    overflow: 'scroll'
  },
  rupees: {
    paddingLeft: 2,
    textTransform: 'capitalize',
    overflow: 'scroll'
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
