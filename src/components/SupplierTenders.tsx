import { Text, Button, List, useTheme, Divider, Card } from 'react-native-paper'
import { StyleSheet, SafeAreaView, View } from 'react-native'
import { Tabs, TabScreen } from 'react-native-paper-tabs'
import { ScrollView } from 'react-native-gesture-handler'
import Supplier from './Supplier'
import { getAuthenticatedUser } from '../../lib/authStorage'
import { SetStateAction, useEffect, useState } from 'react'
import allTenders from '../data/tenders'

const SupplierTenders = ({
  route,
  navigation,
}: {
  route: any
  navigation: any
}) => {
  const theme = useTheme()
  const [userId, setUserId] = useState(0)
  const [tenders, setTenders] = useState([])

  getAuthenticatedUser().then((id) => {
    if (id) setUserId(id)
  })

  useEffect(() => {
    setTenders(allTenders.find((tender) => tender.supplier.id === userId))
  }, [userId])

  return (
    <List.Accordion title="Anbud">
      <List.Subheader>Inskickade anbud</List.Subheader>
      {tenders.map((tender: Tender) => {
        return <TenderCard tender={tender}></TenderCard>
      })}
      {/* <Card>
        <Card.Title
          title="Morötter"
          subtitle="1 000 kg | Kvarnbergsskolan, Karlstad"
        ></Card.Title>
      </Card>
      <Card>
        <Card.Title
          title="Potatis"
          subtitle="2 000 kg | Kvarnbergsskolan, Karlstad"
        ></Card.Title>
      </Card> */}
      <List.Subheader>Utkast</List.Subheader>
      <Card>
        <Card.Title
          title="Potatis"
          subtitle="1 500 kg | Nyeds skola, Molkom"
        ></Card.Title>
      </Card>
      <List.Subheader>Favoriter</List.Subheader>
      <List.Subheader>Tidigare besökta</List.Subheader>
    </List.Accordion>
  )
}

const TenderCard = ({ tender }: { tender: Tender }) => {
  return (
    <Card>
      <Card.Title
        title={tender.name}
        subtitle={tender.amount + ' ' + tender.supplier.name}
      ></Card.Title>
    </Card>
  )
}

interface Tender {
  name: string
  amount: string
  supplier: { id: number; name: string }
}
