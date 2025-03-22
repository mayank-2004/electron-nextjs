import React from 'react'

const Home = () => {
    return <>
        <div className='publisher'>
            <h1>Publisher</h1>
            <div className='publishers'>
                <div className='publisher-form'>
                    <label>send text</label>
                    <input value={sendMessage} onChange={(e) => setSendMessage(e.target.value)} type="text" name="text" placeholder='enter text' />
                </div>
                <button onClick={onPublish} type='button' className='btn'>Send</button>
            </div>
            <div className='publisher-area'>
                <textarea readOnly value={messages.join("\n")} name="message" cols="40" rows="15"></textarea>
            </div>
        </div>

        <div className='publisher'>
            <h1>Subscriber</h1>
            <form>
                <div className='publishers'>
                    <div className='publisher-form'>
                        <label>receive text</label>
                        <div className='publisher-area'>
                            <textarea readOnly value={messages.join("\n")} name="message" cols="25" rows="15"></textarea>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </>
}

export default Home

