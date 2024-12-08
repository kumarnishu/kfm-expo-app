import { Href, Link } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

const cardData: { id: number, title: string, description: string, image: any, link: Href }[] = [
  {
    id: 1,
    title: 'Customers',
    description: 'Registered customers',
    image: require('../../assets/img/customers.jpg'),
    link: '/(app)/customers',
  },
  {
    id: 2,
    title: 'Products',
    description: 'Registered products',
    image: require('../../assets/img/products.jpeg'),
    link: '/(app)/products',
  },
  {
    id: 3,
    title: 'Spares',
    description: 'Available spare parts',
    image: require('../../assets/img/parts.jpeg'),
    link: '/(app)/spares',
  },
  {
    id: 4,
    title: 'Service Requests',
    description: 'Requests sent to us',
    image: require('../../assets/img/requests.jpeg'),
    link: '/(app)/requests',
  },
  {
    id: 5,
    title: 'Engineers',
    description: 'Our Hard working engineers',
    image: require('../../assets/img/engineer.jpg'),
    link: '/(app)/engineer',
  },
  {
    id: 6,
    title: 'Notifications',
    description: 'Nofications that matter to you',
    image: require('../../assets/img/notifications.png'),
    link: '/(app)/notifications',
  },
  {
    id: 7,
    title: 'Machines',
    description: 'Machines that Made us',
    image: require('../../assets/img/machines.jpg'),
    link: '/(app)/machines',
  },
];

const CardList = () => {

  return (
    <ScrollView style={styles.container}>
      {cardData.map((card) => (
        <TouchableOpacity key={card.id}>
          <Card style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <Image style={styles.image} source={card.image} />
              <Link href={card.link}>
                <View style={styles.textContainer}>
                  <Title style={styles.title}>{card.title}</Title>
                  <Paragraph style={styles.paragraph}>{card.description}</Paragraph>
                </View>
              </Link>
            </Card.Content>
          </Card>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  card: {
    marginBottom: 10,
    borderRadius: 8,
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
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  paragraph: {
    paddingLeft: 2,
    textTransform: 'capitalize',
  },
});

export default CardList;
