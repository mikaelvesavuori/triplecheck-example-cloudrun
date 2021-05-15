import fastify from 'fastify';
import * as fastifyCors from 'fastify-cors';

import { TripleCheckBroker } from 'triplecheck-broker';
import { FirestoreRepository } from 'triplecheck-repository-firestore';

const server = fastify({ logger: true });
// @ts-ignore
server.register(fastifyCors, {});

const DATABASE_NAME = 'broker-demo'; // <----- Change this if your database has another name
const PORT = process.env.PORT || 8080;

/**
 * @description Fastify routes. Because the broker handles these more fine-grained, these are all very broad.
 */
server.get('*', async (req: any, res: any) => tripleCheckHandler(req, res));
server.post('*', async (req: any, res: any) => tripleCheckHandler(req, res));
server.put('*', async (req: any, res: any) => tripleCheckHandler(req, res));
server.delete('*', async (req: any, res: any) => tripleCheckHandler(req, res));

/**
 * @description Handle request to TripleCheck.
 */
async function tripleCheckHandler(req: any, res: any) {
  try {
    const [request, payload] = await getRequestData(req);

    // The configuration will be inferred and used in the Google environment so no need for keyfiles
    const repository = FirestoreRepository(undefined, DATABASE_NAME);
    const { responseData, status, headers } = await TripleCheckBroker(request, payload, repository);

    res.code(status).send(JSON.stringify(responseData));
  } catch (error) {
    console.error(error);
    res.code(500).send(JSON.stringify('Error'));
  }
}

/**
 * @description Process the request data into the format the TripleCheck expects.
 * Expects the entire incoming request object.
 */
async function getRequestData(req: any) {
  const { body, method, url } = req;

  let [pathname, search] = url.split('?');
  if (!pathname) pathname = url;

  const payload = typeof body === 'string' ? JSON.parse(body) : body;

  return [
    {
      method,
      pathname,
      search
    },
    payload
  ];
}

/**
 * @description Start the Fastify server.
 */
const start = async () => {
  try {
    await server.listen(PORT, '0.0.0.0');
    server.log.info(`server started`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
