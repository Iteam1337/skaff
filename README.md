# Vallentuna matmarknad

## Bakgrund

Detta är prototypen av matmarknaden byggd på dynamiskt inköpssystem DIS.

## Testa

Ladda ner appen Expo Go och scanna därefter följande QR-kod:

![image](https://github.com/user-attachments/assets/da7c310d-6c61-4104-a193-c21ce98fcae6)

## Kom igång

Så här kommer du igång:

    git clone https://github.com/iteam1337/skaff
    cd skaff

    npm install
    npm run ios

Nu startas automatiskt din iOS Simulator och du kan testa applikationen live där.

## Screenshots (ej färdig layout)

![image](https://user-images.githubusercontent.com/395843/232560646-26c641a6-429d-46cc-8b9d-1ed460c9e119.png)

## Produktionsmiljö

Appen är beroende av ett API som kör Socket.IO och hanterar demouppgifter. Detta API driftas i Berget.cloud i ett eget Kuberneteskluster. Det betyder att ingen data skickas utanför EU vilket gör det enklare att hantera personuppgifter etc. För att konfigurera klustret är det enklast att ändra i k8s mappen. Alla filer där skickas automatiskt till kubernetesklustret. Vid nya ändringar i main byggs automatiskt en ny version av API och deployas automatiskt i klustret när det är klart. API:et nås på adressen <a href="https://skaff-api.iteam.pub">skaff-api.iteam.pub</a>.

## Publisera ny version av appen

För att göra en ny release av appen kör man detta kommando:

    eas update

Då får man en länk till nya QR-koder att publicera


## Signering av avtal (betaversion)

Vi testar att använda [**Signicat**](https://developer.signicat.com/) för att signera avtal digitalt mellan Producent och Beställare. För att enkelt kunna demonstrera flödet kör vi Norwegian BankID

**För att detta ska fungera korrekt behöver du förbereda följande:**

Döp om `.env.example` till `.env` och fyll i `SIGNICAT_CLIENT_ID` och `SIGNICAT_CLIENT_SECRET`

Följ sedan stegen under [**Order test user**](https://developer.signicat.com/identity-methods/nbid/test/#order-test-user) för att generera testanvändare hos BankID Norge.

När du signerar avtalet, välj "Norwegian BankID" och följ stegen.

## LICENS

MIT Copyright (c) 2024 Iteam Solutions AB
