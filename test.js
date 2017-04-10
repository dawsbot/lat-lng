import test from 'ava';
import micro from 'micro';
import fetch from 'node-fetch';
import listen from 'test-listen';
import app from './';

test('invalid request no address provided', async t => {
  const url = await listen(micro(app));
  const res = await fetch(url);
  t.is(res.status, 400);
});

test('valid basic request for Boulder, CO', async t => {
  const url = await listen(micro(app));
  const body = await fetch(`${url}/?address=Boulder,+CO`).then(res => res.json());

  t.is(typeof body, 'object');
  // Boulder lies along latitude 40 degrees
  t.regex(body.lat.toString(), /40/);
  t.regex(body.formattedAddress, /Boulder, CO/);
});
