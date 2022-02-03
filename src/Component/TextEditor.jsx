import { useCallback, useEffect, useState } from "react"
import Quill from "quill"
import "quill/dist/quill.snow.css"
import "quill-emoji/dist/quill-emoji.css";
import * as Emoji from "quill-emoji";
Quill.register("modules/emoji", Emoji);


// Add fonts to whitelist
var fonts = ['Arial', 'Courier', 'Garamond', 'Tahoma', 'Times New Roman', 'Verdana'];
// generate code friendly names
function getFontName(font) {
  return font.toLowerCase().replace(/s/g, "-");
}
var fontNames = fonts.map(font => getFontName(font));
// add fonts to style
var fontStyles = "";
fonts.forEach(function (font) {
  var fontName = getFontName(font);
  fontStyles += ".ql-snow .ql-picker.ql-font .ql-picker-label[data-value=" + fontName + "]::before, .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=" + fontName + "]::before {" +
    "content: '" + font + "';" +
    "font-family: '" + font + "', sans-serif;" +
    "}" +
    ".ql-font-" + fontName + "{" +
    " font-family: '" + font + "', sans-serif;" +
    "}";
});
var node = document.createElement('style');
node.innerHTML = fontStyles;
document.body.appendChild(node);


// Add fonts to whitelist
var Font = Quill.import('formats/font');
Font.whitelist = fontNames;
Quill.register(Font, true);

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ 'font': fontNames }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
]
export default function TextEditor() {

  const wrapperRef = useCallback(wrapper => {
    if (wrapper == null) return

    wrapper.innerHTML = ""
    const editor = document.createElement("div")
    wrapper.append(editor)
    const q = new Quill(editor, {
      theme: "snow",
      modules: {
        toolbar: TOOLBAR_OPTIONS,
        "emoji-toolbar": true,
        "emoji-textarea": true,
        "emoji-shortname": true
      },
    })
  }, [])
  return <div className="container" ref={wrapperRef}></div>
}