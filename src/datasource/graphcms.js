/**
 * @see http://graphcms.com
 */

const fetch = require("isomorphic-fetch");
const { GRAPHCMS_ENDPOINT, GRAPHCMS_AUTH_TOKEN } = process.env;

const HEADERS = new Headers({
  "Content-Type": "application/json",
  Authorization: `Bearer ${GRAPHCMS_AUTH_TOKEN}`
});

/**
 * "kudoes" is intentional
 */
const FIND_KUDOS = `{
  kudoes(orderBy: createdAt_DESC) {
    id
    from
    to
    message
    imgUrl
    createdAt
  }
}`;

const CREATE_KUDO = `
  mutation createKudo(
    $from: String,
    $to: String,
    $message: String!,
    $imgUrl: String!
  ) {
    createKudo(data: {
      from: $from
      to: $to
      message: $message
      imgUrl: $imgUrl
    }) {
      id
      from
      to
      message
      imgUrl
      createdAt
    }
  }
`;

const CREATE_FEEDBACK = `
  mutation createFeedback($message: String!, $rating: Rating!) {
    createFeedback(data: {
      message: $message
      rating: $rating
    }) {
      message
      rating
    }
  }
`;

const kudoMapper = kudo => ({
  _id: kudo.id,
  createdAt: kudo.createdAt,
  from: kudo.from,
  to: kudo.to,
  message: kudo.message,
  imgUrl: kudo.imgUrl
});

async function find(filters) {
  try {
    const resp = await fetch(GRAPHCMS_ENDPOINT, {
      headers: HEADERS,
      method: "POST",
      body: JSON.stringify({ query: FIND_KUDOS })
    });
    const body = await resp.json();
    const { kudoes: kudos } = await body.data;
    return kudos.map(kudoMapper);
  } catch (err) {
    console.error("Error fetching kudos from graphcms", err);
    return [];
  }
}

async function save(kudoToSave) {
  try {
    const resp = await fetch(GRAPHCMS_ENDPOINT, {
      headers: HEADERS,
      method: "POST",
      body: JSON.stringify({
        query: CREATE_KUDO,
        variables: {
          from: kudoToSave.from,
          to: kudoToSave.to,
          message: kudoToSave.message,
          imgUrl: kudoToSave.imgUrl
        }
      })
    });
    const body = await resp.json();
    const kudoSaved = body.data.createKudo;

    return kudoMapper(kudoSaved);
  } catch (err) {
    console.error("Error saving kudo from graphcms", kudoToSave, err);
    return null;
  }
}

async function saveFeedback({ message, rating }) {
  try {
    const resp = await fetch(GRAPHCMS_ENDPOINT, {
      headers: HEADERS,
      method: "POST",
      body: JSON.stringify({
        query: CREATE_FEEDBACK,
        variables: {
          message,
          rating
        }
      })
    });
    const body = await resp.json();
    const createdFeedback = body.data.createFeedback;
    return createdFeedback;
  } catch (err) {
    console.error("Error saving kudo from graphcms", kudoToSave, err);
    return null;
  }
}

module.exports = {
  find,
  save,
  saveFeedback
};
