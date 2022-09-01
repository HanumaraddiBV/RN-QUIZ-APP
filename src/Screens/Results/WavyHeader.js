import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';


export default function WavyHeader({ customStyles }) {
    return (
      <View style={customStyles}>
        <View style={{ backgroundColor: '#7051d6', height: 200 }}>
          <Svg
            height="90%"
            width="100%"
            viewBox="0 0 1440 320"
            style={{ position: 'absolute', top: 150 }}
          >
             <Path
          fill="#7051d6"
            d="M0,128L48,117.3C96,107,192,85,288,106.7C384,128,480,192,576,218.7C672,245,768,235,864,208C960,181,1056,139,1152,128C1248,117,1344,139,1392,149.3L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
          </Svg>
        </View>
      </View>
    );
  }