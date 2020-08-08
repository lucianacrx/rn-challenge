

import React from "react";
import { StyleSheet, Text, View, TextInput, Button, Image } from "react-native";
import { Button as ButtonNative, Container, Header, Content, List, ListItem, Left, Body, Item, Thumbnail } from 'native-base';
import _ from 'lodash';

class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);

        this.state = {
            userData: [],
            loading: false,
            page: 1,
            noResults: false
        };

    }
    componentDidMount() {
        this.getUsers();
    };
    getUsers(page = 1) {
        fetch(`https://randomuser.me/api/?page=${page}&results=30&seed=abc`)
            .then((response) => response.json())
            .then((response) => {
                let results = [...response.results].sort((a, b) => {
                    if (a.name.last < b.name.last) return -1;
                    if (a.name.last > b.name.last) return 1;
                    return 0;
                });
                this.setState({
                    userData: results,
                    loading: true,
                    page: page,
                    noResults: false
                });
            })
            .catch((error) => console.error(error))
    }

    searchUserByLastName(lastName) {
        if (lastName.text === "") {
            this.getUsers(this.state.page);
        } else {
            const result = this.state.userData.filter(p => {
                return p.name.last.includes(lastName.text);
            });

            if (result.length === 0){
                this.setState({
                    noResults: true
                });
            } else {
                this.setState({
                    noResults: false
                });
            }

            this.setState({
                userData: result
            });
        }
    }

    render() {
        if (!this.state.loading) {
            return (
                <View  style={styles.loadingText}>
                    <Text>Loading...</Text>
                </View>
            )
        }

        return (
            <Container style={styles.mainContainer}>
                <Header searchBar rounded>
                    <Item>
                        <TextInput placeholder="Search" onChangeText={(text) => this.searchUserByLastName({ text })} />
                    </Item>
                </Header>
                <Content>
                    <List>
                        {
                            this.state.noResults === true ?
                            <View  style={styles.noResultsText}>
                                <Text>No results found</Text>
                            </View>
                            : null
                        }
                        {this.state.userData && this.state.userData.map((user, index) => {
                            return (
                                <ListItem avatar key={index} onPress={() => {
                                    /*  Navigate to the Details route with params */
                                    this.props.navigation.navigate('Details', {
                                        item: user,
                                    });
                                }}>
                                    <Left>
                                        <Thumbnail source={{ uri: user.picture.thumbnail }} />
                                    </Left>
                                    <Body>
                                        <Text>{user.name.last}, {user.name.first}</Text>
                                        <Text note>{user.phone}</Text>
                                    </Body>
                                </ListItem>
                            )
                        })}
                        <View style={styles.paginator}>
                            <Button style={styles.paginatorButton} onPress={() => this.getUsers(this.state.page - 1)} title='Previous'
                            ></Button>
                            <Button style={styles.paginatorButton} onPress={() => this.userDetailHandler} title={this.state.page.toString()}
                            ></Button>
                            <Button style={styles.paginatorButton} onPress={() => this.getUsers(this.state.page + 1)} title='Next'
                            ></Button>
                        </View>
                    </List>
                </Content>
            </Container >
        );
    }
}

const styles = StyleSheet.create({ 
    paginator: {
        display: 'flex',
        flex: 1, 
        flexDirection: 'row', 
        alignItems: 'flex-end', 
        justifyContent: 'flex-end'
    },
    paginatorButton: {
        flex: 1
    },
    loadingText: {
        display: 'flex',
        flex: 1,
        alignItems: 'center', 
        justifyContent: 'center'
    },
    mainContainer: {
        flexDirection: 'column',
        flex: 1,
    },
    noResultsText: {
        display: 'flex',
        alignItems: 'center', 
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20
    }
});

export default HomeScreen;