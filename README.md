*to create a javascript library that allows for the easy creation of dynamic, modular html tables*

# git branches
- *main* - only contains snapshots of release versions
- *develop* - represents a state with the latest delivered development changes
- *feature* - used when developing a new feature or enhancement. Named as feature#-name. # is only added if applicable
- *issue* - used when fixing an existing issue. Named as issue#-summary

# test
```npm run test```

# build
**build zGrid:**

```npx webpack --config-name='build'```
  - creates dist files
  - can delete all .d.ts files except zGrid.d.ts

**build example:**

```npx webpack --config-name='example'```

  - builds example site in './example/dist'