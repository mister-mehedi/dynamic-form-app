
import './index.css'

function App() {


  return (
    <>
      <div className="p-10 flex flex-col items-center gap-4">
        <h1 className="text-3xl font-bold text-red-700">Testing DaisyUI & Tailwind</h1>

        <p>If this text is centered and large, Tailwind is working.</p>

        <div className="flex gap-4">
          <button className="btn">Default Button</button>
          <button className="btn btn-primary">Primary Button</button>
          <button className="btn btn-secondary">Secondary Button</button>
          <button className="btn btn-accent">Accent Button</button>
        </div>

        <div className="alert alert-success mt-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>This is a DaisyUI success alert!</span>
        </div>

        <div className="card w-96 bg-base-100 shadow-xl mt-4">
          <div className="card-body">
            <h2 className="card-title">DaisyUI Card</h2>
            <p>If this looks like a card, everything is set up correctly.</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Okay!</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
