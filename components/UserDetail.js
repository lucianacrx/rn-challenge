import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from "react-native";
import { Container, Button, Content, Header, Left, Title, Right, Body } from "native-base";

export default class UserDetail extends Component {
  static navigationOptions = {
      header: null,
  };
  
  render() {
    const { navigation } = this.props;
    const item = navigation.getParam('item', 'NO-item');
      
    return (
      <Container>
        <Header>
          <Left style={styles.headerItems}>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Text style={{ color: 'white' }}>&#8249; User List</Text>
            </Button>
          </Left>
          <Body style={styles.headerItems}>
            <Title>User Details</Title>
          </Body>
          <Right style={styles.headerItems}></Right>
        </Header>
        <Content style={styles.container}>
          <View style={styles.infoContainer}>
            <Image style={styles.userImage} source={{uri: item.picture.large}}
            />
            <Text style={styles.userName}>{item.name.last}, {item.name.first}</Text>
            <Text>{item.location.street.number} {item.location.street.name}, {item.location.city}</Text>
          </View>
        </Content>
      </Container>      
    );
  }
}


const styles = StyleSheet.create({ 
  headerItems: {
    flex: 1
  },
  container: {
    marginTop: 20
  },
  infoContainer: {
    flex: 1, 
    alignItems: 'center', 
    flexDirection: 'column', 
    justifyContent: 'center'
  },
  userImage: {
    width: 150, 
    height: 150, 
    marginBottom: 10,
    borderRadius: 75,
    overflow: "hidden",
  },
  userName: {
    marginBottom: 10
  }
});