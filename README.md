*to create a javascript library that allows for the easy creation of dynamic, modular html tables*

**git branches**
- *main* - only contains snapshots of release versions
- *develop* - represents a state with the latest delivered development changes
- *feature* - used when developing a new feature or enhancement. Names as #-feature-name. # is only added if applicable
- *issue* - used when fixing an existing issue. Named as #-issue-summary

**test**: npm run test

**build**: npx webpack
  - creates dist files
  - can delete all .d.ts files except zGrid.d.ts
  - builds example site in './example/dist'