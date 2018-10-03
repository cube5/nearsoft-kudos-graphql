# Nearsoft Kudos Backend

This project was built to crate kudos here @nearsoft for the people who make the difference in their work.

It is a _node_ server that points to a [GraphCMS](https://graphcms.com) endpoint to store the data and to [Cloudinary](https://cloudinary.com) to store the images. Other datasources such as MongoDB can be used as well but they need the resolvers implemented (see `src/datasources/`).

# Running the application

## Development

Runs a nodemon server using your .env file.

```bash
npm start
```

## Docker

1. Build the image

```bash
docker build --tag nearsoft-kudos-graphql .
```

2. Run a container using the image

```bash
docker run --name nearsoft-kudos-graphql -p 4000:4000 nearsoft-kudos-graphql
```

Or if you have run the image before

```bash
docker run -p 4000:4000 nearsoft-kudos-graphql
```
