# steam-apps-build-info
Utilizes data on steamdb.info to return a list of a Steam App's build/version numbers and info.

Using an http get request to the site to get the html that'll be put into a DOM parser, iterated though the elements of the html, map the table data to a structured object for each row, and return all objects (representing all of the app's build/version/patche infos) in an array.


## About
Run code either though NodeJs environment, or in a non-NodeJs environment where ever there is support for JS to be evaled though a WebBrowser or WebClient (like the many available c# libs for WebBrowsers, for example). 

Panning on future conversion to have a C# adaptation of the code. 

## NodeJs Usage Requirements:
```
"xmlhttprequest" node package
"dom-parser" node package
```


## Code and stuff:
```js
// Usage:
getSteamAppBuildInfo ( appId, callback );

// #Examples:

// Prints array of all BuildInfo class objects
getSteamAppBuildInfo ( 582660,  console.log );

// returns:
[ BuildInfo {
    appId: '582660',
    buildId: '4960487',
    patchTitle: 'Patch Notes - April 29th 2020',
    dateString: '29 April 2020',
    unixEpochDate: 1588132800000,
    hasOfficialPatchNotes: true,
    hasCommunityPatchNotes: true },
  BuildInfo {
    appId: '582660',
    buildId: '4960315',
    patchTitle: true,
    dateString: '29 April 2020',
    unixEpochDate: 1588132800000,
    hasOfficialPatchNotes: true,
    hasCommunityPatchNotes: true },
  ... { ... }
]


// Prints the first (most current buildId/version) BuildInfo object
getSteamAppBuildInfo ( 582660, ( builds ) => {
    if ( builds.length > 0 )
        console.log ( builds[0] );
    else
        console.log ( 'Error fetching appid build info' )
} );

// returns:
BuildInfo {
  appId: '582660',
  buildId: '4960487',
  patchTitle: 'Patch Notes - April 29th 2020',
  dateString: '29 April 2020',
  unixEpochDate: 1588132800000,
  hasOfficialPatchNotes: true,
  hasCommunityPatchNotes: true }
```
