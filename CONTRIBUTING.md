the best contribution is to use ka-table and write feedback about it to this email: sanrkom@gmail.com
or create an issue on github in any form



## How to add a new feature / fix a bug
<a  name="develop"></a>
1) Fork <code>ka-table</code> repo

2) Create a branch from the <code>master</code> branch with your feature or bug fix

3) <code>npm i</code>

4)
to run app: <code>npm run start</code>

to run test: <code>npm run test</code>

to create library's .tgz file: <code>npm run pack</code>

5)
if you fixed a bug - increase the 'path' package version

if you added a new feature - increase 'minor' package version and check that there is no breaking change (run all tests and check local demos which are run by <code>npm run start</code>).

See more about versioning on [Semantic versioning](https://semver.org/) page.

6) once you fixed a bug (or added a new feature) and wrote a test for this scenario, you can create PR for it

7) I will review it, and once everything is be ok I will merge it and publish new feature to npm