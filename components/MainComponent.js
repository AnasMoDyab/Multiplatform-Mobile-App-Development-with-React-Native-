import React, {Component} from 'react';
import Menu from "./MenuComponent";
import DishDetail from './DishdetailComponent';
import { View, Platform, Text, ScrollView, Image, StyleSheet, ToastAndroid  } from 'react-native';
import { createStackNavigator, createDrawerNavigator, DrawerItems, SafeAreaView} from 'react-navigation';
import { Icon } from 'react-native-elements';
import Home from './HomeComponent';
import About from "./AboutComponent";
import Contact from "./ContactComponent";
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';
import Reservation from "./ReservationComponent";
import Favorites from "./FavoriteComponent";
import Login from "./LoginComponent";
import NetInfo from "@react-native-community/netinfo";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    drawerHeader: {
        backgroundColor: '#512DA8',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        width: 80,
        height: 60
    }
});

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

const mapDispatchToProps = dispatch => ({
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders()),
})
const MenuNavigator = createStackNavigator({
        Menu: { screen: Menu,
            navigationOptions: ({ navigation }) => ({
                headerLeft: <Icon name="menu" size={24}
                                  color= 'white'
                                  onPress={ () => navigation.toggleDrawer() } />
            })
        },
        Dishdetail: { screen: DishDetail }
    },
    {
        initialRouteName: 'Menu',
        navigationOptions: {
            headerStyle: {
                backgroundColor: "#d467e3"
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: "#fff"
            }
        }
    }
);
const HomeNavigator = createStackNavigator({
    Home: { screen: Home }
}, {
    navigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTitleStyle: {
            color: "#fff"
        },
        headerTintColor: "#fff",
        headerLeft: <Icon name="menu" size={24}
                          color= 'white'
                          onPress={ () => navigation.toggleDrawer() } />
    })
});

const AboutNavigator = createStackNavigator({
    About: { screen: About }
}, {
    navigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTitleStyle: {
            color: "#fff"
        },
        headerTintColor: "#fff",
        headerLeft: <Icon name="menu" size={24}
                          color= 'white'
                          onPress={ () => navigation.toggleDrawer() } />
    })
});

const ContactNavigator = createStackNavigator({
    Contact: { screen: Contact }
}, {
    navigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTitleStyle: {
            color: "#fff"
        },
        headerTintColor: "#fff",
        headerLeft: <Icon name="menu" size={24}
                          color= 'white'
                          onPress={ () => navigation.toggleDrawer() } />
    })
});

const ReservationNavigator = createStackNavigator({
    Reservation: { screen: Reservation }
}, {
    navigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTitleStyle: {
            color: "#fff"
        },
        headerTintColor: "#fff",
        headerLeft: <Icon name="menu" size={24}
                          iconStyle={{ color: 'white' }}
                          onPress={ () => navigation.navigate('DrawerToggle') } />
    })
})

const FavoriteNavigator = createStackNavigator({
    Favorites: { screen: Favorites }
}, {
    navigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTitleStyle: {
            color: "#fff"
        },
        headerTintColor: "#fff",
        headerLeft: <Icon name="menu" size={24}
                          iconStyle={{ color: 'white' }}
                          onPress={ () => navigation.navigate('DrawerToggle') } />
    })
})
const LoginNavigator = createStackNavigator({
    Login: { screen: Login }
}, {
    navigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTitleStyle: {
            color: "#fff"
        },
        headerTintColor: "#fff",
        headerLeft: <Icon name="menu" size={24}
                          iconStyle={{ color: 'white' }}
                          onPress={ () => navigation.navigate('DrawerToggle') } />
    })
})
const CustomDrawerContentComponent = (props) => (
    <ScrollView>
        <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
            <View style={styles.drawerHeader}>
                <View style={{flex:1}}>
                    <Image source={require('./images/logo.png')} style={styles.drawerImage} />
                </View>
                <View style={{flex: 2}}>
                    <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
                </View>
            </View>
            <DrawerItems {...props} />
        </SafeAreaView>
    </ScrollView>
);

const MainNavigator = createDrawerNavigator({
    Login: {
        screen: LoginNavigator,
        navigationOptions: {
            title: 'Login',
            drawerLabel: 'Login',
            drawerIcon: ({tintColor, focused}) => (
                <Icon
                    name='sign-in'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            ),
        }
    },
    Home: {
        screen: HomeNavigator,
        navigationOptions: {
            title: 'Home',
            drawerLabel: 'Home',
            drawerIcon: ({tintColor, focused}) => (
                <Icon
                    name='home'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            ),
        }
    },

    About:
        {
            screen: AboutNavigator,
            navigationOptions: {
                title: 'About Us',
                drawerLabel: 'About Us',
                drawerIcon: ({tintColor, focused}) => (
                    <Icon
                        name='info-circle'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                ),
            }
        },
    Menu:
        {
            screen: MenuNavigator,
            navigationOptions: {
                title: 'Menu',
                drawerLabel: 'Menu',
                drawerIcon: ({tintColor, focused}) => (
                    <Icon
                        name='list'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                ),
            },
        },
    Contact:
        {
            screen: ContactNavigator,
            navigationOptions: {
                title: 'Contact Us',
                drawerLabel: 'Contact Us',
                drawerIcon: ({tintColor, focused}) => (
                    <Icon
                        name='address-card'
                        type='font-awesome'
                        size={22}
                        color={tintColor}
                    />
                ),
            },
        },
    Favorites:
        {
            screen: FavoriteNavigator,
            navigationOptions: {
                title: 'My Favorite',
                drawerLabel: 'My Favorite',
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='heart'
                        type='font-awesome'
                        size={24}
                        iconStyle={{color: tintColor}}
                    />
                ),
            }
        },
    Reservation:
        {
            screen: ReservationNavigator,
            navigationOptions: {
                title: 'Reserve Table',
                drawerLabel: 'Reserve Table',
                drawerIcon: ({tintColor, focused}) => (
                    <Icon
                        name='cutlery'
                        type='font-awesome'
                        size={24}
                        iconStyle={{color: tintColor}}
                    />
                ),
            }
        },



}, {
    initialRouteName:'Home', // to show first page
    drawerBackgroundColor: '#D1C4E9',
    contentComponent: CustomDrawerContentComponent

});


class Main extends Component {

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();

      /*  NetInfo.fetch().then(state => {
            ToastAndroid.show('Initial NetWork Connectivity type: '
                + state.type+ ', effectiveType: '+ state.isConnected
                +ToastAndroid.LONG)
        });
        NetInfo.addEventListener(state => {
            switch (state.type){
                case 'none':
                    ToastAndroid.show('You are offline!', ToastAndroid.LONG)
                    break;
                case 'wifi':
                    ToastAndroid.show('You are connected Wifi!', ToastAndroid.LONG)
                    break;
                case 'cellular':
                    ToastAndroid.show('You are connected to Cellular!', ToastAndroid.LONG)
                    break;
                case 'unknown':
                    ToastAndroid.show('You are now have unknown connection!', ToastAndroid.LONG)
                    break;
                default:
                    break;
            }
        });*/
    }


    render (){
        return (
            <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
                <MainNavigator />
            </View>
            );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);