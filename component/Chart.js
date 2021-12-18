import React from 'react'
import {Text, View, Dimensions  } from 'react-native'
import {
  LineChart
} from "react-native-chart-kit";

export default function Chart({chartData}) {
  return (
    <View style={{alignItems:"center"}}>
    <View style={{width:"100%",flexDirection:'row', justifyContent:"space-evenly"}}>
      <View style={{flexDirection:"row", alignItems:'center'}}>
        <View style={{width:20,height:20, backgroundColor:`rgba(134, 65, 244, 0.8)`, marginRight:10, borderRadius:10}}></View>
        <Text style={{color:'white'}}>Min</Text>
      </View>
      <View style={{flexDirection:"row", alignItems:'center'}}>
      <View style={{width:20,height:20, backgroundColor:`rgba(255, 100, 71, 0.8)`, marginRight:10, borderRadius:10}}></View>
      <Text style={{color:'white'}}>Max</Text>
      </View>
      <View style={{flexDirection:"row", alignItems:'center'}}>
      <View style={{width:20,height:20, backgroundColor:`rgba(153, 255, 85, 0.8)`, marginRight:10, borderRadius:10}}></View>
      <Text style={{color:'white'}}>Avg</Text>
      </View>
    </View>
    <LineChart
      data={{
        labels: chartData.time, 
        datasets: [
          {
            data: chartData.min,
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
          },
          {
            data: chartData.max,
            color: (opacity = 1) => `rgba(255, 100, 71, ${opacity})`, // optional
          },
          {
            data: chartData.avg,
            color: (opacity = 1) => `rgba(153, 255, 85, ${opacity})`, // optional
          }
        ]
      }}
      width={Dimensions.get("window").width *0.9} // from react-native
      height={180}

      yAxisInterval={1} // optional, defaults to 1
      chartConfig={{

        backgroundColor: "#115757",
        backgroundGradientFrom: "#115757",
        backgroundGradientTo: "#07a6a6",
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16
        },
        propsForDots: {
          r: "6",
          strokeWidth: "2",
          stroke: "#ffa726"
        }
      }}
      bezier
      style={{
        marginVertical: 8,
        borderRadius: 16
      }}
    />
  </View>
  )
}


