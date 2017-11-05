import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { getMetricMetaInfo } from '../utils/helpers'
import UdaciSlider from './UdaciSlider'
import UdaciSteppers from './UdaciSteppers'
import DateHeader from './DateHeader'

class AddEntry extends Component {
    state = {
        run: 0,
        bike: 0,
        sleep: 0,
        swim: 0,
        eat: 0
    }

    increment = (metric) => {
        const { max, step } = getMetricMetaInfo(metric)
        this.setState((state) => {
            const count = state[metric] + step

            return {
                ...state,
                [metric]: count > max ? max : count
            }
        })

    }

    decrement = (metric) => {
        const { step } = getMetricMetaInfo(metric)
        this.setState((state) => {
            const count = state[metric] - step

            return {
                ...state,
                [metric]: count <0?0 : count
            }
        })

    }

    slide = (metric,value) => {
       this.setState((state)=>({
           ...state,
           [metric]:value
       }))
    }

    render() {
        const metaInfo = getMetricMetaInfo()
        return (
            <View>
                <DateHeader date={(new Date()).toLocaleDateString()} />
               {Object.keys(metaInfo).map((key)=>{
                   const {getIcon,type,...rest} = metaInfo[key]
                   const value = this.state[key]

                   return (
                       <View key={key}>
                       {getIcon()}
                       {type==='slider'?<UdaciSlider
                       value={value}
                       onChange={(value)=>(this.slide(key,value))}
                       {...rest} />:
                       <UdaciSteppers
                         value={value}
                       onIncrement={(value)=>(this.increment(key))}
                       onDecrement={(value)=>(this.decrement(key))}
                       {...rest}
                       />
                       }
                       </View>
                   )
               })}
            </View>
        )
    }

}

export default AddEntry;