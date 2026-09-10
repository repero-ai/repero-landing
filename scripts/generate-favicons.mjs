import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const source = await readFile(join(root, 'brand/logo/flat/web/favicon-source.svg'));
const targets = [
  [16, 'favicon-16x16.png'],
  [32, 'favicon-32x32.png'],
  [180, 'apple-touch-icon-180x180.png']
];

async function png(size) {
  return sharp(source).resize(size, size).png({ compressionLevel: 9 }).toBuffer();
}

function ico(images) {
  const header = Buffer.alloc(6 + images.length * 16);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = header.length;

  for (const [index, { size, data }] of images.entries()) {
    const entry = 6 + index * 16;
    header[entry] = size === 256 ? 0 : size;
    header[entry + 1] = size === 256 ? 0 : size;
    header[entry + 2] = 0;
    header[entry + 3] = 0;
    header.writeUInt16LE(1, entry + 4);
    header.writeUInt16LE(32, entry + 6);
    header.writeUInt32LE(data.length, entry + 8);
    header.writeUInt32LE(offset, entry + 12);
    offset += data.length;
  }

  return Buffer.concat([header, ...images.map(({ data }) => data)]);
}

const pngs = new Map(await Promise.all(targets.map(async ([size]) => [size, await png(size)])));
const icoData = ico(await Promise.all(
  [16, 32, 48].map(async (size) => ({ size, data: pngs.get(size) ?? await png(size) }))
));

for (const [size, filename] of targets) {
  const data = pngs.get(size);
  await writeFile(join(root, 'brand/logo/flat/web', filename), data);
  await writeFile(join(root, 'public/brand/flat-web', filename), data);
}
await writeFile(join(root, 'brand/logo/flat/web/favicon.ico'), icoData);
await writeFile(join(root, 'public/brand/flat-web/favicon.ico'), icoData);
await writeFile(join(root, 'public/favicon.ico'), icoData);
