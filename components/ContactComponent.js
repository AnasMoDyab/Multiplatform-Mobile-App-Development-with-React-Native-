import React, { Component } from 'react';
import {ScrollView, Text, View} from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';


function RenderContact(){
    return (
        <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
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
        </Animatable.View>
    )

}

class Contact extends Component {


    sendMail (){
        MailComposer.composeAsync({
            recipient: ['anasdy@gmail.com'],
            subject: 'Enquiry',
            body: 'To whom it may concern'
        })
    }
    static navigationOptions = {
        title: 'Contact Us'
    };
    render() {

        return (
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
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
                    <Button
                        title="Send Email"
                        buttonStyle={{backgroundColor: "#512DA8"}}
                        icon={<Icon name='envelope-o' type='font-awesome' color='white' />}
                        onPress={this.sendMail}
                    />
                </Card>
            </Animatable.View>
        )
    }

}
export  default Contact;