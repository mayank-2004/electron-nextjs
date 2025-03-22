import React from 'react'

const Home = () => {
  return <>
  <div className='home-section'>
      <h1>Home</h1>
      <div className='send-receive'>
          <div>
              <input type="text" placeholder='text' name='sendText' />
              <button>Send</button>
          </div>
      </div>
  </div>
  </>
}

export default Home

