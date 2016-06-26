import fs from 'fs';

const filenameBase = process.argv[2];
const numberToProduce = parseInt(process.argv[3]);
const numberOfModulations = parseInt(process.argv[4]);

const ParamType = {
  INTEGER: 0,
  FLOAT: 1
};

const modulationSources = [
  "mono_lfo_1", 
  "mono_lfo_2", 
  "poly_lfo",
  "step_sequencer"
];

const paramSpecs = {
  "amp_attack": [0, 4, ParamType.FLOAT, 0.1, true],
  "amp_decay": [0, 4, ParamType.FLOAT, 1.5, true],
  "amp_release": [0, 4, ParamType.FLOAT, 0.3, true],
  "amp_sustain": [0, 1, ParamType.FLOAT, 1, true],
  "arp_frequency": [-1, 4, ParamType.FLOAT, 2, false], // this is 2^x
  "arp_gate": [0, 1, ParamType.FLOAT, 0.5],
  "arp_octaves": [1, 4, ParamType.INTEGER, 1],
  "arp_on": [0, 1, ParamType.INTEGER, 0],
  "arp_pattern": [0, 4, ParamType.INTEGER, 0],
  "arp_sync": [0, 3, ParamType.INTEGER, 1],
  "arp_tempo": [0, 11, ParamType.INTEGER, 9],
  "beats_per_minute": [20, 300, ParamType.FLOAT, 120],
  "cross_modulation": [0, 0.5, ParamType.FLOAT, 0],
  "cutoff": [28, 127, ParamType.FLOAT, 80],
  "delay_dry_wet": [0, 1, ParamType.FLOAT, 0.5],
  "delay_feedback": [-1, 1, ParamType.FLOAT, 0.4],
  "delay_frequency": [-2, 5, ParamType.FLOAT, 2.0],
  "delay_on": [0, 1, ParamType.INTEGER, 0],
  "delay_sync": [0, 3, ParamType.INTEGER, 1],
  "delay_tempo": [0, 11, ParamType.INTEGER, 9],
  "fil_attack": [0, 4, ParamType.INTEGER, 0.1],
  "fil_decay": [0, 4, ParamType.INTEGER, 1.5],
  "fil_env_depth": [-128, 128, ParamType.FLOAT, 0],
  "fil_release": [0, 4, ParamType.INTEGER, 1.5],
  "fil_sustain": [0, 1, ParamType.INTEGER, 0.5],
  "filter_saturation": [-60, 60, ParamType.FLOAT, 0],
  "filter_type": [0, 6, ParamType.INTEGER, 6],
  "formant_on": [0, 1, ParamType.INTEGER, 0],
  "formant_x": [0, 1, ParamType.FLOAT, 0.5],
  "formant_y": [0, 1, ParamType.FLOAT, 0.5],
  "keytrack": [-1, 1, ParamType.FLOAT, 0],
  "legato": [0, 1, ParamType.INTEGER, 0],
  "mod_attack": [0, 4, ParamType.FLOAT, 0.1],
  "mod_decay": [0, 4, ParamType.FLOAT, 1.5],
  "mod_release": [0, 4, ParamType.FLOAT, 1.5],
  "mod_sustain": [0, 1, ParamType.FLOAT, 0.5],
  "mono_lfo_1_amplitude": [-1, 1, ParamType.FLOAT, 1],
  "mono_lfo_1_frequency": [-7, -6, ParamType.FLOAT, 1],
  "mono_lfo_1_retrigger": [0, 2, ParamType.INTEGER, 0],
  "mono_lfo_1_sync": [0, 3, ParamType.INTEGER, 1],
  "mono_lfo_1_tempo": [0, 11, ParamType.INTEGER, 6],
  "mono_lfo_1_waveform": [0, 12, ParamType.INTEGER, 0],
  "mono_lfo_2_amplitude": [-1, 1, ParamType.FLOAT, 1],
  "mono_lfo_2_frequency": [-7, 6, ParamType.FLOAT, 1],
  "mono_lfo_2_retrigger": [0, 2, ParamType.INTEGER, 0],
  "mono_lfo_2_sync": [0, 3, ParamType.INTEGER, 1],
  "mono_lfo_2_tempo": [0, 11, ParamType.INTEGER, 7],
  "mono_lfo_2_waveform": [0, 12, ParamType.INTEGER, 0],
  "noise_volume": [0, 1, ParamType.FLOAT, 0],
  "num_steps": [1, 32, ParamType.INTEGER, 8],
  "osc_1_transpose": [-48, 48, ParamType.INTEGER, 0],
  "osc_1_tune": [-1, 1, ParamType.FLOAT, 0],
  "osc_1_unison_detune": [0, 100, ParamType.FLOAT, 0],
  "osc_1_unison_voices": [1, 15, ParamType.INTEGER, 1],
  "osc_1_volume": [0, 1, ParamType.FLOAT, 0.4],
  "osc_1_waveform": [0, 12, ParamType.INTEGER, 0],
  "osc_2_transpose": [-48, 48, ParamType.INTEGER, 0],
  "osc_2_tune": [-1, 1, ParamType.FLOAT, 0],
  "osc_2_unison_detune": [0, 100, ParamType.FLOAT, 0],
  "osc_2_unison_voices": [1, 15, ParamType.INTEGER, 1],
  "osc_2_volume": [0, 1, ParamType.FLOAT, 0.4],
  "osc_2_waveform": [0, 12, ParamType.INTEGER, 0],
  "osc_feedback_amount": [-1, 1, ParamType.FLOAT, 0],
  "osc_feedback_transpose": [-24, 24, ParamType.INTEGER, 0],
  "osc_feedback_tune": [-1, 1, ParamType.FLOAT, 0],
  "pitch_bend_range": [0, 24, ParamType.FLOAT, 2],
  "poly_lfo_amplitude": [-1, 1, ParamType.FLOAT, 1],
  "poly_lfo_frequency": [-7, -6, ParamType.FLOAT, 1],
  "poly_lfo_sync": [0, 3, ParamType.INTEGER, 1],
  "poly_lfo_tempo": [0, 11, ParamType.INTEGER, 7],
  "poly_lfo_waveform": [0, 12, ParamType.INTEGER, 0],
  "polyphony": [1, 32, ParamType.INTEGER, 4],
  "portamento": [-1, -9, ParamType.FLOAT, -9],
  "portamento_type": [0, 2, ParamType.INTEGER, 0],
  "resonance": [0, 1, ParamType.FLOAT, 0],
  "reverb_damping": [0, 1, ParamType.FLOAT, 0.5],
  "reverb_dry_wet": [0, 1, ParamType.FLOAT, 0.5],
  "reverb_feedback": [0.8, 1.0, ParamType.FLOAT, 0.9],
  "reverb_on": [0, 1, ParamType.INTEGER, 0],
  "step_frequency": [-5, 6, ParamType.FLOAT, 2],
  "step_seq_00": [-1, 1, ParamType.FLOAT, 0],
  "step_seq_01": [-1, 1, ParamType.FLOAT, 0],
  "step_seq_02": [-1, 1, ParamType.FLOAT, 0],
  "step_seq_03": [-1, 1, ParamType.FLOAT, 0],
  "step_seq_04": [-1, 1, ParamType.FLOAT, 0],
  "step_seq_05": [-1, 1, ParamType.FLOAT, 0],
  "step_seq_06": [-1, 1, ParamType.FLOAT, 0],
  "step_seq_07": [-1, 1, ParamType.FLOAT, 0],
  "step_seq_08": [-1, 1, ParamType.FLOAT, 0],
  "step_seq_09": [-1, 1, ParamType.FLOAT, 0],
  "step_seq_10": [-1, 1, ParamType.FLOAT, 0],
  "step_seq_11": [-1, 1, ParamType.FLOAT, 0],
  "step_seq_12": [-1, 1, ParamType.FLOAT, 0],
  "step_seq_13": [-1, 1, ParamType.FLOAT, 0],
  "step_seq_14": [-1, 1, ParamType.FLOAT, 0],
  "step_seq_15": [-1, 1, ParamType.FLOAT, 0],
  "step_seq_16": [-1, 1, ParamType.FLOAT, 0],
  "step_seq_17": [-1, 1, ParamType.FLOAT, 0],
  "step_seq_18": [-1, 1, ParamType.FLOAT, 0],
  "step_seq_19": [-1, 1, ParamType.FLOAT, 0],
  "step_seq_20": [-1, 1, ParamType.FLOAT, 0],
  "step_seq_21": [-1, 1, ParamType.FLOAT, 0],
  "step_seq_22": [-1, 1, ParamType.FLOAT, 0],
  "step_seq_23": [-1, 1, ParamType.FLOAT, 0],
  "step_seq_24": [-1, 1, ParamType.FLOAT, 0],
  "step_seq_25": [-1, 1, ParamType.FLOAT, 0],
  "step_seq_26": [-1, 1, ParamType.FLOAT, 0],
  "step_seq_27": [-1, 1, ParamType.FLOAT, 0],
  "step_seq_28": [-1, 1, ParamType.FLOAT, 0],
  "step_seq_29": [-1, 1, ParamType.FLOAT, 0],
  "step_seq_30": [-1, 1, ParamType.FLOAT, 0],
  "step_seq_31": [-1, 1, ParamType.FLOAT, 0],
  "step_sequencer_retrigger": [0, 2, ParamType.INTEGER, 0],
  "step_sequencer_sync": [1, 1, ParamType.INTEGER, 1], // unclear to me what this is.
  "step_sequencer_tempo": [1, 11, ParamType.INTEGER, 7],
  "step_smoothing": [0, 0.5, ParamType.FLOAT, 0],
  "stutter_frequency": [-7, 6, ParamType.FLOAT, 3],
  "stutter_on": [0, 1, ParamType.INTEGER, 0],
  "stutter_resample_frequency": [-7, 4, ParamType.FLOAT, 1],
  "stutter_softness": [0, 1, ParamType.FLOAT, 0],
  "sub_shuffle": [0, 1, ParamType.FLOAT, 0],
  "sub_volume": [0, 1, ParamType.FLOAT, 0],
  "sub_waveform": [0, 10, ParamType.INTEGER, 0],
  "unison_1_harmonize": [0, 0, ParamType.INTEGER, 0], // unclear to me what this is.
  "unison_2_harmonize": [0, 0, ParamType.INTEGER, 0], // unclear to me what this is.
  "velocity_track": [-1, 1, ParamType.FLOAT, 0]
  //  "volume": [0, 1, ParamType.FLOAT, 0.75] // better to hold this constant.
};

