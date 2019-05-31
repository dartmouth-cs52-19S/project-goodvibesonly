# Vibes

![Team Photo](/assets/52.jpg)

A mobile app for creating location-based collaborative playlists.

## Features

**Current Capabilities:**
* The app allows you to be authenticated with Spotify and play music through Spotify's player
* Users can create a playlist and select a starting genre/vibe, which will populate the initial playlist
* This playlist will be location-based, in that users in the vicinity of a playlist will automatically be able to add to it, and once they leave, they no longer have access

<p align="center">
  <img src="/assets/home.png" title="Home" width="300px" margin="5px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <img src="/assets/login.png" title="Login" width="300px">
</p>


**The playlist-creation flow:**

When users create a playlist, they can search through Spotify's pre-set playlists by genre to choose an initial "vibe." The user's current location is automatically stored with their new playlist, and other users in the vicinity can immediately start contributing.

![](https://media.giphy.com/media/88iHmg1CBKvqw00Zke/giphy.gif)

**The song-adding flow:**

Similarly to the playlist-creation process, users can search through Spotify's songs by title when adding a song.

![](https://media.giphy.com/media/XtdOgcnmJXk6oHL7qk/giphy.gif)

## Architecture

Framework:
* React Native with Expo-CLI

Libraries:
* Redux
* Babel
* Axios
* Spotify Web API

Linter/Testing:
* Eslint with Airbnb Style Guide
* Travis CI

## Setup

To publish to expo (for best app performance and experience):
1. Clone the repository and `cd project-goodvibesonly`
2. `yarn`
3. Download Expo Client from the app store on iPhone or Google Play store on Android and create a new expo account or log in
4. `expo publish` in terminal (install expo if not yet installed with `yarn add expo-cli -g`)
5. In Expo Client on your smartphone, 'Good Vibes' should appear in 'Projects'. 

To run locally using expo tunnel:
1. Clone the repository and `cd project-goodvibesonly`
2. `yarn`
3. `expo start --tunnel` (install expo if not yet installed with `yarn add expo-cli -g`)
4. Press `i` to open up iPhone simulator on macOS
5. Download Expo Client from the app store on iPhone or Android and scan the QR code to run on smartphone

## Deployment

*Coming soon to App Store*

## Authors
* Angi Li '20
* Danah Han '20
* Grace Dorgan '21
* Shoshana Geller '20
* Emma Langfitt '20

## Acknowledgments

We leveraged documentation from Spotify's Web API to implement many features of our app. We would also like to give a huge thank you to our professor **Tim Tregubov** and our **TA's** in CS52 (Full-Stack Web Development) at Dartmouth College for guidance and support, as well as our fellow classmates. We would also like to thank **#MEN #IN #STEM** (especially Travis) for giving us the emotional capacity to make it through this project. Couldn't have done it without you. *#hackerwomen #womenwhocode #shrillwomen*
