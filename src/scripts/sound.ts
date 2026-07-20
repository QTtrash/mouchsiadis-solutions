// Synthesized terminal sound engine. Strictly opt-in (default off), state in localStorage.

export type SoundType = "boot" | "tab" | "detail" | "error" | "key" | "decode";

const SOUND_KEY = "terminalSound";

function readSoundPreference(): boolean {
  try {
    return localStorage.getItem(SOUND_KEY) === "on";
  } catch {
    return false;
  }
}

function writeSoundPreference(enabled: boolean): void {
  try {
    localStorage.setItem(SOUND_KEY, enabled ? "on" : "off");
  } catch {
    // Sound remains session-only when browser storage is unavailable.
  }
}

export class SoundEngine {
  private context: AudioContext | null = null;
  enabled = readSoundPreference();

  private ensure(): AudioContext | null {
    if (!this.enabled) return null;
    const Ctx =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctx) return null;
    this.context ||= new Ctx();
    if (this.context.state === "suspended") void this.context.resume();
    return this.context;
  }

  private beep(
    frequency: number,
    duration = 0.04,
    delay = 0,
    gain = 0.025,
    type: OscillatorType = "square",
    glideTo?: number,
  ): void {
    const context = this.ensure();
    if (!context) return;
    const start = context.currentTime + delay;
    const oscillator = context.createOscillator();
    const volume = context.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, start);
    if (glideTo)
      oscillator.frequency.exponentialRampToValueAtTime(
        glideTo,
        start + duration,
      );
    volume.gain.setValueAtTime(0.0001, start);
    volume.gain.exponentialRampToValueAtTime(gain, start + 0.008);
    volume.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    oscillator.connect(volume);
    volume.connect(context.destination);
    oscillator.start(start);
    oscillator.stop(start + duration + 0.02);
  }

  private burst(
    duration = 0.045,
    delay = 0,
    gain = 0.018,
    frequency = 1200,
  ): void {
    const context = this.ensure();
    if (!context) return;
    const start = context.currentTime + delay;
    const buffer = context.createBuffer(
      1,
      Math.floor(context.sampleRate * duration),
      context.sampleRate,
    );
    const output = buffer.getChannelData(0);
    for (let i = 0; i < output.length; i += 1) {
      output[i] = (Math.random() * 2 - 1) * (1 - i / output.length);
    }
    const source = context.createBufferSource();
    const filter = context.createBiquadFilter();
    const volume = context.createGain();
    filter.type = "bandpass";
    filter.frequency.value = frequency;
    volume.gain.value = gain;
    source.buffer = buffer;
    source.connect(filter);
    filter.connect(volume);
    volume.connect(context.destination);
    source.start(start);
  }

  /** tabIndex varies the tab chirp pitch so each mode has its own voice */
  play(type: SoundType, tabIndex = 0): void {
    if (!this.enabled) return;
    switch (type) {
      case "boot":
        // power thunk, capacitor whine rising, relay noise, ready ding
        this.beep(52, 0.14, 0, 0.03, "sine");
        this.beep(120, 0.5, 0.05, 0.012, "sawtooth", 480);
        this.burst(0.06, 0.16, 0.014);
        this.beep(660, 0.05, 0.55, 0.016);
        this.beep(880, 0.06, 0.63, 0.016);
        break;
      case "tab":
        this.beep(480 + tabIndex * 40, 0.035, 0, 0.018);
        this.burst(0.035, 0.035, 0.014);
        break;
      case "detail":
        this.beep(320, 0.025, 0, 0.014);
        break;
      case "key":
        this.beep(1500, 0.014, 0, 0.007);
        break;
      case "decode":
        this.burst(0.05, 0, 0.008, 2400);
        break;
      case "error":
        this.beep(160, 0.05, 0, 0.012);
        break;
    }
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
    writeSoundPreference(enabled);
    if (enabled) this.play("boot");
  }
}
