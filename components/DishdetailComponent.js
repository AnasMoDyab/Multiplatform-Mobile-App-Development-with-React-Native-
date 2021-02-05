import React, {Component} from 'react';
import {Text, View, ScrollView, FlatList, StyleSheet, Switch, Button, Modal, Alert, PanResponder} from 'react-native';
import {Card, Icon, Rating, Input} from 'react-native-elements';
import {connect} from 'react-redux';
import {baseUrl} from '../shared/baseUrl';
import {postFavorite, postComment} from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable'


const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}
const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
})


function RenderDish(props) {

    const dish = props.dish;

    const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
        if ( dx < -200 )
            return true;
        else
            return false;
    }

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true;
        },
        onPanResponderEnd: (e, gestureState) => {
            console.log("pan responder end", gestureState);
            if (recognizeDrag(gestureState))
                Alert.alert(
                    'Add Favorite',
                    'Are you sure you wish to add ' + dish.name + ' to favorite?',
                    [
                        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                        {text: 'OK', onPress: () => {props.favorite ? console.log('Already favorite') : props.onPress()}},
                    ],
                    { cancelable: false }
                );

            return true;
        }
    })
    if (dish != null) {
        return (
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}
                             {...panResponder.panHandlers}>
                <Card
                featuredTitle={dish.name}
                image={{uri: baseUrl + dish.image}}>
                <Text style={{margin: 10}}>
                    {dish.description}
                </Text>
                <View style={styles.formRow}>
                    <Icon
                        raised
                        reverse
                        name={props.favorite ? 'heart' : 'heart-o'}
                        type='font-awesome'
                        color='#f50'
                        onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                    />
                    <Icon
                        style={{flex: 2}}
                        raised
                        reverse
                        name="pencil"
                        type='font-awesome'
                        color="#512DA8"
                        onPress={() => props.handleOpenModal()}
                    />
                </View>
            </Card>
            </Animatable.View>
        );
    } else {
        return (<View></View>);
    }
}

function RenderComments(props) {

    const comments = props.comments;

    const renderCommentItem = ({item, index}) => {

        return (

            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    };

    return (
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
            <Card title='Comments'>
                <FlatList
                    data={comments}
                    renderItem={renderCommentItem}
                    keyExtractor={item => item.id.toString()}
                />
            </Card>
        </Animatable.View>
    );
}

class DishDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            author: "",
            comment: "",
            rating: ""
        }
    }

    toggleModal() {
        console.log(" ffff", this.state.showModal)
        this.setState({showModal: !this.state.showModal});
    }

    handleOpenModal() {
        console.log(" ffff", this.state.showModal)
        this.toggleModal()
    }

    handleSubmit(dishId){
        console.log("Dish id: ", this.props.dishId +"  " +this.state.rating);
        this.props.postComment(dishId,this.state.rating, this.state.author, this.state.comment );
        this.resetForm();
    }
    resetForm() {
        this.setState({
            showModal: false,
            author: "",
            comment: "",
            rating: ""
        });
    }

    static navigationOptions = {
        title: 'Dish Details'
    };

    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    render() {

        const dishId = this.props.navigation.getParam('dishId', '');
        return (
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                            favorite={this.props.favorites.some(el => el === dishId)}
                            onPress={() => this.markFavorite(dishId)}
                            handleOpenModal={() => this.handleOpenModal()}

                />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)}/>

                <Modal animationType={"slide"} transparent={false}
                       visible={this.state.showModal}
                       onDismiss={() => this.toggleModal}
                       onRequestClose={() => this.toggleModal}>

                    <View style={styles.container}>
                        <Rating showRating fractions="{5}"
                                startingValue="{3.3}"
                                onFinishRating={(rating) => this.setState({rating: rating})}/>


                        <Input
                            leftIcon={{type: 'font-awesome', name: 'user'}}
                            placeholder="Author"
                            editable
                            maxLength={30}
                            numberOfLines={1}
                            underlineColorAndroid="transparent"
                            onChangeText={(author)=> this.setState({author: author})}

                        />

                        <Input
                            leftIcon={{type: 'font-awesome', name: 'comment'}}
                            placeholder="Comments"
                            editable
                            maxLength={30}
                            numberOfLines={1}
                            underlineColorAndroid="transparent"
                            onChangeText={(comment)=> this.setState({comment: comment})}

                        />

                        <Button
                            title="Submit"
                            onPress={()=> this.handleSubmit(dishId)}/>
                        <Button
                            title="Cancel"
                            onPress = {() =>{this.toggleModal(); this.resetForm();}}/>


                    </View>
                </Modal>


            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 3
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
    },
    searchSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    searchIcon: {
        padding: 2,
        marginRight: 10,
        borderBottomWidth: 2,
        borderBottomColor: '#424242',
        color: '#424242'
    },
    input: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 0,
        paddingLeft: 0,
        backgroundColor: '#fff',
        color: '#424242',
        borderBottomWidth: 2,
        fontSize: 18,
        borderBottomColor: '#424242',
        marginLeft: 10
    },


    container: {
        flex: 1,
        justifyContent: 'center'
    },
    inputs: {
        margin: 10,
        height: 40,
        borderBottomColor: '#4d4b53',
        borderBottomWidth: 2
    },
    submitButton: {
        backgroundColor: '#7a42f4',
        padding: 10,
        margin: 15,
        height: 40,
    },
    submitButtonText: {
        color: 'white'
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);