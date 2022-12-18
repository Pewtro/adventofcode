import { readFileSync } from 'fs';

const inputName = 'input';
const input = readFileSync(`${__dirname}/tests/${inputName}.in`).toString();

const lines = input.split('\n');

type File = {
  type: 'file';
  name: string;
  size: number;
};

type Folder = {
  type: 'folder';
  name: string;
  children: { [folderOrFileName: string]: File | Folder };
  parent: Folder | null;
  size: number;
};

const rootFolder: Folder = {
  type: 'folder',
  name: '/',
  children: {},
  size: 0,
  parent: null,
};

let currentDir: Folder = rootFolder;

lines.forEach((line) => {
  const [sizeOrDir, command, args] = line.split(' ');

  if (command === 'cd') {
    if (args === '..') {
      if (currentDir.parent !== null) {
        currentDir = currentDir.parent;
      }
    } else if (args === '/') {
      currentDir = rootFolder;
    } else {
      currentDir = currentDir.children[args] as Folder;
    }
    return;
  }

  if (sizeOrDir.startsWith('$')) {
    return;
  }

  if (sizeOrDir === 'dir') {
    const folderName = command;
    const newFolder: Folder = {
      type: 'folder',
      name: folderName,
      children: {},
      size: 0,
      parent: currentDir,
    };
    currentDir.children[folderName] = newFolder;
  } else {
    const fileName = command;
    const fileSize = parseInt(sizeOrDir);
    const newFile: File = {
      type: 'file',
      name: fileName,
      size: fileSize,
    };
    currentDir.children[fileName] = newFile;
    currentDir.size += fileSize;
  }
});

const folderSizes: number[] = [];

const calculateFolderSize = (folder: Folder): number => {
  let size = 0;
  for (const child of Object.values(folder.children)) {
    if (child.type === 'file') {
      size += child.size;
    } else {
      size += calculateFolderSize(child);
    }
  }

  folder.size = size;
  folderSizes.push(size);
  return size;
};

const part1 = () => {
  calculateFolderSize(rootFolder);
  console.log(
    'Part 1:',
    folderSizes.filter((size) => size <= 100000).reduce((a, b) => a + b, 0),
  );
};

const part2 = () => {
  if (folderSizes.length === 0) {
    calculateFolderSize(rootFolder);
  }
  const fsSize = 70000000;
  const sizeRequiredForUpdate = 30000000;
  const spaceAvailable = fsSize - rootFolder.size;
  const spaceRequired = sizeRequiredForUpdate - spaceAvailable;

  console.log('Part 2:', Math.min(...folderSizes.filter((size) => size > spaceRequired)));
};

part1();
part2();
