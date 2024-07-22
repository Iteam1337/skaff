import PDFDocument from 'pdfkit';
import axios from 'axios';
import { Offer } from '../src/data/offers';
import { TenderRequest } from '../src/data/tenderRequests';
import { Contract } from '../src/data/contract';

const CLIENT_ID = ''
const CLIENT_SECRET = ''

const apiUrl = 'https://api.signicat.com';

export async function createPDF(offer: Offer, tenderRequest: TenderRequest): Promise<Contract | undefined> {
    try {
        const authToken = await getAuthToken();
        const pdfContent = await createPdfContent(offer, tenderRequest);
        const contract = await uploadPdf(pdfContent, offer, tenderRequest, authToken);
        return contract;
    }
    catch (error) {
        console.error('An error occurred:', error);
    }

}

async function getAuthToken() {
    const body = {
        'grant_type': 'client_credentials',
        'scope': 'signicat-api',
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET
    }
    const response = await axios.post(`${apiUrl}/auth/open/connect/token`, body, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
    });

    console.log(response.data)
    return response.data['access_token'];
}

async function createPdfContent(offer: Offer, tenderRequest: TenderRequest): Promise<string> {
    const doc = new PDFDocument({ margin: 100 });
    const chunks: Buffer[] = [];

    doc.on('data', chunks.push.bind(chunks));

    doc.fontSize(14).text('Tender contract');
    doc.moveDown();
    doc.fontSize(11).text(`Tender: ${tenderRequest.title}`);
    doc.fontSize(11).text(`Posted by: ${tenderRequest.buyer.name}`);
    doc.moveDown();
    doc.fontSize(11).text(`Accepted offer: ${offer.price.SEK}kr from ${offer.supplier.name}`);
    doc.fontSize(11).text(`Acceptance reason: ${offer.acceptanceMotivation}`);

    doc.end();

    const pdfBase64Content = await new Promise<string>(resolve => {
        doc.on('end', function () {
            const pdfBuffer = Buffer.concat(chunks);
            const pdfBase64String = pdfBuffer.toString('base64');
            console.log('PDF generation completed.')
            console.log(`Base64 content: ${pdfBase64String}`)
            resolve(pdfBase64String);
        });
    });

    return pdfBase64Content;
}

async function uploadPdf(pdfContent: string, offer: Offer, tenderRequest: TenderRequest, authToken: string): Promise<Contract | undefined> {
    try {

        const body = {
            "title": tenderRequest.title,
            "externalId": "ae7b9ca7-3839-4e0d-a070-9f14bffbbf55",
            "dataToSign": {
                "base64Content": pdfContent,
                "fileName": `${tenderRequest.title} - contract.pdf`
            }, "contactDetails": {
                "email": "lucia.dabezies@prototyp.se"
            },
            "requiredSignatures": 2,
            "signers": [{
                "externalSignerId": `buy${offer.buyer.id}`,
                "signerInfo": {
                    "firstName": offer.buyer.name,
                    "email": offer.buyer.email,
                },
                "redirectSettings": {
                    "redirectMode": "donot_redirect"
                },
                "signatureType": {
                    "mechanism": "pkisignature"
                }
            },
            {
                "externalSignerId": `sup${offer.supplier.id}`,
                "signerInfo": {
                    "firstName": offer.supplier.name,
                    "email": offer.supplier.email,
                },
                "redirectSettings": {
                    "redirectMode": "donot_redirect"
                },
                "signatureType": {
                    "mechanism": "pkisignature"
                }
            }
            ],
            "advanced": {
                "requiredSignatures": 2
            }
        }

        const response = await axios.post(`${apiUrl}/express/sign/documents`, body, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            }
        });

        console.log('File created in signicat successfully', response.data);

        const signers = response.data['signers'] ?? [];

        return {
            documentId: response.data['documentId'],
            buyerSignUrl: signers.find((s: any) => s['externalSignerId'] == `buy${offer.buyer.id}`)['url'],
            supplierSignUrl: signers.find((s: any) => s['externalSignerId'] == `sup${offer.supplier.id}`)['url'],
        }
    } catch (error: any) {
        console.error('File creation in signicat failed', error);
        console.log(JSON.stringify(error['response']['data']['errors']))
    }
}