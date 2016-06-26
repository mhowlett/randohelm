
## Randohelm

A random patch generator for the [Helm Synth](http://tytel.org/helm/) by Matt Tytel.

### Building

Written in ES2015, so needs transpiling before running, though unnecessary because I've included the 
transpiled version in the repo.

```
npm i
npm run build
```

### Running

go to your helm patches dir. For me: 

```
cd /Users/admin/Library/Audio/Presets/Helm/User Patches/Matts Patches
```

then something like:

```
node /git/randohelm/dist/randohelm.js [basePatchName] [numberOfPatchesToMake] [maxNumberOfModulations]
```

eg:

```
node /git/randohelm/dist/randohelm.js tmp 4 3
```

will make patches:

```
tmp0.helm
tmp1.helm
tmp2.helm
tmp3.helm
```

### TODO

(in increasing order of difficulty)

1. Translate to OCaml (this is a great project to take that language for a spin)
2. Assume the collection of default patches is representative of all good patches, and use characteristics of this set to influence distribution of random parameters when generating patches.
3. Use a genetic algorithm to learn how to make the Helm synthesis engine produce a sound like an input sound.
