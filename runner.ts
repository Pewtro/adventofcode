import { exec } from 'node:child_process';
import * as fs from 'node:fs';
import { performance } from 'node:perf_hooks';

const [
  year,
  day,
  shouldWatch = 'true',
  scriptName = 'main',
  testName = 'input',
  extension = 'ts',
  testExtension = 'in',
] = process.argv.slice(2);
const expectedScriptName = `${scriptName}.${extension}`;

// given the file name, year and day
if (scriptName && year && day) {
  const paddedYear = year.length === 2 ? `20${year}` : year;
  const paddedDay = day.length === 1 ? `0${day}` : day;
  const testPath = `${paddedYear}/${paddedDay}/tests/${testName}.${testExtension}`;
  const target = `${paddedYear}/${paddedDay}/${scriptName}.${extension}`;

  fs.readFile(testPath, 'utf8', (error, tests) => {
    if (error) return console.log('Test file not found\n', error);

    // check if year/day is a thing
    fs.readdir(`${paddedYear}/${paddedDay}`, (error_, files) => {
      if (error_) return console.log('Did you transpile?', error_);
      // check if the build has the expected script name
      if (files.includes(expectedScriptName)) {
        // setup spawn
        const startTime = performance.now();
        const watchValue = shouldWatch === 'true' ? 'watch --clear-screen=false' : '';
        const child = exec(`tsx ${watchValue} ${target}`);
        // prepare the encoding and pipe
        child.stdin?.setDefaultEncoding('utf8');
        child.stdout?.pipe(process.stdout);
        // write the actual data
        child.stdin?.write(tests);
        // measure memory
        const used = process.memoryUsage().heapUsed / 1024 / 1024;
        console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
        // end process
        child.stdin?.end();

        child.stderr?.on('data', (data) => {
          console.error(`child stderr:\n${data}`);
        });

        child.on('exit', (code) => {
          const time = (performance.now() - startTime) / 1000;
          console.log('Run Time:', time, 's');
          console.log('Exit Code:', code);
        });
      } else {
        // Exit, there was a problem with the script name
        console.log(`Make sure the file script exists as ${scriptName}.${extension}`);
      }
    });
  });
} else {
  // Exit, no name was given
  console.log('A name is required.');
}
