import React, {Component} from 'react'
import ShareImage from '../ImageShare/index.js'
import {createStackNavigator, createAppContainer} from 'react-navigation'
const ShareImageRouter = createStackNavigator(
  {
    ShareImage: {
      screen: ShareImage,
    },
  },
  {
    initialRouteName: 'ShareImage',
    // headerMode: 'none',
    contentOptions: {
      activeTintColor: '#e91e63',
    },
  },
)
export default createAppContainer(ShareImageRouter)
