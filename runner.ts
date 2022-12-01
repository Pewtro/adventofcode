import * as fs from 'fs';
import { performance } from 'perf_hooks';
import { exec } from 'child_process';

const [year, day, scriptName = 'main', testName = 'input', ext = 'ts', testExt = 'in'] =
  process.argv.slice(2);
const testPath = `${year}/${day}/tests/${testName}.${testExt}`;
const target = `${year}/${day}/${scriptName}.${ext}`;
const expectedScriptName = `${scriptName}.${ext}`;

// given the file name, year and day
if (scriptName && year && day) {
  fs.readFile(testPath, 'utf-8', (err, tests) => {
    if (err) return console.log('Test file not found', err);

    // check if year/day is a thing
    fs.readdir(`${year}/${day}`, (err, files) => {
      if (err) return console.log('Did you transpile?', err);
      // check if the build has the expected script name
      if (files.includes(expectedScriptName)) {
        // setup spawn
        const startTime = performance.now();
        const child = exec(`ts-node ${target}`);
        // prepare the encoding and pipe
        child.stdin.setDefaultEncoding('utf-8');
        child.stdout.pipe(process.stdout as unknown as NodeJS.WritableStream);
        // write the actual data
        child.stdin.write(tests);
        // measure memory
        const used = process.memoryUsage().heapUsed / 1024 / 1024;
        console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
        // end process
        child.stdin.end();

        child.stderr.on('data', (data) => {
          console.error(`child stderr:\n${data}`);
        });

        child.on('exit', (code) => {
          const time = (performance.now() - startTime) / 1000;
          console.log('Run Time:', time, 's');
          console.log('Exit Code:', code);
        });
      } else {
        // Exit, there was a problem with the script name
        console.log(`Make sure the file script exists as ${scriptName}.${ext}`);
      }
    });
  });
} else {
  // Exit, no name was given
  console.log('A name is required.');
}
