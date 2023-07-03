const axios = require('axios');
const checkFilesInZipForRegex = require('./checkToken.js');

const url = 'https://replit.com/graphql'; //dont touch
const prompt = require("prompt-sync")({ sigint: true });
let urls =  []
const green = "\x1b[32m"
const red = "\x1b[31m"
const yellow = "\x1b[33m"
const blue = "\x1b[34m"
const reset = "\x1b[0m"
let downlading = false
let cookie = ''


function replitMain() {
  //ask the user for the url
  //ask the user for the cookie

  let urlToThread = prompt(yellow + "(/) Enter the url of the replit: " + reset)
  cookie = prompt(yellow + "(/) Enter the cookie: " + reset)
  if(!urlToThread || !cookie) {
    console.log(red + "[-] Error: Invalid input" + reset)
    process.exit(1)
  }
  getReplitId(urlToThread).then(id => {
    if(!id) return console.log(red + '[-] Error: Invalid Replit URL' + reset)
    getForks(id)
  })
}


function getRandomDelay() {
  return Math.floor(Math.random() * 4000) + 1000;
}
function getReplitId(urlJson) {
  return new Promise((resolve, reject) => {
const json = JSON.stringify([
  {
    operationName: 'ReplView',
    variables: {
      url: urlJson
    },
    query: "query ReplView($url: String!) {\n  repl(url: $url) {\n    ... on Repl {\n      id\n      imageUrl\n      ...ReplViewRepl\n      __typename\n    }\n    __typename\n  }\n  currentUser {\n    id\n    ...ReplViewCurrentUser\n    __typename\n  }\n}\n\nfragment ReplViewRepl on Repl {\n  id\n  title\n  timeCreated\n  imageUrl\n  publicReleasesForkCount\n  publicForkCount\n  owner {\n    ... on Team {\n      id\n      username\n      url\n      image\n      __typename\n    }\n    ... on User {\n      id\n      username\n      url\n      image\n      __typename\n    }\n    __typename\n  }\n  relatedRepls(limitPerGroup: 3) {\n    name\n    repls {\n      id\n      publishedAs\n      ...ReplLinkRepl\n      ...TemplateReplCardRepl\n      ...ReplPostReplCardRepl\n      __typename\n    }\n    __typename\n  }\n  lang {\n    id\n    displayName\n    __typename\n  }\n  currentUserPermissions {\n    containerWrite\n    publish\n    changeIconUrl\n    __typename\n  }\n  publishedAs\n  deployment {\n    id\n    activeRelease {\n      id\n      timeCreated\n      __typename\n    }\n    __typename\n  }\n  ...ReplViewReplTitleRepl\n  ...ReplViewReplViewerRepl\n  ...ReplLinkRepl\n  ...ReplViewFooterRepl\n  __typename\n}\n\nfragment ReplLinkRepl on Repl {\n  id\n  url\n  nextPagePathname\n  __typename\n}\n\nfragment TemplateReplCardRepl on Repl {\n  id\n  iconUrl\n  templateCategory\n  title\n  description(plainText: true)\n  publicReleasesForkCount\n  templateLabel\n  likeCount\n  url\n  owner {\n    ... on User {\n      id\n      ...TemplateReplCardFooterUser\n      __typename\n    }\n    ... on Team {\n      id\n      ...TemplateReplCardFooterTeam\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment TemplateReplCardFooterUser on User {\n  id\n  username\n  image\n  url\n  __typename\n}\n\nfragment TemplateReplCardFooterTeam on Team {\n  id\n  username\n  image\n  url\n  __typename\n}\n\nfragment ReplPostReplCardRepl on Repl {\n  id\n  iconUrl\n  description(plainText: true)\n  ...ReplPostReplInfoRepl\n  ...ReplStatsRepl\n  ...ReplLinkRepl\n  tags {\n    id\n    ...PostsFeedNavTag\n    __typename\n  }\n  owner {\n    ... on Team {\n      id\n      username\n      url\n      image\n      __typename\n    }\n    ... on User {\n      id\n      username\n      url\n      image\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment ReplPostReplInfoRepl on Repl {\n  id\n  title\n  description(plainText: true)\n  imageUrl\n  iconUrl\n  templateInfo {\n    label\n    iconUrl\n    __typename\n  }\n  __typename\n}\n\nfragment ReplStatsRepl on Repl {\n  id\n  likeCount\n  runCount\n  commentCount\n  __typename\n}\n\nfragment PostsFeedNavTag on Tag {\n  id\n  isOfficial\n  __typename\n}\n\nfragment ReplViewReplTitleRepl on Repl {\n  id\n  title\n  iconUrl\n  templateInfo {\n    iconUrl\n    __typename\n  }\n  owner {\n    ... on User {\n      id\n      username\n      __typename\n    }\n    ... on Team {\n      id\n      username\n      __typename\n    }\n    __typename\n  }\n  ...ReplViewReplActionsPermissions\n  __typename\n}\n\nfragment ReplViewReplActionsPermissions on Repl {\n  id\n  lastPublishedAt\n  publishedAs\n  templateReview {\n    id\n    promoted\n    __typename\n  }\n  currentUserPermissions {\n    publish\n    __typename\n  }\n  ...UnpublishReplRepl\n  __typename\n}\n\nfragment UnpublishReplRepl on Repl {\n  id\n  commentCount\n  likeCount\n  runCount\n  publishedAs\n  __typename\n}\n\nfragment ReplViewReplViewerRepl on Repl {\n  id\n  publishedAs\n  runCount\n  publicForkCount\n  publicReleasesForkCount\n  prodUrl: hostedUrl(dotty: true)\n  isProject\n  nextPagePathname\n  lang {\n    id\n    header\n    displayName\n    __typename\n  }\n  ...ReplViewerOutputOverlayRepl\n  ...UseReplViewerRepl\n  ...LikeButtonRepl\n  __typename\n}\n\nfragment ReplViewerOutputOverlayRepl on Repl {\n  id\n  title\n  imageUrl\n  lastPublishedAt\n  currentUserPermissions {\n    changeImageUrl\n    __typename\n  }\n  __typename\n}\n\nfragment UseReplViewerRepl on Repl {\n  id\n  previewUrl: hostedUrl(dotty: false, dev: false)\n  url\n  wasPosted\n  wasPublished\n  publishedAs\n  isProject\n  lang {\n    id\n    canUseShellRunner\n    hasReplboxWebview\n    __typename\n  }\n  config {\n    isServer\n    isVnc\n    __typename\n  }\n  deployment {\n    id\n    activeRelease {\n      id\n      previewUrl: hostedUrl\n      __typename\n    }\n    __typename\n  }\n  replViewSettings {\n    id\n    defaultView\n    replFile\n    __typename\n  }\n  ...CrosisContextRepl\n  __typename\n}\n\nfragment CrosisContextRepl on Repl {\n  id\n  language\n  slug\n  user {\n    id\n    username\n    __typename\n  }\n  currentUserPermissions {\n    containerWrite\n    __typename\n  }\n  flagOwnerDotReplitPackager: gateOnOwner(feature: \"flag-dotreplit-packager\")\n  __typename\n}\n\nfragment LikeButtonRepl on Repl {\n  id\n  currentUserDidLike\n  likeCount\n  url\n  wasPosted\n  wasPublished\n  __typename\n}\n\nfragment ReplViewFooterRepl on Repl {\n  id\n  description\n  lastPublishedAt\n  publishedAs\n  deployment {\n    id\n    activeRelease {\n      id\n      timeCreated\n      __typename\n    }\n    __typename\n  }\n  owner {\n    ... on Team {\n      id\n      username\n      url\n      image\n      followerCount\n      isFollowedByCurrentUser\n      __typename\n    }\n    ... on User {\n      id\n      username\n      url\n      image\n      followerCount\n      isFollowedByCurrentUser\n      __typename\n    }\n    __typename\n  }\n  source {\n    release {\n      id\n      __typename\n    }\n    deployment {\n      id\n      repl {\n        id\n        ...ReplViewSourceRepl\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  tags {\n    id\n    __typename\n  }\n  origin {\n    id\n    ...ReplViewSourceRepl\n    __typename\n  }\n  __typename\n}\n\nfragment ReplViewSourceRepl on Repl {\n  id\n  iconUrl\n  title\n  templateLabel\n  ...ReplLinkRepl\n  owner {\n    ... on Team {\n      id\n      username\n      url\n      image\n      __typename\n    }\n    ... on User {\n      id\n      username\n      url\n      image\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment ReplViewCurrentUser on CurrentUser {\n  id\n  username\n  isSubscribed\n  isModerator: hasRole(role: MODERATOR)\n  isAdmin: hasRole(role: ADMIN)\n  ...ReplViewReplViewerCurrentUser\n  __typename\n}\n\nfragment ReplViewReplViewerCurrentUser on CurrentUser {\n  id\n  ...LikeButtonCurrentUser\n  ...CrosisContextCurrentUser\n  __typename\n}\n\nfragment LikeButtonCurrentUser on CurrentUser {\n  id\n  isVerified\n  __typename\n}\n\nfragment CrosisContextCurrentUser on CurrentUser {\n  id\n  username\n  isSubscribed\n  flagTrackOtClientDataLoss: gate(feature: \"flag-ot-data-loss-client-tracking\")\n  flagPid1Ping: gate(feature: \"flag-pid1-ping-sample\")\n  flagNoPongReconnect: gate(feature: \"flag-no-pong-reconnect\")\n  __typename\n}\n"
  
  }
]);

const headers = {
  'Content-Type': 'application/json',
  'host': 'replit.com',
  'user-agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:102.0) Gecko/20100101 Firefox/102.0',
  'origin': 'https://replit.com',
  'connection': 'keep-alive',
  'cookie': '_anon_id=abf0f575-1c1c-4de7-bc67-7803533ea9b5; connect.sid=s%3AMX1T-6foGoJBZ-vD4mai6zi3B5PP-__N.%2BikcOEv6Hxvjef1mdu3cBMV0SHttLuzNwL0Tf6rEDi8; replit:authed=1; replit_authed=1; gating_id=0c813224-211d-4b4b-a0c5-552f7d6e41c4; ajs_anonymous_id=0c813224-211d-4b4b-a0c5-552f7d6e41c4; gating_id=0c813224-211d-4b4b-a0c5-552f7d6e41c4; ld_uid=4425394; __stripe_mid=5e9068e7-c2cc-4cdf-92e2-2e6799b7973ef5d0a3; cf_clearance=vRhSia.1nw.phCZ.l3IyiXHIanb4D1vhUro0g38LMdg-1664479523-0-150; amplitudeSessionId=1667485526; sidebarClosed=true; _dd_s=logs=1&id=92c31f11-b9fb-42b9-8d23-7420b2ce2481&created=1667485526231&expire=1667486587104&rum=0',
  'x-requested-with': 'XMLHttpRequest'
};

axios.post(url, json, { headers })
  .then(response => {
   resolve(response.data[0].data.repl.id)
  })
  .catch(error => {
    reject('Unkown url')
  });
})

}



