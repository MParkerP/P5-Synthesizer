let synth = new Tone.PolySynth(Tone.Synth);
let bend = new Tone.PitchShift();
let bounce = new Tone.PingPongDelay(0);
let bitCrush = new Tone.BitCrusher(16);

bend.pitch = 0;

let pitchSlider;
let bounceSlider;
let crushSlider;

let notes = {
  'a' : 'C4',
  's' : 'D4',
  'd' : 'E4',
  'f' : 'F4',
  'g' : 'G4',
  'h' : 'A4',
  'j' : 'B4',
  'k' : 'C5'
}

//singal flow
synth.connect(bitCrush);
bitCrush.connect(bend);
bend.connect(bounce);
bounce.toDestination();
//------------------

function keyPressed()
{
  let playNotes = notes[key];
  synth.triggerAttack(playNotes);
}

function keyReleased()
{
  let playNotes = notes[key];
  synth.triggerRelease(playNotes, '+0.03'); //adds a fade to end of sound
}

// function keyTyped()
// {
//   let playNotes = notes[key];
//   synth.triggerAttackRelease(playNotes,0.2);
// }

function setup() {
  createCanvas(400, 400);
  pitchSlider = createSlider(-12,12,0,0.1);
  pitchSlider.position(120,200);
  pitchSlider.mouseMoved(() => bend.pitch = pitchSlider.value());

  bounceSlider = createSlider(0,"16n",0,0.1);
  bounceSlider.position(120,250);
  bounceSlider.mouseMoved(() => bounce.delayTime.value = bounceSlider.value());

  crushSlider = createSlider(1,16,16,1);
  crushSlider.position(120,300);
  crushSlider.mouseMoved(() => bitCrush.bits.value = crushSlider.value());
}


function draw() {
  background('beige');
  textAlign(CENTER, CENTER);
  textSize(30);
  text("Press A-K to play notes!", 185, 100);
  textSize(20);
  text("A    S    D    F    G    H    J    K", 185, 160);
  text("C4  D4  E4  F4  G4  A4  B4  C5", 185, 180);
  textSize(12);
  text("Bend Pitch", 185, 225);
  text("Ping Pong", 185, 275);
  text("Bits of Sound", 185, 325);
}
