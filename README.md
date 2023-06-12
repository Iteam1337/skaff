# Vallentuna matmarknad

## Bakgrund

Detta är den blivande prototypen av matmarknaden byggd på dynamiskt inköpssystem DIS.

## Testa

Ladda ner appen Expo Go och scanna därefter följande QR-koder:

![image](https://github.com/Iteam1337/foodMarket/assets/395843/c4603d13-6f12-425c-8f42-2bfca059de26)

Iphone

![image](https://github.com/Iteam1337/foodMarket/assets/395843/0c164b7b-af4d-4539-9b73-f8fd6445ae7a)

Android

## Kom igång

Så här kommer du igång:

    git clone https://github.com/iteam1337/foodMarket
    cd foodMarket

    npm install
    npm run ios

Nu startas automatiskt din iOS Simulator och du kan testa applikationen live där.

## Screenshots (ej färdig layout)

![image](https://user-images.githubusercontent.com/395843/232560646-26c641a6-429d-46cc-8b9d-1ed460c9e119.png)

## Release

För att göra en release (kräver access till Kuberneteskluster). Se gärna till att du har pushat all kod innan du releasar :) (TODO: gör en automatisk release på push)

    skaffold run --default-repo registry.iteam.services

## Publisera ny version av appen

För att göra en ny release av appen kör man detta kommando:

    eas update

Då får man en länk till nya QR-koder att publicera

## LICENS

MIT Copyright (c) 2023 Iteam Solutions AB
