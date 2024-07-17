import { Linking } from 'react-native'

const useDocumentSign = (): [any, any, any, any] => {
  const createNewFromTemplate = async () => {
    const myHeaders = new Headers()
    myHeaders.append(
      'Authorization',
      'oauth_signature_method="PLAINTEXT", oauth_consumer_key="659c27a6d0735cdf_7595", oauth_token="ee63ae623a835e56_30905", oauth_signature="9d11d25e68e273fc&9c6bda336365f552"'
    )
    myHeaders.append('Cookie', 'lang="en"; lang-ssn="en"')

    const newDocument = await fetch(
      'https://api-testbed.scrive.com/api/v2/documents/newfromtemplate/8222115557379372352',
      {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow',
      }
    )

    const data = await newDocument.json()
    const documentId = data.id
    return documentId
  }

  const startNewDocument = async (documentId: string) => {
    const myHeaders = new Headers()
    myHeaders.append(
      'Authorization',
      'oauth_signature_method="PLAINTEXT", oauth_consumer_key="659c27a6d0735cdf_7595", oauth_token="ee63ae623a835e56_30905", oauth_signature="9d11d25e68e273fc&9c6bda336365f552"'
    )
    myHeaders.append('Cookie', 'lang="en"; lang-ssn="en"')

    const newDocument = await fetch(
      `https://api-testbed.scrive.com/api/v2/documents/${documentId}/start`,
      {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow',
      }
    )

    const data = await newDocument.json()
    const signingUrl = data.parties[0].api_delivery_url
    return signingUrl
  }

  const updateDocument = async (documentId: string) => {
    const headers = new Headers()

    headers.append(
      'Authorization',
      'oauth_signature_method="PLAINTEXT", oauth_consumer_key="659c27a6d0735cdf_7595", oauth_token="ee63ae623a835e56_30905", oauth_signature="9d11d25e68e273fc&9c6bda336365f552"'
    )

    headers.append('Cookie', 'lang="en"; lang-ssn="en"')

    const formdata = new FormData()

    formdata.append(
      'document',
      '{"title":"somekindofthing", "parties": [{"name": "Joakim Unge", "signatory_role": "signing_party", "email": "joakim.unge@prototyp.se", "delivery_method": "api", "sign_success_redirect_url": "http://www.unge.dev" }]}'
    )

    const newDocument = await fetch(
      `https://api-testbed.scrive.com/api/v2/documents/${documentId}/update`,
      {
        method: 'POST',
        headers: headers,
        body: formdata,
        redirect: 'follow',
      }
    )

    console.log(await newDocument.json())
  }

  const signDocument = async (signingUrl: string) => {
    const baseUrl = 'https://api-testbed.scrive.com'
    const url = new URL(signingUrl, baseUrl)
    const result = await Linking.openURL(url.toString())
  }

  return [createNewFromTemplate, updateDocument, startNewDocument, signDocument]
}

export default useDocumentSign
