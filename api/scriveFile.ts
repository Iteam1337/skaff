import PDFDocument from 'pdfkit';
import axios from 'axios';
import FormData from 'form-data';
import { pipeline } from 'stream';
import { promisify } from 'util';
import { Offer } from '../src/data/offers';
import { TenderRequest } from '../src/data/tenderRequests';

const OAUTH_CONSUMER_KEY = ''
const OAUTH_TOKEN = ''
const OAUTH_SIGNATURE = ''

export function createPDF(offer: Offer, tenderRequest: TenderRequest) {
  // const doc = new PDFDocument({margin: 100});

  // // Pipe its output somewhere, like to a file or HTTP response
  // // Here we're writing to a file
  // const output = fs.createWriteStream('output.pdf');
  // doc.pipe(output);

  // doc.fontSize(14).text('Tender contract');
  // doc.moveDown();
  // doc.fontSize(11).text(`Tender: ${tenderRequest.title}`);
  // doc.fontSize(11).text(`Posted by: ${tenderRequest.buyer.name}`);
  // doc.moveDown();
  // doc.fontSize(11).text(`Accepted offer: ${offer.price.SEK}kr from ${offer.supplier.name}`);
  // doc.fontSize(11).text(`Acceptance reason: ${offer.acceptanceMotivation}`);

  // doc.end();

  // // Listen for the finish event to do something after the PDF is generated
  // output.on('finish', function() {
  //   console.log('PDF generated successfully.');
  // });

  createPdfBuffer(offer, tenderRequest)
  .then(uploadPdf)
  .catch((error) => console.error('An error occurred:', error));

}

const pipelineAsync = promisify(pipeline);

async function createPdfBuffer(offer: Offer, tenderRequest: TenderRequest): Promise<Buffer> {
  const doc = new PDFDocument({margin: 100});
  const chunks: Buffer[] = [];

  doc.on('data', chunks.push.bind(chunks));
  doc.on('end', () => {
    console.log('PDF generation completed.');
  });

  doc.fontSize(14).text('Tender contract');
  doc.moveDown();
  doc.fontSize(11).text(`Tender: ${tenderRequest.title}`);
  doc.fontSize(11).text(`Posted by: ${tenderRequest.buyer.name}`);
  doc.moveDown();
  doc.fontSize(11).text(`Accepted offer: ${offer.price.SEK}kr from ${offer.supplier.name}`);
  doc.fontSize(11).text(`Acceptance reason: ${offer.acceptanceMotivation}`);


  doc.end();

  await pipelineAsync(doc, async function* (source: any) {
    for await (const chunk of source) {
      yield chunk;
    }
  });

  return Buffer.concat(chunks);
}

async function uploadPdf(buffer: Buffer) {
  try {
    const formData = new FormData();
    formData.append('file', buffer, 'contract.pdf');

    const response = await axios.post('https://api-testbed.scrive.com/api/v2/documents/new', formData, {
      headers: {
        ...formData.getHeaders(),
        'Authorization': `oauth_signature_method="PLAINTEXT", oauth_consumer_key="${OAUTH_CONSUMER_KEY}", oauth_token="${OAUTH_TOKEN}", oauth_signature="${OAUTH_SIGNATURE}"`
      },
    });

    console.log('File sent to scrive successfully', response.data);
  } catch (error) {
    console.error('File send to scrive failed', error);
  }
}
