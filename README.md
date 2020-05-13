# steam-apps-build-info
Utilizes data on steamdb.info to return a list of a Steam App's build/version numbers and info

(Usage noted in code)

```js
// Usage:
getSteamAppBuildInfo( appId, callback );

// Example:
getSteamAppBuildInfo( 582660, ( builds ) => {
		if (builds.length > 0 )
			console.log( builds[0] );
		else
			console.log( 'Error fetching appid build info' )
	} );
```