function getForks(id) {
  let json = JSON.stringify([
    {
        "operationName":"ReplViewForks",
        "variables":{
            "replId": id,
            "count":500
        },
        "query":"query ReplViewForks($replId: String!, $count: Int!, $after: String) {\n  repl(id: $replId) {\n    ... on Repl {\n      id\n      publicForkCount\n      publicReleasesForkCount\n      publicForks(count: $count, after: $after) {\n        items {\n          id\n          ...ReplPostReplCardRepl\n          __typename\n        }\n        pageInfo {\n          nextCursor\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment ReplPostReplCardRepl on Repl {\n  id\n  iconUrl\n  description(plainText: true)\n  ...ReplPostReplInfoRepl\n  ...ReplStatsRepl\n  ...ReplLinkRepl\n  tags {\n    id\n    ...PostsFeedNavTag\n    __typename\n  }\n  owner {\n    ... on Team {\n      id\n      username\n      url\n      image\n      __typename\n    }\n    ... on User {\n      id\n      username\n      url\n      image\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment ReplPostReplInfoRepl on Repl {\n  id\n  title\n  description(plainText: true)\n  imageUrl\n  iconUrl\n  templateInfo {\n    label\n    iconUrl\n    __typename\n  }\n  __typename\n}\n\nfragment ReplStatsRepl on Repl {\n  id\n  likeCount\n  runCount\n  commentCount\n  __typename\n}\n\nfragment ReplLinkRepl on Repl {\n  id\n  url\n  nextPagePathname\n  __typename\n}\n\nfragment PostsFeedNavTag on Tag {\n  id\n  isOfficial\n  __typename\n}\n"
    }
]);
const headers = {
  'Content-Type': 'application/json',
  'host': 'replit.com',
  'user-agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:102.0) Gecko/20100101 Firefox/102.0',
  'origin': 'https://replit.com',
  'connection': 'keep-alive',
  'x-requested-with': 'XMLHttpRequest'
};
axios.post(url, json, { headers }).then(async response => {
 if(response.status !== 200)  {
  console.log(red + 'Rate limited,sleeping' + reset)
  return   await sleep(10000)
}
  let data = response.data[0].data.repl.publicForks.items
  for (let fork of data) {
   urls.push({
      url : fork.url,
      id : fork.id,
      description : fork.description,
      title : fork.title
    })
  }
  console.log(green + 'Pushed ' + urls.length + ' REPLS' + reset)
  getZipAll()
}).catch(error => {
  console.log(error);
});

}


