import { readFileSync } from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const inputName = 'input';
const input = readFileSync(`${path.dirname(url.fileURLToPath(import.meta.url))}/tests/${inputName}.in`).toString();

const lines = input.split('\n');

interface File {
  name: string;
  size: number;
  type: 'file';
}

interface Folder {
  children: Record<string, File | Folder>;
  name: string;
  parent?: Folder;
  size: number;
  type: 'folder';
}

const rootFolder: Folder = {
  children: {},
  name: '/',
  parent: undefined,
  size: 0,
  type: 'folder',
};

let currentDirectory: Folder = rootFolder;

for (const line of lines) {
  const [sizeOrDirectory, command, arguments_] = line.split(' ');

  if (command === 'cd') {
    if (arguments_ === '..') {
      if (currentDirectory.parent) {
        currentDirectory = currentDirectory.parent;
      }
    } else if (arguments_ === '/') {
      currentDirectory = rootFolder;
    } else {
      if (!arguments_) {
        continue;
      }
      currentDirectory = currentDirectory.children[arguments_] as Folder;
    }
    continue;
  }

  if (sizeOrDirectory?.startsWith('$')) {
    continue;
  }

  if (sizeOrDirectory === 'dir') {
    const folderName = command ?? '';
    const newFolder: Folder = {
      children: {},
      name: folderName,
      parent: currentDirectory,
      size: 0,
      type: 'folder',
    };
    currentDirectory.children[folderName] = newFolder;
  } else {
    const fileName = command ?? '';
    const fileSize = Number.parseInt(sizeOrDirectory!);
    const newFile: File = {
      name: fileName,
      size: fileSize,
      type: 'file',
    };
    currentDirectory.children[fileName] = newFile;
    currentDirectory.size += fileSize;
  }
}

const folderSizes: Array<number> = [];

const calculateFolderSize = (folder: Folder): number => {
  let size = 0;
  for (const child of Object.values(folder.children)) {
    size += child.type === 'file' ? child.size : calculateFolderSize(child);
  }

  folder.size = size;
  folderSizes.push(size);
  return size;
};

const part1 = () => {
  calculateFolderSize(rootFolder);
  console.log(
    'Part 1:',
    folderSizes.filter((size) => size <= 100_000).reduce((a, b) => a + b, 0),
  );
};

const part2 = () => {
  if (folderSizes.length === 0) {
    calculateFolderSize(rootFolder);
  }
  const fsSize = 70_000_000;
  const sizeRequiredForUpdate = 30_000_000;
  const spaceAvailable = fsSize - rootFolder.size;
  const spaceRequired = sizeRequiredForUpdate - spaceAvailable;

  console.log('Part 2:', Math.min(...folderSizes.filter((size) => size > spaceRequired)));
};

part1();
part2();
