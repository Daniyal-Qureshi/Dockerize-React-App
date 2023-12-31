import { useState } from "react";
import OpenAI from "openai";

const OpenAIChat = () => {
  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
  })
  const [prompt, setPrompt] = useState("");
  const [apiResponse, setApiResponse] = useState("")
  const send = async () => {
   try {
      const result = await openai.chat.completions.create({
        messages: [{role: "user", content: prompt}],
        model:"gpt-3.5-turbo"
      })

    setApiResponse(result.choices[0].message.content)
   }
   catch(e){
    setApiResponse("Something went wrong"+e.message)
   }
  };

  return (
  <div className="p-2">
    <div className="input-group mb-3">
      <input
        type="text"
        placeholder="Enter text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <div className="input-group-append">
        <button className="btn btn-outline-primary"
         onClick={send}>
          <i className="fa fa-paper-plane"></i>
        </button>
      </div>
    </div>
     <h6> {apiResponse}</h6>
  </div>
  );
};

export default OpenAIChat;
