# vitrine

Generates a static site featuring a trader's performance data.

### Supported Brokers

- Bybit

## Requirements
- NodeJS, NPM
- API keys from a supported broker

### Optional (For automatic Github Page deployment)
- Git with SSH profile (Vitrine Page HTTP push untested)
- A Github page repository  

## Get Started
### Get Vitrine
- Git Clone (Recommended)
- Zip Download

### Install dependencies
```sh
npm install
```

### Configure Vitrine
Open `vitrine.config.json`. Located at the root of the directory.

#### Required parameters
- `tradersName`: Name of your choice
- `showAvatar`: Whether the file `./public/avatar.png` should be displayed next to your name
- `apiHost`: API base URL
- `apiKey`: API public key
- `apiSecret`: API private key
- `apiRecvWindow`: API recv window

#### Optional parameters
If set, a deployment will be executed at the end of the building process. 
- `vitrinePageGitSSH`: SSH path to Github Page repository
- `vitrinePageDomain`: Github Page domain name (to set in CNAME)

#### Example configuration
As an example here is the config that I use.
```json
{
  "tradersName": "Xav",
  "showAvatar": true,
  "apiHost": "https://api.bybit.com",
  "apiKey": "xxxx",
  "apiSecret": "xxxx",
  "apiRecvWindow": 5000,
  "vitrinePageGitSSH": "git@github.com:WildXav/vitrine-page.git",
  "vitrinePageDomain": "trades.xaviers.sh"
}
```

### Build (& Deploy)
```sh
npm run build
```

## To do
- Dynamically set HTML title
- Bypass PnL retrieval when doing `preview` or `serve`
- TBD