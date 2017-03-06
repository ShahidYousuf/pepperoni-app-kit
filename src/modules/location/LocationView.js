import React, {PropTypes} from 'react';
import * as CityState from '../city/CityState';
import Button from '../../components/Button';
import * as theme from '../../utils/theme';
import * as Utils from '../../utils/Utils';
import store from '../../redux/store';
import * as NavigationState from '../../modules/navigation/NavigationState';
import {
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Linking,
  Platform
} from 'react-native';

const window = Dimensions.get('window');

const LocationView = React.createClass({
  propTypes: {
    dispatch: PropTypes.func.isRequired,
    office: PropTypes.object.isRequired,
    place: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
  },

  componentWillMount() {
    //if this.prop.place doesn't contain the right data go back
    if (!this.props.place.name) {
      store.dispatch(NavigationState.popRoute());
    }
  },

  onNextPress() {
    this.props.dispatch(CityState.retryPlace(this.props.office, this.props.place));
  },

  buildPhotosURL() {
    var size = this.props.place.photos.groups[0].items.length;
    var photo = this.props.place.photos.groups[0].items[Utils.getRamdonNumberBetweenRange(size, 0)];
    return (photo.prefix + '500x500' + photo.suffix);
  },

  getRating() {
    return (<Image
              style={[styles.gradient, {top: 75}]}
              source={require('../../../assets/gradient.png')}>
            <View style={[styles.ratingView, this.getRatingStyles()]}>
              <Text style={styles.rating}>{this.props.place.rating}</Text>
            </View>
            </Image>);
  },

  getImage() {
    return (this.props.place.photos && this.props.place.photos.count && this.props.place.photos.count > 0)
      ? (<Image style={styles.image} source={{uri: this.buildPhotosURL()}}>
          {this.getRating()}
          </Image>)
      : (this.getRating());
  },

  getPrice() {
    var price = '';
    if (this.props.place.price) {
      for (let i = 0; i < this.props.place.price.tier; i++) {
        price += this.props.place.price.currency;
      }
    }
    return price + '\n';
  },

  getCategories() {
    var categories = '';
    if (this.props.place.categories) {
      for (let i = 0; i < this.props.place.categories.length; i++) {
        categories += this.props.place.categories[i].name + ', ';
      }
    }
    return categories.slice(0, -2);
  },

  getAddress() {
    var address = '';
    if (this.props.place.location) {
      address = (this.props.place.location.address)
      ? this.props.place.location.address + ' '
      : '';
      address += (this.props.place.location.postalCode)
      ? this.props.place.location.postalCode
      : '';
    }
    return address;
  },

  getRatingStyles() {
    return (this.props.place.ratingColor)
    ? ({backgroundColor: '#' + this.props.place.ratingColor})
    : '';
  },

  getHours() {
    return (this.props.place.hours)
    ? (this.props.place.hours.status)
    : '';
  },

  getContact() {
    return (this.props.place.contact)
    ? (this.props.place.contact.formattedPhone)
    : '';
  },

  getLinkURL() {
    var url = (Platform.OS === 'android')
      ? 'https://maps.google.com?q='
      : 'http://maps.apple.com/?q=';
    return url + this.props.place.location.lat + ',' + this.props.place.location.lng;
  },

  render() {
    var spinner = this.props.loading
      ? (<ActivityIndicator style={styles.spinner} size='large' color='white'/>)
      : (<View/>);

    return (
      <View style={styles.container}>
      <ScrollView>
        <View>
          {this.getImage()}
        </View>
        <View style={styles.cardInfo}>
          <Text numberOfLines={2} style={styles.title}>
            {this.props.place.name}
          </Text>
          <Text style={styles.text}>
            {this.getCategories()}
          </Text>
          <Text style={styles.text}>
            {this.getPrice()}
          </Text>
          <Text numberOfLines={2} style={styles.text}>
            {this.getAddress()}
          </Text>
          <Text style={styles.text}>
            {this.getHours()}
          </Text>
          <Text style={styles.text}>
            {this.getContact()}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            text='YEAH, TAKE ME THERE!'
            style={theme.buttons.primary}
            textStyle={theme.fonts.primary}
            action={() => Linking.openURL(this.getLinkURL())
              .catch(err => console.error('An error occurred', err))} />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            text='NAH, TRY ANOTHER ONE'
            style={theme.buttons.secondary}
            textStyle={theme.fonts.secondary}
            action={this.onNextPress} />
        </View>
      </ScrollView>
      {spinner}
      </View>
    );
  }
});

const spacing = {
  marginHorizontal: 20
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  title: {
    ...spacing,
    ...theme.fonts.h3
  },
  text: {
    ...spacing,
    ...theme.fonts.body,
    marginBottom: 5
  },
  buttonContainer: {
    margin: 10
  },
  spinner: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: window.width,
    height: window.height,
    backgroundColor: 'rgba(0,0,0,.8)'
  },
  image: {
    height: 200,
    width: window.width,
    justifyContent: 'center',
    alignItems: 'center'
  },
  gradient: {
    height: 50,
    width: window.width
  },
  cardInfo: {
    flex: 1,
    backgroundColor: theme.colors.selectedTab
  },
  ratingView: {
    top: 0,
    left: 20,
    backgroundColor: 'transparent', // default backgroundColor
    width: 80,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rating: {
    textAlign: 'center',
    textAlignVertical: 'center',
    ...theme.fonts.h3,
    backgroundColor: 'transparent'
  }
});

export default LocationView;
