import React, {Component} from 'react'

import {
  StatusBar,
  Clipboard,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native'

import {
  Container,
  Content,
  Header,
  View,
  Card,
  CardItem,
  Text,
  Body,
  Title,
  Right,
  Item,
  Input,
  Button,
  Spinner,
} from 'native-base'

import RNFetchBlob from 'rn-fetch-blob'

import Share from 'react-native-share'

import {Col, Row, Grid} from 'react-native-easy-grid'

const styles = StyleSheet.create({
  closeButton: {
    color: 'white',
    padding: 8,
    margin: 10,
    alignSelf: 'flex-start',
  },
  shareButton: {
    color: 'white',
    padding: 8,
    margin: 10,
    alignSelf: 'flex-end',
  },
})

export default class ShareImage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imageUrl:
        'https://cdn.pixabay.com/photo/2014/09/24/14/29/mac-459196_1280.jpg',
      data: [],
      imageLoad: true,
      loading: true,
      imageString: '',
      link: '',
      linkFetch: false,
      clipboardContent: '',
      showToast: false,
    }
    this.props = props
  }
  componentDidMount = () => {
    console.log('mounted')
  }
  readFromClipboard = async () => {
    const clipboardContent = await Clipboard.getString()
    this.setState({imageUrl: clipboardContent})
  }

  doFetchImageFromInternet = () => {
    this.setState({loading: true}, () => {
      let url = this.state.imageUrl
      RNFetchBlob.fetch('GET', url)
        .then(res => {
          console.log('response', res)
          let status = res.info().status

          if (status == 200) {
            let base64Str = res.base64()
            this.setState({
              imageString: base64Str,
              loading: false,
              imageLoad: false,
            })

            let text = res.text()
            let json = res.json()
          } else {
            this.setState({
              loading: false,
              imageLoad: true,
            })
          }
        })

        .catch((errorMessage, statusCode) => {})
    })
  }

  onShare = () => {
    let shareImageBase64 = {
      url: `data:image/png;base64,${this.state.imageString}`,
      mime: 'image/png',
      showAppsToView: true,
    }
    Share.open(shareImageBase64)
      .then(res => {
        console.log('Share then' + res)
      })
      .catch(err => {
        err && console.log('Share error ' + JSON.stringify(err))
      })
  }

  handleChange = url => {
    this.setState({imageUrl: url})
  }

  render() {
    return (
      <Container>
        <Content contentContainerStwyle={{flex: 1}}>
          {this.state.linkFetch == false && (
            <Grid style={{flex: 1}}>
              <Row
                style={{margin: 'auto', padding: 10, justifyContent: 'center'}}
              >
                <Col>
                  <Item regular>
                    <Input
                      value={this.state.imageUrl}
                      placeholder="Paste image URL here"
                      onChangeText={text => {
                        this.handleChange(text)
                      }}
                    />
                  </Item>
                </Col>
              </Row>
              <Row
                style={{
                  margin: 'auto',
                  justifyContent: 'center',
                }}
              >
                <Col style={{margin: 10}}>
                  <Button
                    style={{
                      backgroundColor: '#ffffff',

                      borderRadius: 15,
                    }}
                    onPress={this.readFromClipboard}
                  >
                    <Text style={{color: '#8dc53e'}}>Paste URL</Text>
                  </Button>
                </Col>
                <Col style={{margin: 10}}>
                  <Button
                    style={{
                      borderRadius: 15,

                      backgroundColor: 'rgba(141,197,62,0.5)',
                    }}
                    onPress={this.doFetchImageFromInternet}
                  >
                    <Text>Go</Text>
                  </Button>
                </Col>
              </Row>
            </Grid>
          )}
          {this.state.linkFetch == true && this.state.loading == true && (
            <Spinner color="#19a8e6" />
          )}
          <Grid>
            <Row>
              <Col>
                {!this.state.loading && !this.state.imageLoad && (
                  <Card style={{flex: 1, elevation: 0, borderColor: '#ffffff'}}>
                    <Image
                      style={{height: 300, padding: 10}}
                      source={{
                        uri: `data:image/png;base64,${this.state.imageString}`,
                      }}
                    />

                    <CardItem>
                      <Button
                        style={{
                          backgroundColor: '#8dc53e',
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                          flex: 1,
                        }}
                        onPress={this.onShare}
                      >
                        <Text>Share</Text>
                      </Button>
                    </CardItem>
                  </Card>
                )}
                {this.state.imageLoad && !this.state.loading && (
                  <Card>
                    <CardItem>
                      <Text>Image not found!</Text>
                    </CardItem>
                  </Card>
                )}
              </Col>
            </Row>
          </Grid>
        </Content>
      </Container>
    )
  }
}
ShareImage.navigationOptions = ({navigation}) => ({
  header: (
    <Header style={{backgroundColor: '#8dc53e'}}>
      <StatusBar backgroundColor="#000000" barStyle="light-content" />

      <Body>
        <Title style={{marginLeft: 10}}>Share Image</Title>
      </Body>
      <Right />
    </Header>
  ),
})