const modulationDestinations = Object.keys(paramSpecs).filter(s => paramSpecs[s][4])

console.log(modulationDestinations);

function makeModulation() {
  const result = {};
  result.source = modulationSources[Math.floor(Math.random()*(modulationSources.length + 1))];
  result.destination
  return result;
}

function makePatch() {
  const result = {
    "license": "This patch is licensed under a Creative Commons Attribution 4.0 International License.  You should have received a copy of the license along with this work.  If not, see <http://creativecommons.org/licenses/by/4.0/>.",
    "synth_version": "0.7.0",
    "patch_name": "",
    "author": "randohelm"
  };

  const probDefault = 0.5;

  result.settings = Object.keys(paramSpecs).reduce( 
    (accum, current) => { 
      const min = paramSpecs[current][0];
      const max = paramSpecs[current][1];
      const paramType = paramSpecs[current][2];
      const defaultValue = paramSpecs[current][3];
      if (Math.random() < probDefault) {
        accum[current] = defaultValue;
      } else {
        if (paramType === ParamType.INTEGER) {
          accum[current] = Math.floor(Math.random()*(max-min+1)) + min;
        } else {
          accum[current] = Math.random()*(max-min) + min;
        }
      }
      return accum; 
    },
    {}
  );

  result.settings.modulations = new Array(numberOfModulations).fill(makeModulation());
  result.settings.volume = 0.75;

  const output = JSON.stringify(result, null, 2);
  return output;
}


for (let i=0; i<numberToProduce; ++i) {
  fs.writeFile(`${filenameBase}${i}.helm`, makePatch());
}