function getZip(url) {
  fork(url)
}


function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  }
);
}
async function getZipAll(){
  for(let url of urls){
    await sleep(1000)
    getZip(url)
  }
  

}



async function fork(url) {
  const json = [ 
     {
      "operationName": "ForkReplCreateRepl",
      "query": "mutation ForkReplCreateRepl($input: CreateReplInput!) {\n  createRepl(input: $input) {\n    ... on Repl {\n      id\n      url\n      isPrivate\n      language\n      origin {\n        id\n        isOwner\n        __typename\n      }\n      source {\n        release {\n          id\n          repl {\n            id\n            title\n            owner {\n              ... on User {\n                id\n                username\n                __typename\n              }\n              ... on Team {\n                id\n                username\n                __typename\n              }\n              __typename\n            }\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    ... on UserError {\n      message\n      __typename\n    }\n    __typename\n  }\n}\n",
      "variables": {
        "input": {
          "description": url.description,
          "forkToPersonal": true,
          "gitRemoteUrl": "",
          "isPrivate": false,
          "originId": url.id,
          "teamId": null,
          "title": url.title
        }
      }
    }
  ]
  const headers = {
    'Content-Type': 'application/json',
    'host': 'replit.com',
    'user-agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:102.0) Gecko/20100101 Firefox/102.0',
    'origin': 'https://replit.com',
    'connection': 'keep-alive',
    'x-requested-with': 'XMLHttpRequest',
    'cookie' : cookie
  };
  console.log(green + 'Forking ' + url.url + reset)
  axios.post('https://replit.com/graphql', json, { headers }).then(async response => {
    if(!response) return;
    if(response.status == 429) {
       console.log(red + 'Rate limited,sleeping' + reset)
       console.log(response.headers['retry-after'] * 1000)
       await sleep(response.headers['retry-after'] * 1000)
      }
    await donwloadRepl(response.data[0].data?.createRepl.url)
  }
  ).catch(error => {
    
  }
  )

}
setInterval(() => {
  console.log(yellow + "(/) Refreshing console" + reset)
  if(urls.length == 0) {
    console.log(yellow + "(/) No more urls " + reset)
    process.exit(0)
    
  }
}, 60000)

