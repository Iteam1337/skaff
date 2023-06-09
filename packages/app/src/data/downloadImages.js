const fetch = require('node-fetch')
const fs = require('fs')
const assert = require('assert')
const { default: categories } = require('./categories')

const apiKey = process.env.OPENAI_KEY
assert(apiKey, 'OPENAI_KEY is required, find it at OpenAI')

const apiUrl = 'https://api.openai.com/v1/images/dalle-2/generate'

// JSON-data med produkter och dess attribut
const jsonData = categories

// Funktion för att anropa OpenAI DALL-E-2 API och spara ner bilden
async function generateAndSaveImage(product) {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        prompt: `Generate an image of ${product['Product Name']} - ${product['Brand']}. Use it as an illustration in an app.`,
        max_images: 1,
      }),
    })

    const data = await response.json()

    // Hämta bild-URL från API-svaret
    const imageUrl = data.images[0].url

    // Ladda ner bilden lokalt
    const imageResponse = await fetch(imageUrl)
    const imageBuffer = await imageResponse.buffer()
    const imageFileName = `${product['Product Name']}_${product['Brand']}.jpg`

    fs.writeFileSync(imageFileName, imageBuffer)
    console.log(`Image saved: ${imageFileName}`)
  } catch (error) {
    console.error('Error:', error)
  }
}

// Loopa genom varje produkt och generera och spara ner bilden
jsonData.forEach((product) => {
  generateAndSaveImage(product)
})
