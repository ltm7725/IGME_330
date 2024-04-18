import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }</div>

// export default App

const App = () => {
  const [page, setNewItem] = useState("Home");

  const home = (

    // Reference - https://bulma.io/documentation/components/navbar/ 

    <div id="parent-div">
      <nav className="navbar has-shadow is-primary-dark">
        <div className="navbar-brand">
          <a className="navbar-item" id="circle" onClick={() => { setNewItem("Home"); window.location.reload();/*console.log(page);*/ }}>
            <i className="fas fa-hotdog"></i>
          </a>
          <a className="navbar-burger" id="burger">
            <span></span>
            <span></span>
            <span></span>
          </a>
        </div>

        <div className="navbar-menu" id="nav-links">
          <div className="navbar-end">
            <a className="navbar-item is-hoverable is-size-5" onClick={() => { setNewItem("Home"); window.location.reload();/*console.log(page);*/ }}>
              Home
            </a>

            <a id="abt" className="navbar-item is-hoverable is-size-5" onClick={() => { setNewItem("About"); /*console.log(page);*/ }}>
              About The Game
            </a>
          </div>
        </div>
      </nav>

      <section className="section" id="main-menu">
        <div className="container my-3">
          <div className="columns is-vcentered">
            <div className="column is-full">
              <div id="logos">
                <img className="big-logo" id="cmby" src="media/cmby.svg"
                  alt="4/5 of the logo to the movie 'Call Me By Your Name'"></img>
                <img className="big-logo" id="s" src="media/s.svg" alt="1/5 of the logo to the movie 'Call Me By Your Name'"></img>
              </div>
            </div>
          </div>
        </div>
        <div className="container" id="interactive">
          <h2 className="is-size-3 has-text-centered my-3" id="tagline"><i>The phrase-to-color game you didn't know you didn't need</i>
          </h2>
          <div id="main-buttons">
            <button className="button is-primary is-large mx-2" id="start">Play</button>
            <button className="button is-info is-large mx-2" id="change-color">Change Color</button>
          </div>
        </div>
        <div className="container my-4" id="past-games">
          <h1 className="has-text-centered is-size-1" id="past-games-i">↓ <i>Past Games</i> ↓</h1>
          <div id="history"></div>
        </div>
        <div className="container">
          <footer className="my-1 is-size-4 mb-4" id="main-footer">
            <div id="desc"><p>In <i><u>Call Me By Your Shade</u></i>—named cheaply after a seemingly good movie that I
              haven't gotten to
              see yet—you're given a pseudo-random phrase associated with a color in some way; your goal is to use the
              color controlls provided to match the secret color as close as you possibly can. Hints are provided after
              each of your 10 guesses, in the form of percentage in general-closeness and high-or-low position of color
              values (RGB/HSL). <b>Can you find the color? Try it out!!</b></p><br></br></div>
            <div id="credits">Colors & names from <a href="https://github.com/meodai/color-names" target="_blank" id="color-names-api">Color-Names API</a> by <a
              href="https://xn--w-25a.elastiq.ch/" target="_blank">David Aerne</a><br></br>
            Buttons from <a href="https://icons8.com/" target="_blank">Icons8</a><br></br>
            Sounds from <a href="https://mixkit.co/" target="_blank">Mixkit</a><br></br>
            <a href="https://iro.js.org/" target="_blank">Color Picker</a> by <a href="https://jamesdaniel.dev/"
              target="_blank">James Daniel</a><br></br><br></br></div>
            <p id="name"><i>© L. Mavroudakis 2022-2024</i></p>
          </footer>
        </div>
      </section>

      <section className="section" id="game">
        <div className="container" id="game-div">
          <div className="columns">
            <div className="column is-5" id="left-col">
              <div className="holder">
                <div id="guess-number" className="is-size-2"><u>1 / 10</u></div>
                <div id="num-back"></div>
                <div id="the-word" className="is-size-2">
                  <img id="loading-gif" src="media/Loading.gif" alt="rainbow loading graphic"></img>
                  <p id="the-clue" className="is-size-2">Your clue is...<br></br><br></br></p>
                </div>
                <div id="distance" className="is-size-4 my-3 px-2"></div>
                <span id="patches">
                  <div className="is-size-3 mx-2 my-2" id="test-patch">#A1A8CC
                  </div>
                  <div className="is-size-3 mx-2 my-2" id="history-patch">
                    <div id="back-guess"></div>
                    <p>1/10</p>
                    <div id="forward-guess"></div>
                  </div>
                </span>
                <div id="rollover-div"></div>
                <button className="is-size-1 my-2 px-2" id="guess-button"><i>Take A Guess</i></button>
                <div id="high-or-low">
                  <p id="hol" className="is-size-4"></p>
                </div>
              </div>
            </div>
            <div className="column is-half mx-2" id="cp">

              <div id="arrows">
                <div id="values-box">
                  <div className="arr-label is-size-3" id="r-label">R </div>
                  <div className="arr-text is-size-3" id="r-text">255</div>
                  <div id="rup" className="up"></div>
                  <div id="rdown" className="down"></div>
                  <div className="arr-label is-size-3" id="g-label">G </div>
                  <div className="arr-text is-size-3" id="g-text">255</div>
                  <div id="gup" className="up"></div>
                  <div id="gdown" className="down"></div>
                  <div className="arr-label is-size-3" id="b-label">B </div>
                  <div className="arr-text is-size-3" id="b-text">255</div>
                  <div id="bup" className="up"></div>
                  <div id="bdown" className="down"></div>
                  <div className="arr-label is-size-3" id="h-label">H ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ °</div>
                  <div className="arr-text is-size-3" id="h-text">0</div>
                  <div id="hup" className="up"></div>
                  <div id="hdown" className="down"></div>
                  <div className="arr-label is-size-3" id="s-label">S ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ %</div>
                  <div className="arr-text is-size-3" id="s-text">0</div>
                  <div id="sup" className="up"></div>
                  <div id="sdown" className="down"></div>
                  <div className="arr-label is-size-3" id="l-label">L ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ %</div>
                  <div className="arr-text is-size-3" id="l-text">100</div>
                  <div id="lup" className="up"></div>
                  <div id="ldown" className="down"></div>
                </div>
              </div>

              <div id="color-picker">
                <div id="picker"></div>
              </div>
            </div>

            <div id="color-values">rgba(161,168,204,0.8)
              hsva(230,21,80,0.8)
              hsla(230,29%,72%,0.8)
              CMYK(21,17,0,20)
              CMY(37,34,20)
              Lab(70,5,-19)
            </div>

            <div id="description"><select></select></div>

            <script src="libs/colorPicker-master/colors.js"></script>
            <script src="libs/colorPicker-master/colorPicker.data.js"></script>
            <script src="libs/colorPicker-master/colorPicker.js"></script>
            <script src="libs/colorPicker-master/index.js"></script>

            <div className="cp-opacity"></div>
            <div className="cp-exit"></div>
            <div className="cp-resize"></div>
            <div className="cp-resizer">
              <div></div>
            </div>
          </div>
        </div>
      </section>
      <section className="section" id="end-game-section">
        <div className="container" id="end-game">
          <p></p>
          <div id="color-titles">
            <div id="color-title-1">Your Color</div>
            <div id="color-title-2">Real Color<br></br></div>
          </div>
          <div id="colors">
            <div id="guess-color"></div>
            <div id="answer-color"></div>
          </div>
          <button className="button my-4 is-large" id="back-to-menu">Back to Menu</button>
        </div>
      </section>
      <div id="arbitrary-placeholder"></div>
    </div>
  );

  const about = (
    <div id="big-div">
      <nav className="navbar has-shadow is-primary-dark">
        <div className="navbar-brand">
          <a className="navbar-item" id="doc-circle" onClick={() => { setNewItem("Home"); /*console.log(page);*/ }}>
            <i className="fas fa-hotdog"></i>
          </a>
          <a className="navbar-burger doc-burger" id="burger">
            <span></span>
            <span></span>
            <span></span>
          </a>
        </div>

        <div className="navbar-menu" id="nav-links">
          <div className="navbar-end">
            <a className="navbar-item is-hoverable is-size-5" onClick={() => { setNewItem("Home"); /*console.log(page);*/ }}>
              Home
            </a>

            <a id="abt" className="navbar-item is-hoverable is-size-5" onClick={() => { setNewItem("About"); /*console.log(page);*/ }}>
              About The Game
            </a>
          </div>
        </div>
      </nav>

      <section className="section">
        <div className="columns is-vcentered">
          <div className="column">
            <div className="hero is-large is-primary p-2">
              <div className="hero-head">
                <p id="titles">
                  <u id="title" className="is-size-2">Call Me By Your Shade</u><br></br>
                  <i id="subtitle" className="is-size-3">The phrase-to-color game you didn't know you didn't need</i>
                </p>
                <div id="doc-logos" className="mb-3">
                  <img className="logo-img" id="logo-1" src="media/cmby.svg"
                    alt="4/5 of the logo to the game Call Me By Your Shade"></img>
                  <img className="logo-img" id="logo-2" src="media/s.svg" alt="1/5 of the logo to the game Call Me By Your Shade"></img>
                </div>
              </div>
              <div className="hero-footer is-size-4"><b><u>Contact:</u> ltm7725@rit.edu</b></div>
            </div>
          </div>
        </div>
      </section>
      <h2 id="top-h1" className="is-size-2 mt-5">V1 Can be found <a href='https://people.rit.edu/ltm7725/235/project2/index.html'
        target="_blank">here</a>.</h2>
      <h2 className="with-h2 is-size-2" id="top-h1-2">V2 Can be found <a href='https://people.rit.edu/ltm7725/235/project3/index.html'
        target="_blank">here</a>.</h2>
        <h2 className="with-h2 is-size-2 pb-5 pt-2" id="top-h1-3">V3 Can be found <a href='https://people.rit.edu/ltm7725/cmbys'
        target="_blank">here</a>.</h2>
      <h1>In <i>'<u>Call Me By Your Shade</u>',</i></h1>
      <p className="is-size-3" id="desc-1">—named cheaply after a seemingly good movie that I haven't gotten to see yet—you're given a pseudo-random phrase
        associated with a color in some way; your goal is to use the color controls provided to match the secret color as
        close as you possibly can. Hints are provided after each of your 10 guesses, in the form of percentage in
        general-closeness and high-or-low position of color values (RGB/HSL). Can you find the color?</p>
      <h2 className="is-size-2 mb-5 pt-5"><i><b><u>Genre</u>: Puzzle, Strategy</b></i></h2>
      <h2 className="is-size-2 pb-4"><i><b><u id="platform" className="mr-4">Platforms</u>: Desktop & Mobile</b></i></h2>
      <h2 className="is-size-2 mt-5"><i>Aesthetics -</i></h2>
      <p className="with-h2 is-size-3">The current aesthetic of this site is very simple, with a monochrome color scheme. This is the
        general look that I will be sticking with, however if time allows I would like to add some further interactivity
        there.</p>
      <h2 className="is-size-2 mt-5"><i>Gameplay -</i></h2>
      <p className="with-h2 is-size-3">Throughout the game, players will have full control of an in-depth color picker, including a hue
        wheel, 6 color sliders (for RGB/HSL values)--with incremental arrow buttons for each--, and a brightness slider.
        while the UI is quite straight-forward in itself, I may add a brief introduction widget that appears when it's the
        user's first time playing.</p>
      <h1 className="mb-5 is-size-1 mt-5 pt-5"><i><u><b>Mockups</b></u></i></h1>
      <p className="with-h2 is-size-2 mb-5">"PATTERN SPACE" Is the leftover space outside of the gameboard (which I may set
        at a static aspect ratio) where I hope to be able to place randomly-selected patterns based on scheme color.</p>
      <img id="sketch-1" src="media/Sketch1.png" alt="A sketch of the gameboard for CMBYS"></img>
      <img id="sketch-2" src="media/Sketch2.png" alt="A sketch of the gameboard for CMBYS"></img>
      <h1 className="mb-5 is-size-1 mt-5 pt-5">Other Information</h1>
      <p className="with-h2 is-size-3 mb-5">This project will be a continuation of my Project 2 from IGME-235, adding further functionality and cleaning
        things up throughout to (hopefully) hit all of the requirements asked of most others who are starting fresh. I
        messed with PixiJS for a while, and didn't really feel much excitement in making my own stuff on it, so with how
        happy I was with how my Project 2 came out, I figured there really wasn't any better option. Adding onto something
        that I've already made, though, I'm aware that a lot is going to have to change in order for my work to seem
        adequate compared to others', and I feel good in that because I have a lot of ideas I want to put into this. When it
        comes to code used for this project from others (of which all is directly credited), I have two generic libraries
        (jQuery and colorJS) and two more specific libraries (PitPik colorpicker and the SVG color function) that are
        already being used. I don't know yet what additional libraries I might want to add to this project from here on;
        those will likely come as soon as I realize I have a major functionality that's beyond my depth in coding, at least
        for a project of this particular depth. I'll speak with professors about that as the time comes.</p>
      <h1 className="is-size-1 pt-5"><u>About the Developer</u></h1>
      <a href="https://people.rit.edu/ltm7725/235/" target="_blank"><img id="face" src="media/face.png"
        alt="Face of L. Mavroudakis with a weird filter on it"></img></a>
      <p className="with-h2 is-size-3 pb-5">My name is Luke Mavroudakis, and I'm a 3rd-year Game Design & Development student at Rochester Institute of Technology, with minors in Modern Language - Japanese and Women & Gender Studies. Since coming to school
        I've *developed* a love for development, mainly in things I just think are cool like my concept for this project. I
        hope for that love (and some successful projects that come from it) to take me far in the future, but as I work on
        myself in the meantime I hope to integrate my older love for art/music into the mix in larger ways than I've had the
        chance to in the past.</p>
      <h1 className="is-size-1 mt-5 pt-5"><b>Development Log</b></h1>
      <ul id="devlog" className="is-size-3 pb-5">
        <li>Replaced the game-screen layout with one mirroring my concept sketch<br></br></li>
        <li className="indent">All values for positioning of the game-screen items had to be completely rewritten between screen
          aspect ratios that have longer width than height and vice versa, so I found a reliable way to have CSS calculate
          the equivalent value in terms of vw and vh, translating from one to another.</li>
        <li className="indent">The screen now has a static layout, providing empty space where necessary to best center and fit
          the game-screen</li>
        <li>Fixed a bug with the color-wheel implementation that made a click outside of it on one of its sliders to cause
          the selector in the color wheel to jump to the edge of the wheel closest to what was clicked on</li>
        <li>Implemented (semi)-static color-wheel and brightness-slider cursor positions when in width-prominent aspect
          ratio, as they used to keep their top and left attributes static which would make them appear to fly away when
          changing window size in that case</li>
        <li>Made the text and border on the testPatch change to dark gray when on a color with luminance higher than 50, and
          light gray when lower than 50</li>
        <li className="indent">Also implemented into historyPatch once created</li>
        <li>Added loading graphic to clue box before the clue loads in</li>
        <li>Optimized clue printing to not cut words in half (though idk why it wasn't just doing that in the first place, I
          DELETED CODE)</li>
        <li>Modified external color-picker code to make test patch color 100% opacity</li>
        <li>Implemented a new menu layout specifically for round 1, with the guessButton in a more prominent position</li>
        <li className="indent">Transitions to the default game layout, allowing space for the distance and highOrLow blocks,
          once incremented past round 1</li>
        <li className="indent">Automatically resets to round 1 layout once game ends</li>
        <li>Optimized dynamics of mainMenu</li>
        <li className="indent">Added media query to ensure nothing (untasefully) overlaps before the designated breaking point
          (height less than 400px)</li>
        <li className="indent">Made the CMBYS logo able to dark/light on either of its components, based on a randomizer; the
          text below automatically turns light/dark to contrast the "SHADE" piece due to them needing to overlap at certain
          window aspect ratios</li>
        <li>Meticulously touched up automatic site color pallette algorithm</li>
        <li>Added back and forward functionality (via a custom ES6 class, colorGuess) to historyPatch to view all past
          guesses for a given round</li>
        <li className="indent">The highOrLow panel now also indicates the "high or low" comparisons (as well as RGB/HSL values)
          of present OR PAST guess, whatever is currently displayed on the historyPanel</li>
        <li>Finally fixed the last bit of bugginess with the color wheel cursor (I think)</li>
        <li>Conquered the beast!!! (FINALLY figured out how to utilize the colorPicker code to alter RGB/HSL values
          incrementally with buttons on the game screen)</li>
        <li>Implemented tutorial "slideshow" (Help button)</li>
        <li>Swapped APIs, as I realized the one I've been using is not reliable for it's purpose</li>
        <li className="indent"><a href="https://www.colourlovers.com/api" target="_blank">ColourLovers API</a> ---{'>'} <a
          href="https://github.com/meodai/color-names" target="_blank">Color-Names API</a> by <a
            href="https://xn--w-25a.elastiq.ch/" target="_blank">David Aerne</a></li>
        <li className="indent">So many more actually color-derivative phrases, and actually allows for randomized output (unlike
          the other)</li>
        <li className="indent">It's probably not the best to swap something like that out last minute, but it's pretty much the
          core piece of the game so this kind of brings the whole quality of the project a step up</li>
        <li className="indent">API data still fetched with jQuery in the exact same method, doing the exact same things as
          before</li>
        <li>Added game clues to local storage and Game History panel<br></br><br></br></li>

        <li>[Will update for IGME-330 changes later]</li>
      </ul>
      <footer></footer>
    </div>
  );

  if (page == "Home") {
    return home;
  }
  else if (page == "About") return about;
};

export default App;