import React, {Component} from 'react'
import ShareImage from './ShareImage.js'
import {createStackNavigator} from 'react-navigation'

export default (DrawNav = createStackNavigator(
  {
    ShareImage: {screen: ShareImage},
  },
  {
    initialRouteName: 'ShareImage',
  },
))
