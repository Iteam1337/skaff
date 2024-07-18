import { Linking } from 'react-native'
import { User } from '../data/user'

type CreateNewDocument = () => Promise<string>

type UpdateDocument = (
  documentId: string,
  title: string,
  parties: User[]
) => Promise<Document>

type StartDocument = (documentId: string) => Promise<Document>

type SignDocument = (party: SigningParty) => Promise<void>

type PartyField = {
  type: string
  value: string
}

type SigningParty = {
  name: string
  email: string
  api_delivery_url: string
  signatory_role: string
  delivery_method: string
  sign_success_redirect_url: string
  fields: PartyField[]
}

type Document = {
  id: string
  title: string
  parties: SigningParty[]
}

const useDocumentSign = (): [
  CreateNewDocument,
  UpdateDocument,
  StartDocument,
  SignDocument
] => {
  /// Construct the headers for the API calls
  const makeHeaders = () => {
    const headers = new Headers()

    headers.append(
      'Authorization',
      'oauth_signature_method="PLAINTEXT", oauth_consumer_key="659c27a6d0735cdf_7595", oauth_token="ee63ae623a835e56_30905", oauth_signature="9d11d25e68e273fc&9c6bda336365f552"'
    )

    headers.append('Cookie', 'lang="en"; lang-ssn="en"')

    return headers
  }

  /// Creates a new document from a template
  const createNewFromTemplate = async () => {
    const headers = makeHeaders()

    const newDocument = await fetch(
      'https://api-testbed.scrive.com/api/v2/documents/newfromtemplate/8222115557379372352',
      {
        method: 'POST',
        headers: headers,
        redirect: 'follow',
      }
    )

    const data = await newDocument.json()
    const documentId = data.id
    return documentId
  }

  /// Prepares the document for signing
  const startNewDocument = async (documentId: string) => {
    const headers = makeHeaders()

    const newDocument = await fetch(
      `https://api-testbed.scrive.com/api/v2/documents/${documentId}/start`,
      {
        method: 'POST',
        headers: headers,
        redirect: 'follow',
      }
    )

    return newDocument.json()
  }

  /// Updates the document with the relevant information about signing parties
  const updateDocument = async (
    documentId: string,
    title: string,
    parties: User[]
  ): Promise<Document> => {
    const headers = makeHeaders()

    const formdata = new FormData()

    const defaultParty = {
      is_signatory: false,
      signatory_role: 'viewer',
      delivery_method: 'api',
      sign_success_redirect_url: 'http://www.unge.dev',
      fields: [
        {
          type: 'company',
          value: 'Default Party',
          order: 1,
          is_obligatory: true,
        },
      ],
    }

    const partiesData = parties.map((party) => {
      return {
        is_signatory: true,
        signatory_role: 'signing_party',
        delivery_method: 'api',
        sign_success_redirect_url: 'http://www.unge.dev',
        fields: [
          {
            type: 'company',
            value: party.name,
            order: 1,
            is_obligatory: true,
          },
          {
            type: 'email',
            value: party.email,
            order: 2,
            is_obligatory: true,
          },
        ],
      }
    })

    const documentData = {
      title: title,
      parties: [defaultParty, ...partiesData],
    }

    formdata.append('document', JSON.stringify(documentData))

    const newDocument = await fetch(
      `https://api-testbed.scrive.com/api/v2/documents/${documentId}/update`,
      {
        method: 'POST',
        headers: headers,
        body: formdata,
        redirect: 'follow',
      }
    )

    return newDocument.json()
  }

  /// Opens the relevant link for the signing party to sign the document
  const signDocument = async (party: SigningParty) => {
    const baseUrl = 'https://api-testbed.scrive.com'
    const signingUrl = party.api_delivery_url
    const url = new URL(signingUrl, baseUrl)
    await Linking.openURL(url.toString())
  }

  return [createNewFromTemplate, updateDocument, startNewDocument, signDocument]
}

export default useDocumentSign
