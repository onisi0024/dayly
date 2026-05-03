fetch("data.json")
  .then(response => response.json())
  .then(data => {
    const list = document.getElementById("diary-list");

    // 日付の新しい順に並べる
    data.sort((a, b) => new Date(b.date) - new Date(a.date));

    data.forEach(item => {
      const li = document.createElement("li");

      li.innerHTML = `
        <a href="${item.file}">
          ${item.date} - ${item.title}
        </a>
      `;

      list.appendChild(li);
    });
  });