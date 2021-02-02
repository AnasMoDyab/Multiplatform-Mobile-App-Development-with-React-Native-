import React, {Component} from 'react';
import Menu from "./MenuComponent";
import Dishdetail from './DishdetailComponent';
import { View, Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import * as Expo from "react-native";


const MenuNavigator = createStackNavigator({
        Menu: { screen: Menu },
        Dishdetail: { screen: Dishdetail }
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

class Main extends Component {


    render (){
        return (
            <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : 5 }}>
                <MenuNavigator />
            </View>
            );
    }
}

export default Main;