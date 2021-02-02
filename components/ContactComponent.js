import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Card, ListItem } from 'react-native-elements';

function RenderContact(){
    return (
        <Card
            title="Contact Information"
        >
            <View>
                <ListItem title="121, Clear Water Bay Road" />
                <ListItem title="Clear Water Bay, Kowloon" />
                <ListItem title="HONG KONG" />
                <ListItem title="Tel: +852 1234 5678" />
                <ListItem title="Fax: +852 8765 4321" />
                <ListItem title="Email:confusion@food.net" />
            </View>
        </Card>
    )

}

class Contact extends Component {

    static navigationOptions = {
        title: 'Contact Us'
    };
    render() {

        return (
                <RenderContact />
        )
    }

}
export  default Contact;