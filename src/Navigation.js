import * as React from "react"
import { BottomNavigation } from "react-native-paper"

import Quotes from "./components/Quotes"
import Offers from "./components/Offers"
import Offer from "./components/Offer"
import Chat from "./components/Chat"

const MyComponent = () => {
  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    {
      key: "offers",
      title: "Erbjudanden",
      focusedIcon: "home",
      unfocusedIcon: "home-outline",
    },
    {
      key: "quotes",
      title: "Mina anbud",
      focusedIcon: "lock",
      unfocusedIcon: "lock-outline",
    },
    {
      key: "chat",
      title: "Meddelanden",
      focusedIcon: "forum",
      unfocusedIcon: "forum-outline",
    },
  ])

  const renderScene = BottomNavigation.SceneMap({
    offers: Offers,
    quotes: Quotes,
    chat: Chat,
    offer: Offer,
  })

  return (
    <BottomNavigation
      barStyle={{ backgroundColor: "#fff" }}
      sceneAnimationType="shifting"
      sceneAnimationEnabled={true}
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  )
}

export default MyComponent
