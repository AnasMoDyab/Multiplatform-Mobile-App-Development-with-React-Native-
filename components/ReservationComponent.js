import React, { Component } from 'react';
import {Text, View, ScrollView, StyleSheet, Picker, Switch, Button, Modal, Alert} from 'react-native';
import { Card } from 'react-native-elements';
import DatePicker from 'react-native-datepicker'
import * as Animatable from 'react-native-animatable'
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';
import * as Calendar from 'expo-calendar';





class Reservation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            guests: 1,
            smoking: false,
            date: '',
            showModal: false
        }
    }

    static navigationOptions = {
        title: 'Reserve Table',
    };

 /*   toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }

    handleReservation() {
        console.log(JSON.stringify(this.state));
        this.toggleModal();
    }*/

    dates = new Date();
    resetForm() {
        this.setState({
            guests: 1,
            smoking: false,
            date: '',
            showModal: false
        });
    }
    Reserve () {
        Alert.alert(
            'Your Reservation ok?',
            'Number of Guests: '+ this.state.guests+'\n'+
            'Smoking? '+ this.state.smoking+ '\n'+
            'Date and time: '+ this.dates,
            [
                {
                    text: 'Cancel',
                    onPress: ()=> this.resetForm(),
                    style: 'cancel'
                },
                {
                    text: 'Ok',
                    onPress: ()=> {
                        this.addReservationToCalendar(this.dates)
                        this.presentLocalNotification(this.dates)
                        this.resetForm()
                    }
                }
            ]  ,
            {
                cancelable: false
            }
        );
    }

    async obtainNotificationPermission (){
        let permission= Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if(permission.status !== 'granted'){
            permission=await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if (permission.status !=='granted'){
                Alert.alert('Permission not granted to show notification');
            }
        }
        return permission;
    }

    async presentLocalNotification (date) {

        await this.obtainNotificationPermission();
        await Notifications.setNotificationChannelAsync('default',{
            title: 'Your reservation',
            body: 'Reservation for '+ date+ ' requested',
            ios: {
                sound: true
            },
            android: {
                sound: true,
                vibrate: true,
                color: '#512DA8'
            }
        })
     /*   Permissions.NOTIFICATIONS.presentLocalNotificationAsync({
            title: 'Your reservation',
            body: 'Reservation for '+ date+ ' requested'
        });*/
    }
    obtainCalendarPermission() {
        let permission= Permissions.getAsync(Permissions.CALENDAR);
        if(permission.status !== 'granted'){
            permission= Permissions.askAsync(Permissions.CALENDAR);
            if (permission.status !=='granted'){
                Alert.alert('Permission not granted to show Calender');
            }
        }
        return permission;
    }
    async getDefaultCalendarSource() {
        const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
        const defaultCalendars = calendars.filter(each => each.source.name === 'Default');
        return defaultCalendars[0].source;
    }
    addReservationToCalendar(date) {
        this.obtainCalendarPermission();
        Calendar.createEventAsync(this.getDefaultCalendarSource, {
            title: 'Con Fusion Table Reservation',
            startDate: new Date(Date.parse(date)),
            endDate:new Date(Date.parse(date))+2,
        })

    }
    render() {


        return(
            <ScrollView>
                <Animatable.View animation="zoomIn" duration={2000} delay={1000}>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Number of Guests</Text>
                    <Picker
                        style={styles.formItem}
                        selectedValue={this.state.guests}
                        onValueChange={(itemValue, itemIndex) => this.setState({guests: itemValue})}>
                        <Picker.Item label="1" value="1" />
                        <Picker.Item label="2" value="2" />
                        <Picker.Item label="3" value="3" />
                        <Picker.Item label="4" value="4" />
                        <Picker.Item label="5" value="5" />
                        <Picker.Item label="6" value="6" />
                    </Picker>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
                    <Switch
                        style={styles.formItem}
                        value={this.state.smoking}
                        onTintColor='#512DA8'
                        onValueChange={(value) => this.setState({smoking: value})}>
                    </Switch>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Date and Time</Text>
                    <DatePicker
                        style={{flex: 2, marginRight: 20}}
                        date={this.state.date}
                        format=''
                        mode="datetime"
                        placeholder="select date and Time"
                        minDate={this.dates}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                            // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(date) => {this.setState({date: date})}}
                    />
                </View>

                    <Button
                        onPress={() => this.Reserve()}
                        title="Reserve"
                        raised
                        color="#512DA8"
                        containerStyle={{margin:'40'}}
                        accessibilityLabel="Learn more about this purple button"
                    />


       {/*         <Modal animationType = {"slide"} transparent = {false}
                       visible = {this.state.showModal}
                       onDismiss = {() => this.toggleModal() }
                       onRequestClose = {() => this.toggleModal() }>
                    <View style = {styles.modal}>
                        <Text style = {styles.modalTitle}>Your Reservation</Text>
                        <Text style = {styles.modalText}>Number of Guests: {this.state.guests}</Text>
                        <Text style = {styles.modalText}>Smoking?: {this.state.smoking ? 'Yes' : 'No'}</Text>
                        <Text style = {styles.modalText}>Date and Time: {this.state.date}</Text>

                        <Button
                            onPress = {() =>{this.toggleModal(); this.resetForm();}}
                            color="#512DA8"
                            title="Close"
                        />
                    </View>
                </Modal>*/}
                </Animatable.View>
            </ScrollView>
        );
    }

};

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
});

export default Reservation;