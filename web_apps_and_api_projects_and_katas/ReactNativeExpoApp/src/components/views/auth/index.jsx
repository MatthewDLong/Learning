import React, { useState } from 'react'
import * as firebase from 'firebase'
import * as AuthSession from 'expo-auth-session'
import * as WebBrowser from 'expo-web-browser'
import jwtDecode from 'jwt-decode'
import { Alert, Text, Platform } from 'react-native'
import styled from 'styled-components/native'
import Container from 'components/atoms/container'
import Button from 'components/atoms/button'
import { useTranslation } from 'react-i18next'

let database

const firebaseConfig = {
  apiKey: 'AIzaSyAgY0qUhLqWzAkAlAg0WSuMk5jM7pJaH-M',
  authDomain: 'globomantics-c06e1.firebaseapp.com',
  databaseURL: 'https://globomantics-c06e1-default-rtdb.firebaseio.com',
  storageBucket: 'globomantics-c06e1.appspot.com'
}

if (!firebase.apps.length) {
  database = firebase.initializeApp(firebaseConfig).database()
} else {
  database = firebase.app().database()
}

WebBrowser.maybeCompleteAuthSession()

const Avatar = styled.Image`
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
`

const useProxy = Platform.select({ web: false, default: true })
const redirectUri = AuthSession.makeRedirectUri({ useProxy })

export const Auth = () => {
  const [data, setData] = useState(null)
  const [newCount, setNewCount] = useState(0)
  const { t } = useTranslation()

  const [request, result, promptAsync] = AuthSession.useAuthRequest(
    {
      redirectUri,
      clientId: process.env.AUTH0_CLIENT_ID,
      // id_token will return a JWT token
      responseType: 'id_token',
      // retrieve the user's profile
      scopes: ['openid', 'profile', 'email'],
      extraParams: {
        // ideally, this will be a random value
        nonce: 'nonce'
      }
    },
    { authorizationEndpoint: `https://${process.env.AUTH0_DOMAIN}/authorize` }
  )

  React.useEffect(() => {
    if (result) {
      if (result.error) {
        Alert.alert(
          t('authView:errorTitle'),
          result.params.error_description || t('authView:defaultErrorMessage')
        )
        return
      }
      if (result.type === 'success') {
        const jwtToken = result.params.id_token
        const decoded = jwtDecode(jwtToken)

        if (decoded.aud !== process.env.AUTH0_CLIENT_ID) {
          Alert.alert(
            t('authView:errorTitle'),
            result.params.error_description || t('authView:defaultErrorMessage')
          )
          return
        }
        setData(decoded)

        const { email } = decoded

        if (email) {
          const formattedEmail = email.replace(/[.|$||#|[|\]|/]/g, '-')
          const delta = 1
          const ref = database.ref(`/users/logins/${formattedEmail}`)

          ref.once('value').then(snapshot => {
            const value = snapshot.val()

            if (!value) {
              ref.set({ count: delta })
              setNewCount(delta)
            } else {
              const { count } = value
              const incrementedCount = count + delta
              ref.set({ count: incrementedCount })
              setNewCount(incrementedCount)
            }
          })
        }
      }
    }
  }, [result])

  return (
    <Container>
      {data ? (
        <>
          {data.picture && <Avatar source={{ uri: data.picture }} />}
          <Text>
            {t('authView:welcomeText')},{' '}
            {data.given_name || data.name || data.family_name}:
          </Text>
          <Text>You have logged in {newCount} times</Text>
        </>
      ) : (
        <>
          <Text>Please login:</Text>
          <Button
            disabled={!request}
            title={t('authView:loginButton')}
            onPress={() => promptAsync({ useProxy, redirectUri })}
          />
        </>
      )}
    </Container>
  )
}
