import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Dimensions } from 'react-native'
import Container from 'components/atoms/container'
import { Accelerometer } from 'expo-sensors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1'
  },
  textContainer: {
    position: 'absolute',
    top: 40
  }
})

export const Movement = () => {
  const { width, height } = Dimensions.get('window')

  const boxWidth = 100

  Accelerometer.setUpdateInterval(20)

  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0
  })
  const [subscription, setSubscription] = useState(null)

  const _subscribe = () => {
    setSubscription(
      Accelerometer.addListener(accelerometerData => {
        setData(accelerometerData)
      })
    )
  }

  const _unsubscribe = () => {
    subscription && subscription.remove()
    setSubscription(null)
  }

  useEffect(() => {
    _subscribe()
    return () => _unsubscribe()
  }, [])

  const { x, y } = data

  return (
    <Container>
      <View
        style={{
          position: 'absolute',
          top: (-height * (y - 1.0)) / 2.0 - boxWidth / 2.0,
          left: (width * (x + 1.0)) / 2.0 - boxWidth / 2.0,
          width: boxWidth,
          height: boxWidth,
          backgroundColor: '#056ECF'
        }}
      />
      <View style={styles.textContainer}>
        <Text>
          x = {x.toFixed(2)}
          {', '}y = {y.toFixed(2)}
        </Text>
      </View>
    </Container>
  )
}