async function donwloadRepl(url) {
return new Promise(async (resolve,reject) => {
  
  if(downlading) {
    await sleep(getRandomDelay())
    console.log(red + 'Already downlading,sleeping' + reset)
    while(downlading) {
      await sleep(getRandomDelay())
    }

  }
    if(url == undefined ||!url) return;
  urls = urls.filter(e => e !== url)
  url = 'https://replit.com' + url + '.zip'
  
  let headers = {
    'Content-Type': 'application/json',
    'host': 'replit.com',
    'user-agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:102.0) Gecko/20100101 Firefox/102.0',
    'origin': 'https://replit.com',
    'connection': 'keep-alive',
    'x-requested-with': 'XMLHttpRequest',
    'cookie' : cookie
  }
  downlading = true
  console.log(blue + 'Started downlading ' + reset)
  const zipResponse = await axios.get(url, {headers, responseType: 'arraybuffer' }).catch(error => {
    downlading = false
    reject(error)
  }
  )
  downlading = false
  if(!zipResponse) return resolve()
  const randomStr = Math.random().toString(36).substring(7);
  console.log(blue + 'Downloaded ' + reset)  
  resolve()
 await  require('fs').writeFileSync(randomStr + '.zip', zipResponse.data)
  console.log(blue + '(/) Checking for tokens' + reset)
  checkFilesInZipForRegex(randomStr + ".zip")  
})

}

replitMain()
