const API_URL = "http://localhost:5000/api/posts";

async function createPost() {

  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const codeSnippet = document.getElementById("code").value;

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title,
      content,
      codeSnippet
    })
  });

  const data = await response.json();

  loadPosts();
}

async function loadPosts() {

  const response = await fetch(API_URL);

  const posts = await response.json();

  const container = document.getElementById("posts");

  container.innerHTML = "";

  posts.forEach(post => {

    container.innerHTML += `
      <div class="bg-gray-800 p-4 rounded-xl mb-4">

        <h2 class="text-2xl font-bold text-indigo-400 mb-2">
          ${post.title}
        </h2>

        <p class="text-gray-300 mb-4">
          ${post.content}
        </p>

        <pre class="bg-black p-4 rounded text-green-400 overflow-x-auto">
${post.codeSnippet}
        </pre>

      </div>
    `;
  });
}

loadPosts();
