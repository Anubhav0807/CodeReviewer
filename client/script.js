const API_URL = "http://localhost:3000/codes"; // Update if needed

let editorInstance;

// ✅ Initialize Monaco Editor
require.config({ paths: { vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.39.0/min/vs" }});
require(["vs/editor/editor.main"], function () {
    editorInstance = monaco.editor.create(document.getElementById("editor"), {
        value: "// Start coding...",
        language: "javascript",
        theme: "vs-dark",
    });
});

// ✅ Save Code to Backend
async function saveCode() {
    const codeContent = editorInstance.getValue();
    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "My Code", content: codeContent, language: "javascript" }),
    });

    if (response.ok) {
        alert("Code saved!");
        fetchCodes();
    } else {
        alert("Error saving code.");
    }
}

// ✅ Fetch Saved Codes
async function fetchCodes() {
    const response = await fetch(API_URL);
    const data = await response.json();
    const list = document.getElementById("savedCodesList");
    
    list.innerHTML = "";
    data.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = `${item.title} - ${item.language}`;
        list.appendChild(li);
    });
}

// ✅ Run JavaScript Code
function runCode() {
    try {
        const result = eval(editorInstance.getValue());
        console.log("Output:", result);
    } catch (error) {
        console.error("Error:", error);
    }
}
