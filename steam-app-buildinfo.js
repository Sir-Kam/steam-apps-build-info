/* [Cam A.] @Sir-Kam (https://github.com/Sir-Kam) */
/* getSteamAppBuildInfo */
/* Function Def, get information on a Steam App's builds/versions */
/*  generalized to give support for usage in both in NodeJs and not (CORS of course though) */
const getSteamAppBuildInfo = function (appid, cb) {
    /* determine what environment the code is being ran */
    const isnode = (typeof process !== 'undefined') && (typeof process.versions.node !== 'undefined');
	/* node_packages, if running though nodejs */
    const node_packages = {
        "XMLHttpRequest": undefined,
        "dom_parser": undefined,
        "DOMParser": undefined
    };
    /* if running code through nodejs */
    if (isnode) {
        node_packages['XMLHttpRequest'] = require('xmlhttprequest').XMLHttpRequest;
        node_packages['dom_parser'] = require('dom-parser');
        node_packages['DOMParser'] = new node_packages['dom_parser']();
        /* if issue assigning any of the modules, exit and return null */
        if (Object.values(node_packages).includes(undefined)) {
            cb(null);
            return null;
        }
    }
    /* class object representation of array of data that will be returned */
    class BuildInfo {
        constructor(appId, buildId, patchTitle, dateString, unixEpochDate, hasOfficialPatchNotes, hasCommunityPatchNotes) {
            this.appId = appId;
            this.buildId = buildId;
            this.patchTitle = patchTitle;
            this.dateString = dateString;
            this.unixEpochDate = unixEpochDate;
            this.hasOfficialPatchNotes = hasOfficialPatchNotes;
            this.hasCommunityPatchNotes = hasCommunityPatchNotes;
        }
    }
    /* function def, get information on a Steam App's builds/versions */
    const gSABI = function (appid, cb) {
        /* async http get request func */
        const httpGetAsync = (theUrl, callback) => {
            /* create new XMLHttp request */
            let xmlHttp = (isnode ? new node_packages['XMLHttpRequest'] : new XMLHttpRequest());
            /* handle on state change for request */
            xmlHttp.onreadystatechange = function () {
                /* if status is ok */
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                    /* invoke callback with response html */
                    callback(xmlHttp.responseText);
            }
            /* open connection */
            xmlHttp.open("GET", theUrl, true); /* true for asynchronous */
            /* send request */
            xmlHttp.send(null);
        };
        /* send request for steamdb site for specified app */
        /*  utilizes the information that steamdb is able to get from steam api */
        httpGetAsync(`https://steamdb.info/patchnotes/?appid=${appid.toString()}`, (res) => {
            /* response html text */
            const htmlstr = res;
            /* create new dom document with response html */
            const doc = !isnode ? new DOMParser().parseFromString(htmlstr, 'text/html') : node_packages['DOMParser'].parseFromString(htmlstr);
            /* return var for callback */
            const buildsList =
                /* get elements of tag 'tr' as array */
                Array.from(doc.getElementsByTagName('tr')).map((v, i, a) =>
                    /* map array of elements (rows) child elements */
                    Array.from(isnode ? v.childNodes : v.children).filter((c, i) =>
                        /* this filter is only needed when running in nodejs- 'childNodes' returns the empty text elements wheras 'children' does not */
                        !isnode ? true : ![0, 2, 4, 6, 8].includes(i)
                    ).map(c => {
                        //console.log(c);
                        let innerText = (isnode ? c.textContent : c.innerText).trim();
                        /* if element doesn't contain text return if it has children, otherwise inner text */
                        return innerText == "" ? (Array.from(isnode ? (c.childNodes ? c.childNodes : []) : c.children).length > 0) : innerText;
                    })
                    /* remove first item in array, which is the table header */
                ).splice(1).map(av => {
                    /* class object */
                    return new BuildInfo(
                        /* AppId as string */
                        appid.toString(),
                        /* BuildId version number as string */
                        av[4],
                        /* Patch title (if present), otherwise empty string */
                        av[1] ? av[1] : '',
                        /* Date of patch as string, otherwise empty string */
                        av[0] ? av[0] : '',
                        /* Date of patch as unix epoch, otherwise -1 if not provided */
                        av[0] ? Date.parse(av[0]) : -1,
                        /* Whether there was official released patch notes for this build/version/update/patch */
                        av[3],
                        /* Whether there was community released patch notes for this build/version/update/patch */
                        av[2]
                    );
                });
            /* invoke callback function with array of resulting objects containing data on all listed patches */
            cb(buildsList);
        });
    };
    gSABI(appid, cb);
};

/* Usage: getSteamAppBuildID(appId, callbackFunc); */
getSteamAppBuildInfo(582660, (builds) => {
    /*
    return value of null could mean NodeJs package issues or some other unhandled error,
    whereas an empty array could mean an issue loading the page or parsing/filtering the html
    */
    if (builds !== null && builds.length > 0)
        console.log(builds[0]);
    else
        console.log(`Error@: Attempting to fetch appid build info =>\n\t\tfunction returned ${builds == null ? 'null' : 'no items'} :(`);
});
