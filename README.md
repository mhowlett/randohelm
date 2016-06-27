
## Randohelm

A random patch generator for the [Helm Synth](http://tytel.org/helm/) by Matt Tytel.

### Building

Written in ES2015, so needs transpiling before running.

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
node /git/randohelm/dist/randohelm.js basePatchName numberOfPatchesToMake maxNumberOfModulations probabilityOfDefaultValue [templatePatchPath]
```

eg:

```
node /git/randohelm/dist/randohelm.js tmp 4 3 0.5
node /git/randohelm/dist/randohelm.js tmp 32 1 0.95 ./organ.helm
```

the first will make 4 patches:

```
tmp0.helm
tmp1.helm
tmp2.helm
tmp3.helm
```

the second will make 32 relatively minor random variations on the patch organ.helm.

### Methodology

1. Create a wide variety of sounds by setting a low value for probabilityOfDefaultValue. Most of them will be rubbish.
2. Select the best of these and use them as a templatePatch + use a high probabilityOfDefaultValue.


### TODO

(in increasing order of difficulty)

1. Translate to OCaml (this is a great project to take that language for a spin)
2. Assume the collection of default patches is representative of all good patches, and use characteristics of this set to influence distribution of random parameters when generating patches.
3. Use a genetic algorithm to learn how to make the Helm synthesis engine produce a sound like an input sound.
