import { useState,useCallback,useEffect,useRef } from 'react'
//useCallback is used for optimization and storing in memory when there is change in dependencies 
//useEffect is used that if there is change in dependencies then re-render

function App() {
  const [length,setlength] = useState(8);
  const [number,setnumber] = useState(false);
  const [characters,setcharacters] = useState(false);
  const [password,setpassword] = useState("");

  //useRef hook->we can take refrence of any element on out webpage and manupilate it
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str =
     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
     if(number)
      str += "0123456789"
    if(characters)
      str += "!@#$%^&*"

    for(let i=1;i<=length;i++)
    {
      let char = Math.floor(Math.random()*str.length + 1)
      pass += str.charAt(char);
    }

    setpassword(pass);

  }, [length,number,characters,setpassword])

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,length);
    window.navigator.clipboard.writeText(password)
  },[password])

 useEffect(() => {passwordGenerator()}, [length,number,characters,passwordGenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg
      px-4 my-8 text-orange-500 bg-gray-800'>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
       <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input 
        type="text"
        value={password}
        className='outline-none w-full py-1 px-3 bg-white text-black'
        placeholder='password' 
        readOnly
        ref = {passwordRef}
        />
        <button 
          onClick={copyPasswordToClipboard}
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 cursor-pointer'>
          copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => {setlength(e.target.value)}} 
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
          <input 
          type="checkbox"
          defaultChecked = {number}
          id="numberInput"
          onChange={() => {
            setnumber((prev) => !prev)//flips the tick on checkbox
          }} />
          <label>Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
          <input 
          type="checkbox"
          defaultChecked = {characters}
          id="characterInput"
          onChange={() => {
            setcharacters((prev) => !prev)//flips the tick on checkbox
          }} />
          <label>Characters</label>
          </div>
        </div>
      </div>
      <button 
      onClick={()=>{passwordGenerator()}}
      className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 cursor-pointer block mx-auto mt-4'>
        Generate New Password</button>
    </>
  )
}

export default App
