export async function *getWsData(ws) {
  let resolve, reject, done = false, error;
  const buffer = [];

  ws.addEventListener('message', ({ data }) => resolve(data));
  ws.addEventListener('close', () => resolve());
  ws.addEventListener('error', (e) => reject(e));

  function pushData(data) {
    if (data !== undefined) buffer.push(data);
    else done = true;
  }

  function setError(err) {
    error = err;
  }

  while (true) {
    const data = await new Promise((res, rej) => {
      if (buffer.length > 0) return res(buffer.shift());
      if (buffer.length === 0 && done) return res();
      if (error) return rej(error);

      resolve = res;
      reject = rej;
    })

    resolve = pushData;
    reject = setError;
    
    if (data === undefined) break;
    else yield data;
  }
}

export default getWsData;