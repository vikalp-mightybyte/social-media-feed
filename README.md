## Setup

### Database

Run migrations to create the database tables.

```bash
yarn workspace backend migrate
```

### SST

Make sure you install SST tunnel before running in dev mode.
This will allow you to tunnel your local server to the internet.

```bash
sudo sst tunnel install
```
