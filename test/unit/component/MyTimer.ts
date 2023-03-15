import {LitElement, html, css} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {play, pause, replay} from './icons.js';

@customElement("timer-display")
export class TimerDisplay extends LitElement {
  static styles = css`
    span { color: #EA5907; }
  `

  render() {
    return html`
      <span><slot></slot></span>
    `
  }
}

@customElement("my-timer")
export class MyTimer extends LitElement {
  static styles = css`
    @import("https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@1,800&display=swap")

    :host {
      display: inline-block;
      min-width: 4em;
      text-align: center;
      padding: 0.2em;
      margin: 0.2em 0.1em;
    }
    :host * {
      font-family: 'JetBrains Mono', monospace;
      font-size: 72px;
    }
    button {
      background: transparent;
      border: 0;
      padding: 0;
      cursor: pointer;
    }
    footer {
      user-select: none;
      font-size: 0.6em;
    }
    `;

  @property() duration = 60;
  @state() private end: number | null = null;
  @state() private remaining = 0;

  render() {
    const {remaining, running} = this;
    const min = Math.floor(remaining / 60000);
    const sec = pad(min, Math.floor(remaining / 1000 % 60));
    const hun = pad(true, Math.floor(remaining % 1000 / 10));
    return html`
      <timer-display>${min ? `!!${min}:${sec}` : `${sec}.${hun}`}</timer-display>
      <footer>
        ${remaining === 0 ? '' : running ?
          html`<button @click=${this.pause}>${pause}</button>` :
          html`<button @click=${this.start}>${play}</button>`}
        <button @click=${this.reset}>${replay}</button>
      </footer>
    `;
  }

  start() {
    this.end = Date.now() + this.remaining;
    this.tick();
  }

  pause() {
    this.end = null;
  }

  reset() {
    const running = this.running;
    this.remaining = this.duration * 1000;
    this.end = running ? Date.now() + this.remaining : null;
  }

  tick() {
    if (this.running) {
      this.remaining = Math.max(0, this.end! - Date.now());
      requestAnimationFrame(() => this.tick());
    }
  }

  get running() {
    return this.end && this.remaining;
  }

  connectedCallback() {
    super.connectedCallback();
    this.reset();
  }

}

function pad(pad: unknown, val: number) {
  return pad ? String(val).padStart(2, '0') : val;
}
