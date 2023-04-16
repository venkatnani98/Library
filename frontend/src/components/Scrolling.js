import { useState } from "react";

function ScrollingText() {
    const [text, setText] = useState("This is some scrolling text!");
  
    function scrollText() {
      setText(text.slice(1) + text.charAt(0));
    }
  
    setInterval(scrollText, 1000);
  
    return <div>{text}</div>;
  }
  
  export default ScrollingText;
  