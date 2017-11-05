import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { getMetricMetaInfo, timeToString } from '../utils/helpers'
import UdaciSlider from './UdaciSlider'
import UdaciSteppers from './UdaciSteppers'
import DateHeader from './DateHeader'
import {Ionicons} from '@expo/vector-icons'
import TextButton from './TextButton'

function SubmitBtn({ onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text>SUBMIT</Text>
        </TouchableOpacity>
    )

}

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
                [metric]: count < 0 ? 0 : count
            }
        })

    }

    slide = (metric, value) => {
        this.setState((state) => ({
            ...state,
            [metric]: value
        }))
    }

    submit = () => {
        const key = timeToString()
        const entry = this.state

        this.setState(() => ({
            run: 0,
            bike: 0,
            sleep: 0,
            swim: 0,
            eat: 0
        }))

        //Update redux
        //Navigate to home 

        //Save to db
        //Clear local notifiactions
    }

    reset = ()=> {
        const key=timeToString();
        //Update redux
        //route to home
        //update db
    }

    render() {
        const metaInfo = getMetricMetaInfo()
        if (this.props.alreadyLogged) {
            return (
                <View>
                    <Ionicons
                    name='ios-happy-outline'
                    size={100}
                    />
                    <Text>You have already logged your information for today</Text>
                    <TextButton onPress={this.reset}>
                    {Reset}
                    </TextButton>
                </View>
            )
        }
        return (
            <View>
                <DateHeader date={(new Date()).toLocaleDateString()} />
                {Object.keys(metaInfo).map((key) => {
                    const { getIcon, type, ...rest } = metaInfo[key]
                    const value = this.state[key]

                    return (
                        <View key={key}>
                            {getIcon()}
                            {type === 'slider' ? <UdaciSlider
                                value={value}
                                onChange={(value) => (this.slide(key, value))}
                                {...rest} /> :
                                <UdaciSteppers
                                    value={value}
                                    onIncrement={(value) => (this.increment(key))}
                                    onDecrement={(value) => (this.decrement(key))}
                                    {...rest}
                                />
                            }
                        </View>
                    )
                })}
                <SubmitBtn onPress={this.submit} />
            </View>
        )
    }

}

export default AddEntry;