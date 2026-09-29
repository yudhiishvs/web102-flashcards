# Web Development Project 2 - Web Development Essentials

Submitted by: **Yudhiishbala Senthilkumar**

This web app: **A flashcard deck for practicing core HTML, CSS, JavaScript, and React concepts. Click a card to reveal its answer, then draw a different random card.**

Time spent: **5** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **The app displays the title of the card set, a short description, and the total number of cards**
  - [x] Title of card set is displayed
  - [x] A short description of the card set is displayed
  - [x] A list of card pairs is created
  - [x] The total number of cards in the set is displayed
  - [x] Card set is represented as a list of card pairs
- [x] **A single card at a time is displayed**
  - [x] Only one half of the information pair is displayed at a time
- [x] **Clicking on the card flips the card over, showing the corresponding component of the information pair**
  - [x] Clicking on a card flips it over, showing the back with corresponding information
  - [x] Clicking on a flipped card again flips it back, showing the front
- [x] **Clicking on the next button displays a random new card**

The following **optional** features are implemented:

- [ ] Cards contain images in addition to or in place of text
- [x] Cards have different visual styles based on their category

The following **additional** features are implemented:

- [x] The next card is always different from the current card.
- [x] The card can be flipped with a keyboard because it is a button.
- [x] The layout adapts to narrow screens.

## Video Walkthrough

Here's a walkthrough of implemented required features:

<img src='assets/walkthrough.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

GIF created with Google Chrome and FFmpeg.

## Notes

The main interaction challenge was choosing a random card without immediately repeating the current one. The picker draws a random offset from the remaining cards, and changing cards resets the face to the question.

## Run Locally

```bash
npm install
npm run dev
```

## License

    Copyright 2026 Yudhiishbala Senthilkumar

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
