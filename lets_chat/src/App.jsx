import { useState } from 'react';
import axios from 'axios';
import { marked } from 'marked';
import './App.css';
import 'normalize.css';
import loading from '/loading.gif';
import logo2 from '/logo2.png'
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {}

library.add(fas);

function App() {

  const [prompt, setPrompt] = useState("");
  const [botResponse, setBotResponse] = useState("");

  const [prevPrompt, setPrevPrompt] = useState('');
  const [prevResponse, setPrevResponse] = useState('');

  const [isLoading, setIsLoading] = useState(false)

  const handlePrompt = (e) => {
    setPrompt(e.target.value);
  };

  const handleMessageSent = async (e) => {
    e.preventDefault();
    setPrevPrompt(prompt);
    setIsLoading(true)

    const response = await axios.post('http://localhost:3000/v1/chat', { prompt });

    if (response.status === 200) {
      // setBotResponse(response.data);
      const data = response.data;

      // if (botResponse.success === true) {
      if (data.success) {
        // setPrevResponse(marked(botResponse.response));
        setPrevResponse(marked(data.response));
        
        setPrompt('');
        // setBotResponse('');
        setIsLoading(false)
      } else {
        // alert('Network error');
        setIsLoading(false)
        setPrevResponse('<span style="color:red">Network Error Occurred</span>')
        console.log("Network error");
      }
    } else {
      alert('Error Occurred');
      console.log('Error Occurred');
    }
  };

  return (
    // div
    <div className="App">
      <div className="side_bar">
        <div className="side_header">
          <img src={logo2} alt="" className='logo'/>
          <FontAwesomeIcon icon='fa-solid fa-plus' className='add_chat'/>
        </div>
        {/* <hr className='horizontal-line'/> */}

        <div className="side_main">
          <div className="chat_history">
            <div className="history_time">
              <strong>Today</strong>
            </div>
            <div className="history_list">
              <div className="history_item">
                New trend in technology?
              </div>
            </div>
          </div>
        </div>
        <div className="side_footer">
          <div className="user_profile">
            <FontAwesomeIcon icon='fa-solid fa-user' className='profile_icon'/>
            <i>@lati</i>
          </div>
          <FontAwesomeIcon icon='fa-solid fa-gear' className='more_icon'/>
        </div>

      </div>
    <div className="app_container">

      <div className="header">
        <div className="logo_icon">Let's Chat</div>
        <div className="extra_info">i</div>
      </div>
      
      <div className="chats">
        {prevPrompt?
        <div className="chat_body">
          <div className="user">
            <div className="user_icon">U</div>
            <div className="user_message">{prevPrompt || ''}</div>
            {/* <div className="user_message"></div> */}
          </div>
          <div className="bot">
            <div className="bot_icon">B</div> 
            <div 
              className="response_body" 
              // dangerouslySetInnerHTML={{__html: prevResponse?prevResponse:(isLoading?<img className="loading" src={loading} alt="" />:'')}}
            >
              {isLoading ? (
                <img className="loading" src={loading} alt="Loading..." />
              ) : (
                <div dangerouslySetInnerHTML={{ __html: prevResponse }} />
              )}
              {/* // <img className="loading" src={loading} alt="" /> */}
            </div>
          </div>
        </div>:<h1>Lets Chat</h1>}
      </div>


      <div className="prompt_message_container">
        <form className="prompt_container" onSubmit={handleMessageSent}>

          <input 
            type="text" 
            name="prompt_message" 
            onChange={handlePrompt} 
            // value={prompt} 
          />
          <button type="submit">
            <FontAwesomeIcon icon="fa-solid fa-arrow-right" className='send_icon' />
          </button>
          
        </form>
      </div>
    </div>
    </div>
  );
}

export default App;
