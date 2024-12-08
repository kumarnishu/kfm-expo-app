import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useQuery } from 'react-query';
import { AxiosResponse } from 'axios';
import { BackendError } from '@/index';
import { Avatar, Button, Card, TextInput } from 'react-native-paper';
import { UserContext } from '@/contexts/UserContext';
import FuzzySearch from 'fuzzy-search';
import { GetAllEngineers } from '@/services/UserServices';
import { GetUserDto } from '@/dtos/user.dto';


const Engineers = () => {
    const [engineers, setEngineers] = useState<GetUserDto[]>([])
    const [prefilteredEngineers, setPrefilteredEngineers] = useState<GetUserDto[]>([])
    const [refreshing, setRefreshing] = useState(false); // State for pull-to-refresh
    const { user } = useContext(UserContext);
    const [filter, setFilter] = useState<string | undefined>()
    const { data, isSuccess, isLoading, refetch, isError } = useQuery<AxiosResponse<GetUserDto[]>, BackendError>(["engineers"], async () => GetAllEngineers())

    // Pull-to-refresh handler
    const onRefresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    };

    useEffect(() => {
        if (filter) {
            const searcher = new FuzzySearch(engineers, ['username', 'email', 'mobile'], {
                caseSensitive: false,
            });
            const result = searcher.search(filter);
            setEngineers(result)
        }
        if (!filter)
            setEngineers(prefilteredEngineers)
    }, [filter])

    useEffect(() => {
        if (isSuccess) {
            setEngineers(data.data)
            setPrefilteredEngineers(data.data)
        }
    }, [isSuccess, data])
    // Render each engineer as a card
    const renderEngineer = ({ item }: { item: GetUserDto }) => (

        <Card style={styles.card}>
            <Card.Title
                style={{ width: '100%' }}
                title={item.is_admin ? `${item.username.toUpperCase()}-(Admin)` : item.is_engineer ? `${item.username.toUpperCase()}-(Engineer)` : `${item.username.toUpperCase()}-(Engineer)` || "Member" + item.username.toUpperCase()}
                subtitle={`Mob : ${item.mobile || "N/A"}`}
                subtitleStyle={{ color: 'black', flexWrap: 'wrap' }}
                left={(props) => (
                    <Avatar.Text
                        {...props}
                        label={item.username ? item.username.charAt(0).toUpperCase() : "C"}
                    />
                )}
            />
            <Card.Content>
                <Text style={{ marginLeft: 56 }}>Company : {item.customer.toUpperCase() || ''}</Text>
                <Text style={{ marginLeft: 56 }}>Email : {item.email || ''}</Text>
            </Card.Content>
        </Card>
    );

    // Handle loading and error states
    if (isLoading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#6200ea" />
                <Text>Loading Engineers...</Text>
            </View>
        );
    }

    if (isError) {
        return (
            <View style={styles.loader}>
                <Text>Failed to load engineers. Please try again later.</Text>
                <Button mode="contained" onPress={() => refetch()}>
                    Retry
                </Button>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Title */}

            <Text style={styles.title}>Engineers</Text>
            <TextInput style={{ marginBottom: 10 }} placeholder='Engineers' mode='outlined' onChangeText={(val) => setFilter(val)} />


            {/* Engineer List */} 
            <FlatList
                data={engineers}
                keyExtractor={(item) => item._id.toString()}
                renderItem={renderEngineer}
                refreshing={refreshing} // Indicates if the list is refreshing
                onRefresh={onRefresh} // Handler for pull-to-refresh
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No engineers found.</Text>
                }
            />

          
        </View>
    );
};

export default Engineers;

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
