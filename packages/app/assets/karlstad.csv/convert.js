const fs = require('fs')
const csv = require('csv-parser')

const inputFile = 'karlstad.csv'
const outputFile = 'output.json'

const jsonArray = []

fs.createReadStream(inputFile)
  .pipe(csv({ separator: ';' })) // Använd separatorn ';' för CSV
  .on('data', (data) => {
    const jsonItem = {
      id: jsonArray.length + 4, // Öka ID för varje rad
      procurement: data['Upphandling'],
      positionNo: data['Positionsnr'],
      commodity: {
        area: data['Varuområde'],
        mainGroup: data['Huvudgrupp'],
        group: data['Varugrupp'],
      },
      supplier: {
        name: data['Leverantör'],
        artNo: data['Lev. Artnr'],
      },
      product: {
        name: data['Artikelnamn'],
        manufacturer: data['Producent'],
        brand: data['Märke'],
        content: {
          quantity: parseInt(data['Innehåll'].split(' ')[0]),
          unit: data['Fsgenhet'],
        },
      },
      price: {
        SEK: parseFloat(data['Kronor'].replace(',', '.')),
        kilos: parseFloat(data['Kilo'].replace(',', '.')),
        SEK_per_Kg: parseFloat(data['kr/kg'].replace(',', '.')),
        finalAmountSEK_per_Kg: parseFloat(
          data['Färdigmängd kr/kg'].replace(',', '.')
        ),
        percentageOutsideContract: parseFloat(
          data['% Utanför avtal'].replace(',', '.')
        ),
      },
      certifications: {
        organic: data['Ekologisk'] === 'Ja',
        MSC: data['MSC'] === 'Ja',
        kravMarked: data['Kravmärkt'] === 'Ja',
        ethical: data['Etisk'] === 'Ja',
        fairtrade: data['Fairtrade'] === 'Ja',
        locallyProduced: data['Närproducerat'] === 'Ja',
      },
      origin: {
        productManufacturingCountry: data['Produktens Tillverkningsland'],
        rawMaterialOriginCountry: data['Råvarans ursprungsland'],
      },
    }

    jsonArray.push(jsonItem)
  })
  .on('end', () => {
    const jsonData = JSON.stringify(jsonArray, null, 2)

    fs.writeFile(outputFile, jsonData, (error) => {
      if (error) {
        console.error('Error writing JSON file:', error)
      } else {
        console.log('Conversion completed. JSON file saved as', outputFile)
      }
    })
  })
