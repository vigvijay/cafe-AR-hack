'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';
import SecondScene from './SecondScene';
import ProductShowcase from './ProductShowcase';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroBox,
  ViroMaterials,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroARPlaneSelector,
  ViroNode,
  ViroAnimations,
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text : "Initializing AR..."
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />
        <ViroBox position={[0, -.5, -1]} scale={[.3, .3, .1]} materials={["grid"]} animation={{name: "rotate", run: true, loop: true}} onClick={this._pushNextScene.bind(this)}/>
        <ViroAmbientLight color={"#aaaaaa"} />
        <ViroSpotLight innerAngle={5} outerAngle={90} direction={[0,-1,-.2]}
          position={[0, 3, 1]} color="#ffffff" castsShadow={true} />
        <ViroNode position={[0,-1,0]} dragType="FixedToWorld" onDrag={()=>{}} >
          <Viro3DObject
            source={require('./res/emoji_smile/emoji_smile.vrx')}
            resources={[require('./res/emoji_smile/emoji_smile_diffuse.png'),
                require('./res/emoji_smile/emoji_smile_normal.png'),
                require('./res/emoji_smile/emoji_smile_specular.png')]}
            position={[-.5, .5, -1]}
            scale={[.4, .4, .4]}
            type="VRX" />
        </ViroNode>
        <ViroNode position={[2,-1,0]} dragType="FixedToWorld" onDrag={()=>{}} >
            <Viro3DObject source={require('./res/minion/minion.obj')}
                      resources={[require('./res/minion/minion.mtl')]}
                      position={[-0.02, -0.4, -2]}
                      scale={[0.1, 0.05, 0.05]}
                      type="OBJ"
                      onLoadStart={this._onLoadStart}
                      onLoadEnd={this._onLoadEnd}
                      onError={this._onError} />
        </ViroNode>
      </ViroARScene>
    );
  }

  
  _pushNextScene(){
    console.log(this);
    console.log(this.props);
    //console.log(props);
    console.log(SecondScene);
    this.props.sceneNavigator.push({scene:ProductShowcase});
 }

  _onLoadStart() {
    console.log("OBJ loading has started"); 
  }
  _onLoadEnd() {
      console.log("OBJ loading has finished");
  }
  _onError(event) {
    console.log("OBJ loading failed with error: " + event.nativeEvent.error);
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text : "Hello"
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

ViroMaterials.createMaterials({
  grid: {
    diffuseTexture: require('./res/grid_bg.jpg'),
  },
});

ViroAnimations.registerAnimations({
  rotate: {
    properties: {
      rotateY: "+=90"
    },
    duration: 250, //.25 seconds
  },
});

module.exports = HelloWorldSceneAR;