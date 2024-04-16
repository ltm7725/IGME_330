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
  return (

    // Reference - https://bulma.io/documentation/components/navbar/ 

    // Should be <nav className="navbar has-shadow is-white"> but my stylesheet uses dark mode 
    <div id="parent-div">
      <nav className="navbar has-shadow is-primary-dark">
        <div className="navbar-brand">
          <a className="navbar-item" id="circle" href="home.html">
            <i className="fas fa-hotdog"></i>
          </a>
          <a className="navbar-burger" id="burger">
            <span></span>
            <span></span>
            <span></span>
          </a>
        </div>

        <div className="navbar-menu" id="nav-links">
          <div className="navbar-start">
            <a className="navbar-item is-hoverable" href="home.html">
              Home
            </a>

            <a className="navbar-item is-hoverable" href="about.html">
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
            <p>In <i><u>Call Me By Your Shade</u></i>—named cheaply after a seemingly good movie that I
              haven't gotten to
              see yet—you're given a pseudo-random phrase associated with a color in some way; your goal is to use the
              color controlls provided to match the secret color as close as you possibly can. Hints are provided after
              each of your 10 guesses, in the form of percentage in general-closeness and high-or-low position of color
              values (RGB/HSL). <b>Can you find the color? Try it out!!</b></p><br></br>
            Colors & names from <a href="https://github.com/meodai/color-names" target="_blank">Color-Names API</a> by <a
              href="https://xn--w-25a.elastiq.ch/" target="_blank">David Aerne</a><br></br>
            Buttons from <a href="https://icons8.com/" target="_blank">Icons8</a><br></br>
            Sounds from <a href="https://mixkit.co/" target="_blank">Mixkit</a><br></br>
            <a href="https://iro.js.org/" target="_blank">Color Picker</a> by <a href="https://jamesdaniel.dev/"
              target="_blank">James Daniel</a><br></br><br></br>
            © L. Mavroudakis 2022-2024
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
                <div id="patches">
                  <div className="is-size-3 mx-2 my-2" id="test-patch">#A1A8CC
                  </div>
                  <div className="is-size-3 mx-2 my-2" id="history-patch">
                    <div id="back-guess"></div>
                    <p>1/10</p>
                    <div id="forward-guess"></div>
                  </div>
                </div>
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
      <section className="section">
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

    </div>
  );
};

export default App;