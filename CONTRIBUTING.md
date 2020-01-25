ka-table component is quite young, nevertheless, it has the most useful features, and contains a big set of demos which allows users to start easily.

[Semantic versioning](https://semver.org/) is used here and the main goal is to make new features without changing a previous API. But anyway if there is a Breaking Change, the major version should be increased and it should be easy to update with proper instruction - instruction will be available in pull requests for major versions and on release page on GitHub. Main amount of features must be added without breaking previous Api and new feature increases Minor version of the component.

1. Main functions and all the features of this component are covered by tests and before each small release, it is tested in demos which look like real cases. Big work was made to avoid any types of bugs. But anyway if you found it, be free to create an issue in this repository - it will be a great support to make this component better together.
2. ka-table component has ideas that should be implemented further and probably roadmap with features survey will be published here on GitHub. But at this time you can share your ideas with a developer about your needs from ka-table, what is good for you and what you expected to be better or maybe you want something but it has not implemented yet.  Feel free to create a GitHub issue in a free form and write there any of your thoughts - it will be really appreciated. Also, you can write directly to the developer: sanrkom@gmail.com
3. ka-table is a free component and it does not require any payment to use it. I just decided to invest my experience in something useful and I believe you understand it. But if you like it click a star - this is the best way for me to understand that my work in evaluated by the community.
4. Fork it, write your feature and pull request it - see more in [How to add new feature / fix bug section](#develop)  - also you can connect with sanrkom@gmail.com and give a message that you wanna help, I can write/call you and explain everything in detail. We can discuss the ability to implement your required feature now. Try to find a way not to make a Breaking Change.
5. Add ka-table to your project and enjoy it!
6. Tell your colleagues to try ka-table

This is the power of the open-source community


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

7) I will review it, and once everything will be ok I will merge it and publish new feature to npm