# Github repository
Assignments - 01 
## Brief:
Starting from the concept of a pinboard, implement a web page that:
- is responsive (properly layout for smartphone, tablet, and desktop)
- allows the user to add and remove elements
- allows the user to coustomize elements (i.e. colors, size)
- allows the switch between two views (at least)

## Screenshot
### Grid View
<img src="/images/List-view.png" width="1080">

### List View
<img src="/images/Grid-view.png" width="1080">

### Project Description
My project is a list of some of the best and most renowned covers/versions of the song "House of the Rising Sun". "The House of the Rising Sun" is an American traditional folk song, sometimes called "Rising Sun Blues". It's one of the most covered songs in american folk culutre. The most successful commercial version, recorded in 1964 by the English rock band The Animals, was a number one hit on the UK Singles Chart and in the U.S. and Canada.
I chose this because I find the song to be an icon of rock/folk music, as well as because it made for an easy to document list.

### What I would define as the next steps:
- Improve the visual narrative to be more coherent with the song (colors, shapes, typeface...)
- Improve usability following best practices (no hover on mobile for instance)
- Improve the structure and better use empty space
- Add more interaction, also depth of information, maybe on click you can see the album cover for example...
- Complete the list by adding as many covers as one can find
- Make the scrolling on the left section a lot more obvious, it's not easy to tell it has to be scroller now
- Change the font for a WOFF font

## Functions:

#### Details on hover:
Allows the user to hover on the Artist to view some extra details about the cover version, like year and notes, shown in the right section (red) of the page on hover.

#### Snap-scrolling on left section:
Snap-scrolling on left section, while it should be more obviously shown, allows the user to view the list in a less dense manner and gives more importance to each artist, whereas the list view is more useful for an overview on the entries as a whole.

#### Add entry: 
Allows the user to add an entry to better document and complete the list of covers.

#### Remove: 
Allows the user, by hovering on the newly added entry, to remove it. A "Remove" button is shown on hover.

#### Switch View: 
Allows the user to switch from a 2x1 pinboard-like view to a plain 1x1 list view.