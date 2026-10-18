import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const  App= () => {
  return (
    <View style={styles.Container}>
      <Text>Welcome to FYT Ptoject</Text>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  Container:{
    justifyContent:"center",
    flex: 1,
    alignItems:"center"
  }
})