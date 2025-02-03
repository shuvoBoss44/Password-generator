import { useState, useEffect, useCallback, useRef } from "react";
import "./App.css";

function App() {
  const [password, setPassword] = useState("");
  const [range, setRange] = useState(5);
  const [numbers, setNumbers] = useState(false);
  const [special, setSpecial] = useState(false);
  const passRef = useRef();

  useEffect(() => {
    let pass = "";
    let abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let num = "1234567890";
    let char = "!@#$%&*";
    if (numbers) abc += num;
    if (special) abc += char;
    for (let i = 0; i < range; i++) {
      var random = Math.floor(Math.random() * abc.length);
      pass += abc.charAt(random);
    }
    setPassword(pass);
  }, [range, numbers, special]);

  const copyText = useCallback(() => {
    passRef.current.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <>
      <div className="flex justify-center items-center h-dvh">
        <div className="w-full max-w-[600px] mx-auto shadow-md rounded-lg px-4 py-3 bg-gray-800 text-white">
          <div className="h-40 flex items-center justify-center">
            <input
              type="text"
              value={password}
              ref={passRef}
              className="border border-black-300 px-4 py-2 w-100 m-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              readOnly
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={copyText}
            >
              Copy
            </button>
          </div>
          <div className="flex items-center flex-col">
            <div className="flex flex-col items-center">
              <input
                type="range"
                value={range}
                min={5}
                max={30}
                onChange={e => setRange(Number(e.target.value))}
                className="mx-2"
              />
              <label htmlFor="Range">
                Range: <span className="text-green-400">{range}</span>
              </label>
            </div>
            <div>
              <label htmlFor="Numbers">Numbers: </label>
              <input
                type="checkbox"
                checked={numbers}
                onChange={() => setNumbers(prev => !prev)}
              />
            </div>
            <div>
              <label htmlFor="Specials">Specials: </label>
              <input
                type="checkbox"
                checked={special}
                onChange={() => setSpecial(prev => !prev)}
              />
            </div>
          </div>
          <p className="text-center mt-4 text-gray-400">
            Password generator by{" "}
            <span className="text-blue-400">
              <a
                href="https://www.facebook.com/shuvo.chakma.16121/"
                target="blank"
              >
                Shuvo
              </a>
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
