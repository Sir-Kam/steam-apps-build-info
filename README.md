# steam-apps-build-info
Utilizes data on steamdb.info to return a list of a Steam App's build/version numbers and info

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
